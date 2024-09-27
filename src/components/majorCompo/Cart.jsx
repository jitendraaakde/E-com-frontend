import product_img from '../../../public/product_image.png';

const Cart = () => {
    return (
        <div className="flex flex-wrap justify-between gap-6 px-6 py-8 max-w-screen-lg mx-auto">
            {/* Cart Items Section */}
            <div className="flex-1 min-w-[45%] p-6 border border-gray-300 rounded-lg bg-white shadow-md">
                <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
                <div className="space-y-4">
                    {/* Cart Item */}
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm"
                        >
                            <img
                                src={product_img}
                                alt="Item Image"
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-grow">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-700">Brand Name</p>
                                        <p className="text-sm text-gray-500">Item Title</p>
                                    </div>
                                    <p className="font-semibold text-gray-800">$50</p>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    This is a short description of the item. It's concise and
                                    informative.
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-2">
                                        <label htmlFor={`size-${index}`} className="text-sm">Size:</label>
                                        <select
                                            id={`size-${index}`}
                                            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            defaultValue="M"
                                        >
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label htmlFor={`qty-${index}`} className="text-sm">Qty:</label>
                                        <select
                                            id={`qty-${index}`}
                                            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            defaultValue="1"
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary Section */}
            <div className="flex-1 min-w-[45%] p-6 border border-gray-300 rounded-lg bg-white shadow-md sticky top-0 self-start h-fit">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                        <span>Total Items:</span>
                        <span className="font-medium">10</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Price:</span>
                        <span className="font-medium">$500</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount:</span>
                        <span className="font-medium text-green-600">-$20</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Final Price:</span>
                        <span>$480</span>
                    </div>
                </div>
                <button className="w-full py-3 text-lg font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Cart;
