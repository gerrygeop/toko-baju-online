<?php

namespace App\Repositories;

use App\Models\ProductTransaction;

interface OrderRepositoryInterface
{
    public function createTransaction(array $transactionData, array $items): ProductTransaction;

    public function getOrderHistory(int $userId);

    public function getOrderByTransactionCode(string $transactionCode, int $userId): ?ProductTransaction;

    public function updatePaymentProof(int $transactionId, string $filePath): ProductTransaction;
}
