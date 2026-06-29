<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('transaction_code')->unique();

            // Kolom Keuangan yang disederhanakan
            $table->unsignedBigInteger('total_price');    // Total harga semua item baju
            $table->unsignedBigInteger('shipping_cost');   // Ongkos kirim
            $table->unsignedBigInteger('grand_total');     // total_price + shipping_cost

            // Informasi Pengiriman & Pembayaran
            $table->text('shipping_address');
            $table->string('payment_method');
            $table->string('payment_proof')->nullable();   // Bukti transfer manual

            // Status & Catatan
            $table->string('status')->default('pending');  // pending, paid, shipping, completed, cancelled
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_transactions');
    }
};
