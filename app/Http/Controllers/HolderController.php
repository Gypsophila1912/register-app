<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HolderController extends Controller
{
    /**
     * プロジェクトの保留取引一覧を表示
     */
    public function show(Project $project)
    {
        $pendingTransactions = Transaction::with(['items', 'user'])
            ->where('project_id', $project->id)
            ->where('status', '保留')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'created_at' => $transaction->created_at,
                    'total_amount' => $transaction->total_amount,
                    'discount_amount' => $transaction->discount_amount,
                    'final_amount' => $transaction->final_amount,
                    'coupon_count' => $transaction->coupon_count,
                    'user' => [
                        'name' => $transaction->user->name,
                    ],
                    'items' => $transaction->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'product_name' => $item->product_name,
                            'product_price' => $item->product_price,  // カラム名を確認
                            'quantity' => $item->quantity,
                            'subtotal' => $item->price * $item->quantity,
                        ];
                    }),
                ];
            });

        return Inertia::render('Original/HolderList', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'color' => $project->color,
            ],
            'pendingTransactions' => $pendingTransactions,
        ]);
    }

    /**
     * 保留取引を完了にする
     */
    public function complete(Project $project, Transaction $transaction)
    {
        // プロジェクトの取引であることを確認
        if ($transaction->project_id !== $project->id) {
            abort(403);
        }

        $transaction->update([
            'status' => '完了',
        ]);

        return redirect()->route('holder.show', $project->id)
            ->with('success', '取引を完了しました');
    }

    /**
     * 保留取引をキャンセルする
     */
    public function cancel(Project $project, Transaction $transaction)
    {
        // プロジェクトの取引であることを確認
        if ($transaction->project_id !== $project->id) {
            abort(403);
        }

        $transaction->update([
            'status' => 'キャンセル',
        ]);

        return redirect()->route('holder.show', $project->id)
            ->with('success', '取引をキャンセルしました');
    }
}