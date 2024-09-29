import React, { useState } from 'react'

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 7 },
  ])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Number of Orders</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
