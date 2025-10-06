<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\HolderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;


Route::get('/', [DashboardController::class, 'show'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    //プロフィール関連
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // プロジェクト関連
    Route::get('/project/create', [ProjectController::class, 'create'])->name('project.create');
    Route::post('/project/store', [ProjectController::class, 'store'])->name('project.store');
    Route::get('/project/{id}', [ProjectController::class, 'show'])->name('project.show');
    // 商品関連
    Route::get('/projects/{project}/products', [ProductController::class, 'show'])->name('products.show');
    Route::get('/projects/{project}/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/projects/{project}/products', [ProductController::class, 'store'])->name('products.store');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
    // 会計画面
    Route::post('/projects/{project}/checkout', [TransactionController::class, 'create'])->name('checkout.create');
    Route::post('/projects/{project}/checkout/complete', [TransactionController::class, 'store'])->name('checkout.store');
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/{project}', [TransactionController::class, 'show'])->name('transactions.show');

    // 保留者関連
    Route::get('/projects/{project}/holder', [HolderController::class, 'show'])->name('holder.show');
    Route::post('/projects/{project}/Holder/{transaction}/complete', [HolderController::class, 'complete'])->name('holder.complete');
    
    // 保留取引のキャンセル
    Route::post('/projects/{project}/Holder/{transaction}/cancel', [HolderController::class, 'cancel'])->name('holder.cancel');


});

require __DIR__.'/auth.php';
