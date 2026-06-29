<?php

namespace Database\Factories;

use App\Models\ProductTransaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<ProductTransaction>
 */
class ProductTransactionFactory extends Factory
{
    protected $model = ProductTransaction::class;

    public function definition(): array
    {
        $total = fake()->randomFloat(2, 20, 500);
        $shipping = fake()->randomFloat(2, 5, 50);

        return [
            'user_id' => User::factory(),
            'transaction_code' => strtoupper(Str::random(10)),
            'total_price' => $total,
            'shipping_cost' => $shipping,
            'grand_total' => $total + $shipping,
            'shipping_address' => fake()->address(),
            'payment_method' => fake()->randomElement(['bank_transfer', 'cod']),
            'payment_proof' => null,
            'status' => 'pending',
            'notes' => null,
        ];
    }
}
