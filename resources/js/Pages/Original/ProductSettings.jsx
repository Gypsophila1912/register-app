import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function CreateProject() {
    const { flash } = usePage().props;
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        商品設定
                    </h2>
                }
            >
                <Head title="プロジェクト作成" />
                <div>
                    {flash.success && (
                        <div className="bg-green-100 text-green-700 p-3 rounded">
                            {flash.success}
                        </div>
                    )}
                </div>
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                商品設定ページ
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
