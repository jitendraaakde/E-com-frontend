// AllProducts.js
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

export default function AllProducts({ onEdit }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'T-Shirt', brand: 'Brand A', price: 19.99, stock: 100, image: 'placeholder.jpg' },
    { id: 2, name: 'Jeans', brand: 'Brand B', price: 49.99, stock: 50, image: 'placeholder.jpg' },
    // Add more sample products here
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [search, setSearch] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 pl-10 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('name')}>Name</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('brand')}>Brand</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('price')}>Price</th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('stock')}>Stock</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentItems.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="py-3 px-6 text-left">{product.name}</td>
                <td className="py-3 px-6 text-left">{product.brand}</td>
                <td className="py-3 px-6 text-left">${product.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{product.stock}</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex item-center justify-center">
                    <button
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                      onClick={() => onEdit(product)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex mb-4 sm:mb-0">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-4 py-2 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-gray-400`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} entries
        </div>
      </div>
    </div>
  );
}
