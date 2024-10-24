import React, { useState } from 'react'
import { CreditCard, Smartphone, Building, Wallet, Lock, ChevronDown, ChevronUp, Edit2, Plus, Check, Clock, Phone } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';



export default function PaymentPage() {
  const cart = useSelector(state => state.cart)
  let products = cart.items
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)
  const location = useLocation();
  const { selectedAddress } = location.state || {};

  const calculateAmount = (price, disPercent) =>
    Math.round(price - (price * (disPercent / 100)));
  const subtotal = products.reduce(
    (sum, item) =>
      sum + calculateAmount(item.productId.price, item.productId.discountPercentage) * item.quantity,
    0
  );
  const shipping = 120;
  const tax = subtotal * 0.03;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    console.log('Shipping address', selectedAddress)
    console.log('cart items ', cart.items)
  }

  const renderOrderSummary = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-purple-800">Order Summary</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
        <div className="space-y-4 mb-6">
          {products.map((product) => (
            <div key={product.productId._id} className="flex items-center space-x-4 bg-gray-200 p-3 rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="relative w-16 h-22 overflow-hidden rounded-md">
                <img src={product.productId.images[0].url} alt={product.productId.name} layout="fill" objectFit="cover" className="transition-transform duration-300 hover:scale-110" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-purple-700">{product.productId.name}</h3>
                <p className="text-sm text-purple-500">Quantity: {product.quantity}</p>
              </div>
              <p className="font-semibold text-indigo-600">${product.productId.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <hr className="my-4 border-purple-200" />
        <div className="space-y-2 text-purple-800">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <hr className="my-2 border-purple-200" />
          <div className="flex justify-between font-bold text-lg text-indigo-700">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  )

  const renderPaymentOptions = () => (<>
    <h2 className="text-2xl font-bold mb-4 text-indigo-800">Payment Method</h2>
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg shadow-lg border border-indigo-100">
      <div className="space-y-4">
        {[
          { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
          { value: 'upi', label: 'UPI', icon: Smartphone },
          { value: 'netbanking', label: 'Net Banking', icon: Building },
        ].map(({ value, label, icon: Icon }) => (
          <div key={value} className="flex items-center space-x-2 bg-white p-3 rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
            <input
              type="radio"
              id={value}
              name="paymentMethod"
              value={value}
              checked={paymentMethod === value}
              onChange={() => setPaymentMethod(value)}
              className="text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor={value} className="flex items-center space-x-2 cursor-pointer w-full">
              <Icon className="h-5 w-5 text-indigo-600" />
              <span className="text-purple-700">{label}</span>
            </label>
          </div>
        ))}
      </div>

      {paymentMethod === 'card' && (
        <div className="mt-4 space-y-4 bg-white p-4 rounded-md shadow-inner">
          <input type="text" placeholder="Card Number" className="w-full p-2 border border-indigo-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="MM/YY" className="w-full p-2 border border-indigo-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="CVV" className="w-full p-2 border border-indigo-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <input type="text" placeholder="Name on Card" className="w-full p-2 border border-indigo-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="saveCard" className="text-purple-600 focus:ring-purple-500" />
            <label htmlFor="saveCard" className="text-purple-700">Save card for future payments</label>
          </div>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div className="mt-4 bg-white p-4 rounded-md shadow-inner">
          <input type="text" placeholder="Enter UPI ID" className="w-full p-2 border border-indigo-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      )}

      {paymentMethod === 'netbanking' && (
        <div className="mt-4 bg-white p-4 rounded-md shadow-inner">
          <select className="w-full p-2 border border-indigo-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select your bank</option>
            <option value="bank1">Bank 1</option>
            <option value="bank2">Bank 2</option>
            <option value="bank3">Bank 3</option>
          </select>
        </div>
      )}

      <hr className="my-6 border-indigo-200" />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-indigo-800">Billing Address</h3>
        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
          <p className="text-sm text-purple-700">{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}</p>
          <p className="text-sm text-purple-700">Type: {selectedAddress.type}</p>

        </div>

      </div>

      <hr className="my-6 border-indigo-200" />

      {/* <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-indigo-800">Discount Code</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-grow p-2 border border-indigo-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Apply
          </button>
        </div>
        {isDiscountApplied && (
          <p className="text-green-600 mt-2 flex items-center">
            <Check className="h-4 w-4 mr-1" /> Discount applied successfully!
          </p>
        )}
      </div> */}

      <button onClick={handlePlaceOrder} className="w-full py-4 px-6 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105">
        Place Order
      </button>

      <div className="mt-4 space-y-2 text-sm text-indigo-600">
        <p className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Expected delivery: 3-5 business days
        </p>
        <p className="flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          Need help? <a href="#" className="text-purple-600 hover:underline ml-1">Contact customer support</a>
        </p>
      </div>
    </div>
  </>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            {renderOrderSummary()}
          </div>
          <div className="lg:col-span-1">
            {renderPaymentOptions()}
          </div>
        </div>

        <div className="lg:hidden mt-8">
          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isMobileExpanded ? 'Hide Details' : 'Show Details'}
            {isMobileExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>

        {isMobileExpanded && (
          <div className="lg:hidden mt-4 space-y-8">
            {renderOrderSummary()}
            {renderPaymentOptions()}
          </div>
        )}
      </div>
    </div>
  )
}