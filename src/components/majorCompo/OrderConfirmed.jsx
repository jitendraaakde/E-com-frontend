import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function OrderConfirmation() {
  const navigate = useNavigate()
  const { ordersData } = useSelector(state => state.orders)
  const estimatedDelivery = "May 15, 2024"
  let subtotal = 0;
  subtotal = ordersData.products.reduce((acc, item) => acc + item.amount * item.quantity, 0)
  const tax = subtotal * 0.03;
  const shipping = 120
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center p-4 animate-slide-up">
      <div className="w-full max-w-3xl">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-400">
          <div className="text-center p-6">
            <svg className="w-20 h-20 md:w-24 md:h-24 text-cyan-800 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl md:text-2xl font-bold text-cyan-800">Thank You! Your Order Has Been Confirmed.</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Your payment was successful, and we are now preparing your order.</p>
          </div>
          <div className="px-6 pb-6 space-y-6 md:space-y-8">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-800">Order #{ordersData.orderId}</h2>

            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-cyan-800">Order Summary</h3>
              {ordersData.products.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white p-3 md:p-4 rounded-lg shadow-md">
                  <img src={item?.productId?.images[0]?.url} alt={item.productId.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm md:text-base">{item.productId.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-cyan-800 text-sm md:text-base">₹{item.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-cyan-800">Delivery Address</h3>
              <p className="text-gray-900 text-sm md:text-base ">{ordersData.shippingAddress
                .street}, {ordersData.shippingAddress
                  .city}, {ordersData.shippingAddress
                    .state}, {ordersData.shippingAddress
                      .zipCode}, Type: {ordersData.shippingAddress
                        .type}</p>

            </div>

            <div>
              <h3 className="font-semibold text-lg text-cyan-800">Estimated Delivery</h3>
              <p className="text-gray-900 text-sm md:text-base">Expected by {estimatedDelivery}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-cyan-800">Payment Summary</h3>
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg text-sm md:text-base">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base md:text-lg mt-2 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-cyan-800">₹{total.toFixed(2)}</span>
                </div>
              </div>
              {/* <p className="text-xs md:text-sm text-gray-600">Paid with Credit Card ending in 1234</p> */}
            </div>
          </div>
          <div className="px-6 pb-6 space-y-3 md:space-y-4">
            {/* <button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300 py-2 rounded">
              Track Your Order
            </button> */}
            <button onClick={() => navigate('/')} className="w-full border text-cyan-800 hover:bg-cyan-200 transition-colors duration-300 py-2 rounded">
              <svg className="w-4 h-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}