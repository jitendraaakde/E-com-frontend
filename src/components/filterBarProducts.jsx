import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { TbCategory2 } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { RxSize } from "react-icons/rx";
import { TbArrowsUpDown } from "react-icons/tb";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { getFilterProducts } from '../store/productSlice';

const initialFilters = [
  {
    name: 'Sort By',
    icon: TbArrowsUpDown,
    options: [
      'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Featured', 'Discount',
    ]
  },
  {
    name: 'Gender',
    icon: BsPersonCircle,
    options: [
      'Women', 'Men', 'Kids'
    ]
  },
  {
    name: 'Category',
    icon: TbCategory2,
    options: [],
  },
  {
    name: 'Size',
    icon: RxSize,
    options: [],
  },
  {
    name: 'Brand',
    icon: MdOutlineBrandingWatermark,
    options: [],
  },
];

function FilterDropdown({ filter, onSelect, selectedOption, openFilter, setOpenFilter }) {
  const isOpen = openFilter === filter.name;
  return (
    <div className="relative">
      <button
        onClick={() => setOpenFilter(isOpen ? null : filter.name)}
        className={`flex items-center gap-2 px-4 py-1 text-black shadow-sm
            focus:outline-none focus:ring-offset-2
             ${selectedOption ? 'ring-1 ring-indigo-300' : ''}`}
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
                  onSelect(filter.name, option);
                  setOpenFilter(null);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Filters() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();

  const getInitialFiltersData = async () => {
    try {
      const response = await fetch(`/api/product/category-brand-size`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok) {
        setFilters((prevFilters) => {
          return prevFilters.map(filter => {
            if (filter.name === 'Category') {
              return { ...filter, options: data.categories.map(cat => cat.name) };
            }
            if (filter.name === 'Size') {
              return { ...filter, options: data.sizes.map(size => size.size) };
            }
            if (filter.name === 'Brand') {
              return { ...filter, options: data.brands.map(brand => brand.name) };
            }
            return filter;
          });
        });
      } else {
        throw new Error(data.message || 'Error fetching products');
      }
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
  };

  useEffect(() => {
    getInitialFiltersData();
  }, []);

  const handleFilterSelect = (filterName, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: option
    }));
    sendAllFiltersToBackend({ ...selectedFilters, [filterName]: option });
  };

  const sendAllFiltersToBackend = async (filters) => {
    dispatch(getFilterProducts(filters));
  };

  return (
    <div className="w-full p-2 shadow-md fixed bg-white z-40">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <div className="flex flex-wrap gap-2">
            {filters
              .filter((filter) => filter.name !== 'Sort By')
              .map((filter) => (
                <FilterDropdown
                  key={filter.name}
                  filter={filter}
                  onSelect={handleFilterSelect}
                  selectedOption={selectedFilters[filter.name]}
                  openFilter={openFilter}
                  setOpenFilter={setOpenFilter}
                />
              ))}
          </div>
          {filters.some((filter) => filter.name === 'Sort By') && (
            <div>
              <FilterDropdown
                key="Sort By"
                filter={filters.find((f) => f.name === 'Sort By')}
                onSelect={handleFilterSelect}
                selectedOption={selectedFilters['Sort By']}
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
