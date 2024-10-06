import { FaStar } from 'react-icons/fa'

export default function Product({ isListView = false }) {
  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
      isListView ? 'flex items-center' : 'flex flex-col'
    }`}>
      <div className={`relative ${isListView ? 'w-1/3' : 'w-full aspect-square'}`}>
        <img
          src="/product_image.png"
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`p-4 ${isListView ? 'w-2/3' : 'w-full'}`}>
        <h2 className="font-bold text-lg mb-1">Puma</h2>
        <p className="text-gray-600 text-sm mb-2">Solid polo collar gray t-shirt</p>
   
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">$599</span>
          <span className="text-gray-500 line-through text-sm">$1200</span>
          <span className="text-green-600 text-sm">50% off</span>
        </div>
      </div>
    </div>
  )
}
