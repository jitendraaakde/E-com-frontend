import { useState } from 'react'
import Product from "./Product"
import { FaThLarge, FaThList } from 'react-icons/fa'

export default function Products() {
  const [isGridView, setIsGridView] = useState(true)
  const products = Array(20).fill(null) // Simulating 20 products

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
      </div>
      <div className={`grid gap-4 ${
        isGridView 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
          : 'grid-cols-1'
      }`}>
        {products.map((_, index) => (
          <Product key={index} isListView={!isGridView} />
        ))}
      </div>
    </div>
  )
}
