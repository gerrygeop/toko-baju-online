<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum ProductTransactionStatus: string implements HasLabel, HasColor
{
    case Pending = 'pending';
    case Paid = 'paid';
    case Shipping = 'shipping';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::Pending => 'Menunggu Pembayaran',
            self::Paid => 'Sudah Bayar',
            self::Shipping => 'Sedang Dikirim',
            self::Completed => 'Selesai',
            self::Cancelled => 'Dibatalkan',
        };
    }

    public function getColor(): string | array | null
    {
        return match ($this) {
            self::Pending => 'warning',
            self::Paid => 'success',
            self::Shipping => 'info',
            self::Completed => 'success',
            self::Cancelled => 'danger',
        };
    }
}
