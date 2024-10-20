'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown, SlidersHorizontal, ArrowUpDown, Grid3X3, Users } from 'lucide-react'

const filters = [
  { 
    name: 'Sort By', 
    icon: ArrowUpDown, 
    options: [
      'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Best Selling', 'Customer Rating',
      'Name: A-Z', 'Name: Z-A', 'Most Viewed', 'Most Favorited', 'Featured', 'Discount', 'Relevance',
      'Trending', 'Limited Edition', 'Eco-Friendly', 'Handmade', 'Exclusive', 'Bestsellers',
      'Staff Picks', 'Clearance'
    ]
  },
  { 
    name: 'Category', 
    icon: Grid3X3, 
    options: [
      'T-Shirts', 'Jeans', 'Dresses', 'Jackets', 'Sweaters', 'Skirts', 'Shorts', 'Activewear',
      'Swimwear', 'Underwear', 'Socks', 'Accessories', 'Shoes', 'Bags', 'Jewelry', 'Watches',
      'Hats', 'Scarves', 'Gloves', 'Sunglasses'
    ]
  },
  { 
    name: 'Gender', 
    icon: Users, 
    options: [
      'Women', 'Men', 'Unisex', 'Kids', 'Girls', 'Boys', 'Toddler', 'Baby', 'Maternity',
      'Plus Size', 'Petite', 'Tall', 'Juniors', 'Seniors', 'Teens', 'Adults', 'Children',
      'Infants', 'Family', 'Couples'
    ]
  },
  { 
    name: 'More Filters', 
    icon: SlidersHorizontal, 
    options: [
      { 
        name: 'Color', 
        choices: [
          { name: 'Black', hex: '#000000' },
          { name: 'White', hex: '#FFFFFF' },
          { name: 'Red', hex: '#FF0000' },
          { name: 'Blue', hex: '#0000FF' },
          { name: 'Green', hex: '#00FF00' },
          { name: 'Yellow', hex: '#FFFF00' },
          { name: 'Purple', hex: '#800080' },
          { name: 'Pink', hex: '#FFC0CB' },
          { name: 'Orange', hex: '#FFA500' },
          { name: 'Brown', hex: '#A52A2A' },
          { name: 'Gray', hex: '#808080' },
          { name: 'Navy', hex: '#000080' },
          { name: 'Beige', hex: '#F5F5DC' },
          { name: 'Teal', hex: '#008080' },
          { name: 'Maroon', hex: '#800000' },
          { name: 'Olive', hex: '#808000' },
          { name: 'Coral', hex: '#FF7F50' },
          { name: 'Turquoise', hex: '#40E0D0' },
          { name: 'Lavender', hex: '#E6E6FA' },
          { name: 'Gold', hex: '#FFD700' }
        ]
      },
      { 
        name: 'Size', 
        choices: [
          'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL',
          '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'
        ]
      },
      { 
        name: 'Brand', 
        choices: [
          'Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Levi\'s', 'Calvin Klein', 'Tommy Hilfiger', 'Ralph Lauren', 'Puma',
          'Under Armour', 'New Balance', 'Converse', 'Vans', 'The North Face', 'Uniqlo', 'Gap', 'Lacoste', 'Reebok', 'Fila'
        ]
      }
    ]
  }
]

