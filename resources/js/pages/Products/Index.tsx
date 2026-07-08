import { Head, Link } from '@inertiajs/react';
import { useState, type ChangeEvent } from 'react';

interface ProductIndexItem {
    id: number;
    slug: string;
    name: string;
    price: number;
    stock: number;
    thumbnail?: string | null;
    description?: string | null;
    brand?: { name?: string | null };
    category?: { name?: string | null };
    images?: { image_path: string }[];
}

interface ProductsIndexProps {
    products: ProductIndexItem[];
    search?: string;
    category?: string;
    categories: { id: number; name: string }[];
}

export default function ProductsIndex({
    products,
    search,
    category: selectedCategory,
    categories,
}: ProductsIndexProps) {
    const [query, setQuery] = useState(search ?? '');
    const [category, setCategory] = useState(selectedCategory ?? '');

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    return (
        <>
            <Head title="Product Catalog" />

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                            Katalog Produk
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Temukan produk terbaik dari brand dan kategori kami.
                        </p>
                    </div>

                    <form
                        className="flex w-full max-w-2xl flex-col gap-2 md:flex-row md:items-center md:justify-end"
                        method="get"
                        action="/products"
                    >
                        <div className="flex w-full items-center gap-2 md:max-w-xs">
                            <label htmlFor="category" className="sr-only">
                                Filter kategori
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={category}
                                onChange={handleCategoryChange}
                                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm transition outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-600 dark:focus:ring-slate-700"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label htmlFor="search" className="sr-only">
                            Cari produk
                        </label>
                        <input
                            id="search"
                            name="search"
                            value={query}
                            onChange={handleSearchChange}
                            placeholder="Cari nama produk..."
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm transition outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-600 dark:focus:ring-slate-700"
                        />
                        <button
                            type="submit"
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                        >
                            Cari
                        </button>
                    </form>
                </div>

                {products.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                        Tidak ada produk yang cocok dengan pencarian.
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {products.map((product) => {
                            const imagePath =
                                product.thumbnail ||
                                product.images?.[0]?.image_path ||
                                '/images/placeholder.svg';

                            return (
                                <article
                                    key={product.id}
                                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
                                >
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="block"
                                    >
                                        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                                            <img
                                                src={imagePath}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    </Link>
                                    <div className="space-y-3 p-5">
                                        <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
                                            <span>{product.brand?.name}</span>
                                            <span>•</span>
                                            <span>
                                                {product.category?.name}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="block"
                                        >
                                            <h2 className="text-lg font-semibold text-slate-900 transition hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-200">
                                                {product.name}
                                            </h2>
                                        </Link>
                                        <p className="line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            {product.description ??
                                                'Tidak ada deskripsi singkat.'}
                                        </p>
                                        <div className="flex items-center justify-between gap-4 pt-2">
                                            <div>
                                                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                                    Rp
                                                    {Number(
                                                        product.price,
                                                    ).toLocaleString('id-ID')}
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    Stok: {product.stock}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/products/${product.slug}`}
                                                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
