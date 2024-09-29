import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FaBox, FaExclamationTriangle, FaDollarSign, FaPlus } from 'react-icons/fa'

function DashboardOverview() {
  const stats = [
    { name: 'Total Products', value: 150, icon: FaBox },
    { name: 'Out of Stock', value: 5, icon: FaExclamationTriangle },
    { name: 'Total Revenue', value: '$15,000', icon: FaDollarSign },
    { name: 'New Products This Week', value: 10, icon: FaPlus },
  ]

  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ]

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function StatCard({ stat }) {
  const Icon = stat.icon
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{stat.name}</h3>
        <Icon className="text-2xl text-indigo-500" />
      </div>
      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
    </div>
  )
}

export default DashboardOverview
