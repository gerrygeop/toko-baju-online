<?php

namespace App\Repositories;

use App\Models\ProductTransaction;

interface OrderRepositoryInterface
{
    public function createTransaction(array $transactionData, array $items): ProductTransaction;
}
