import { Head, Link } from '@inertiajs/react';
import type { Auth } from '@/types/auth';
import type { ProductTransaction } from '@/types/orders';
import { dashboard } from '@/routes';

type DashboardProps = {
    user: Auth['user'];
    totals: {
        totalTransactions: number;
        pendingOrders: number;
        totalSpent: number;
    };
    recentOrders: ProductTransaction[];
};

const statusStyles: Record<ProductTransaction['status'], string> = {
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-emerald-100 text-emerald-700',
    shipping: 'bg-sky-100 text-sky-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-rose-100 text-rose-700',
};

export default function Dashboard({
    user,
    totals,
    recentOrders,
}: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                                Selamat datang,
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                                {user.name}
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                                Ringkasan aktivitas belanja kamu dan pesanan
                                terbaru untuk mempercepat checkout selanjutnya.
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Lanjut Belanja
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                        <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                            Total Transaksi
                        </p>
                        <p className="mt-4 text-3xl font-semibold text-slate-900">
                            {totals.totalTransactions}
                        </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                        <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                            Pesanan Pending
                        </p>
                        <p className="mt-4 text-3xl font-semibold text-slate-900">
                            {totals.pendingOrders}
                        </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                        <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                            Total Pengeluaran
                        </p>
                        <p className="mt-4 text-3xl font-semibold text-slate-900">
                            Rp {totals.totalSpent.toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                Riwayat Belanja Terbaru
                            </h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Transaksi terakhir kamu dengan status dan total.
                            </p>
                        </div>
                        <Link
                            href="/orders"
                            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            Lihat Semua Pesanan
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                            <thead className="bg-slate-50 text-slate-600">
                                <tr>
                                    <th className="px-6 py-4 font-semibold tracking-[0.16em] uppercase">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-4 font-semibold tracking-[0.16em] uppercase">
                                        Invoice
                                    </th>
                                    <th className="px-6 py-4 font-semibold tracking-[0.16em] uppercase">
                                        Total
                                    </th>
                                    <th className="px-6 py-4 font-semibold tracking-[0.16em] uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 font-semibold tracking-[0.16em] uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                                {recentOrders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center text-sm text-slate-500"
                                        >
                                            Belum ada riwayat transaksi. Belanja
                                            sekarang!
                                        </td>
                                    </tr>
                                ) : (
                                    recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4">
                                                {new Date(
                                                    order.created_at,
                                                ).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {order.transaction_code}
                                            </td>
                                            <td className="px-6 py-4">
                                                Rp{' '}
                                                {order.grand_total.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={`/orders/${order.transaction_code}/payment`}
                                                    className="inline-flex rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                                                >
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
