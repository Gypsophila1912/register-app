<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Transaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        return Inertia::render('Original/Transaction');
    }
    
    public function create(Request $request, Project $project)
    {
        $cart = $request->input('cart', []);

        return Inertia::render('Original/Accounting', [
            'project' => $project,
            'cart' => $cart,
        ]);
    }

    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'total_amount' => 'required|integer|min:0',
            'received_amount' => 'required|integer|min:0',
            'change_amount' => 'required|integer|min:0',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|integer|min:0',
            'items.*.name' => 'required|string',
        ]);

        DB::transaction(function () use ($validated, $project, $request) {
            // 取引を作成
            $transaction = Transaction::create([
                'project_id' => $project->id,
                'user_id' => auth()->id(),
                'total_amount' => $validated['total_amount'],
                'received_amount' => $validated['received_amount'],
                'change_amount' => $validated['change_amount'],
            ]);

            // 取引明細を作成
            foreach ($validated['items'] as $item) {
                $transaction->items()->create([
                    'product_id' => $item['product_id'],
                    'product_name' => $item['name'],
                    'product_price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'subtotal' => $item['price'] * $item['quantity'],
                ]);
            }
        });

    return redirect()->route('products.show', [
        'project' => $project->id,
        'checkout_success' => 'true'  // パラメータ追加
    ])->with('success', '会計が完了しました！');
    }
}