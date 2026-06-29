<?php

namespace App\Filament\Resources\ProductTransactions\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductTransactionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make()
                    ->columns(2)
                    ->schema([
                        TextInput::make('transaction_code')
                            ->required(),
                    ]),

                Section::make('Customer Details')
                    ->columns(2)
                    ->schema([
                        Select::make('user_id')
                            ->relationship('user', 'name')
                            ->required(),

                        Textarea::make('shipping_address')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Section::make('Transaction Details')
                    ->columns(2)
                    ->schema([
                        TextInput::make('total_price')
                            ->required()
                            ->numeric(),
                        TextInput::make('shipping_cost')
                            ->required()
                            ->numeric(),
                        TextInput::make('grand_total')
                            ->required()
                            ->numeric(),
                    ]),

                Section::make('Payment Details')
                    ->columns(2)
                    ->schema([
                        TextInput::make('payment_method'),
                        TextInput::make('proof_of_payment'),

                        ToggleButtons::make('status')
                            ->required()
                            ->inline()
                            ->options([
                                'pending' => 'Pending',
                                'paid' => 'Paid',
                                'shipping' => 'Shipping',
                                'completed' => 'Completed',
                                'cancelled' => 'Cancelled',
                            ])
                            ->colors([
                                'warning' => 'Pending',
                                'primary' => 'Paid',
                                'info' => 'Shipping',
                                'success' => 'Completed',
                                'danger' => 'Cancelled',
                            ]),

                        Textarea::make('notes')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
