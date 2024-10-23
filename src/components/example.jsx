import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialFetch } from '../store/productSlice';
import CounterButton from './partials/CounterButtonProps';
import Product from './products/Product';
import { FaFilter, FaChevronDown } from 'react-icons/fa'; // Imported icons

import LoadingSpinner from './partials/LoadingSpinner';
import EcommerceStore from './filterBarProducts';
import HomePage from './Homepage/HomePage';

const Example = () => {
  return (
    <div className='mt-16'>
      {/* <FilterBar /> */}
      {/* <Products /> */}
      {/* E-coomerce store contains filter bar */}
      {/* <EcommerceStore /> */}
      {/* <Cart /> */}
      {/* <CartComponent /> */}
      {/* <LoadingSpinner></LoadingSpinner> */}
      <HomePage />

    </div>
  );
};

export default Example;

function FilterBar() {
  const [sortOption, setSortOption] = useState("Price: Low to High");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const filterArr = ['All Products', 'T-Shirt', 'Denim', 'SweatShirts', 'Polo T-Shirt', 'Shirt'];
  const sortOptions = ["Price: Low to High", "Price: High to Low", "New Arrivals", "Popularity"];

  const toggleFilterDropdown = () => setIsFilterDropdownOpen(!isFilterDropdownOpen);
  const toggleSortDropdown = () => setIsSortDropdownOpen(!isSortDropdownOpen);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center m-3 space-y-4 sm:space-y-0">
      <div className="w-full sm:w-auto">
        <button
          className="sm:hidden w-full text-sm border border-slate-700 px-3 py-2 rounded-full font-medium flex items-center justify-center"
          onClick={toggleFilterDropdown}
        >
          <FaFilter className="mr-2 h-4 w-4" />
          Filters
        </button>

        <div className="hidden sm:flex flex-wrap items-center gap-2">
          <p className="text-xs font-medium mr-2">Filters:</p>
          {filterArr.map((item, index) => (
            <button key={index} className="text-sm px-2 py-1 bg-gray-200 rounded-full">
              {item}
            </button>
          ))}
        </div>

        {isFilterDropdownOpen && (
          <div className="sm:hidden mt-2 w-full bg-white border border-slate-200 rounded-md shadow-lg">
            <div className="py-1">
              {filterArr.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 text-slate-700"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full sm:w-auto">
        <button
          className="w-full sm:w-auto text-xs sm:text-sm border border-slate-700 px-3 py-2 rounded-full font-medium flex items-center justify-center sm:justify-start"
          onClick={toggleSortDropdown}
        >
          Sort by: {sortOption}
          <FaChevronDown className="ml-2 h-4 w-4" />
        </button>

        {isSortDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg">
            <div className="py-1">
              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 text-slate-700"
                  onClick={() => {
                    setSortOption(option);
                    setIsSortDropdownOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Products() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const dispatch = useDispatch();
  const productsObj = useSelector((state) => state.products);
  const products = productsObj.productList;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/admin/all-product?page=${page}&limit=${itemsPerPage}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(initialFetch({ products: data.products })); // Dispatch properly with payload
        } else {
          const errorData = await response.json(); // Moved here to ensure error handling
          throw new Error(errorData.message || 'Error fetching products');
        }
      } catch (error) {
        console.error('Fetch failed:', error.message);
      }
    };

    fetchProducts();
  }, [page, dispatch]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <Product key={index} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <CounterButton
        initialCount={page}
        minCount={1}
        maxCount={10}
        onChange={handlePageChange}
      />
    </div>
  );
}
