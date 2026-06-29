<?php

namespace App\Filament\Resources\ProductTransactions\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductTransactionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Transaction Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('transaction_code'),
                        TextEntry::make('status')
                            ->badge()
                            ->colors([
                                'warning' => 'Pending',
                                'primary' => 'Paid',
                                'info' => 'Shipping',
                                'success' => 'Completed',
                                'danger' => 'Cancelled',

                            ]),
                        TextEntry::make('total_price')
                            ->money('IDR', true),
                        TextEntry::make('shipping_cost')
                            ->money('IDR', true),
                        TextEntry::make('grand_total')
                            ->money('IDR', true),
                    ]),

                Section::make('Customer Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('user.name')
                            ->label('Customer Name'),
                        TextEntry::make('user.phone')
                            ->label('Phone')
                            ->default('N/A'),
                        TextEntry::make('user.email')
                            ->label('Email address'),
                    ]),

                Section::make('Shipping Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('shipping_address')
                            ->columnSpanFull(),
                    ]),

                Section::make('Payment Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('payment_method')
                            ->placeholder('-'),
                        TextEntry::make('proof_of_payment')
                            ->placeholder('-'),
                    ]),

                Section::make('Timestamps')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('created_at')
                            ->dateTime()
                            ->placeholder('-'),
                        TextEntry::make('updated_at')
                            ->dateTime()
                            ->placeholder('-'),
                    ]),
            ]);
    }
}
