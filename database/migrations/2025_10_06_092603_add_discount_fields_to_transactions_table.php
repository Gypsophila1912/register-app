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
        Schema::table('transactions', function (Blueprint $table) {
            $table->integer('discount_amount')->default(0)->after('total_amount');
            $table->integer('final_amount')->after('discount_amount');
            $table->integer('coupon_count')->default(0)->after('change_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['discount_amount', 'final_amount', 'coupon_count']);
        });
    }
};