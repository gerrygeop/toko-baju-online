import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, type ChangeEvent, useState } from 'react';
import { type ProductTransaction } from '../../types/orders';

interface OrdersPaymentProps {
    order: ProductTransaction;
}

export default function OrdersPayment({ order }: OrdersPaymentProps) {
    const page = usePage<any>();
    const form = useForm({
        payment_proof: null as File | null,
    });
    const [progress, setProgress] = useState(0);
    const successMessage = page.props.flash?.success as string | undefined;

    const totalAmount = useMemo(() => order.grand_total, [order.grand_total]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        form.setData('payment_proof', file);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.post(`/orders/${order.id}/upload-payment`, {
            forceFormData: true,
            preserveScroll: true,
            onBefore: () => setProgress(0),
            onProgress: (event) => {
                if (!event || !event.total) {
                    return;
                }

                setProgress(Math.round((event.loaded / event.total) * 100));
            },
        });
    };

    return (
        <>
            <Head title="Upload Bukti Pembayaran" />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Upload Bukti Transfer
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Silakan unggah bukti transfer untuk menyelesaikan
                        pembayaran.
                    </p>
                </div>

                <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="space-y-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                        <p className="font-semibold text-slate-900">
                            Instruksi Transfer
                        </p>
                        <ol className="list-decimal space-y-2 pl-5">
                            <li>
                                Transfer sejumlah Rp{' '}
                                {totalAmount.toLocaleString('id-ID')}.
                            </li>
                            <li>
                                Gunakan nomor invoice berikut sebagai keterangan
                                pembayaran:
                            </li>
                            <li className="font-semibold text-slate-900">
                                {order.transaction_code}
                            </li>
                            <li>
                                Unggah bukti transfer dalam format JPEG/PNG dan
                                ukuran maksimal 2MB.
                            </li>
                        </ol>
                    </div>

                    {successMessage && (
                        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                className="block text-sm font-medium text-slate-700"
                                htmlFor="payment_proof"
                            >
                                Bukti Transfer
                            </label>
                            <input
                                id="payment_proof"
                                name="payment_proof"
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                onChange={handleFileChange}
                                className="mt-2 block w-full text-sm text-slate-900 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:text-white"
                            />
                        </div>

                        {progress > 0 && (
                            <div className="rounded-3xl bg-slate-100 p-3">
                                <div className="mb-1 text-sm text-slate-600">
                                    Upload progress: {progress}%
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                    <div
                                        className="h-full rounded-full bg-slate-900"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <Link
                                href="/orders"
                                className="inline-flex rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Kembali ke Riwayat
                            </Link>
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Unggah Bukti Pembayaran
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
