<?php

namespace App\Filament\Resources\ProductTransactions\Pages;

use App\Filament\Resources\ProductTransactions\ProductTransactionResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewProductTransaction extends ViewRecord
{
    protected static string $resource = ProductTransactionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
