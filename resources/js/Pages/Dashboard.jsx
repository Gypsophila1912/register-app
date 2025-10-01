import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ projects }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    プロジェクト一覧
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {/* プロジェクトカードのループ */}
                                {projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="rounded-lg shadow-md border overflow-hidden"
                                    >
                                        {/* カラー部分 */}
                                        <div
                                            className="h-20"
                                            style={{
                                                backgroundColor: project.color,
                                            }}
                                        ></div>
                                        {/*内容 */}
                                        <div className="p-4">
                                            <h2 className="text-lg font-bold">
                                                {project.name}
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                {project.year}年度 -{" "}
                                                {project.type}
                                            </p>
                                            <p className="mt-2 text-sm text-gray-500">
                                                {project.description ||
                                                    "説明がここに表示されます"}
                                            </p>

                                            <div className="mt-4 flex justify-end gap-2">
                                                <button className="px-3 py-1 border rounded">
                                                    設定
                                                </button>
                                                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                                                    プロジェクトを開く
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
