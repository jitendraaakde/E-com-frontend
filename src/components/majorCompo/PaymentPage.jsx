import React, { useState } from 'react'
import Image from 'next/image'
import { CreditCard, Smartphone, Building, Wallet, Lock, ChevronDown, ChevronUp, Edit2, Plus, Check, Clock, Phone } from 'lucide-react'

const products = [
  { id: 1, name: "Wireless Headphones", price: 129.99, image: "/placeholder.svg" },
  { id: 2, name: "Smartwatch", price: 199.99, image: "/placeholder.svg" },
]

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isAddressExpanded, setIsAddressExpanded] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [isDiscountApplied, setIsDiscountApplied] = useState(false)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  const subtotal = products.reduce((sum, product) => sum + product.price, 0)
  const tax = subtotal * 0.08
  const deliveryCharge = 9.99
  const total = subtotal + tax + deliveryCharge

  const handleApplyDiscount = () => {
    setIsDiscountApplied(discountCode.toLowerCase() === 'discount10')
  }

  const renderOrderSummary = () => (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg shadow-lg border border-purple-100">
      <h2 className="text-2xl font-bold mb-4 text-purple-800">Order Summary</h2>
      <div className="space-y-4 mb-6">
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4 bg-white p-3 rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="relative w-16 h-16 overflow-hidden rounded-md">
              <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="transition-transform duration-300 hover:scale-110" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-purple-700">{product.name}</h3>
              <p className="text-sm text-purple-500">Quantity: 1</p>
            </div>
            <p className="font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
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
          <span>${deliveryCharge.toFixed(2)}</span>
        </div>
        <hr className="my-2 border-purple-200" />
        <div className="flex justify-between font-bold text-lg text-indigo-700">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )

  const renderPaymentOptions = () => (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg shadow-lg border border-indigo-100">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">Payment Method</h2>
      <div className="space-y-4">
        {[
          { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
          { value: 'upi', label: 'UPI', icon: Smartphone },
          { value: 'netbanking', label: 'Net Banking', icon: Building },
          { value: 'wallet', label: 'Wallets & Other Options', icon: Wallet },
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

      <div className="mt-6 text-sm text-indigo-600 flex items-center bg-indigo-50 p-3 rounded-md">
        <Lock className="h-4 w-4 mr-2 text-indigo-500" />
        <span>Your payment is secure. We use SSL encryption to protect your data.</span>
      </div>

      <hr className="my-6 border-indigo-200" />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-indigo-800">Billing Address</h3>
        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
          <p className="text-sm text-purple-700">123 Main St, Anytown, ST 12345</p>
          <button
            onClick={() => setIsAddressExpanded(!isAddressExpanded)}
            className="p-1 text-indigo-600 border border-indigo-300 rounded hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isAddressExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
        {isAddressExpanded && (
          <div className="mt-4 space-y-2">
            <button className="w-full p-2 text-left text-purple-700 border border-purple-300 rounded hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <Edit2 className="h-4 w-4 inline mr-2" /> Edit Address
            </button>
            <button className="w-full p-2 text-left text-purple-700 border border-purple-300 rounded hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <Plus className="h-4 w-4 inline mr-2" /> Add New Address
            </button>
          </div>
        )}
      </div>

      <hr className="my-6 border-indigo-200" />

      <div className="mb-6">
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
            onClick={handleApplyDiscount}
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
      </div>

      <button className="w-full py-4 px-6 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105">
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
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-indigo-100 to-purple-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Secure Checkout</h1>
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