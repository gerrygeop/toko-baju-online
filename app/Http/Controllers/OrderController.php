<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadPaymentProofRequest;
use App\Services\OrderServiceInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function __construct(private OrderServiceInterface $orderService) {}

    public function index(): Response
    {
        $orders = $this->orderService->getOrderHistory(auth()->id());

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function payment(string $transaction_code): Response
    {
        $order = $this->orderService->getOrderByTransactionCode($transaction_code, auth()->id());

        abort_unless($order, 404);

        return Inertia::render('Orders/Payment', [
            'order' => $order,
        ]);
    }

    public function uploadPaymentProof(UploadPaymentProofRequest $request, int $id): RedirectResponse
    {
        $this->orderService->uploadPaymentProof($id, $request->validated());

        return Redirect::route('orders.index')->with('success', 'Bukti pembayaran berhasil diunggah.');
    }
}
