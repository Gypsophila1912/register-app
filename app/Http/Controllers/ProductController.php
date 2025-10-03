<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * 商品登録ページを表示
     */
    public function create(Project $project)
    {
        // プロジェクトと既存の商品を取得
        $products = $project->products;
        
        return Inertia::render('Original/ProjectSettings', [
            'project' => $project,
            'products' => $products,
        ]);
    }

    /**
     * 商品を保存
     */
    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
        ]);

        $project->products()->create([
            'name' => $validated['name'],
            'price' => $validated['price'],
        ]);

        return back()->with('success', '商品を登録しました！');
    }

    /**
     * 商品を削除
     */
    public function destroy(Product $product)
    {
        $product->delete();
        
        return back()->with('success', '商品を削除しました。');
    }
}