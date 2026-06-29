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

            return Redirect::route('checkout.index')
                ->with('invoice_code', $transaction->transaction_code);
        } catch (\Throwable $exception) {
            return Redirect::back()->withErrors([
                'cart_items' => $exception->getMessage(),
            ]);
        }
    }
}
