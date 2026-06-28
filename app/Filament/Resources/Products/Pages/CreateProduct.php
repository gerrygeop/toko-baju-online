<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use Filament\Resources\Pages\CreateRecord;
use Filament\Support\Enums\Alignment;

class CreateProduct extends CreateRecord
{
    protected static string $resource = ProductResource::class;

    public function getFormActionsAlignment(): Alignment
    {
        return Alignment::Between;
    }
}
