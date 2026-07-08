<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCheckoutRequest;
use App\Services\CheckoutServiceInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function __construct(private CheckoutServiceInterface $checkoutService) {}

    public function index(): Response
    {
        return Inertia::render('Checkout');
    }

    public function store(StoreCheckoutRequest $request): RedirectResponse
    {
        try {
            $transaction = $this->checkoutService->execute(
                $request->validated(),
                $request->user()->id,
            );

            return Redirect::route('orders.payment', [
                'transaction_code' => $transaction->transaction_code,
            ])->with('success', 'Pesanan berhasil dibuat! Silakan lakukan transfer.');
        } catch (\Throwable $exception) {
            return Redirect::back()->withErrors([
                'cart_items' => $exception->getMessage(),
            ]);
        }
    }
}
