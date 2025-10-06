<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
       'project_id',
        'user_id',
        'total_amount',
        'discount_amount',
        'final_amount',
        'received_amount',
        'change_amount',
        'coupon_count',
        'status',
    ];

    protected $casts = [
        'transaction_date' => 'datetime',
    ];

    protected $attributes = [
        'status' => '完了',  // デフォルト値
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }
}