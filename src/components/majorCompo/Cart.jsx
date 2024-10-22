import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import { FaTruck, FaCreditCard } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { SliceAddToCart } from "../../store/cartSlice";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const CartComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    let items = cart.items
    const removeItem = async (id) => {
        try {
            const response = await fetch(`/api/product/remove-cart-item/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                if (data.cart) {
                    toast.success('Product remove from cart')
                    dispatch(SliceAddToCart({ items: data.cart, totalItems: data.cart.length }));
                } else {
                    throw new Error('Cart data not found in response');
                }
            } else {
                throw new Error(data.message || 'Error deleting cart item');
            }
        } catch (error) {
            console.error('Delete product failed:', error.message);
        }
    };

    const updateCartItem = async (id, property, value) => {
        console.log('product id, property, value', id, property, value)
        try {
            const response = await fetch(`/api/product/update-cart-item/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ property, value }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.cart) {
                    console.log('Updated cart:', data.cart);
                    dispatch(SliceAddToCart({ items: data.cart, totalItems: data.cart.length }));
                } else {
                    throw new Error('Cart data not found in response');
                }
            } else {
                throw new Error(data.message || 'Error updating cart item');
            }
        } catch (error) {
            console.error('Update product failed:', error.message);
        }
    };

    const calculateAmount = (price, disPercent) => {
        return Math.round(price - (price * (disPercent / 100)))
    }

    const subtotal = items.reduce((sum, item) => sum + calculateAmount(item.productId.price, item.productId.discountPercentage) * item.quantity, 0);
    const shipping = 120;
    const tax = subtotal * 0.03;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">{items.length !== 0 ? 'Your Shopping Cart' : "Your Cart is Empty"}</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <div className="h-[calc(100vh-200px)] pr-4 overflow-y-auto">
                            {items.map((item) => (
                                <div
                                    key={item.productId._id}
                                    className="bg-white rounded-lg shadow-md p-6 mb-4 relative overflow-hidden group"
                                >
                                    <div className="flex items-center">
                                        <Link to={`/product/${item.productId._id}`}>
                                            <img
                                                src={item?.productId.images[0].url}
                                                alt={item.productId.name}
                                                className="w-24 h-26 rounded-md object-cover cursor-pointer"
                                            />
                                        </Link>
                                        <div className="ml-6 flex-1">
                                            <Link to={`/product/${item.productId._id}`}>

                                                <h3 className="text-lg font-semibold text-gray-900"
                                                >
                                                    {item.productId.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-500">{item.productId.brand.name}</p>
                                            <p className="text-lg font-medium text-gray-900 mt-2 space-x-2">
                                                ₹{calculateAmount(item.productId.price, item.productId.discountPercentage) * item.quantity}
                                                <span className="text-gray-500 line-through ml-2">₹{item.productId.price}</span>
                                                <span className="text-green-600">{item.productId.discountPercentage}% off</span>
                                            </p>
                                            <div className="flex items-center mt-2 space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-500">Size:</span>
                                                    <select
                                                        className="w-[100px] border border-gray-300 rounded"
                                                        value={item.size._id}
                                                        onChange={(e) => updateCartItem(item._id, 'size', e.target.value)}
                                                    >
                                                        {item.productId.sizes.map((size) => (
                                                            <option key={size._id} value={size._id}>
                                                                {size.size}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        className="p-2"
                                                        onClick={() => updateCartItem(item._id, 'quantity', item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <AiOutlineMinus className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-2">{item.quantity}</span>
                                                    <button
                                                        className="p-2"
                                                        onClick={() => updateCartItem(item._id, 'quantity', item.quantity + 1)}
                                                    >
                                                        <AiOutlinePlus className="h-4 w-4" />
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="text-gray-400 hover:text-gray-500"
                                            onClick={() => removeItem(item._id)}
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
                                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">₹{shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t my-4"></div>
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                                <Link to={'/checkout'}>Proceed to Checkout</Link>
                            </button>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center text-sm text-gray-500">
                                    <FaTruck className="h-5 w-5 mr-2" />
                                    Free shipping on orders over ₹100
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
