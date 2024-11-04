import React, { useEffect, useState } from 'react'
import { SquarePen } from 'lucide-react';
import img from '../../../public/product 2.png'

export default function OrderManagement() {
  const [orders, setOrders] = useState([])
  const [viewOrder, setViewOrder] = useState(null)

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/edit-order-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, newStatus })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('data response--------', data.response)
        setOrders(data.response)
      } else {
        throw new Error(data.message || 'Error fetching products');
      }
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }

    // setOrders(orders.map(order =>
    //   order.id === orderId ? { ...order, status: newStatus } : order
    // ))
  }

  const getOrders = async () => {
    try {
      const response = await fetch(`/api/admin/get-orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('data response--------', data.response)
        setOrders(data.response)
      } else {
        throw new Error(data.message || 'Error fetching products');
      }
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
  }

  const total = (items) => {
    return items.reduce((sum, item) => sum + item.amount * item.quantity, 0);
  }
  const calculateSum = (items) => {
    return items.reduce((sum, item) => sum + item.amount * item.quantity, 0);
  }
  const handleViewOrder = (order) => {
    setViewOrder(order)
  }

  const closeModal = () => {
    setViewOrder(null)
  }
  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Order</th>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-4 py-2 flex justify-items-center gap-2" onClick={() => handleViewOrder(order)}><SquarePen className='h-5 w-5' /> View Order</td>
              <td className="px-4 py-2">{order._id}</td>
              <td className="px-4 py-2">{order.userId.name}</td>
              <td className="px-4 py-2">${total(order.products).toFixed(2)}</td>
              <td className="px-4 py-2">{order.orderStatus}</td>
              <td className="px-4 py-2">{order.createdAt.split('T')[0]}</td>
              <td className="px-4 py-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancel">Cancel</option>
                </select>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 mt-10">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[85vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-semibold">Name: <span className="font-normal">{viewOrder.userId.name}</span></p>
                  <p className="font-semibold">Email: <span className="font-normal">{viewOrder.userId.email}</span></p>
                </div>
                <div>
                  <p className="font-semibold">Phone: <span className="font-normal">{viewOrder.userId.phone || 'N/A'}</span></p>
                  <p className="font-semibold">Order ID: <span className="font-normal">{viewOrder._id}</span></p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Order Products</h3>
              <div className="overflow-y-auto max-h-[240px] border border-gray-200 rounded-md">
                {viewOrder.products.map((prod, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border-b last:border-b-0">
                    <img src={prod.productId.images[0].url} alt={prod.productId.name} className="w-20 h-24 object-cover rounded-md" />
                    <div className="flex-1">
                      <p className="font-medium">{prod.productId.name}</p>
                      <p className="text-sm text-gray-500">ID: {prod.productId._id}</p>
                      <div className="flex space-x-4 mt-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">Size: {prod.size.size}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">Qty: {prod.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div>
                  <p className="flex items-center mb-1">
                    <span className="font-semibold">Order Status:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{viewOrder.orderStatus}</span>
                  </p>
                  <p className="flex items-center mb-1">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="text-green-600 font-bold">${calculateSum(viewOrder.products).toFixed(2)}</span>
                  </p>
                  <p className="font-semibold">
                    Order Date: <span className="font-normal">{new Date(viewOrder.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Shipping Address:</h4>
                  <address className="not-italic">
                    {viewOrder.shippingAddress.street}
                    {viewOrder.shippingAddress.city}, {viewOrder.shippingAddress.state} {viewOrder.shippingAddress.zipCode}
                    {viewOrder.shippingAddress.country}
                    <p className="italic mt-1">({viewOrder.shippingAddress.type} address)</p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>)}
    </div >

  )
}

function orderDetails() {
  return <>

  </>
}