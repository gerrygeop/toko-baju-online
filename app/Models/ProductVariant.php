<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['product_id', 'size', 'color_name', 'color_hex', 'sku', 'price', 'compare_price', 'stock', 'is_default', 'is_active'])]
class ProductVariant extends Model
{
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'compare_price' => 'decimal:2',
            'is_default' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    protected $appends = [
        'final_price',
    ];

    public function getFinalPriceAttribute(): float
    {
        return (float) ($this->price ?: $this->product->price);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function orderItem(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
