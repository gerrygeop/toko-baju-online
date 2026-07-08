import { Head, Link } from '@inertiajs/react';
import { type ProductTransaction } from '../../types/orders';

interface OrdersIndexProps {
    orders: ProductTransaction[];
}

const statusStyles: Record<ProductTransaction['status'], string> = {
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-emerald-100 text-emerald-700',
    shipping: 'bg-sky-100 text-sky-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-rose-100 text-rose-700',
};

const formatCurrency = (value: number | undefined | null) =>
    `Rp ${Number(value ?? 0).toLocaleString('id-ID')}`;

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
                        <p className="mt-2 max-w-2xl text-sm text-slate-600">
                            Lihat status pesanan dan unggah bukti transfer untuk
                            pesanan yang masih pending.
                        </p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-700">
                        <p className="text-sm tracking-[0.24em] text-slate-500 uppercase">
                            Riwayat kosong
                        </p>
                        <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                            Belum ada pesanan
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
                            Mulai belanja sekarang untuk membuat pesanan pertama
                            Anda. Semua pesanan akan tampil di halaman ini.
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/products"
                                className="inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Mulai Belanja Now
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-[0.12em] text-slate-500 uppercase">
                                            Kode Invoice
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-[0.12em] text-slate-500 uppercase">
                                            Tanggal Pesanan
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-[0.12em] text-slate-500 uppercase">
                                            Total Belanja
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold tracking-[0.12em] text-slate-500 uppercase">
                                            Status Pesanan
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold tracking-[0.12em] text-slate-500 uppercase">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {orders.map((order) => {
                                        const statusLabel =
                                            typeof order.status === 'string'
                                                ? order.status
                                                : String(order.status);

                                        return (
                                            <tr
                                                key={order.id}
                                                className="hover:bg-slate-50"
                                            >
                                                <td className="px-6 py-5 font-mono text-sm font-semibold whitespace-nowrap text-slate-900">
                                                    {order.transaction_code ??
                                                        '-'}
                                                </td>
                                                <td className="px-6 py-5 text-sm whitespace-nowrap text-slate-500">
                                                    {order.created_at ?? '-'}
                                                </td>
                                                <td className="px-6 py-5 text-sm whitespace-nowrap text-slate-900">
                                                    {formatCurrency(
                                                        order.grand_total,
                                                    )}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[order.status] ?? 'bg-slate-100 text-slate-800'}`}
                                                    >
                                                        {statusLabel}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right whitespace-nowrap">
                                                    <Link
                                                        href={`/orders/${order.transaction_code}/payment`}
                                                        className="inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                                                    >
                                                        {order.status ===
                                                        'pending'
                                                            ? 'Bayar Sekarang'
                                                            : 'Lihat Detail'}
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-4 md:hidden">
                            {orders.map((order) => {
                                const statusLabel =
                                    typeof order.status === 'string'
                                        ? order.status
                                        : String(order.status);

                                return (
                                    <div
                                        key={order.id}
                                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500">
                                                    Invoice
                                                </p>
                                                <p className="mt-1 text-lg font-semibold text-slate-900">
                                                    {order.transaction_code ??
                                                        '-'}
                                                </p>
                                                <p className="mt-2 text-sm text-slate-500">
                                                    {order.created_at ?? '-'}
                                                </p>
                                            </div>
                                            <span
                                                className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status] ?? 'bg-slate-100 text-slate-800'}`}
                                            >
                                                {statusLabel}
                                            </span>
                                        </div>

                                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                                                <p className="font-semibold text-slate-900">
                                                    Total
                                                </p>
                                                <p className="mt-2 text-slate-900">
                                                    {formatCurrency(
                                                        order.grand_total,
                                                    )}
                                                </p>
                                            </div>
                                            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                                                <p className="font-semibold text-slate-900">
                                                    Alamat
                                                </p>
                                                <p className="mt-2 text-slate-600">
                                                    {order.shipping_address ??
                                                        '-'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex justify-end">
                                            <Link
                                                href={`/orders/${order.transaction_code}/payment`}
                                                className="inline-flex rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                            >
                                                {order.status === 'pending'
                                                    ? 'Bayar Sekarang'
                                                    : 'Lihat Detail'}
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
