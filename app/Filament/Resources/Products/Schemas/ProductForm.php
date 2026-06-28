<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
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

                        Section::make()
                            ->columnSpan(2)
                            ->schema([
                                FileUpload::make('thumbnail')
                                    ->image()
                                    ->directory('products/thumbnails') // Folder penyimpanan di storage/app/public
                                    ->imageEditor()
                                    ->required(),

                                Repeater::make('images') // 1. Harus sama dengan nama fungsi relasi di Model Product
                                    ->relationship('images') // 2. Menegaskan bahwa ini adalah relasi database
                                    ->schema([
                                        FileUpload::make('image_path') // 3. Nama kolom di tabel product_images
                                            ->image()
                                            ->hiddenLabel()
                                            ->directory('products/images') // Folder penyimpanan di storage/app/public
                                            ->required()
                                            ->imageEditor(), // Opsional: Agar admin bisa crop/edit foto sebelum upload
                                    ])
                                    ->grid(3) // Membuat tampilan repeater rapi menyamping (grid 3 kolom)
                                    ->label('Galeri Foto Produk')
                                    ->defaultItems(1)
                                    ->addActionLabel('Add Product Image')
                                    ->collapsible(),
                            ]),

                        Section::make()
                            ->columnSpan(2)
                            ->schema([
                                Repeater::make('variants') // 1. Harus sama dengan nama fungsi relasi di model Product
                                    ->relationship('variants') // 2. Menghubungkan langsung ke relasi database HasMany
                                    ->schema([
                                        Select::make('size')
                                            ->required()
                                            ->label('Size')
                                            ->options([
                                                'XS' => 'XS',
                                                'S' => 'S',
                                                'M' => 'M',
                                                'L' => 'L',
                                                'XL' => 'XL',
                                            ]),

                                        // Kolom Warna
                                        Select::make('color_name')
                                            ->required()
                                            ->label('Color')
                                            ->options([
                                                'Hitam' => 'Hitam',
                                                'Putih' => 'Putih',
                                                'Merah' => 'Merah',
                                                'Biru' => 'Biru',
                                            ]),

                                        // Kolom Stok Varian
                                        TextInput::make('stock')
                                            ->numeric()
                                            ->required()
                                            ->default(1)
                                            ->minValue(0),
                                    ])
                                    ->columns(3) // 3. Membuat semua inputan di atas berjejer rapi dalam 1 baris
                                    ->label('Manajemen Varian Produk (Stok, Warna, Ukuran)')
                                    ->addActionLabel('Add Variant')
                                    ->defaultItems(1) // Memunculkan 1 baris varian kosong secara default saat create
                                    ->collapsible() // Bisa di-minimize per baris jika variannya terlalu banyak
                                    ->columnSpanFull(),
                            ]),
                    ]),

                // SIDEBAR
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
