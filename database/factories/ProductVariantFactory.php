<?php

namespace Database\Factories;

use App\Models\ProductVariant;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductVariant>
 */
class ProductVariantFactory extends Factory
{
    protected $model = ProductVariant::class;

    public function definition(): array
    {
        $sizes = ['XS', 'S', 'M', 'L', 'XL'];
        $colorName = fake()->colorName();

        return [
            'product_id' => Product::factory(),
            'size' => fake()->randomElement($sizes),
            'color_name' => $colorName,
            'color_hex' => fake()->hexColor(),
            'stock' => fake()->numberBetween(0, 100),
            'is_default' => false,
            'is_active' => true,
        ];
    }
}
