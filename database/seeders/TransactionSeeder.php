<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductTransaction;
use App\Models\TransactionItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $products = Product::with('variants')->get();

        if ($products->isEmpty() || $users->isEmpty()) {
            return;
        }

        // create some transactions
        for ($i = 0; $i < 10; $i++) {
            $user = $users->random();
            $transaction = ProductTransaction::factory()->create(['user_id' => $user->id]);

            $itemsCount = rand(1, 4);
            $total = 0;

            for ($j = 0; $j < $itemsCount; $j++) {
                $product = $products->random();
                $variant = $product->variants->isNotEmpty() ? $product->variants->random() : ProductVariant::factory()->create(['product_id' => $product->id]);

                $quantity = rand(1, 3);
                $price = $product->price;

                TransactionItem::create([
                    'product_transaction_id' => $transaction->id,
                    'product_id' => $product->id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $quantity,
                    'price' => $price,
                ]);

                $total += $price * $quantity;
            }

            $shipping = rand(5, 20);
            $transaction->total_price = $total;
            $transaction->shipping_cost = $shipping;
            $transaction->grand_total = $total + $shipping;
            $transaction->save();
        }
    }
}
