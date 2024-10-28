import React, { useEffect, useState } from 'react'

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
        setOrders(data.response)
      } else {
        throw new Error(data.message || 'Error fetching products');
      }
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
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
              <td className="px-4 py-2">{order._id}</td>
              <td className="px-4 py-2">{order.customerName}</td>
              {/* <td className="px-4 py-2">${order.total.toFixed(2)}</td> */}
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">{order.date}</td>
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
    </div>
  )
}
