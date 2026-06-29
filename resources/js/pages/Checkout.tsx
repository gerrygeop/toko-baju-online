import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, type FormEvent } from 'react';
import { useCart } from '@/Contexts/CartContext';

interface CheckoutFormData {
    shipping_address: string;
    notes?: string;
    cart_items: Array<{
        product_id: number;
        product_variant_id: number;
        quantity: number;
    }>;
}

export default function Checkout() {
    const page = usePage<any>();
    const { cartItems, clearCart } = useCart();

    const form = useForm<CheckoutFormData>({
        shipping_address: '',
        notes: '',
        cart_items: cartItems.map((item) => ({
            product_id: item.id_produk,
            product_variant_id: item.id_varian,
            quantity: item.kuantitas,
        })),
    });

    const errors = page.props.errors as
        | Record<string, string>
        | Record<string, string[]>;
    const invoiceCode = page.props.flash?.invoice_code as string | undefined;

    useEffect(() => {
        form.setData(
            'cart_items',
            cartItems.map((item) => ({
                product_id: item.id_produk,
                product_variant_id: item.id_varian,
                quantity: item.kuantitas,
            })),
        );
    }, [cartItems, form]);

    useEffect(() => {
        if (invoiceCode && cartItems.length > 0) {
            clearCart();
            form.setData('cart_items', []);
        }
    }, [invoiceCode, cartItems.length, clearCart, form]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.post('/checkout', {
            onSuccess: () => {
                clearCart();
            },
        });
    };

    return (
        <>
            <Head title="Checkout" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Checkout
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Isi alamat pengiriman dan selesaikan pemesanan kamu.
                    </p>
                </div>

                {invoiceCode ? (
                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 shadow-sm">
                        <h2 className="text-lg font-semibold">
                            Pesanan Berhasil
                        </h2>
                        <p className="mt-2 text-sm">
                            Transaksi berhasil dibuat dengan kode invoice:
                        </p>
                        <p className="mt-3 rounded-2xl bg-white p-4 font-semibold text-slate-900 shadow-sm">
                            {invoiceCode}
                        </p>
                        <Link
                            href="/products"
                            className="mt-4 inline-flex rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Kembali ke Katalog
                        </Link>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div>
                            <label
                                className="block text-sm font-medium text-slate-700"
                                htmlFor="shipping_address"
                            >
                                Alamat Pengiriman
                            </label>
                            <textarea
                                id="shipping_address"
                                value={form.data.shipping_address}
                                onChange={(event) =>
                                    form.setData(
                                        'shipping_address',
                                        event.target.value,
                                    )
                                }
                                className="mt-2 block w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 focus:outline-none"
                                rows={5}
                                required
                            />
                            {errors.shipping_address && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.shipping_address}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                className="block text-sm font-medium text-slate-700"
                                htmlFor="notes"
                            >
                                Catatan Pesanan (opsional)
                            </label>
                            <textarea
                                id="notes"
                                value={form.data.notes}
                                onChange={(event) =>
                                    form.setData('notes', event.target.value)
                                }
                                className="mt-2 block w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 focus:outline-none"
                                rows={3}
                            />
                            {errors.notes && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.notes}
                                </p>
                            )}
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm text-slate-700">
                                Data keranjang akan divalidasi di server.
                                Pastikan hanya produk yang tersedia ditambahkan.
                            </p>
                        </div>

                        {errors.cart_items && (
                            <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                {errors.cart_items}
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-4">
                            <Link
                                href="/cart"
                                className="inline-flex rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Kembali ke Keranjang
                            </Link>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Bayar Sekarang
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
