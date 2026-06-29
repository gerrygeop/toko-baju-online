<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::query()
            ->where('is_active', true)
            ->orderBy('name', 'asc')
            ->limit(6)
            ->get(['id', 'name', 'slug', 'icon']);

        $brands = Brand::query()
            ->where('is_active', true)
            ->orderBy('name', 'asc')
            ->limit(8)
            ->get(['id', 'name', 'slug', 'logo']);

        $featuredProducts = Product::query()
            ->with(['brand', 'category', 'images'])
            ->where('is_active', true)
            ->where('is_featured', true)
            ->orderByDesc('sort_order')
            ->limit(6)
            ->get([
                'id',
                'name',
                'slug',
                'price',
                'stock',
                'thumbnail',
                'description',
                'brand_id',
                'category_id',
            ]);

        $newArrivals = Product::query()
            ->with(['brand', 'category', 'images'])
            ->where('is_active', true)
            ->where('is_new_arrival', true)
            ->orderByDesc('created_at')
            ->limit(6)
            ->get([
                'id',
                'name',
                'slug',
                'price',
                'stock',
                'thumbnail',
                'description',
                'brand_id',
                'category_id',
            ]);

        return Inertia::render('welcome', [
            'categories' => $categories,
            'brands' => $brands,
            'featuredProducts' => $featuredProducts,
            'newArrivals' => $newArrivals,
        ]);
    }
}
