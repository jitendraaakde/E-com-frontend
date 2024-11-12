import { useEffect, useState } from 'react';

export default function OrderHistory() {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');

    const fetchOrderHistory = async () => {
        try {
            const response = await fetch(`https://e-comm-backend-ugos.onrender.com/api/users/order-history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setHistory(data.orders);
            } else {
                throw new Error(data.msg || 'Error fetching order history');
            }
        } catch (error) {
            console.error('Fetch orders failed:', error.message);
            setError('Failed to load order history. Please try again later.');
        }
    };

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    return (
        <div className="container mx-auto p-4 px-20">
            <h1 className="text-2xl font-bold mb-6">Order History</h1>
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : history.length === 0 ? (
                <p className="text-gray-600">You haven't purchased anything yet.</p>
            ) : (
                <div className="space-y-4">
                    {history.map((order, index) => (
                        <OrderCard key={order._id} order={order} orderNumber={index + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

function OrderCard({ order, orderNumber }) {
    const [isOpen, setIsOpen] = useState(false);

    const total = order.products.reduce(
        (acc, item) => acc + item.amount * item.quantity,
        0
    );

    return (
        <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Order #{orderNumber}</h2>
                    <p className="text-sm text-gray-500">
                        Placed on {order.createdAt.split('T')[0]}
                    </p>
                </div>
                <div className="text-right">
                    <div className="font-semibold">Total: ${total.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">{order.orderStatus}</div>
                </div>
            </div>
            <button
                className="w-full text-left text-sm text-blue-500 flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Hide' : 'Show'} Order Details
                {isOpen ? ' ▲' : ' ▼'}
            </button>
            {isOpen && (
                <div className="mt-4 space-y-4">
                    {order.products.map((product) => (
                        <div key={product._id} className="flex items-center space-x-4">
                            <img
                                src={product.productId.images[0].url}
                                alt={product.productId.name}
                                className="h-20 w-20 object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold">{product.productId.name}</h3>
                                <p className="text-sm text-gray-500">
                                    ${product.amount.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
