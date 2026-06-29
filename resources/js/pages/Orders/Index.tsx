import { Head, Link } from '@inertiajs/react';
import { type ProductTransaction } from '../../types/orders';

interface OrdersIndexProps {
    orders: ProductTransaction[];
}

export default function OrdersIndex({ orders }: OrdersIndexProps) {
    return (
        <>
            <Head title="Riwayat Pesanan" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900">
                            Riwayat Pesanan
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Lihat status pesanan dan unggah bukti transfer untuk
                            pesanan pending.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">
                                        Invoice
                                    </p>
                                    <p className="text-lg font-semibold text-slate-900">
                                        {order.transaction_code}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        {order.created_at}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">
                                    {order.status}
                                </div>
                            </div>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                                    <p className="font-semibold text-slate-900">
                                        Total
                                    </p>
                                    <p>
                                        Rp{' '}
                                        {order.grand_total.toLocaleString(
                                            'id-ID',
                                        )}
                                    </p>
                                </div>
                                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                                    <p className="font-semibold text-slate-900">
                                        Alamat
                                    </p>
                                    <p>{order.shipping_address}</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <p className="text-sm font-semibold text-slate-900">
                                    Rincian Produk
                                </p>
                                <div className="space-y-3">
                                    {order.transactionItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-3xl border border-slate-200 bg-white p-4"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {item.product?.name ??
                                                            'Produk tidak tersedia'}
                                                    </p>
                                                    <p className="text-sm text-slate-600">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    Rp{' '}
                                                    {item.price.toLocaleString(
                                                        'id-ID',
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {order.status === 'pending' && (
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link
                                        href={`/orders/${order.transaction_code}/payment`}
                                        className="inline-flex rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Bayar Sekarang
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
