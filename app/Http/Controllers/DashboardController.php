<?php

namespace App\Http\Controllers;

use App\Enums\ProductTransactionStatus;
use App\Models\ProductTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $recentOrders = ProductTransaction::query()
            ->where('user_id', $user->id)
            ->with(['transactionItems.product'])
            ->orderByDesc('created_at')
            ->limit(3)
            ->get([
                'id',
                'transaction_code',
                'total_price',
                'shipping_cost',
                'grand_total',
                'shipping_address',
                'status',
                'created_at',
                'user_id',
            ]);

        $totals = [
            'totalTransactions' => ProductTransaction::query()
                ->where('user_id', $user->id)
                ->count('*'),
            'pendingOrders' => ProductTransaction::query()
                ->where('user_id', $user->id)
                ->where('status', ProductTransactionStatus::Pending)
                ->count('*'),
            'totalSpent' => ProductTransaction::query()
                ->where('user_id', $user->id)
                ->sum('grand_total'),
        ];

        return Inertia::render('dashboard', [
            'user' => $user,
            'totals' => $totals,
            'recentOrders' => $recentOrders,
        ]);
    }
}
