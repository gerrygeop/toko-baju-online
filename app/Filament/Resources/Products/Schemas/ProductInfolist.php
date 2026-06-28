<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Section::make()
                    ->columns(2)
                    ->columnSpan(2)
                    ->schema([
                        TextEntry::make('category.name')
                            ->label('Category'),
                        TextEntry::make('brand.name')
                            ->label('Brand'),
                        TextEntry::make('name'),
                        TextEntry::make('slug'),
                        ImageEntry::make('thumbnail')
                            ->columnSpanFull(),
                        TextEntry::make('sku')
                            ->label('SKU')
                            ->placeholder('-'),
                        TextEntry::make('description')
                            ->placeholder('-')
                            ->formatStateUsing(fn(?string $state): HtmlString => new HtmlString($state ?? '-'))
                            ->columnSpanFull(),
                        TextEntry::make('price')
                            ->money(),
                        TextEntry::make('stock')
                            ->numeric(),

                    ]),

                Group::make()
                    ->schema([
                        Section::make()
                            ->schema([
                                IconEntry::make('is_featured')
                                    ->belowContent('Featured products will be highlighted on the homepage and in product listings.')
                                    ->boolean(),
                                IconEntry::make('is_new_arrival')
                                    ->belowContent('New arrival products will be displayed in the "New Arrivals" section.')
                                    ->boolean(),
                                IconEntry::make('is_active')
                                    ->belowContent('Active products are visible to customers on the storefront.')
                                    ->boolean(),
                                TextEntry::make('sort_order')
                                    ->belowContent('Products with lower sort order values will be displayed before products with higher sort order values.')
                                    ->numeric(),
                            ]),

                        Section::make()
                            ->schema([
                                TextEntry::make('created_at')
                                    ->belowContent('The date and time when the product was created.')
                                    ->dateTime()
                                    ->placeholder('-'),
                                TextEntry::make('updated_at')
                                    ->belowContent('The date and time when the product was last updated.')
                                    ->dateTime()
                                    ->placeholder('-'),
                            ]),
                    ]),
            ]);
    }
}
