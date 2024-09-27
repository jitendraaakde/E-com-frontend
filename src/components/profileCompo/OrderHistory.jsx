import { useState } from "react";

const OrderHistory = () => {
    // Example order data
    const [orders, setOrders] = useState([
        {
            id: 1,
            products: [
                {
                    image: "https://via.placeholder.com/100",
                    name: "Men's Casual Shirt - Blue",
                    quantity: 2,
                    price: 29.99,
                },
                {
                    image: "https://via.placeholder.com/100",
                    name: "Men's Casual Shirt - Red",
                    quantity: 1,
                    price: 29.99,
                },
            ],
            totalPrice: 89.97,
            paymentMethod: "Credit Card",
            orderStatus: "Delivered",
        },
        {
            id: 2,
            products: [
                {
                    image: "https://via.placeholder.com/100",
                    name: "Women's Casual Shirt - Green",
                    quantity: 1,
                    price: 49.99,
                },
                {
                    image: "https://via.placeholder.com/100",
                    name: "Women's Casual Shirt - Yellow",
                    quantity: 2,
                    price: 49.99,
                },
            ],
            totalPrice: 149.97,
            paymentMethod: "PayPal",
            orderStatus: "Shipped",
        },
    ]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 w-full">
            <h2 className="text-2xl font-semibold mb-6">Order History</h2>

            {/* Order List */}
            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="p-6 border border-gray-300 rounded-lg shadow-md bg-white space-y-4"
                    >
                        {/* Order Header */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-medium">Order #{order.id}</h3>
                            <p className={`text-sm font-medium ${order.orderStatus === "Delivered" ? "text-green-600" : "text-yellow-500"}`}>
                                Status: {order.orderStatus}
                            </p>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {order.products.map((product, index) => (
                                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-300 rounded-lg shadow-sm">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h4 className="text-lg font-medium">{product.name}</h4>
                                        <p className="text-gray-500">Quantity: {product.quantity}</p>
                                        <p className="text-gray-500">Price: ${product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Payment Summary */}
                        <div className="text-right space-y-2">
                            <p className="text-xl font-semibold">Total: ${order.totalPrice.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Payment Method: {order.paymentMethod}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Summary Cart */}
            <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white space-y-4">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <p className="text-lg font-medium">
                    Total Orders: {orders.length}
                </p>
                <p className="text-lg font-medium">
                    Total Amount: $
                    {orders.reduce((total, order) => total + order.totalPrice, 0).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default OrderHistory;
