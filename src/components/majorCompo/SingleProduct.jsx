import React, { useEffect, useState } from 'react'
import { FaHeart, FaExchangeAlt, FaShoppingCart, FaStar, FaTruck, FaUndo } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import { useParams } from 'react-router-dom'
import { SliceAddToCart } from '../../store/cartSlice'
// import { SliceAddToCart } from '../../store/cartSlice'

export default function SingleProduct() {
    const [productData, setProductData] = useState(null)
    const [hoverImage, setHoverImage] = useState()
    const dispatch = useDispatch()

    const { id } = useParams()
    console.log('product id', id)

    const handleSingleProduct = async (id) => {
        try {
            const response = await fetch(`/api/product/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                setProductData(data.product)
                setHoverImage(data.product.images[0]?.url)
            } else {
                throw new Error(data.message || 'Error fetching products');
            }
        } catch (error) {
            console.error('Fetch failed:', error.message);
        }
    }
    const calculateAmount = (price, disPercent) => {
        return Math.round(price - (price * (disPercent / 100)))
    }
    const handleImageHover = (url) => {
        setHoverImage(url)
    }
    const [clickSize, setClickSize] = useState(null)
    const [message, setMessage] = useState('')

    const handleSizeButton = (sizeObj) => {
        setClickSize(sizeObj)
    }

    const addToCart = async (productId, size) => {
        try {
            const response = await fetch(`/api/product/add-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pid: productId, size })
            });

            const data = await response.json();
            if (response.ok) {
                dispatch(SliceAddToCart(data.cart))
                if (data.success) {
                    setMessage('Product Added to cart ')
                }
            } else {
                throw new Error(data.message || 'Error fetching products');
            }
        } catch (error) {
            console.error('Fetch failed:', error.message);
        }
    }

    const handleAddToCart = (product, clickSize) => {
        if (!clickSize) {
            setMessage('Please choose size before Add to Cart')
            return
        } else {
            setMessage('')
            console.log('Product ', product, 'Size', clickSize)
            addToCart(product, clickSize)
            // dispatch(SliceAddToCart({ product, clickSize }))
        }
    }
    useEffect(() => {
        handleSingleProduct(id)
    }, [])

    return <>
        {productData &&
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-8xl w-full mx-auto">
                    <div className="flex flex-col lg:flex-row justify-center">
                        <div className="lg:w-2/5 p-6 lg:p-10 flex flex-col justify-between">
                            <div className="aspect-square relative overflow-hidden rounded-xl shadow-lg mb-2">
                                <img
                                    src={hoverImage}
                                    alt="Main product image"
                                    className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {productData.images.map((prod, index) => (
                                    <button
                                        key={index}
                                        className="aspect-square relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                                    >
                                        <img
                                            src={prod.url}
                                            alt={`Product thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-75"
                                            onMouseEnter={() => handleImageHover(prod.url)}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-1/2 p-6 lg:p-9 flex flex-col justify-between ">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary">{productData?.brand?.name}</h2>
                                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mt-1">{productData?.name}</h1>

                                </div>

                                <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                                    {productData?.description}
                                </p>

                                <div className="flex items-center space-x-4">
                                    <span className="text-3xl lg:text-4xl font-bold text-primary">${calculateAmount(productData.price, productData.discountPercentage)}</span>
                                    <span className="text-xl lg:text-2xl text-gray-500 line-through">${productData.price}</span>
                                    <span className="text-sm lg:text-base font-semibold text-green-500 bg-green-100 px-3 py-1 rounded-full">
                                        {productData.discountPercentage}% OFF
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-800">Select Size</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {productData.sizes.map((size) => (
                                            <button
                                                key={size.size} onClick={() => handleSizeButton(size)}
                                                className={`w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-base font-medium hover:border-primary hover:bg-primary hover:text-red-500 transition-colors duration-300 ${clickSize?.size === size.size && 'hover:text-white bg-blue-400 text-white'}`}
                                            >
                                                {size.size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className="space-y-4 mt-4">
                                <p>{message}</p>
                                <div className="flex items-center space-x-4">
                                    <button className="flex-1 bg-primary hover:bg-primary-dark text-black font-bold py-3 px-6 rounded-full transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 shadow-lg border bg-red-400" onClick={() => handleAddToCart(productData, clickSize)}>
                                        <FaShoppingCart className="inline-block mr-2" />
                                        Add to Cart
                                    </button>
                                    <button className="flex-1 bg-primary hover:bg-primary-dark text-black font-bold py-3 px-6 rounded-full transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 shadow-lg border bg-blue-400">
                                        <FaShoppingCart className="inline-block mr-2" />
                                        Buy now
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
            </div>}
    </>
}
