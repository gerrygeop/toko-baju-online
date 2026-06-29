import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';

interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    icon?: string | null;
}

interface BrandItem {
    id: number;
    name: string;
    slug: string;
    logo?: string | null;
}

interface ProductItem {
    id: number;
    slug: string;
    name: string;
    price: string | number;
    stock: number;
    thumbnail?: string | null;
    description?: string | null;
    brand?: { name?: string | null };
    category?: { name?: string | null };
    images?: { image_path: string }[];
}

interface WelcomeProps {
    categories: CategoryItem[];
    brands: BrandItem[];
    featuredProducts: ProductItem[];
    newArrivals: ProductItem[];
}

interface PageProps extends WelcomeProps, Record<string, unknown> {
    auth: {
        user?: {
            name?: string;
        } | null;
    };
}

export default function Welcome({
    categories,
    brands,
    featuredProducts,
    newArrivals,
}: WelcomeProps) {
    const { auth } = usePage<PageProps>().props;

    const formatPrice = (value: string | number) =>
        Number(value).toLocaleString('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

    const productCard = (product: ProductItem) => {
        const imagePath =
            product.thumbnail ||
            product.images?.[0]?.image_path ||
            '/images/placeholder.svg';

        return (
            <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
            >
                <Link href={`/products/${product.slug}`} className="block">
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                        <img
                            src={imagePath}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                    </div>
                </Link>
                <div className="space-y-3 p-5">
                    <div className="flex flex-wrap gap-2 text-xs tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
                        <span>{product.brand?.name || 'Brand'}</span>
                        <span>�</span>
                        <span>{product.category?.name || 'Kategori'}</span>
                    </div>
                    <Link href={`/products/${product.slug}`} className="block">
                        <h2 className="text-lg font-semibold text-slate-900 transition hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-200">
                            {product.name}
                        </h2>
                    </Link>
                    <p className="line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {product.description ??
                            'Produk pilihan yang tersedia sekarang.'}
                    </p>
                    <div className="flex items-center justify-between gap-4 pt-2">
                        <div>
                            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                Rp{formatPrice(product.price)}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Stok: {product.stock}
                            </p>
                        </div>
                        <Link
                            href={`/products/${product.slug}`}
                            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                        >
                            Lihat
                        </Link>
                    </div>
                </div>
            </article>
        );
    };

    return (
        <>
            <Head title="Beranda" />

            <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <div className="text-lg font-semibold tracking-tight">
                            <Link
                                href="/"
                                className="text-slate-900 dark:text-slate-100"
                            >
                                Toko Bajuqu
                            </Link>
                        </div>
                        <nav className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <Link
                                href="/products"
                                className="transition hover:text-slate-900 dark:hover:text-white"
                            >
                                Produk
                            </Link>
                            <Link
                                href="/cart"
                                className="transition hover:text-slate-900 dark:hover:text-white"
                            >
                                Keranjang
                            </Link>
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={login()}
                                        className="rounded-full px-4 py-2 text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="space-y-6">
                            <div className="inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-900 dark:bg-amber-900/10 dark:text-amber-200">
                                Belanja lebih mudah, cepat, dan aman
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                                    Temukan pakaian terbaik dari brand lokal dan
                                    internasional.
                                </h1>
                                <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                    Jelajahi produk terbaru, promo populer, dan
                                    koleksi eksklusif yang selalu diperbarui
                                    untuk setiap gaya.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Link
                                    href="/products"
                                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
                                >
                                    Jelajahi Katalog
                                </Link>
                                <Link
                                    href="/cart"
                                    className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                                >
                                    Lihat Keranjang
                                </Link>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-4xl bg-slate-900 px-8 py-10 text-white shadow-xl shadow-slate-900/10 sm:px-10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.26),transparent_44%)]" />
                            <div className="relative space-y-6">
                                <div className="flex items-center gap-3 text-sm tracking-[0.28em] text-sky-200 uppercase">
                                    <span className="inline-flex h-3 w-3 rounded-full bg-cyan-300" />
                                    Produk Pilihan
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
                                        Kualitas premium untuk setiap gaya.
                                    </h2>
                                    <p className="max-w-xl leading-7 text-slate-200">
                                        Dari pakaian kasual hingga koleksi
                                        formal, kami kurasi produk terbaik untuk
                                        kenyamanan dan penampilan Anda.
                                    </p>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl bg-slate-800/70 p-5 ring-1 ring-white/10">
                                        <p className="text-sm tracking-[0.22em] text-slate-400 uppercase">
                                            Fast delivery
                                        </p>
                                        <p className="mt-3 text-lg font-semibold text-white">
                                            Pengiriman cepat ke seluruh kota
                                        </p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-800/70 p-5 ring-1 ring-white/10">
                                        <p className="text-sm tracking-[0.22em] text-slate-400 uppercase">
                                            Secure checkout
                                        </p>
                                        <p className="mt-3 text-lg font-semibold text-white">
                                            Transaksi nyaman dan aman
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-16 space-y-8">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold tracking-[0.24em] text-slate-500 uppercase dark:text-slate-400">
                                    Kategori Populer
                                </p>
                                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                    Cari berdasarkan kategori
                                </h2>
                            </div>
                            <Link
                                href="/products"
                                className="text-sm font-semibold text-slate-900 transition hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300"
                            >
                                Lihat semua produk ?
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
                                    >
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                                            {category.icon ??
                                                category.name.slice(0, 1)}
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                            {category.name}
                                        </h3>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 sm:col-span-6 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                                    Kategori populer akan muncul di sini saat
                                    tersedia.
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="mt-16 space-y-8">
                        <div className="space-y-3">
                            <p className="text-sm font-semibold tracking-[0.24em] text-slate-500 uppercase dark:text-slate-400">
                                Produk Unggulan
                            </p>
                            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                Pilihan terbaik untuk Anda
                            </h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {featuredProducts.length > 0 ? (
                                featuredProducts.map(productCard)
                            ) : (
                                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500 sm:col-span-3 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                                    Produk unggulan belum tersedia.
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="mt-16 space-y-8">
                        <div className="space-y-3">
                            <p className="text-sm font-semibold tracking-[0.24em] text-slate-500 uppercase dark:text-slate-400">
                                Koleksi Terbaru
                            </p>
                            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                Temukan produk baru setiap minggu
                            </h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {newArrivals.length > 0 ? (
                                newArrivals.map(productCard)
                            ) : (
                                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500 sm:col-span-3 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                                    Belum ada produk baru saat ini.
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="mt-16 rounded-4xl border border-slate-200 bg-white p-8 sm:p-10 dark:border-slate-800 dark:bg-slate-950">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-sm font-semibold tracking-[0.24em] text-slate-500 uppercase dark:text-slate-400">
                                    Brand Terpercaya
                                </p>
                                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                    Brand populer di toko kami
                                </h2>
                                <p className="mt-3 text-slate-600 dark:text-slate-300">
                                    Koleksi dari brand yang paling dicari
                                    pelanggan kami saat ini.
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
                            {brands.length > 0 ? (
                                brands.map((brand) => (
                                    <div
                                        key={brand.id}
                                        className="flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                                    >
                                        {brand.logo ? (
                                            <img
                                                src={brand.logo}
                                                alt={brand.name}
                                                className="max-h-10 object-contain"
                                            />
                                        ) : (
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                {brand.name}
                                            </span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 sm:col-span-8 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                                    Brand ternama akan muncul di sini ketika
                                    tersedia.
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
