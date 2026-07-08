<?php

namespace App\Filament\Resources\ProductTransactions\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductTransactionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->schema([
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

                        Section::make('Transaction Details')
                            ->columns(2)
                            ->schema([
                                TextEntry::make('transaction_code'),
                                TextEntry::make('status')
                                    ->badge(),
                                TextEntry::make('total_price')
                                    ->money('IDR', true),
                                TextEntry::make('shipping_cost')
                                    ->money('IDR', true),
                                TextEntry::make('grand_total')
                                    ->money('IDR', true),
                            ]),

                        Section::make('Shipping Details')
                            ->columns(2)
                            ->schema([
                                TextEntry::make('shipping_address')
                                    ->columnSpanFull(),
                                TextEntry::make('notes')
                                    ->default('-')
                                    ->columnSpanFull(),
                            ]),
                    ]),

                Group::make()
                    ->schema([
                        Section::make('Payment Details')
                            ->schema([
                                TextEntry::make('payment_method')
                                    ->placeholder('-'),
                                ImageEntry::make('payment_proof')
                                    ->disk('public'),
                            ]),

                        Section::make('Timestamps')
                            ->schema([
                                TextEntry::make('created_at')
                                    ->dateTime()
                                    ->placeholder('-'),
                                TextEntry::make('updated_at')
                                    ->dateTime()
                                    ->placeholder('-'),
                            ]),
                    ]),
            ]);
    }
}