function FilterDropdown({ filter, onSelect, selectedOption, openFilter, setOpenFilter }) {
  const isOpen = openFilter === filter.name

  return (
    <div className="relative">
      <button
        onClick={() => setOpenFilter(isOpen ? null : filter.name)}
        className={`flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${selectedOption ? 'ring-2 ring-indigo-500' : ''}`}
      >
        <filter.icon className="h-4 w-4" />
        {filter.name}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-h-60 overflow-auto">
            {filter.options.map((option) => (
              <button
                key={option}
                className={`block w-full text-left px-4 py-2 text-sm ${option === selectedOption ? 'bg-gray-800 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                onClick={() => {
                  onSelect(filter.name, option)
                  setOpenFilter(null)
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MoreFiltersLarge({ filter, onSelect, selectedFilters, openFilter, setOpenFilter }) {
  const isOpen = openFilter === filter.name
  const [openAccordion, setOpenAccordion] = useState(null)

  return (
    <div className="relative">
      <button
        onClick={() => setOpenFilter(isOpen ? null : filter.name)}
        className={`flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${Object.keys(selectedFilters).length > 0 ? 'ring-2 ring-indigo-500' : ''}`}
      >
        <filter.icon className="h-4 w-4" />
        {filter.name}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-h-96 overflow-auto">
            {filter.options.map((subFilter) => (
              <div key={subFilter.name} className="px-4 py-2">
                <button
                  className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setOpenAccordion(openAccordion === subFilter.name ? null : subFilter.name)}
                >
                  {subFilter.name}
                  <ChevronDown className={`h-4 w-4 transform transition-transform ${openAccordion === subFilter.name ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === subFilter.name && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {subFilter.choices.map((choice) => (
                      <button
                        key={typeof choice === 'string' ? choice : choice.name}
                        className={`flex items-center justify-start px-2 py-1 text-sm rounded-md ${selectedFilters[subFilter.name] === (typeof choice === 'string' ? choice : choice.name) ? 'bg-gray-800 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => onSelect(subFilter.name, typeof choice === 'string' ? choice : choice.name)}
                      >
                        {subFilter.name === 'Color' && (
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: choice.hex }}
                          />
                        )}
                        {typeof choice === 'string' ? choice : choice.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MoreFiltersSmall({ filter, onSelect, selectedFilters, openFilter, setOpenFilter }) {
  const isOpen = openFilter === filter.name

  return (
    <div className="relative">
      <button
        onClick={() => setOpenFilter(isOpen ? null : filter.name)}
        className={`flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${Object.keys(selectedFilters).length > 0 ? 'ring-2 ring-indigo-500' : ''}`}
      >
        <filter.icon className="h-4 w-4" />
        {filter.name}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-h-60 overflow-auto">
            {filter.options.map((subFilter) => (
              <div key={subFilter.name}>
                <div className="px-4 py-2 text-sm font-medium text-gray-700">{subFilter.name}</div>
                {subFilter.choices.map((choice) => (
                  <button
                    key={typeof choice === 'string' ? choice : choice.name}
                    className={`block w-full text-left px-4 py-2 text-sm ${selectedFilters[subFilter.name] === (typeof choice === 'string' ? choice : choice.name) ? 'bg-gray-800 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                    onClick={() => {
                      onSelect(subFilter.name, typeof choice === 'string' ? choice : choice.name)
                      setOpenFilter(null)
                    }}
                  >
                    {subFilter.name === 'Color' && (
                      <div
                        className="w-4 h-4 rounded-full mr-2 inline-block"
                        style={{ backgroundColor: choice.hex }}
                      />
                    )}
                    {typeof choice === 'string' ? choice : choice.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Component() {
  const [selectedFilters, setSelectedFilters] = useState({})
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [openFilter, setOpenFilter] = useState(null)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleFilterSelect = (filterName, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: option
    }))

    sendAllFiltersToBackend({ ...selectedFilters, [filterName]: option })
  }

  const sendAllFiltersToBackend = (filters) => {
    console.log('Sending all filters to backend:', filters)
  }

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            filter.name !== 'More Filters' ? (
              <FilterDropdown 
                key={filter.name} 
                filter={filter} 
                onSelect={handleFilterSelect}
                selectedOption={selectedFilters[filter.name]}
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
              />
            ) : (
              isLargeScreen ? (
                <MoreFiltersLarge 
                  key={filter.name} 
                  filter={filter} 
                  onSelect={handleFilterSelect}
                  selectedFilters={selectedFilters}
                  openFilter={openFilter}
                  setOpenFilter={setOpenFilter}
                />
              ) : (
                <MoreFiltersSmall 
                  key={filter.name} 
                  filter={filter} 
                  onSelect={handleFilterSelect}
                  selectedFilters={selectedFilters}
                  openFilter={openFilter}
                  setOpenFilter={setOpenFilter}
                />
              )
            )
          ))}
        </div>
      </div>
    </div>
  )
}