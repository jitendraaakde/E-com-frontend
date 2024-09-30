import { useState } from 'react'

const orders = [
    {
        id: '1',
        date: '2023-09-15',
        total: 129.99,
        status: 'Delivered',
        products: [
            { id: 'p1', name: 'Wireless Earbuds', price: 79.99, image: '/placeholder.svg?height=80&width=80' },
            { id: 'p2', name: 'Phone Case', price: 19.99, image: '/placeholder.svg?height=80&width=80' },
            { id: 'p3', name: 'Charging Cable', price: 30.01, image: '/placeholder.svg?height=80&width=80' },
        ],
    },
    {
        id: '2',
        date: '2023-08-30',
        total: 249.98,
        status: 'Shipped',
        products: [
            { id: 'p4', name: 'Smart Watch', price: 199.99, image: '/placeholder.svg?height=80&width=80' },
            { id: 'p5', name: 'Screen Protector', price: 49.99, image: '/placeholder.svg?height=80&width=80' },
        ],
    },
]

export default function OrderHistory() {
    return (
        <div className="container mx-auto p-4 px-20">
            <h1 className="text-2xl font-bold mb-6">Order History</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    )
}

function OrderCard({ order }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                    <div className="font-semibold">Total: ${order.total.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">{order.status}</div>
                </div>
            </div>
            <div>
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
                            <div key={product.id} className="flex items-center space-x-4">
                                <img src={product.image} alt={product.name} className="h-20 w-20 object-cover" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
