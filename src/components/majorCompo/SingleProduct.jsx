import React from 'react'
import { FaHeart, FaExchangeAlt, FaShoppingCart, FaStar, FaTruck, FaUndo } from 'react-icons/fa'
// Import product images
import product_img1 from '../../../public/product 2.png'
import product_img2 from '../../../public/product 3.png'
import product_img3 from '../../../public/product 4.png'
import product_img4 from '../../../public/product 5.png'
import main_product_img from '../../../public/product_image.png'

export default function SingleProduct() {
    // Array of product images
    const productImages = [product_img1, product_img2, product_img3, product_img4];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-8xl w-full mx-auto">
                <div className="flex flex-col lg:flex-row justify-center">
                    {/* Left Section - Product Images */}
                    <div className="lg:w-2/5 p-6 lg:p-9 flex flex-col justify-between">
                        <div className="aspect-square relative overflow-hidden rounded-xl shadow-lg mb-4">
                            <img
                                src={main_product_img}
                                alt="Main product image"
                                className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    className="aspect-square relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                                >
                                    <img
                                        src={img}
                                        alt={`Product thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-75"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Section - Product Details */}
                    <div className="lg:w-1/2 p-6 lg:p-9 flex flex-col justify-between ">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold text-primary">LuxeWear</h2>
                                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mt-1">Ethereal Silk Jacket</h1>
                                <div className="flex items-center space-x-2 mt-2">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} className="text-yellow-400" />
                                    ))}
                                    <span className="text-gray-600 text-sm">(128 reviews)</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                                Indulge in luxury with our Ethereal Silk Blouse. Crafted from the finest silk, this
                                blouse drapes beautifully and feels incredibly soft against your skin. Perfect for
                                both casual and formal occasions, it's a versatile addition to your wardrobe.
                            </p>

                            <div className="flex items-center space-x-4">
                                <span className="text-3xl lg:text-4xl font-bold text-primary">$129.99</span>
                                <span className="text-xl lg:text-2xl text-gray-500 line-through">$179.99</span>
                                <span className="text-sm lg:text-base font-semibold text-green-500 bg-green-100 px-3 py-1 rounded-full">
                                    28% OFF
                                </span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-800">Select Size</h3>
                                <div className="flex flex-wrap gap-3">
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                        <button
                                            key={size}
                                            className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-base font-medium hover:border-primary hover:bg-primary hover:text-white transition-colors duration-300"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mt-4">
                            <div className="flex items-center space-x-4">
                                <button className="flex-1 bg-primary hover:bg-primary-dark text-black font-bold py-3 px-6 rounded-full transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 shadow-lg">
                                    <FaShoppingCart className="inline-block mr-2" />
                                    Add to Cart
                                </button>
                                <button className="p-3 bg-white border-2 border-gray-200 rounded-full hover:border-primary hover:bg-primary-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                    <FaHeart className="text-xl text-gray-600 hover:text-primary" />
                                    <span className="sr-only">Add to Wishlist</span>
                                </button>
                                <button className="p-3 bg-white border-2 border-gray-200 rounded-full hover:border-primary hover:bg-primary-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                                    <FaExchangeAlt className="text-xl text-gray-600 hover:text-primary" />
                                    <span className="sr-only">Compare</span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600 border-t border-b border-gray-200 py-4">
                                <div className="flex items-center space-x-2">
                                    <FaTruck className="text-primary" />
                                    <span>Free shipping on orders over $100</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaUndo className="text-primary" />
                                    <span>30-day return policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
