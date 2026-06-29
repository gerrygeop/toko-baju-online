<?php

namespace App\Services;

use App\Models\ProductTransaction;

interface OrderServiceInterface
{
    public function getOrderHistory(int $userId);

    public function getOrderByTransactionCode(string $transactionCode, int $userId): ?ProductTransaction;

    public function uploadPaymentProof(int $transactionId, array $payload): ProductTransaction;
}
