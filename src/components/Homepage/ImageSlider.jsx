import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [images, setImages] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product/products?category=Shirts');
        const data = await response.json();
        const formattedImages = data.products.map((product) => ({
          categoryName: 'Shirts',
          id: product._id,
          src: product.images[0]?.url,
          label: product.name,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const navigateTo = (categoryName) => {
    navigate(`/listings?category=${encodeURIComponent(categoryName)}`);
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const startDragging = (e) => {
    setIsDragging(true);
    if ('clientX' in e) {
      setStartX(e.clientX - sliderRef.current.offsetLeft);
    } else {
      setStartX(e.touches[0].clientX - sliderRef.current.offsetLeft);
    }
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative overflow-hidden py-8">
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 px-4"
        onMouseDown={startDragging}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={onDrag}
        onTouchStart={startDragging}
        onTouchEnd={stopDragging}
        onTouchMove={onDrag}
      >
        {images.map((image) => (
          <div onClick={() => navigateTo(image.categoryName)} key={image.id} className="flex-shrink-0 relative group">
            <img src={image.src} alt={image.label} className="w-48 h-72 object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {image.label}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
      >
        <FaChevronLeft className="text-2xl text-gray-800" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
      >
        <FaChevronRight className="text-2xl text-gray-800" />
      </button>
    </div>
  );
};

export default ImageSlider;
