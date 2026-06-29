<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $category = trim((string) $request->query('category', ''));

        $products = Product::query()
            ->where('is_active', true)
            ->with(['category', 'brand', 'images'])
            ->when(
                $search !== '',
                fn($query) => $query->where('name', 'like', "%{$search}%"),
            )
            ->when(
                $category !== '',
                fn($query) => $query->where('category_id', $category),
            )
            ->orderBy('sort_order', 'asc')
            ->get();

        $categories = Category::query()
            ->where('is_active', true)
            ->orderBy('name', 'asc')
            ->get(['id', 'name']);

        return Inertia::render('Products/Index', [
            'products' => $products,
            'search' => $search,
            'category' => $category,
            'categories' => $categories,
        ]);
    }

    public function show(string $slug)
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with(['category', 'brand', 'productImages', 'variants'])
            ->firstOrFail();

        $product->variants->transform(function ($variant) use ($product) {
            return array_merge($variant->toArray(), [
                'price' => $variant->price ?? $product->price,
            ]);
        });

        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }
}
