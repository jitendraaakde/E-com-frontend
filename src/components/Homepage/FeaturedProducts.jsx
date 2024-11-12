import React, { useEffect, useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function FeaturedProducts({ category = 'jeans' }) {
  const [products, setProducts] = useState([]);
  const calculateAmount = (price, disPercent) => {
    return Math.round(price - (price * (disPercent / 100)))
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://e-comm-backend-ugos.onrender.com/api/product/products?category=Jeans`);
        const data = await response.json();
        console.log(data)
        const formattedProducts = data.products.map((product) => ({
          id: product._id,
          name: product.name,
          price: calculateAmount(product.price, product.discountPercentage),
          rating: product.rating,
          image: product?.images[0]?.url,
          badge: product.badge || 'Featured',
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (

            <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-80   object-cover" />
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  {product.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-ellipsis whitespace-nowrap overflow-hidden ">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">${product.price.toFixed(2)}</span>

                </div>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  Buy Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
