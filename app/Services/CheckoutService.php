<?php

namespace App\Services;

use App\Enums\ProductTransactionStatus;
use App\Models\ProductVariant;
use App\Repositories\OrderRepositoryInterface;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\ProductTransaction;

class CheckoutService implements CheckoutServiceInterface
{
    private OrderRepositoryInterface $orderRepository;
    private const SHIPPING_COST = 20000;

    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function execute(array $payload, int $userId): ProductTransaction
    {
        return DB::transaction(function () use ($payload, $userId) {
            $invoiceCode = $this->generateInvoiceCode();
            $items = $payload['cart_items'];

            $transactionItems = [];
            $totalPrice = 0;

            foreach ($items as $item) {
                $variant = ProductVariant::with('product')
                    ->where('id', $item['product_variant_id'])
                    ->lockForUpdate()
                    ->first();

                if (! $variant) {
                    throw new \Exception('Varian produk tidak ditemukan.');
                }

                if (! $variant->is_active) {
                    throw new \Exception('Varian produk tidak aktif.');
                }

                $quantity = (int) $item['quantity'];

                if ($quantity < 1) {
                    throw new \Exception('Jumlah pembelian harus minimal 1.');
                }

                if ($variant->stock < $quantity) {
                    $color = $variant->color_name ?? 'standar';
                    $size = $variant->size;

                    throw new \Exception(sprintf(
                        'Stok varian %s / %s hanya tersedia %d.',
                        $color,
                        $size,
                        $variant->stock,
                    ));
                }

                $product = $variant->product;

                if (! $product) {
                    throw new \Exception('Produk tidak ditemukan untuk varian ini.');
                }

                $unitPrice = (float) $product->price;
                $lineTotal = $unitPrice * $quantity;
                $totalPrice += $lineTotal;

                $variant->decrement('stock', $quantity);

                $transactionItems[] = [
                    'product_id' => $variant->product_id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $quantity,
                    'unit_price' => number_format($unitPrice, 2, '.', ''),
                ];
            }

            $shippingCost = self::SHIPPING_COST;
            $grandTotal = $totalPrice + $shippingCost;

            return $this->orderRepository->createTransaction([
                'user_id' => $userId,
                'transaction_code' => $invoiceCode,
                'total_price' => number_format($totalPrice, 0, '.', ''),
                'shipping_cost' => $shippingCost,
                'grand_total' => number_format($grandTotal, 0, '.', ''),
                'shipping_address' => $payload['shipping_address'],
                'payment_method' => 'checkout',
                'status' => ProductTransactionStatus::Pending->value,
                'notes' => $payload['notes'] ?? null,
            ], $transactionItems);
        });
    }

    private function generateInvoiceCode(): string
    {
        return sprintf(
            'INV-%s-%s',
            now()->format('Ymd'),
            Str::upper(Str::random(8)),
        );
    }
}
