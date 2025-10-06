import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function TransactionHistory({ auth, project, transactions }) {
    const [expandedTransaction, setExpandedTransaction] = useState(null);

    const toggleTransaction = (id) => {
        setExpandedTransaction(expandedTransaction === id ? null : id);
    };

    const totalSales = transactions.reduce(
        (sum, transaction) => sum + transaction.final_amount,
        0
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    取引履歴詳細 - {project.name}
                </h2>
            }
        >
            <Head title={`取引履歴 - ${project.name}`} />

            <div className="min-h-screen bg-gray-100 py-6 px-4">
                <div className="max-w-5xl mx-auto">
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
                                    取引件数: {transactions.length}件
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-white text-opacity-90 text-sm mb-1">
                                    合計売上
                                </p>
                                <p className="text-4xl font-bold text-white">
                                    ¥{totalSales.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 戻るボタン */}
                    <div className="mb-4">
                        <Link
                            href={route("transactions.index")}
                            className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-gray-700 font-semibold"
                        >
                            ← 一覧に戻る
                        </Link>
                    </div>

                    {/* 取引一覧 */}
                    {transactions.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-500 text-lg">
                                取引履歴がありません
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {transactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden"
                                >
                                    <button
                                        onClick={() =>
                                            toggleTransaction(transaction.id)
                                        }
                                        className="w-full p-4 hover:bg-gray-50 transition text-left"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <span className="text-sm font-semibold text-gray-500">
                                                        #{transaction.id}
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
                                                        {transaction.user.name}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">
                                                            合計:
                                                        </span>
                                                        <span className="ml-2 font-bold text-blue-600">
                                                            ¥
                                                            {transaction.total_amount.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">
                                                            受取:
                                                        </span>
                                                        <span className="ml-2 font-semibold">
                                                            ¥
                                                            {transaction.received_amount.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">
                                                            お釣り:
                                                        </span>
                                                        <span className="ml-2 font-semibold">
                                                            ¥
                                                            {transaction.change_amount.toLocaleString()}
                                                        </span>
                                                    </div>
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
                                    {expandedTransaction === transaction.id && (
                                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                                            <h4 className="font-bold text-gray-800 mb-3">
                                                購入商品
                                            </h4>
                                            <div className="space-y-2">
                                                {transaction.items.map(
                                                    (item) => (
                                                        <div
                                                            key={item.id}
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
                                            <div className="mt-4 pt-3 border-t border-gray-300">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-lg font-bold text-gray-800">
                                                        合計
                                                    </span>
                                                    <span className="text-2xl font-bold text-blue-600">
                                                        ¥
                                                        {transaction.total_amount.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
