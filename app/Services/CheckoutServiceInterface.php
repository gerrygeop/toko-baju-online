<?php

namespace App\Services;

use App\Models\ProductTransaction;

interface CheckoutServiceInterface
{
    public function execute(array $payload, int $userId): ProductTransaction;
}
