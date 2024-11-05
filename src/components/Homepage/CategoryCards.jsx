import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFilterProducts } from '../../store/productSlice';
import { useNavigate } from 'react-router-dom';

export default function CategoryCards() {
  const [categoriesProduct, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const hardcodedCategoryNames = ['T-Shirt', 'Shirts', 'Jeans', 'Formal Shirts'];

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/product/categories', {
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
  const navigateTo = (categoryName) => {
    navigate(`/listings?category=${encodeURIComponent(categoryName)}`);
  };


  const fetchCategoryProducts = async (categories) => {
    try {
      const categoriesWithProducts = await Promise.all(
        categories.map(async (category) => {
          const productResponse = await fetch(`/api/product/categoryProduct/${category._id}`, {
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
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoriesProduct.slice(0, 4).map((category) => (

          <div
            key={category._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigateTo(category.name)}>
            <h3 className="text-xl font-semibold p-4 bg-gray-100">
              {category.name}
            </h3>
            <div className="grid grid-cols-2 gap-2 p-4">
              {category.products.products.slice(0, 4).map((product, index) => (
                <img
                  key={index}
                  src={product?.images[0]?.url}
                  alt={`${category.name} Product ${index + 1}`}
                  className=" object-cover w-40 h-44 rounded transform hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
