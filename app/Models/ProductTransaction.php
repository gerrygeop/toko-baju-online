<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'booking_trx_id',
    'product_varian_id',
    'name',
    'phone',
    'email',
    'quantity',
    'subtotal_amount',
    'promo_code_id',
    'discount_amount',
    'grand_total',
    'address',
    'postal_code',
    'city',
    'is_paid',
    'payment_method',
    'proof_of_payment'
])]
class ProductTransaction extends Model
{
    public function transactionItems(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }

    public function promoCode(): BelongsTo
    {
        return $this->belongsTo(PromoCode::class);
    }
}
