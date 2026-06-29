<?php

namespace App\Filament\Resources\ProductTransactions;

use App\Filament\Resources\ProductTransactions\Pages\CreateProductTransaction;
use App\Filament\Resources\ProductTransactions\Pages\EditProductTransaction;
use App\Filament\Resources\ProductTransactions\Pages\ListProductTransactions;
use App\Filament\Resources\ProductTransactions\Pages\ViewProductTransaction;
use App\Filament\Resources\ProductTransactions\Schemas\ProductTransactionForm;
use App\Filament\Resources\ProductTransactions\Schemas\ProductTransactionInfolist;
use App\Filament\Resources\ProductTransactions\Tables\ProductTransactionsTable;
use App\Models\ProductTransaction;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProductTransactionResource extends Resource
{
    protected static ?string $model = ProductTransaction::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedShoppingBag;

    protected static ?string $label = 'Order';

    public static function form(Schema $schema): Schema
    {
        return ProductTransactionForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ProductTransactionInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProductTransactionsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProductTransactions::route('/'),
            'create' => CreateProductTransaction::route('/create'),
            'view' => ViewProductTransaction::route('/{record}'),
            'edit' => EditProductTransaction::route('/{record}/edit'),
        ];
    }
}
