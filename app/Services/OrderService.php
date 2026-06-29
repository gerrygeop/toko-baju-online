<?php

namespace App\Services;

use App\Repositories\OrderRepositoryInterface;
use App\Models\ProductTransaction;
use Illuminate\Support\Facades\Storage;

class OrderService implements OrderServiceInterface
{
    public function __construct(private OrderRepositoryInterface $orderRepository) {}

    public function getOrderHistory(int $userId)
    {
        return $this->orderRepository->getOrderHistory($userId);
    }

    public function getOrderByTransactionCode(string $transactionCode, int $userId): ?ProductTransaction
    {
        return $this->orderRepository->getOrderByTransactionCode($transactionCode, $userId);
    }

    public function uploadPaymentProof(int $transactionId, array $payload): ProductTransaction
    {
        $proof = $payload['payment_proof'];

        $filePath = $proof->store('payment_proofs', 'public');

        return $this->orderRepository->updatePaymentProof($transactionId, $filePath);
    }
}
