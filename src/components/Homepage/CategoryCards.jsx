import React from 'react'

const categories = [
  {
    id: 1,
    title: "Men's Clothing",
    images: [
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
    ],
  },
  {
    id: 2,
    title: "Women's Clothing",
    images: [
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
    ],
  },
  {
    id: 3,
    title: 'Electronics',
    images: [
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
    ],
  },
  {
    id: 4,
    title: 'Home & Kitchen',
    images: [
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
      '/placeholder.svg?height=150&width=150',
    ],
  },
]

export default function CategoryCards() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold p-4 bg-gray-100">{category.title}</h3>
            <div className="grid grid-cols-2 gap-2 p-4">
              {category.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${category.title} ${index + 1}`}
                  className="w-full h-auto object-cover rounded transform hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}