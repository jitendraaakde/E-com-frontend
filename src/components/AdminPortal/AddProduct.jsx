import React, { useState } from 'react';
import { FaPlus, FaRedoAlt } from 'react-icons/fa';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    mrp: '',
    discount: '',
    sku: '',
    category: '',
    sizes: [],
    stock: '',
    images: [],
    status: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSizeChange = (size) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: prevProduct.sizes.includes(size)
        ? prevProduct.sizes.filter((s) => s !== size)
        : [...prevProduct.sizes, size],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...files].slice(0, 4),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting product:', product);
    // Send data to your backend or perform any action here
  };

  const handleReset = () => {
    setProduct({
      name: '',
      brand: '',
      description: '',
      price: '',
      mrp: '',
      discount: '',
      sku: '',
      category: '',
      sizes: [],
      stock: '',
      images: [],
      status: true,
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">MRP</label>
            <input
              type="number"
              name="mrp"
              value={product.mrp}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Discount Percentage</label>
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="shirts">Shirts</option>
              <option value="trousers">Trousers</option>
              <option value="dresses">Dresses</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Available Sizes</label>
          <div className="flex flex-wrap gap-4">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  checked={product.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Product Images (up to 4)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Product image ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="status"
              checked={product.status}
              onChange={handleChange}
              className="mr-2"
            />
            Active
          </label>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaPlus className="inline mr-1" />
            Add Product
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <FaRedoAlt className="inline mr-1" />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
