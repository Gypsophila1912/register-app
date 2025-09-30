<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function create()
    {
        return Inertia::render('Original/CreateProject');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|digits:4|integer',
            'type' => 'required|in:屋台,展示',
            'description' => 'nullable|string',
        ]);

        // リレーション経由で保存
        $request->user()->projects()->create($validated);

        return redirect()->route('dashboard')
            ->with('success', 'プロジェクトを作成しました！');
    }
}
