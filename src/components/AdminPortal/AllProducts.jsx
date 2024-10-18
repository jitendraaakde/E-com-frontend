import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { editProduct } from '../../store/adminSlice';

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch()


  const fetchProducts = async (page) => {
    try {
      const response = await fetch(`/api/admin/all-product?page=${page}&limit=${itemsPerPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProducts(data.products);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
      } else {
        throw new Error(data.message || 'Error fetching products');
      }
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/admin/delete-product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
  }
  const handleEdit = (id) => {
    const productToEdit = filteredProducts.find((product) => product._id === id);
    dispatch(editProduct(productToEdit))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
      setProducts(products.filter((product) => product._id !== id));
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.brand.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Brand</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <img
                    src={product?.images?.length > 0 && product?.images[0]?.url}
                    alt={product.name || 'Product Image'}
                    className="w-16 h-18 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6 text-left">{product.name}</td>
                <td className="py-3 px-6 text-left">{product.brand.name}</td>
                <td className="py-3 px-6 text-left">${product.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{product.stock}</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex item-center justify-center">
                    <button className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                      onClick={() => handleEdit(product._id)}
                    >
                      <FaEdit className='text-xl' />
                    </button>
                    <button
                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash className='text-xl' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex mb-4 sm:mb-0">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              className={`px-4 py-2 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-gray-400`}
              onClick={() => setCurrentPage(number + 1)}
            >
              {number + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts} entries
        </div>
      </div>
    </div>
  );
}
