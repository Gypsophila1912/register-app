<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'name',
        'price',
    ];
    public function project()
    {
        return $this->belongsTo(User::class);
    }
}
