import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import { FaTruck, FaCreditCard } from "react-icons/fa";

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "Premium Leather Jacket",
    brand: "LuxeWear",
    price: 299.99,
    image: "/placeholder.jpg", // Placeholder image path
    size: "M",
    quantity: 1,
    availableSizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    brand: "SoundMaster",
    price: 199.99,
    image: "/placeholder.jpg", // Placeholder image path
    size: "One Size",
    quantity: 1,
    availableSizes: ["One Size"],
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    brand: "TechFit",
    price: 149.99,
    image: "/placeholder.jpg", // Placeholder image path
    size: "One Size",
    quantity: 1,
    availableSizes: ["One Size"],
  },
];

const CartComponent = () => {
  const [items, setItems] = useState(cartItems);

  // Remove item from the cart
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Update quantity of items in the cart
  const updateQuantity = (id, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  // Update size of the selected item
  const updateSize = (id, newSize) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, size: newSize } : item))
    );
  };

  // Calculate subtotal, shipping, tax, and total
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="h-[calc(100vh-200px)] pr-4 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-6 mb-4 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform -skew-y-12 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out"></div>
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-lg font-medium text-gray-900 mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Size:</span>
                          <select
                            className="w-[100px] border border-gray-300 rounded"
                            value={item.size}
                            onChange={(e) =>
                              updateSize(item.id, e.target.value)
                            }
                          >
                            {item.availableSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center border rounded-md">
                          <button
                            className="p-2"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <AiOutlineMinus className="h-4 w-4" />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="p-2"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <AiOutlinePlus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <AiOutlineClose className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t my-4"></div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                Proceed to Checkout
              </button>
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FaTruck className="h-5 w-5 mr-2" />
                  Free shipping on orders over $100
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaCreditCard className="h-5 w-5 mr-2" />
                  Secure payment processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
