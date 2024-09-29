// AdminDashboard.js
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from './Sidebar';
import AllProducts from './AllProducts';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';
import DashboardOverview from './DashboardOverview';

export default function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to render the appropriate component based on activeComponent state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'allProducts':
        return <AllProducts onEdit={setEditingProduct} />;
      case 'addProduct':
        return <AddProduct />;
      case 'editProduct':
        return <EditProduct product={editingProduct} />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        setActiveComponent={setActiveComponent} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header for small screens */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 focus:outline-none focus:text-gray-700"
          >
            {/* Toggle Sidebar Icon */}
            {isSidebarOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
}
