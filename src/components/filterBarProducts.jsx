import React, { useState, useEffect } from 'react'
import { ChevronDown, SlidersHorizontal, ArrowUpDown, Grid3X3, Users } from 'lucide-react'

const filters = [
  {
    name: 'Sort By',
    icon: ArrowUpDown,
    options: [
      'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Featured', 'Discount',
    ]
  },
  {
    name: 'Category',
    icon: Grid3X3,
    options: [
      'T-Shirts'
    ]
  },
  {
    name: 'Gender',
    icon: Users,
    options: [
      'Women', 'Men'
    ]
  },
  {
    name: 'Size',
    icon: Users,
    options: [
      'S', 'M', 'L', 'XL', 'XXL', '3XL',
    ]
  },
  {
    name: 'Brand',
    icon: Users,
    options: [
      'Nike',
    ]
  },
  // {
  //   name: 'More Filters',
  //   icon: SlidersHorizontal,
  //   options: [
  //     {
  //       name: 'Size',
  //       choices: [
  //         'S', 'M', 'L', 'XL', 'XXL', '3XL',
  //       ]
  //     },
  //     {
  //       name: 'Brand',
  //       choices: [
  //         'Nike',
  //       ]
  //     }
  //   ]
  // }
]

function FilterDropdown({ filter, onSelect, selectedOption, openFilter, setOpenFilter }) {
  const isOpen = openFilter === filter.name

  return (
    <div className="relative">
      <button
        onClick={() => setOpenFilter(isOpen ? null : filter.name)}
        className={`flex items-center gap-2 px-4 py-2 bg-slate-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 ${selectedOption ? 'ring-1 ring-indigo-300' : ''}`}
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
        className={`flex items-center gap-2 px-4 bg-slate-200 py-2 
           text-gray-800 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 ${Object.keys(selectedFilters).length > 0 ? 'ring-1 ring-indigo-300' : ''}`}
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

  const sendAllFiltersToBackend = async (filters) => {
    console.log(filters)
    try {
      const response = await fetch(`/api/product/filters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters)
      });

      const data = await response.json();
      if (response.ok) {
        console.log('data', data)
        // dispatch(initialFetch(data.products));
      } else {
        throw new Error(data.message || 'Error fetching products');
      }
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
  }

  return (
    <div className="w-full p-2 shadow-md fixed bg-white z-40">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            // filter.name !== 'More Filters' ? (
            <FilterDropdown
              key={filter.name}
              filter={filter}
              onSelect={handleFilterSelect}
              selectedOption={selectedFilters[filter.name]}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
            />
            // ) : (
            //   isLargeScreen ? (
            //     <MoreFiltersLarge
            //       key={filter.name}
            //       filter={filter}
            //       onSelect={handleFilterSelect}
            //       selectedFilters={selectedFilters}
            //       openFilter={openFilter}
            //       setOpenFilter={setOpenFilter}
            //     />
            //   ) : (
            //     <MoreFiltersSmall
            //       key={filter.name}
            //       filter={filter}
            //       onSelect={handleFilterSelect}
            //       selectedFilters={selectedFilters}
            //       openFilter={openFilter}
            //       setOpenFilter={setOpenFilter}
            //     />
            //   )
            // )
          ))}
        </div>
      </div>
    </div>
  )
}