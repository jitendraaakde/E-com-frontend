import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import img1 from '../../../public/product 2.png'


const products = [
  { id: 1, name: 'Product 1', description: 'Description for Product 1', image: `${img1}?height=300&width=300` },
  { id: 2, name: 'Product 2', description: 'Description for Product 2', image: `${img1}?height=300&width=300` },
  { id: 3, name: 'Product 3', description: 'Description for Product 3', image: `${img1}?height=300&width=300` },
  { id: 4, name: 'Product 4', description: 'Description for Product 4', image: `${img1}?height=300&width=300` },
  { id: 5, name: 'Product 5', description: 'Description for Product 5', image: `${img1}?height=300&width=300` },
  { id: 6, name: 'Product 6', description: 'Description for Product 6', image: `${img1}?height=300&width=300` },
]

export default function ProductCategory() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center w-full">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}