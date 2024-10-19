import React, { useState } from 'react'
import { FaSort, FaList, FaUser, FaFilter, FaChevronDown, FaCheck } from 'react-icons/fa'

const filters = [
  { name: 'Sort By', icon: FaSort, options: ['Price: Low to High', 'Price: High to Low', 'New Arrivals', 'Popularity'] },
  { name: 'Category', icon: FaList, options: ['T-Shirts', 'Denim', 'Sweatshirts', 'Accessories'] },
  { name: 'Gender', icon: FaUser, options: ['Men', 'Women', 'Unisex'] },
  {
    name: 'More Filters', icon: FaFilter, options: [
      { name: 'Color', choices: ['Red', 'Blue', 'Green', 'Black', 'White'] },
      { name: 'Size', choices: ['S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Brand', choices: ['Nike', 'Adidas', 'Puma', 'Reebok'] }
    ]
  }
]

const products = [
  { id: 1, name: 'Classic T-Shirt', price: 19.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Denim Jeans', price: 49.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Hoodie', price: 39.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Sneakers', price: 79.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 5, name: 'Cap', price: 14.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 6, name: 'Socks Set', price: 9.99, image: '/placeholder.svg?height=200&width=200' },
]

function FilterModal({ filter, onSelect, selectedOption }) {
  const isMoreFilters = filter.name === 'More Filters';

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-lg font-semibold mb-4">{filter.name}</h2>
      {!isMoreFilters ? (
        <ul>
          {filter.options.map((option) => (
            <li key={option} className="mb-2">
              <button
                onClick={() => onSelect(option)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md flex items-center justify-between"
              >
                <span>{option}</span>
                {selectedOption === option && <FaCheck className="text-green-500" />}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          {filter.options.map((subFilter) => (
            <div key={subFilter.name} className="mb-4">
              <h3 className="font-semibold mb-2">{subFilter.name}</h3>
              <div className="flex flex-wrap gap-2">
                {subFilter.choices && subFilter.choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => onSelect({ [subFilter.name]: choice })}
                    className={`px-3 py-1 rounded-full ${selectedOption && selectedOption[subFilter.name] === choice
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function EcommerceStore() {
  const [activeFilter, setActiveFilter] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({})

  const handleFilterClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName)
  }

  const handleFilterSelect = (filterName, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: option
    }))
    setActiveFilter(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-center">E-commerce Store</h1>
      </nav>

      {/* Filter Bar */}
      <div className="sticky top-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-nowrap overflow-x-auto py-2 md:py-4 -mx-2">
            {filters.map((filter) => (
              <div key={filter.name} className="flex-shrink-0 px-2">
                <button
                  onClick={() => handleFilterClick(filter.name)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors text-sm whitespace-nowrap"
                >
                  <filter.icon className="text-gray-600" />
                  <span>{filter.name}</span>
                  <FaChevronDown className={`text-gray-600 transition-transform ${activeFilter === filter.name ? 'rotate-180' : ''}`} />
                </button>
                {activeFilter === filter.name && (
                  <div className="absolute left-0 right-0 mt-2 px-4">
                    <FilterModal
                      filter={filter}
                      onSelect={(option) => handleFilterSelect(filter.name, option)}
                      selectedOption={selectedFilters[filter.name]}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Applied Filters */}
      {Object.keys(selectedFilters).length > 0 && (
        <div className="container mx-auto px-4 py-4 bg-white shadow-md rounded-md mt-4">
          <h2 className="text-lg font-semibold mb-2">Applied Filters:</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([filterName, value]) => (
              <div key={filterName} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {filterName}: {typeof value === 'object' ? Object.values(value)[0] : value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}