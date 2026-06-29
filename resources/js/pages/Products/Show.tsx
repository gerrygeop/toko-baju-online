import { Head } from '@inertiajs/react';
import { useMemo, useState, type ChangeEvent } from 'react';
import { useCart } from '@/Contexts/CartContext';

interface ProductVariantItem {
    id: number;
    size?: string | null;
    color_name?: string | null;
    stock: number;
    price?: number;
    is_active: boolean;
}

interface ProductShowItem {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    price: number;
    stock: number;
    thumbnail?: string | null;
    brand?: { name?: string | null };
    category?: { name?: string | null };
    productImages?: { image_path: string }[];
    variants: ProductVariantItem[];
}

interface ProductsShowProps {
    product: ProductShowItem;
}

export default function ProductsShow({ product }: ProductsShowProps) {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const { addToCart } = useCart();

    const activeVariants = useMemo<ProductVariantItem[]>(
        () =>
            product.variants.filter(
                (variant): variant is ProductVariantItem => variant.is_active,
            ),
        [product.variants],
    );

    const availableColors = useMemo<string[]>(
        () =>
            Array.from(
                new Set(
                    activeVariants
                        .map((variant) => variant.color_name ?? '')
                        .filter((value): value is string => Boolean(value)),
                ),
            ),
        [activeVariants],
    );

    const availableSizes = useMemo<string[]>(
        () =>
            Array.from(
                new Set(
                    activeVariants
                        .map((variant) => variant.size ?? '')
                        .filter((value): value is string => Boolean(value)),
                ),
            ),
        [activeVariants],
    );

    const selectedVariant = useMemo(() => {
        return activeVariants.find(
            (variant) =>
                variant.color_name === selectedColor &&
                variant.size === selectedSize,
        );
    }, [activeVariants, selectedColor, selectedSize]);

    const displayedPrice = selectedVariant?.price ?? product.price;
    const displayedStock = selectedVariant?.stock ?? product.stock;
    const isSelectionComplete = Boolean(
        selectedColor && selectedSize && selectedVariant,
    );
    const canAddToCart = isSelectionComplete && displayedStock > 0;

    const galleryImages = product.productImages?.length
        ? product.productImages
        : [{ image_path: product.thumbnail ?? '/images/placeholder.svg' }];

    const handleAddToCart = () => {
        if (!selectedVariant) {
            return;
        }

        addToCart({
            id_produk: product.id,
            nama_produk: product.name,
            id_varian: selectedVariant.id,
            ukuran: selectedVariant.size ?? '',
            warna: selectedVariant.color_name ?? '',
            harga: displayedPrice,
            kuantitas: 1,
            gambar:
                galleryImages[0]?.image_path ??
                product.thumbnail ??
                '/images/placeholder.svg',
            maksimal_stok_varian: selectedVariant.stock,
        });
    };

    return (
        <>
            <Head title={product.name} />
            <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6">
                        <div className="grid gap-3 sm:grid-cols-2">
                            {galleryImages.map((image, index) => (
                                <div
                                    key={`${image.image_path}-${index}`}
                                    className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950"
                                >
                                    <img
                                        src={image.image_path}
                                        alt={product.name}
                                        className="h-72 w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                            <div className="space-y-3">
                                <p className="text-sm tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
                                    {product.brand?.name} •{' '}
                                    {product.category?.name}
                                </p>
                                <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                                    Rp
                                    {Number(displayedPrice).toLocaleString(
                                        'id-ID',
                                    )}
                                </p>
                                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {product.description ??
                                        'Produk ini belum memiliki deskripsi.'}
                                </p>
                            </div>

                            <div className="mt-8 space-y-6">
                                <div>
                                    <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
                                        Pilih Warna
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {availableColors.length === 0 ? (
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Tidak ada variasi warna.
                                            </p>
                                        ) : (
                                            availableColors.map((color) => {
                                                const isActive =
                                                    selectedColor === color;
                                                return (
                                                    <button
                                                        key={color}
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedColor(
                                                                color,
                                                            )
                                                        }
                                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                                            isActive
                                                                ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                                                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700'
                                                        }`}
                                                    >
                                                        {color}
                                                    </button>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
                                        Pilih Ukuran
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {availableSizes.length === 0 ? (
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Tidak ada variasi ukuran.
                                            </p>
                                        ) : (
                                            availableSizes.map((size) => {
                                                const isActive =
                                                    selectedSize === size;
                                                return (
                                                    <button
                                                        key={size}
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedSize(
                                                                size,
                                                            )
                                                        }
                                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                                            isActive
                                                                ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950'
                                                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700'
                                                        }`}
                                                    >
                                                        {size}
                                                    </button>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            Stok
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
                                            {selectedVariant
                                                ? displayedStock
                                                : 'Pilih varian terlebih dahulu'}
                                        </p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            Harga
                                        </p>
                                        <p className="mt-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
                                            Rp
                                            {Number(
                                                displayedPrice,
                                            ).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <button
                                        type="button"
                                        disabled={!canAddToCart}
                                        onClick={handleAddToCart}
                                        className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-3xl px-6 text-sm font-semibold transition ${
                                            canAddToCart
                                                ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200'
                                                : 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                        }`}
                                    >
                                        {selectedVariant
                                            ? displayedStock > 0
                                                ? 'Add to Cart'
                                                : 'Stok Habis'
                                            : 'Pilih warna dan ukuran'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
