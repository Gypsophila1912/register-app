import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Transaction({ auth, projectTransactions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    取引履歴
                </h2>
            }
        >
            <Head title="取引履歴" />

            <div className="min-h-screen bg-gray-100 py-6 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            プロジェクト別取引履歴
                        </h1>
                        <p className="text-gray-600 mt-1">
                            プロジェクトをクリックして詳細を表示
                        </p>
                    </div>

                    {projectTransactions.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-500 text-lg">
                                取引履歴がありません
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {projectTransactions.map((projectData) => (
                                <Link
                                    key={projectData.project.id}
                                    href={route(
                                        "transactions.show",
                                        projectData.project.id
                                    )}
                                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-16 h-16 rounded-lg flex items-center justify-center"
                                                    style={{
                                                        backgroundColor:
                                                            projectData.project
                                                                .color,
                                                    }}
                                                >
                                                    <span className="text-white text-2xl font-bold">
                                                        {projectData.project.name.charAt(
                                                            0
                                                        )}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800">
                                                        {
                                                            projectData.project
                                                                .name
                                                        }
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        取引件数:{" "}
                                                        {
                                                            projectData.transaction_count
                                                        }
                                                        件
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600 mb-1">
                                                    合計売上
                                                </p>
                                                <p className="text-3xl font-bold text-blue-600">
                                                    ¥
                                                    {projectData.total_sales.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">
                                                    総受取金額
                                                </p>
                                                <p className="text-lg font-semibold text-gray-800">
                                                    ¥
                                                    {projectData.total_received.toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">
                                                    総お釣り
                                                </p>
                                                <p className="text-lg font-semibold text-gray-800">
                                                    ¥
                                                    {projectData.total_change.toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">
                                                    最終取引日
                                                </p>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {new Date(
                                                        projectData.last_transaction_date
                                                    ).toLocaleDateString(
                                                        "ja-JP"
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                <span className="text-blue-600 font-semibold">
                                                    詳細を見る →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
