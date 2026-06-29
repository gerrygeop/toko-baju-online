<?php

namespace App\Models;

use App\Enums\ProductTransactionStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'transaction_code',
        'total_price',
        'shipping_cost',
        'grand_total',
        'shipping_address',
        'payment_method',
        'payment_proof',
        'status',
        'notes',
    ];

    protected $casts = [
        'status' => ProductTransactionStatus::class,
    ];

    public function transactionItems(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
