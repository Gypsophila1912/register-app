import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function PendingTransactions({
    auth,
    project,
    pendingTransactions,
}) {
    const [expandedTransaction, setExpandedTransaction] = useState(null);

    const toggleTransaction = (id) => {
        setExpandedTransaction(expandedTransaction === id ? null : id);
    };

    const handleComplete = (transactionId) => {
        if (confirm("この取引を完了にしますか？")) {
            router.post(
                route("holder.complete", {
                    project: project.id,
                    transaction: transactionId,
                })
            );
        }
    };

    const handleCancel = (transactionId) => {
        if (confirm("この取引をキャンセルしますか？")) {
            router.post(
                route("holder.cancel", {
                    project: project.id,
                    transaction: transactionId,
                })
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    保留者リスト - {project.name}
                </h2>
            }
        >
            <Head title={`保留者リスト - ${project.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* プロジェクト情報 */}
                            <div
                                className="mb-6 p-6 rounded-lg shadow-md"
                                style={{ backgroundColor: project.color }}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-2">
                                            {project.name}
                                        </h1>
                                        <p className="text-white text-opacity-90">
                                            保留中: {pendingTransactions.length}
                                            件
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white text-opacity-90 text-sm mb-1">
                                            保留金額合計
                                        </p>
                                        <p className="text-4xl font-bold text-white">
                                            ¥
                                            {pendingTransactions
                                                .reduce(
                                                    (sum, t) =>
                                                        sum + t.final_amount,
                                                    0
                                                )
                                                .toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 戻るボタン */}
                            <div className="mb-4">
                                <Link
                                    href={route("products.show", project.id)}
                                    className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-gray-700 font-semibold"
                                >
                                    ← プロジェクトに戻る
                                </Link>
                            </div>

                            {/* 保留取引一覧 */}
                            {pendingTransactions.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                    <p className="text-gray-500 text-lg">
                                        保留中の取引はありません
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {pendingTransactions.map((transaction) => (
                                        <div
                                            key={transaction.id}
                                            className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-orange-500"
                                        >
                                            <button
                                                onClick={() =>
                                                    toggleTransaction(
                                                        transaction.id
                                                    )
                                                }
                                                className="w-full p-4 hover:bg-gray-50 transition text-left"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-4 mb-2">
                                                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-bold rounded">
                                                                保留中
                                                            </span>
                                                            <span className="text-sm font-semibold text-gray-500">
                                                                #
                                                                {transaction.id}
                                                            </span>
                                                            <span className="text-sm text-gray-600">
                                                                {new Date(
                                                                    transaction.created_at
                                                                ).toLocaleString(
                                                                    "ja-JP",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "2-digit",
                                                                        day: "2-digit",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    }
                                                                )}
                                                            </span>
                                                            <span className="text-sm text-gray-600">
                                                                担当:{" "}
                                                                {
                                                                    transaction
                                                                        .user
                                                                        .name
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-gray-600">
                                                                    請求額:
                                                                </span>
                                                                <span className="ml-2 font-bold text-orange-600 text-lg">
                                                                    ¥
                                                                    {transaction.final_amount.toLocaleString()}
                                                                </span>
                                                            </div>
                                                            {transaction.discount_amount >
                                                                0 && (
                                                                <div>
                                                                    <span className="text-gray-600">
                                                                        割引:
                                                                    </span>
                                                                    <span className="ml-2 font-semibold text-red-600">
                                                                        -¥
                                                                        {transaction.discount_amount.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <svg
                                                            className={`w-6 h-6 text-gray-400 transition-transform ${
                                                                expandedTransaction ===
                                                                transaction.id
                                                                    ? "rotate-180"
                                                                    : ""
                                                            }`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 9l-7 7-7-7"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </button>

                                            {/* 取引詳細（展開時） */}
                                            {expandedTransaction ===
                                                transaction.id && (
                                                <div className="border-t border-gray-200 p-4 bg-gray-50">
                                                    <h4 className="font-bold text-gray-800 mb-3">
                                                        購入商品
                                                    </h4>
                                                    <div className="space-y-2 mb-4">
                                                        {transaction.items.map(
                                                            (item) => (
                                                                <div
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="flex justify-between items-center py-2 px-3 bg-white rounded border border-gray-200"
                                                                >
                                                                    <div className="flex-1">
                                                                        <p className="font-semibold text-gray-800">
                                                                            {
                                                                                item.product_name
                                                                            }
                                                                        </p>
                                                                        <p className="text-sm text-gray-600">
                                                                            ¥
                                                                            {item.product_price.toLocaleString()}{" "}
                                                                            ×{" "}
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <p className="text-lg font-bold text-blue-600">
                                                                        ¥
                                                                        {item.subtotal.toLocaleString()}
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>

                                                    <div className="pt-3 border-t border-gray-300 mb-4">
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-700">
                                                                    小計
                                                                </span>
                                                                <span className="font-semibold">
                                                                    ¥
                                                                    {transaction.total_amount.toLocaleString()}
                                                                </span>
                                                            </div>
                                                            {transaction.discount_amount >
                                                                0 && (
                                                                <div className="flex justify-between items-center text-red-600">
                                                                    <span>
                                                                        割引 (
                                                                        {
                                                                            transaction.coupon_count
                                                                        }
                                                                        枚)
                                                                    </span>
                                                                    <span className="font-semibold">
                                                                        -¥
                                                                        {transaction.discount_amount.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div className="flex justify-between items-center pt-2 border-t">
                                                                <span className="text-lg font-bold text-gray-800">
                                                                    請求額
                                                                </span>
                                                                <span className="text-2xl font-bold text-orange-600">
                                                                    ¥
                                                                    {transaction.final_amount.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* アクションボタン */}
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() =>
                                                                handleComplete(
                                                                    transaction.id
                                                                )
                                                            }
                                                            className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
                                                        >
                                                            精算完了
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleCancel(
                                                                    transaction.id
                                                                )
                                                            }
                                                            className="flex-1 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition"
                                                        >
                                                            キャンセル
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
