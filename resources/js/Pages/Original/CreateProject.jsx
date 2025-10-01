import { useState } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        year: new Date().getFullYear(),
        type: "屋台",
        description: "",
        color: "#3B82F6", // デフォルト: 青
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("送信データ:", data);
        post(route("project.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    プロジェクト作成
                </h2>
            }
        >
            <Head title="プロジェクト作成" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    {/* プレビューエリア（カードコンポーネント風） */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-2">プレビュー</p>
                        <div className="overflow-hidden bg-white shadow-lg rounded-lg transition-all duration-300">
                            {/* カードの上半分（選択した色） */}
                            <div
                                className="h-32 flex items-end p-4 transition-colors duration-300"
                                style={{ backgroundColor: data.color }}
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                                        {data.name || "プロジェクト名"}
                                    </h3>
                                    <p className="text-white/90 drop-shadow">
                                        {data.year}年度 - {data.type}
                                    </p>
                                </div>
                            </div>
                            {/* カードの下半分（白背景） */}
                            <div className="p-4 bg-white">
                                <p className="text-gray-600 text-sm">
                                    {data.description ||
                                        "説明がここに表示されます"}
                                </p>
                                <div className="flex justify-end gap-4">
                                    <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
                                        設定
                                    </button>
                                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                                        プロジェクトを開く
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* フォーム */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* プロジェクト名 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        プロジェクト名{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        placeholder="例: たこ焼き屋台"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* 年度 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        年度{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={data.year}
                                        onChange={(e) =>
                                            setData("year", e.target.value)
                                        }
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                    {errors.year && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.year}
                                        </p>
                                    )}
                                </div>

                                {/* 種類 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        種類{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="屋台"
                                                checked={data.type === "屋台"}
                                                onChange={(e) =>
                                                    setData(
                                                        "type",
                                                        e.target.value
                                                    )
                                                }
                                                className="mr-2 text-blue-600 focus:ring-blue-500"
                                            />
                                            屋台
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="展示"
                                                checked={data.type === "展示"}
                                                onChange={(e) =>
                                                    setData(
                                                        "type",
                                                        e.target.value
                                                    )
                                                }
                                                className="mr-2 text-blue-600 focus:ring-blue-500"
                                            />
                                            展示
                                        </label>
                                    </div>
                                    {errors.type && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>

                                {/* プロジェクトカラー */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        プロジェクトカラー{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={data.color}
                                            onChange={(e) =>
                                                setData("color", e.target.value)
                                            }
                                            className="h-12 w-24 border-2 border-gray-300 rounded-lg cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={data.color}
                                            onChange={(e) =>
                                                setData("color", e.target.value)
                                            }
                                            className="flex-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            placeholder="#3B82F6"
                                            pattern="^#[0-9A-Fa-f]{6}$"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        カードの上部に表示される色です
                                    </p>
                                    {errors.color && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.color}
                                        </p>
                                    )}
                                </div>

                                {/* 説明 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        説明（任意）
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        rows="3"
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        placeholder="プロジェクトの詳細説明"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* 送信ボタン */}
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        {processing
                                            ? "作成中..."
                                            : "プロジェクトを作成"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
