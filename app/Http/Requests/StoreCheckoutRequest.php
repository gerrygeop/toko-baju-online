<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'shipping_address' => ['required', 'string'],
            'notes' => ['nullable', 'string'],
            'cart_items' => ['required', 'array', 'min:1'],
            'cart_items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'cart_items.*.product_variant_id' => ['required', 'integer', 'exists:product_variants,id'],
            'cart_items.*.quantity' => ['required', 'integer', 'min:1'],
        ];
    }
}
