<?php

namespace Database\Factories;

use App\Models\TransactionItem;
use App\Models\ProductVariant;
use App\Models\ProductTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TransactionItem>
 */
class TransactionItemFactory extends Factory
{
    protected $model = TransactionItem::class;

    public function definition(): array
    {
        $variant = ProductVariant::factory()->create();

        return [
            'product_transaction_id' => ProductTransaction::factory(),
            'product_id' => $variant->product_id,
            'product_variant_id' => $variant->id,
            'quantity' => fake()->numberBetween(1, 5),
            'price' => fake()->randomFloat(2, 5, 500),
        ];
    }
}
