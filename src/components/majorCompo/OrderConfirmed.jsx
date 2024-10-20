import React from 'react'

export default function OrderConfirmation() {
  const orderNumber = "12345"
  const estimatedDelivery = "May 15, 2024"
  const orderDetails = [
    { name: "Wireless Earbuds", quantity: 1, price: 129.99, image: "/placeholder.svg?height=80&width=80" },
    { name: "Smart Watch", quantity: 1, price: 199.99, image: "/placeholder.svg?height=80&width=80" },
  ]
  const subtotal = orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = 9.99
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-lg overflow-hidden">
          <div className="text-center p-6">
            <svg className="w-20 h-20 md:w-24 md:h-24 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl md:text-3xl font-bold text-purple-700">Thank You! Your Order Has Been Confirmed.</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Your payment was successful, and we are now preparing your order.</p>
          </div>
          <div className="px-6 pb-6 space-y-6 md:space-y-8">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-semibold text-pink-600">Order #{orderNumber}</h2>
              <button className="mt-2 px-4 py-2 border border-pink-600 text-pink-600 rounded hover:bg-pink-100 transition-colors duration-300 text-sm">
                <svg className="w-4 h-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Invoice
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-purple-600">Order Summary</h3>
              {orderDetails.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white p-3 md:p-4 rounded-lg shadow-md">
                  <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm md:text-base">{item.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-pink-600 text-sm md:text-base">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-purple-600">Delivery Address</h3>
              <p className="text-gray-600 text-sm md:text-base">123 Main St, Anytown, ST 12345, USA</p>
              <button className="px-3 py-1 border border-purple-600 text-purple-600 rounded text-xs md:text-sm hover:bg-purple-100 transition-colors duration-300">
                <svg className="w-3 h-3 md:w-4 md:h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit for future orders
              </button>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-purple-600">Estimated Delivery</h3>
              <p className="text-gray-600 text-sm md:text-base">Expected by {estimatedDelivery}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-purple-600">Payment Summary</h3>
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg text-sm md:text-base">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base md:text-lg mt-2 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-pink-600">${total.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-600">Paid with Credit Card ending in 1234</p>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-3 md:space-y-4">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300 py-2 rounded">
              Track Your Order
            </button>
            <button className="w-full border border-purple-600 text-purple-600 hover:bg-pink-100 transition-colors duration-300 py-2 rounded">
              <svg className="w-4 h-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-8 text-center text-white">
        <h3 className="font-semibold mb-2 text-sm md:text-base">Need Help?</h3>
        <button className="text-white hover:text-pink-200 transition-colors duration-300 text-sm md:text-base">
          <svg className="w-4 h-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Contact Customer Support
        </button>
      </div>
    </div>
  )
}