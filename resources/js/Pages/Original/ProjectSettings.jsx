import React from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function CreateProject({ auth, project, products }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        price: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("products.store", project.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (productId) => {
        if (confirm("この商品を削除しますか？")) {
            router.delete(route("products.destroy", productId), {
                preserveScroll: true,
            });
        }
    };

    const handleFinish = () => {
        router.visit(route("dashboard"));
    };
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        商品登録 - {project.name}
                    </h2>
                }
            >
                <Head title="商品登録" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div
                                    className="p-6"
                                    style={{ backgroundColor: project.color }}
                                >
                                    <h3 className="text-2xl font-bold text-white">
                                        {project.name}
                                    </h3>
                                    <p className="text-white/90 mt-1">
                                        {project.year}年度 - {project.type}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* 商品登録フォーム */}
                                <div className="bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                            新しい商品を追加
                                        </h3>

                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-4"
                                        >
                                            {/* 商品名 */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    商品名{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                    placeholder="例: たこ焼き（6個）"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            {/* 単価 */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    単価（円）{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={data.price}
                                                    onChange={(e) =>
                                                        setData(
                                                            "price",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                    placeholder="500"
                                                    min="0"
                                                />
                                                {errors.price && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.price}
                                                    </p>
                                                )}
                                            </div>

                                            {/* 追加ボタン */}
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                            >
                                                {processing
                                                    ? "追加中..."
                                                    : "商品を追加"}
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                {/* 登録済み商品一覧 */}
                                <div className="bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                            登録済み商品（{products.length}件）
                                        </h3>

                                        {products.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">
                                                <p>
                                                    まだ商品が登録されていません
                                                </p>
                                                <p className="text-sm mt-1">
                                                    左のフォームから商品を追加してください
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                                {products.map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                                                    >
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-800">
                                                                {product.name}
                                                            </p>
                                                            <p className="text-lg font-bold text-blue-600 mt-1">
                                                                ¥
                                                                {product.price.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product.id
                                                                )
                                                            }
                                                            className="ml-4 px-3 py-1 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 transition"
                                                        >
                                                            削除
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 完了ボタン */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleFinish}
                                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                                >
                                    登録完了
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
