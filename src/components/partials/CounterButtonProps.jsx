import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CounterButton({
  initialCount = 1,
  minCount = 1,
  maxCount = 10,
  onChange
}) {
  const [count, setCount] = useState(initialCount);

  const decrementCount = () => {
    if (count > minCount) {
      const newCount = count - 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  const incrementCount = () => {
    if (count < maxCount) {
      const newCount = count + 1;
      setCount(newCount);
      onChange?.(newCount);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 pb-6 pt-6">
      <button
        onClick={decrementCount}
        disabled={count <= minCount}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease count"
      >
        <FaChevronLeft className="text-gray-600" />
      </button>
      <span className="w-12 text-center text-lg font-semibold">{count}</span>
      <button
        onClick={incrementCount}
        disabled={count >= maxCount}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase count"
      >
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
  );
}
