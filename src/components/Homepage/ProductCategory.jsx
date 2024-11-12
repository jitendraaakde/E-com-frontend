import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import img1 from '../../../public/product 2.png'
import { Link } from 'react-router-dom';

export default function ProductCategory() {
  const [categoriesProduct, setCategories] = useState([]);
  const [error, setError] = useState(null);
  console.log('categoriesProduct', categoriesProduct)

  const hardcodedCategoryNames = ['T-Shirt', 'Shirts', 'Jeans', 'Formal Shirts', 'Casual Shirts', 'Kurta'];

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://e-comm-backend-ugos.onrender.com/api/product/categories', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch categories');

      const fetchedCategories = await response.json();

      if (!Array.isArray(fetchedCategories)) {
        throw new Error('Fetched categories is not an array');
      }

      const selectedCategories = fetchedCategories.filter((category) =>
        hardcodedCategoryNames.includes(category.name)
      );

      return selectedCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message);
      return [];
    }
  };

  const fetchCategoryProducts = async (categories) => {
    try {
      const categoriesWithProducts = await Promise.all(
        categories.map(async (category) => {
          const productResponse = await fetch(`https://e-comm-backend-ugos.onrender.com/api/product/categoryProduct/${category._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!productResponse.ok) throw new Error('Failed to fetch products');

          const products = await productResponse.json();

          return { ...category, products };
        })
      );

      console.log('categoriesWithProducts', categoriesWithProducts);
      setCategories(categoriesWithProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const selectedCategories = await fetchCategories();
      await fetchCategoryProducts(selectedCategories);
    };

    fetchData();
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesProduct.map((product) => (
          <Link to={`/product/${product?.products.products[0]._id}`} key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={product?.products.products[0].images[0].url} alt={product.name} className="w-full h-[26rem] object-cover transform hover:scale-105 transition-transform duration-300" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors duration-300">{product?.products.products[0].brand.name}</h3>
              <p className="text-gray-600 mb-4">{product?.products.products[0].name}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center w-full">
                <FaShoppingCart className="mr-2" />
                Buy Now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}