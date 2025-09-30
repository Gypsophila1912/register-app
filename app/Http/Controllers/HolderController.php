<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HolderController extends Controller
{
    public function show()
    {
        return Inertia::render('Original/HolderList');
    }
}
