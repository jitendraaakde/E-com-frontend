import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FaBox, FaExclamationTriangle, FaDollarSign, FaPlus } from 'react-icons/fa'

function DashboardOverview() {
  const [stats, setStats] = useState([
    { name: 'Total Products', value: 0, icon: FaBox },
    { name: 'Total Orders', value: 0, icon: FaExclamationTriangle },
    { name: 'Total Revenue', value: '$0', icon: FaDollarSign },
    { name: 'New Products This Week', value: 0, icon: FaPlus },
  ]);

  const [salesData, setSalesData] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/get-admin-dashboard-data');
      const data = await response.json();

      setStats([
        { name: 'Total Products', value: data.stats.totalProducts, icon: FaBox },
        { name: 'Total Orders', value: data.stats.totalOrders, icon: FaExclamationTriangle },
        { name: 'Total Revenue', value: `$${data.stats.totalRevenue.toLocaleString()}`, icon: FaDollarSign },
        { name: 'New Products This Week', value: data.stats.newProductsThisWeek, icon: FaPlus },
      ]);

      setSalesData(data.salesData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
  const Icon = stat.icon;
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

export default DashboardOverview;
