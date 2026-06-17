<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

#[Fillable('product_transaction_id', 'product_variant_id', 'quantity', 'price')]
class TransactionItem extends Model
{
    public function productTransaction()
    {
        return $this->belongsTo(ProductTransaction::class);
    }

    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
