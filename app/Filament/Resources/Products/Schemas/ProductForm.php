<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()
                    ->columnSpan(2)
                    ->schema([
                        Section::make()
                            ->columns(2)
                            ->columnSpan(2)
                            ->schema([
                                TextInput::make('name')
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', str($state)->slug()))
                                    ->unique(ignoreRecord: true)
                                    ->required(),
                                TextInput::make('slug')
                                    ->unique(ignoreRecord: true)
                                    ->required(),
                                RichEditor::make('description')
                                    ->columnSpanFull(),
                            ]),

                        Section::make()
                            ->columnSpan(2)
                            ->schema([
                                FileUpload::make('thumbnail')
                                    ->required(),
                            ]),

                        Section::make()
                            ->columns(2)
                            ->columnSpan(2)
                            ->schema([
                                TextInput::make('sku')
                                    ->label('SKU'),
                                TextInput::make('price')
                                    ->required()
                                    ->numeric()
                                    ->prefix('$'),
                                TextInput::make('stock')
                                    ->required()
                                    ->numeric()
                                    ->default(0),
                            ]),
                    ]),

                Group::make()
                    ->columnSpan(1)
                    ->schema([
                        Section::make()
                            ->schema([
                                Toggle::make('is_featured')
                                    ->belowContent('Featured products will be highlighted on the homepage and in product listings.')
                                    ->required(),
                                Toggle::make('is_new_arrival')
                                    ->belowContent('New arrival products will be highlighted on the homepage and in product listings.')
                                    ->required(),
                                Toggle::make('is_active')
                                    ->belowContent('Active products will be visible to customers on the storefront. Inactive products will be hidden from view.')
                                    ->default(true)
                                    ->required(),
                                TextInput::make('sort_order')
                                    ->belowContent('Products with lower sort order values will be displayed before products with higher sort order values.')
                                    ->required()
                                    ->numeric()
                                    ->default(0),
                            ]),

                        Section::make('Associations')
                            ->schema([
                                Select::make('category_id')
                                    ->relationship('category', 'name')
                                    ->required(),
                                Select::make('brand_id')
                                    ->relationship('brand', 'name')
                                    ->required(),
                            ]),
                    ]),
            ])
            ->columns(3);
    }
}
