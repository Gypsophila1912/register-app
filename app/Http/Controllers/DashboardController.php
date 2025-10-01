<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function show()
    {
        $projects = auth()->user()->projects()
                    ->orderBy('year', 'asc')
                    ->get();
        return Inertia::render('Dashboard', compact('projects'));
    }
}
