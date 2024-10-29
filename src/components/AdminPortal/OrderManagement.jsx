import React, { useEffect, useState } from 'react'
import { SquarePen } from 'lucide-react';
import img from '../../../public/product 2.png'

export default function OrderManagement() {
  const [orders, setOrders] = useState([])

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
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
        console.log('data response', data.response)
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
            <tr key={order.id}>
              <td className="px-4 py-2 flex justify-items-center gap-2"><SquarePen className='h-5 w-5' /> View Order</td>
              <td className="px-4 py-2">{order._id}</td>
              <td className="px-4 py-2">{order.userId.name}</td>
              <td className="px-4 py-2">${total(order.products).toFixed(2)}</td>
              <td className="px-4 py-2">{order.orderStatus}</td>
              <td className="px-4 py-2">{order.createdAt.split('T')[0]}</td>
              <td className="px-4 py-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-10">
        <div className="bg-white p-8 rounded-lg max-w-3xl w-full space-y-4">
          {/* Header Section */}
          <div className="flex justify-between text-lg">
            <p><span className="font-semibold">Name:</span> Jitendra Aakde</p>
            <p><span className="font-semibold">Email:</span> jitendra.aakde@systango.com</p>
          </div>

          <div className="flex justify-between text-lg">
            <p><span className="font-semibold">Phone:</span> 9340054112</p>
            <p><span className="font-semibold">Order Id:</span> jnfdjkfndjfn78347</p>
          </div>

          <h1 className="text-xl font-bold border-b pb-2">Order Products</h1>

          {/* Product List */}
          <div className="overflow-y-auto h-48 space-y-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex bg-slate-100 rounded-lg p-2 shadow-sm">
                <img src={img} alt="Product" className="w-20 h-20 object-cover rounded-md mr-4" />
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold">Id:</span> jiterijfhte74389473847</p>
                  <p><span className="font-semibold">Name:</span> Classic Cotton T-Shirt</p>
                  <p><span className="font-semibold">Size:</span> XL</p>
                  <p><span className="font-semibold">Quantity:</span> 1</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment & Address Section */}
          <div className="grid grid-cols-2 gap-8 mt-4 text-sm">
            <div>
              <p><span className="font-semibold">Payment Type:</span> COD</p>
              <p><span className="font-semibold">Order Status:</span> Pending</p>
              <p><span className="font-semibold">Total Amount:</span> $1222</p>
              <p><span className="font-semibold">Order Date:</span> 24-01-2023</p>
            </div>

            <div>
              <p className="font-semibold">Order Address:</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p><span className="font-semibold">Street:</span> Rua Inexistente, 2000</p>
                  <p><span className="font-semibold">City:</span> Belo Horizonte</p>
                  <p><span className="font-semibold">State:</span> MG</p>
                </div>
                <div>
                  <p><span className="font-semibold">Country:</span> Brazil</p>
                  <p><span className="font-semibold">Zip Code:</span> 11001</p>
                  <p><span className="font-semibold">Type:</span> Home</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

function orderDetails() {
  return <>

  </>
}