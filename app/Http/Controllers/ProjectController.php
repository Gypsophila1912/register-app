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
            'color' => 'required|string|regex:/^#[0-9A-Fa-f]{6}$/',
        ]);

        // リレーション経由で保存
        $project = $request->user()->projects()->create($validated);

        return redirect()->route('products.create', ['project' => $project->id])
        ->with('success', 'プロジェクトを作成しました！商品を登録してください。');
    }

    public function show($id)
    {
        $project = auth()->user()->projects()->findOrFail($id);

        return Inertia::render('Original/Project', [
            'project' => $project,
        ]);
    }
}
