import { useEffect, useState } from 'react';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { initialFetch } from '../../store/productSlice';
import CounterButton from '../partials/CounterButtonProps';
import LoadingSpinner from '../partials/LoadingSpinner'; // Ensure you have this component

export default function Products() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;
  const dispatch = useDispatch();
  const productsObj = useSelector((state) => state.products);
  const products = productsObj?.productList || [];
  let filterObj = productsObj.filters;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://e-comm-backend-ugos.onrender.com/api/admin/all-product?page=${page}&limit=${itemsPerPage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(filterObj)
        });

        const data = await response.json();
        if (response.ok) {
          dispatch(initialFetch(data.products));
        } else {
          throw new Error(data.message || 'Error fetching products');
        }
      } catch (error) {
        console.error('Fetch failed:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, dispatch, filterObj]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.length > 0 ? (
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
        </>
      )}
    </div>
  );
}
