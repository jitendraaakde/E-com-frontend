import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Product({ product }) {

  const calculateAmount = (price, disPercent) => {
    return Math.round(price - (price * (disPercent / 100)))
  }
  return (
    <Link to={`/product/${product._id}`}>
      <div className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col`}>
        <div className={`relative w-full aspect-square`}>
          <img
            src={product?.images[0]?.url}
            alt="Product"
            className="w-full h-full object-cover max-h-72 max-w-full"
          />
        </div>
        <div className={`p-4 w-full`}>
          <h2 className="font-bold text-lg mb-1 text-cyan-800">{product.brand.name}</h2>
          <p className="text-gray-600 text-sm mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{product.name}</p>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">₹{calculateAmount(product.price, product.discountPercentage)}</span>
            <span className="text-gray-500 line-through text-sm">₹{product.price}</span>
            <span className=" text-sm text-cyan-800">{product.discountPercentage}% off</span>
          </div>
        </div>
      </div>
    </Link>

  )
}
