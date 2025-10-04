import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Create({ auth, project, cart }) {
    const [receivedAmount, setReceivedAmount] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const totalAmount = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const changeAmount = receivedAmount
        ? Math.max(0, parseInt(receivedAmount) - totalAmount)
        : 0;
    const isValid = receivedAmount && parseInt(receivedAmount) >= totalAmount;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;

        setIsProcessing(true);

        router.post(
            route("checkout.store", project.id),
            {
                total_amount: totalAmount,
                received_amount: parseInt(receivedAmount),
                change_amount: changeAmount,
                items: cart.map((item) => ({
                    product_id: item.product_id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
            {
                onFinish: () => setIsProcessing(false),
            }
        );
    };

    const quickAmountButtons = [1000, 2000, 3000, 5000, 10000];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    会計画面 - {project.name}
                </h2>
            }
        >
            <Head title="会計" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* プロジェクト情報 */}
                            <div
                                className="mb-6 p-4 rounded-lg shadow-md"
                                style={{ backgroundColor: project.color }}
                            >
                                <h1 className="text-2xl font-bold text-white">
                                    {project.name}
                                </h1>
                            </div>

                            {/* 購入商品一覧 */}
                            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    購入商品
                                </h2>
                                <div className="space-y-3">
                                    {cart.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center py-2 border-b border-gray-200"
                                        >
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    ¥
                                                    {item.price.toLocaleString()}{" "}
                                                    × {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-lg font-bold text-blue-600">
                                                ¥
                                                {(
                                                    item.price * item.quantity
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t-2 border-gray-300">
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-gray-800">
                                            合計金額
                                        </span>
                                        <span className="text-3xl font-bold text-blue-600">
                                            ¥{totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 受取金額入力 */}
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white rounded-lg shadow-md p-4 md:p-6"
                            >
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    受取金額
                                </h2>

                                <input
                                    type="number"
                                    value={receivedAmount}
                                    onChange={(e) =>
                                        setReceivedAmount(e.target.value)
                                    }
                                    placeholder="金額を入力"
                                    className="w-full text-3xl md:text-4xl font-bold text-center border-2 border-gray-300 rounded-lg py-4 mb-4 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    min="0"
                                />

                                {/* クイック金額ボタン */}
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {quickAmountButtons.map((amount) => (
                                        <button
                                            key={amount}
                                            type="button"
                                            onClick={() =>
                                                setReceivedAmount(
                                                    amount.toString()
                                                )
                                            }
                                            className="py-3 bg-gray-200 rounded-lg font-bold text-lg hover:bg-gray-300 active:scale-95 transition"
                                        >
                                            ¥{amount.toLocaleString()}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setReceivedAmount(
                                                totalAmount.toString()
                                            )
                                        }
                                        className="py-3 bg-blue-100 rounded-lg font-bold text-lg hover:bg-blue-200 active:scale-95 transition"
                                    >
                                        ちょうど
                                    </button>
                                </div>

                                {/* お釣り表示 */}
                                {receivedAmount && (
                                    <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-gray-800">
                                                お釣り
                                            </span>
                                            <span className="text-3xl font-bold text-orange-600">
                                                ¥{changeAmount.toLocaleString()}
                                            </span>
                                        </div>
                                        {!isValid && (
                                            <p className="text-red-600 text-sm mt-2">
                                                ※ 受取金額が不足しています
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* ボタン */}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.visit(
                                                route(
                                                    "products.show",
                                                    project.id
                                                )
                                            )
                                        }
                                        className="flex-1 py-4 border-2 border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 active:scale-95 transition"
                                    >
                                        戻る
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isValid || isProcessing}
                                        className="flex-1 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-95 transition"
                                    >
                                        {isProcessing
                                            ? "処理中..."
                                            : "会計完了"}
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
