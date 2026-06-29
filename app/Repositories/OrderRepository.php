<?php

namespace App\Repositories;

use App\Models\ProductTransaction;
use App\Models\TransactionItem;

class OrderRepository implements OrderRepositoryInterface
{
    public function createTransaction(array $transactionData, array $items): ProductTransaction
    {
        /** @var ProductTransaction $transaction */
        $transaction = ProductTransaction::create($transactionData);

        $transactionItems = array_map(function (array $item): TransactionItem {
            return new TransactionItem([
                'product_id' => $item['product_id'],
                'product_variant_id' => $item['product_variant_id'],
                'quantity' => $item['quantity'],
                'price' => $item['unit_price'],
            ]);
        }, $items);

        $transaction->transactionItems()->saveMany($transactionItems);

        return $transaction;
    }

    public function getOrderHistory(int $userId)
    {
        return ProductTransaction::with(['transactionItems.product'])
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->get();
    }

    public function getOrderByTransactionCode(string $transactionCode, int $userId): ?ProductTransaction
    {
        return ProductTransaction::with(['transactionItems.product'])
            ->where('transaction_code', $transactionCode)
            ->where('user_id', $userId)
            ->first();
    }

    public function updatePaymentProof(int $transactionId, string $filePath): ProductTransaction
    {
        /** @var ProductTransaction $transaction */
        $transaction = ProductTransaction::findOrFail($transactionId);
        $transaction->payment_proof = $filePath;
        $transaction->status = 'paid';
        $transaction->save();

        return $transaction;
    }
}
