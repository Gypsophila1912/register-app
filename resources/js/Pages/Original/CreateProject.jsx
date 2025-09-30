import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function CreateProject() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        year: new Date().getFullYear(),
        type: "屋台",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("project.store")); // ルート名は routes/web.php で確認して合わせる
    };
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        プロジェクト作成
                    </h2>
                }
            >
                <Head title="プロジェクト作成" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    {/* プロジェクト名 */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            プロジェクト名
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="mt-1 block w-full border rounded p-2"
                                        />
                                        {errors.name && (
                                            <div className="text-red-500 text-sm">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* 年度 */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            年度
                                        </label>
                                        <input
                                            type="number"
                                            value={data.year}
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="mt-1 block w-full border rounded p-2"
                                        />
                                        {errors.year && (
                                            <div className="text-red-500 text-sm">
                                                {errors.year}
                                            </div>
                                        )}
                                    </div>

                                    {/* 種類 */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            種類
                                        </label>
                                        <select
                                            value={data.type}
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            className="mt-1 block w-full border rounded p-2"
                                        >
                                            <option value="屋台">屋台</option>
                                            <option value="展示">展示</option>
                                        </select>
                                        {errors.type && (
                                            <div className="text-red-500 text-sm">
                                                {errors.type}
                                            </div>
                                        )}
                                    </div>

                                    {/* 説明 */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            説明
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full border rounded p-2"
                                        />
                                        {errors.description && (
                                            <div className="text-red-500 text-sm">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>

                                    {/* 送信ボタン */}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            作成
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
