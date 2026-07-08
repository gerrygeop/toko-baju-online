import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    useEffect,
    useMemo,
    type ChangeEvent,
    type FormEvent,
    useState,
} from 'react';
import { toast } from 'sonner';
import { type ProductTransaction } from '../../types/orders';

type PageProps = {
    flash?: {
        success?: string;
    };
};

interface OrdersPaymentProps {
    order: ProductTransaction;
}

export default function OrdersPayment({ order }: OrdersPaymentProps) {
    const page = usePage<PageProps>();
    const successMessage = page.props.flash?.success;

    const form = useForm<{ payment_proof: File | null }>({
        payment_proof: null,
    });

    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
        }
    }, [successMessage]);

    const totalAmount = useMemo(() => order.grand_total, [order.grand_total]);

    const transactionItems =
        order.transactionItems ?? order.transaction_items ?? [];

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        form.setData('payment_proof', file);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.post(`/orders/${order.id}/upload-payment`, {
            forceFormData: true,
            preserveScroll: true,
            onBefore: () => setProgress(0),
            onProgress: (event) => {
                if (!event || typeof event.total !== 'number') {
                    return;
                }
                setProgress(Math.round((event.loaded / event.total) * 100));
            },
        });
    };

    // Helper untuk badge status pesanan
    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { text: string; classes: string }> = {
            pending: {
                text: 'Menunggu Pembayaran',
                classes: 'bg-amber-50 text-amber-700 border-amber-200',
            },
            paid: {
                text: 'Pembayaran Diterima',
                classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            },
            shipping: {
                text: 'Sedang Dikirim',
                classes: 'bg-sky-50 text-sky-700 border-sky-200',
            },
            completed: {
                text: 'Selesai',
                classes: 'bg-teal-50 text-teal-700 border-teal-200',
            },
            cancelled: {
                text: 'Dibatalkan',
                classes: 'bg-rose-50 text-rose-700 border-rose-200',
            },
        };

        const config = statusMap[status] || {
            text: status,
            classes: 'bg-slate-50 text-slate-700 border-slate-200',
        };
        return (
            <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${config.classes}`}
            >
                {config.text}
            </span>
        );
    };

    return (
        <>
            <Head title={`Detail Pesanan #${order.transaction_code}`} />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Atas */}
                <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Invoice{' '}
                                <span className="font-mono text-slate-500">
                                    #{order.transaction_code}
                                </span>
                            </h1>
                            {getStatusBadge(order.status)}
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                            Dibuat pada{' '}
                            {new Date(order.created_at).toLocaleString(
                                'id-ID',
                                { dateStyle: 'long', timeStyle: 'short' },
                            )}{' '}
                            WITA
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/orders"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                            ← Kembali ke Riwayat
                        </Link>
                    </div>
                </div>

                {/* Grid Layout Utama (2 Kolom pada desktop) */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* KOLOM KIRI (Lebar: 2/3) - Status, Alur Kerja, Bukti, Detail Item */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* 1. Kondisi Alert Box Berdasarkan Status */}
                        {successMessage && (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                                {successMessage}
                            </div>
                        )}

                        {order.status === 'paid' && (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 shadow-sm">
                                <h3 className="text-base font-semibold">
                                    Pembayaran Terverifikasi
                                </h3>
                                <p className="mt-1 text-sm text-emerald-800">
                                    Terima kasih! Pembayaran Anda telah kami
                                    terima dengan sukses. Pesanan saat ini
                                    sedang disiapkan oleh tim gudang Toko
                                    Bajuqu.
                                </p>
                            </div>
                        )}

                        {order.status === 'shipping' && (
                            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sky-900 shadow-sm">
                                <h3 className="text-base font-semibold">
                                    Paket Dalam Perjalanan
                                </h3>
                                <p className="mt-1 text-sm text-sky-800">
                                    Pesanan Anda telah diserahkan ke kurir
                                    logistik. Nomor resi pelacakan pengiriman
                                    akan segera diperbarui di halaman ini.
                                </p>
                            </div>
                        )}

                        {order.status === 'completed' && (
                            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 text-teal-900 shadow-sm">
                                <h3 className="text-base font-semibold">
                                    Pesanan Telah Selesai
                                </h3>
                                <p className="mt-1 text-sm text-teal-800">
                                    Barang telah sukses sampai di tujuan. Terima
                                    kasih telah memercayakan kebutuhan belanja
                                    pakaian Anda di Toko Bajuqu!
                                </p>
                                <div className="mt-4">
                                    <Link
                                        href="/products"
                                        className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
                                    >
                                        Belanja Pakaian Lagi
                                    </Link>
                                </div>
                            </div>
                        )}

                        {order.status === 'cancelled' && (
                            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-900 shadow-sm">
                                <h3 className="text-base font-semibold">
                                    Pesanan Dibatalkan
                                </h3>
                                <p className="mt-1 text-sm text-rose-800">
                                    Transaksi ini telah dibatalkan otomatis oleh
                                    sistem atau permintaan pengguna. Silakan
                                    hubungi Customer Service kami jika ada
                                    kekeliruan.
                                </p>
                            </div>
                        )}

                        {/* 2. Form Upload Bukti Transfer (Hanya Muncul Jika Status 'pending') */}
                        {order.status === 'pending' && (
                            <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-slate-700">
                                    <p className="mb-2 font-semibold text-slate-900">
                                        Instruksi Pembayaran Transfer Bank:
                                    </p>
                                    <ol className="list-decimal space-y-2.5 pl-4 text-slate-600">
                                        <li>
                                            Transfer nominal tepat sebesar:{' '}
                                            <strong className="font-mono text-base text-slate-900">
                                                Rp{' '}
                                                {totalAmount.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </strong>
                                        </li>
                                        <li>
                                            Kirim ke rekening resmi:
                                            <div className="mt-1.5 w-fit rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900">
                                                <p className="font-bold text-blue-600">
                                                    Bank BCA
                                                </p>
                                                <p className="font-mono font-bold tracking-wide">
                                                    1234567890
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    a.n PT. Toko Bajuqu
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            Tuliskan nomor kode invoice{' '}
                                            <span className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-xs font-semibold">
                                                {order.transaction_code}
                                            </span>{' '}
                                            pada berita transfer Anda.
                                        </li>
                                    </ol>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label
                                            className="block text-sm font-semibold text-slate-700"
                                            htmlFor="payment_proof"
                                        >
                                            Unggah File Bukti Transfer
                                        </label>
                                        <input
                                            id="payment_proof"
                                            name="payment_proof"
                                            type="file"
                                            accept="image/jpeg,image/png,image/jpg"
                                            onChange={handleFileChange}
                                            className="mt-2 block w-full text-sm text-slate-900 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
                                            required
                                        />
                                        <p className="mt-1.5 text-xs text-slate-400">
                                            Format yang didukung: JPG, JPEG, PNG
                                            (Maksimal ukuran file 2MB)
                                        </p>
                                    </div>

                                    {progress > 0 && (
                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                            <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
                                                <span>
                                                    Mengunggah dokumen...
                                                </span>
                                                <span>{progress}%</span>
                                            </div>
                                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                                                <div
                                                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="inline-flex w-full justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                    >
                                        {form.processing
                                            ? 'Sedang Memproses...'
                                            : 'Kirim Bukti Pembayaran'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* 3. Daftar Produk yang Dibeli */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-4">
                                <h3 className="text-base font-semibold text-slate-900">
                                    Rincian Item Pakaian
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold tracking-wider text-slate-600 uppercase">
                                        <tr>
                                            <th className="px-5 py-3 text-left">
                                                Nama Produk
                                            </th>
                                            <th className="px-5 py-3 text-right">
                                                Harga Satuan
                                            </th>
                                            <th className="px-5 py-3 text-center">
                                                Qty
                                            </th>
                                            <th className="px-5 py-3 text-right">
                                                Subtotal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {transactionItems.map((item) => {
                                            const name =
                                                item.product?.name ??
                                                'Produk tidak tersedia';
                                            const price = Number(
                                                item.price ?? 0,
                                            );
                                            const qty = Number(
                                                item.quantity ?? 0,
                                            );
                                            const subtotal = price * qty;

                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="transition hover:bg-slate-50/50"
                                                >
                                                    <td className="px-5 py-4">
                                                        {/* Nama Utama Produk */}
                                                        <div className="text-sm font-semibold text-slate-900">
                                                            {name}
                                                        </div>

                                                        {/* Menampilkan Varian Warna & Size secara Dinamis */}
                                                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                                                            {(item
                                                                .productVariant
                                                                ?.color_name ||
                                                                item
                                                                    .product_variant
                                                                    ?.color_name) && (
                                                                <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                                                    Warna:{' '}
                                                                    {item
                                                                        .productVariant
                                                                        ?.color_name ??
                                                                        item
                                                                            .product_variant
                                                                            ?.color_name}
                                                                </span>
                                                            )}
                                                            {(item
                                                                .productVariant
                                                                ?.size ||
                                                                item
                                                                    .product_variant
                                                                    ?.size) && (
                                                                <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                                                    Ukuran:{' '}
                                                                    {item
                                                                        .productVariant
                                                                        ?.size ??
                                                                        item
                                                                            .product_variant
                                                                            ?.size}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="mt-1 font-mono text-[10px] text-slate-400">
                                                            SKU Varian:{' '}
                                                            {
                                                                item.product_variant_id
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 text-right font-mono text-slate-600">
                                                        Rp{' '}
                                                        {price.toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4 text-center font-medium text-slate-700">
                                                        {qty}
                                                    </td>
                                                    <td className="px-5 py-4 text-right font-mono font-semibold text-slate-900">
                                                        Rp{' '}
                                                        {subtotal.toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 4. Tampilan Gambar Bukti Pembayaran yang Diperbaiki */}
                        {order.payment_proof && (
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <h3 className="mb-3 border-b border-slate-100 pb-2 text-base font-semibold text-slate-900">
                                    Dokumen Bukti Pembayaran (User Upload)
                                </h3>
                                <div className="inline-block max-w-sm rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                                    {/* Diperbaiki dengan menyertakan path /storage/ */}
                                    <img
                                        src={`/storage/${order.payment_proof}`}
                                        alt="Bukti Transfer Pembayaran"
                                        className="max-h-72 w-auto rounded-lg object-contain shadow-sm"
                                        onError={(e) => {
                                            // Fallback jika ada kesalahan konfigurasi storage pada server / lokal
                                            e.currentTarget.src =
                                                'https://placehold.co/600x400?text=Gambar+Gagal+Dimuat';
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* KOLOM KANAN (Lebar: 1/3) - Informasi Alamat & Kalkulasi Invoice */}
                    <div className="space-y-6">
                        {/* Ringkasan Biaya Kuitansi */}
                        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="border-b border-slate-100 pb-2 text-base font-semibold text-slate-900">
                                Ringkasan Transaksi
                            </h3>
                            <div className="space-y-2.5 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>Total Belanja Produk</span>
                                    <span className="font-mono">
                                        Rp{' '}
                                        {Number(
                                            order.total_price ?? 0,
                                        ).toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Ongkos Kirim Kurir</span>
                                    <span className="font-mono">
                                        Rp{' '}
                                        {Number(
                                            order.shipping_cost ?? 0,
                                        ).toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
                                    <span>Grand Total</span>
                                    <span className="font-mono text-emerald-600">
                                        Rp{' '}
                                        {Number(
                                            order.grand_total ?? 0,
                                        ).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Detail Pengiriman */}
                        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="space-y-3">
                                <h3 className="border-b border-slate-100 pb-2 text-base font-semibold text-slate-900">
                                    Alamat Pengiriman
                                </h3>
                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
                                    <p className="mb-1 font-medium text-slate-800">
                                        Tujuan Pengiriman:
                                    </p>
                                    <span className="whitespace-pre-line text-slate-600">
                                        {order.shipping_address}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="border-b border-slate-100 pb-2 text-base font-semibold text-slate-900">
                                    Notes
                                </h3>
                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
                                    <p className="mb-1 font-medium text-slate-800">
                                        Catatan dari Pembeli:
                                    </p>
                                    <span className="whitespace-pre-line text-slate-600">
                                        {order.notes ??
                                            'Tidak ada catatan tambahan.'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
