<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['code', 'discount_type', 'discount_value'])]
class PromoCode extends Model
{
    protected function casts(): array
    {
        return [
            'discount_value' => 'integer',
        ];
    }

    public function productTransactions(): HasMany
    {
        return $this->hasMany(ProductTransaction::class);
    }
}
