import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, project, products }) {
    const [cart, setCart] = useState([]);
    const [showQuantityModal, setShowQuantityModal] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
        setShowQuantityModal(true);
    };

    const confirmQuantity = () => {
        const existingItem = cart.find(
            (item) => item.product.id === selectedProduct.id
        );

        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.product.id === selectedProduct.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCart([...cart, { product: selectedProduct, quantity }]);
        }

        setShowQuantityModal(false);
        setSelectedProduct(null);
        setQuantity(1);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product.id !== productId));
    };

    const totalAmount = cart.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {project.name} - 販売画面
                </h2>
            }
        >
            <Head title={`${project.name} - 販売`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col md:flex-row">
                                {/* メインエリア（商品一覧） */}
                                <div className="flex-1 p-4 md:p-6">
                                    {/* プロジェクト情報 */}
                                    <div
                                        className="mb-4 md:mb-6 p-4 md:p-6 rounded-lg shadow-md"
                                        style={{
                                            backgroundColor: project.color,
                                        }}
                                    >
                                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                                            {project.name}
                                        </h1>
                                        <p className="text-white/90 mt-1 md:mt-2 text-sm md:text-base">
                                            {project.year}年度 - {project.type}
                                        </p>
                                    </div>

                                    {/* 商品カード一覧 */}
                                    {products.length === 0 ? (
                                        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                                            <p className="text-lg">
                                                商品が登録されていません
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                                            {products.map((product) => (
                                                <div
                                                    key={product.id}
                                                    onClick={() =>
                                                        handleAddToCart(product)
                                                    }
                                                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer active:scale-95 md:hover:scale-105 border-2 border-gray-200"
                                                >
                                                    <div className="p-4 md:p-6 flex flex-col items-center justify-center min-h-[140px] md:min-h-[160px]">
                                                        <h3 className="font-bold text-gray-800 text-center text-lg md:text-xl mb-3">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-2xl md:text-3xl font-bold text-blue-600">
                                                            ¥
                                                            {product.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* デスクトップ用サイドバー */}
                                <div className="hidden md:flex w-96 bg-white shadow-xl border-l border-gray-200 flex-col">
                                    <div className="p-6 border-b border-gray-200">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            カート
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {cart.length}点の商品
                                        </p>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-6">
                                        {cart.length === 0 ? (
                                            <div className="text-center text-gray-400 py-12">
                                                <p>カートが空です</p>
                                                <p className="text-sm mt-2">
                                                    商品を選択してください
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {cart.map((item) => (
                                                    <div
                                                        key={item.product.id}
                                                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="font-semibold text-gray-800 flex-1">
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </h3>
                                                            <button
                                                                onClick={() =>
                                                                    removeFromCart(
                                                                        item
                                                                            .product
                                                                            .id
                                                                    )
                                                                }
                                                                className="text-red-500 hover:text-red-700 ml-2"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-between items-center text-sm">
                                                            <span className="text-gray-600">
                                                                ¥
                                                                {item.product.price.toLocaleString()}{" "}
                                                                ×{" "}
                                                                {item.quantity}
                                                            </span>
                                                            <span className="font-bold text-blue-600">
                                                                ¥
                                                                {(
                                                                    item.product
                                                                        .price *
                                                                    item.quantity
                                                                ).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                                        <div className="mb-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-2xl font-bold text-gray-800">
                                                    合計
                                                </span>
                                                <span className="text-3xl font-bold text-blue-600">
                                                    ¥
                                                    {totalAmount.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            disabled={cart.length === 0}
                                            className="w-full py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                                        >
                                            <Link
                                                href={route("checkout.create", {
                                                    id: project.id,
                                                })}
                                                className="rounded-full px-4 py-2 text-white font-medium"
                                            >
                                                会計画面へ
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* モバイル用：カートボタン（固定） */}
                            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-lg z-40">
                                <button
                                    onClick={() => setShowCart(true)}
                                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-between px-6 active:scale-95 transition"
                                >
                                    <span>カート ({cart.length})</span>
                                    <span className="text-xl">
                                        ¥{totalAmount.toLocaleString()}
                                    </span>
                                </button>
                            </div>

                            {/* モバイル用：カートモーダル */}
                            {showCart && (
                                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                                    <div className="bg-white w-full rounded-t-2xl max-h-[80vh] flex flex-col">
                                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                            <h2 className="text-xl font-bold text-gray-800">
                                                カート ({cart.length}点)
                                            </h2>
                                            <button
                                                onClick={() =>
                                                    setShowCart(false)
                                                }
                                                className="text-2xl text-gray-500"
                                            >
                                                ×
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-4">
                                            {cart.length === 0 ? (
                                                <div className="text-center text-gray-400 py-12">
                                                    <p>カートが空です</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {cart.map((item) => (
                                                        <div
                                                            key={
                                                                item.product.id
                                                            }
                                                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                                        >
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h3 className="font-semibold text-gray-800 flex-1">
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                </h3>
                                                                <button
                                                                    onClick={() =>
                                                                        removeFromCart(
                                                                            item
                                                                                .product
                                                                                .id
                                                                        )
                                                                    }
                                                                    className="text-red-500 ml-2 text-xl"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-600">
                                                                    ¥
                                                                    {item.product.price.toLocaleString()}{" "}
                                                                    ×{" "}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>
                                                                <span className="font-bold text-blue-600 text-lg">
                                                                    ¥
                                                                    {(
                                                                        item
                                                                            .product
                                                                            .price *
                                                                        item.quantity
                                                                    ).toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xl font-bold text-gray-800">
                                                        合計
                                                    </span>
                                                    <span className="text-2xl font-bold text-blue-600">
                                                        ¥
                                                        {totalAmount.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                disabled={cart.length === 0}
                                                className="w-full py-4 bg-green-600 text-white rounded-lg font-bold text-lg active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                                            >
                                                <Link
                                                    href={route(
                                                        "checkout.create",
                                                        {
                                                            id: project.id,
                                                        }
                                                    )}
                                                    className="rounded-full px-4 py-2 text-white font-medium"
                                                >
                                                    会計画面へ
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 個数選択モーダル */}
                            {showQuantityModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                    <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full shadow-2xl">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                                            {selectedProduct?.name}
                                        </h3>
                                        <p className="text-lg md:text-xl text-gray-600 mb-4 md:mb-6">
                                            単価: ¥
                                            {selectedProduct?.price.toLocaleString()}
                                        </p>

                                        <div className="mb-4 md:mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                個数
                                            </label>
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            Math.max(
                                                                1,
                                                                quantity - 1
                                                            )
                                                        )
                                                    }
                                                    className="w-14 h-14 md:w-12 md:h-12 bg-gray-200 rounded-lg text-2xl md:text-xl font-bold active:bg-gray-300 transition"
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e) =>
                                                        setQuantity(
                                                            Math.max(
                                                                1,
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                ) || 1
                                                            )
                                                        )
                                                    }
                                                    className="flex-1 text-center text-3xl md:text-2xl font-bold border-2 border-gray-300 rounded-lg py-3 md:py-2"
                                                    min="1"
                                                />
                                                <button
                                                    onClick={() =>
                                                        setQuantity(
                                                            quantity + 1
                                                        )
                                                    }
                                                    className="w-14 h-14 md:w-12 md:h-12 bg-gray-200 rounded-lg text-2xl md:text-xl font-bold active:bg-gray-300 transition"
                                                >
                                                    ＋
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-4 md:mb-6 p-4 bg-blue-50 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700 text-lg">
                                                    小計
                                                </span>
                                                <span className="text-2xl md:text-2xl font-bold text-blue-600">
                                                    ¥
                                                    {(
                                                        (selectedProduct?.price ||
                                                            0) * quantity
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() =>
                                                    setShowQuantityModal(false)
                                                }
                                                className="flex-1 py-3 md:py-3 border border-gray-300 rounded-lg text-gray-700 active:bg-gray-50 transition text-base md:text-base"
                                            >
                                                キャンセル
                                            </button>
                                            <button
                                                onClick={confirmQuantity}
                                                className="flex-1 py-3 md:py-3 bg-blue-600 text-white rounded-lg font-bold active:bg-blue-700 transition text-base md:text-base"
                                            >
                                                追加
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
