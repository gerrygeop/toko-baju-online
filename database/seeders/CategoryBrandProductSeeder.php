<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductVariant;

class CategoryBrandProductSeeder extends Seeder
{
    public function run(): void
    {
        // Categories and brands (at least 10 each)
        $categories = Category::factory(12)->create();
        $brands = Brand::factory(12)->create();

        // Create products
        Product::factory(50)->make()->each(function (Product $product) use ($categories, $brands) {
            $product->category_id = $categories->random()->id;
            $product->brand_id = $brands->random()->id;
            $product->save();

            // create 1-3 variants
            $variants = ProductVariant::factory(rand(1, 3))->create([
                'product_id' => $product->id,
            ]);

            // mark one variant as default
            if ($variants->count() > 0) {
                $first = $variants->first();
                $first->is_default = true;
                $first->save();
            }
        });
    }
}
