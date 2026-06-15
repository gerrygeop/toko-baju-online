<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'subtitle', 'image_path', 'button_text', 'button_link', 'is_active', 'sort_order'])]
class Banner extends Model
{
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
