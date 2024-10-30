import React from 'react'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import img1 from '../../../public/product 2.png'


const featuredProducts = [
  { id: 1, name: 'Best Seller 1', price: 99.99, rating: 4.5, image: `${img1}?height=300&width=300`, badge: 'Best Seller' },
  { id: 2, name: 'Limited Offer 1', price: 79.99, rating: 4.2, image: `${img1}?height=300&width=300`, badge: 'Limited Time' },
  { id: 3, name: 'New Arrival 1', price: 129.99, rating: 4.8, image: `${img1}?height=300&width=300`, badge: 'New Arrival' },
  { id: 4, name: 'Best Seller 2', price: 89.99, rating: 4.6, image: `${img1}?height=300&width=300`, badge: 'Best Seller' },
]

export default function FeaturedProducts() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  {product.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}