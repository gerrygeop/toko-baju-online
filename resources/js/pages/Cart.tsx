import { Head, Link } from '@inertiajs/react';
import { useMemo, type MouseEvent } from 'react';
import { useCart } from '@/Contexts/CartContext';

const SHIPPING_FEE = 20000;

export default function Cart() {
    const {
        cartItems,
        cartSubtotal,
        cartCount,
        removeFromCart,
        updateQuantity,
    } = useCart();

    const grandTotal = useMemo(
        () => cartSubtotal + SHIPPING_FEE,
        [cartSubtotal],
    );

    const hasItems = cartItems.length > 0;

    const handleDecrease = (variantId: number) => {
        const item = cartItems.find(
            (cartItem) => cartItem.id_varian === variantId,
        );

        if (!item) {
            return;
        }

        updateQuantity(variantId, Math.max(1, item.kuantitas - 1));
    };

    const handleIncrease = (variantId: number) => {
        const item = cartItems.find(
            (cartItem) => cartItem.id_varian === variantId,
        );

        if (!item) {
            return;
        }

        updateQuantity(
            variantId,
            Math.min(item.maksimal_stok_varian, item.kuantitas + 1),
        );
    };

    const handleRemove = (variantId: number) => {
        removeFromCart(variantId);
    };

    return (
        <>
            <Head title="Keranjang Belanja" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900">
                            Keranjang Belanja
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            {cartCount} item di keranjang kamu.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                        Kembali ke Katalog
                    </Link>
                </div>

                {hasItems ? (
                    <div className="grid gap-8 lg:grid-cols-[1.8fr_0.8fr]">
                        <section className="space-y-6">
                            {cartItems.map((item) => (
                                <article
                                    key={item.id_varian}
                                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                                        <img
                                            src={item.gambar}
                                            alt={item.nama_produk}
                                            className="h-32 w-full rounded-3xl object-cover object-center md:h-36 md:w-40"
                                        />

                                        <div className="flex-1 space-y-4">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <h2 className="text-lg font-semibold text-slate-900">
                                                        {item.nama_produk}
                                                    </h2>
                                                    <p className="text-sm text-slate-600">
                                                        Varian:{' '}
                                                        {item.warna ||
                                                            'Standar'}{' '}
                                                        • {item.ukuran}
                                                    </p>
                                                </div>
                                                <p className="text-lg font-semibold text-slate-900">
                                                    Rp{' '}
                                                    {item.harga.toLocaleString(
                                                        'id-ID',
                                                    )}
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDecrease(
                                                                item.id_varian,
                                                            )
                                                        }
                                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-900 transition hover:bg-slate-100"
                                                        aria-label={`Kurangi kuantitas ${item.nama_produk}`}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-3 min-w-8 text-center text-sm font-semibold text-slate-900">
                                                        {item.kuantitas}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleIncrease(
                                                                item.id_varian,
                                                            )
                                                        }
                                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-900 transition hover:bg-slate-100"
                                                        aria-label={`Tambah kuantitas ${item.nama_produk}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemove(
                                                            item.id_varian,
                                                        )
                                                    }
                                                    className="inline-flex items-center rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                                                >
                                                    Hapus
                                                </button>
                                            </div>

                                            <p className="text-sm text-slate-500">
                                                Stok tersedia:{' '}
                                                {item.maksimal_stok_varian}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </section>

                        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold text-slate-900">
                                    Ringkasan Pembayaran
                                </h2>
                                <p className="text-sm text-slate-600">
                                    Cek kembali pesanan sebelum melanjutkan
                                    checkout.
                                </p>
                            </div>

                            <div className="space-y-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>
                                        Rp{' '}
                                        {cartSubtotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Ongkos Kirim</span>
                                    <span>
                                        Rp{' '}
                                        {SHIPPING_FEE.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div className="border-t border-slate-200 pt-3 font-semibold text-slate-900">
                                    <div className="flex justify-between">
                                        <span>Grand Total</span>
                                        <span>
                                            Rp{' '}
                                            {grandTotal.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Lanjut ke Checkout
                            </Link>
                        </aside>
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Keranjang Kamu Masih Kosong
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            Tambahkan produk dulu agar kamu bisa melihat
                            ringkasan harga dan checkout.
                        </p>
                        <Link
                            href="/products"
                            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Jelajahi Produk
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
