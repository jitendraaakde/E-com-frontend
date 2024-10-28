// Sidebar.js
import React from 'react';
import { FaHome, FaBox, FaPlusCircle, FaShoppingBag, FaUsers, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar({ setActiveComponent, isOpen, setIsOpen }) {
  // Menu items for the sidebar
  const menuItems = [
    { name: 'Dashboard', icon: FaHome, action: 'dashboard' },
    { name: 'All Products', icon: FaBox, action: 'allProducts' },
    { name: 'Add Product', icon: FaPlusCircle, action: 'addProduct' },
    { name: 'Orders', icon: FaShoppingBag, action: 'orders' },
    { name: 'Users', icon: FaUsers, action: 'users' }
  ];

  return (
    <div
      className={`bg-white shadow-md w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
    >
      {/* Sidebar header */}
      <div className="flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Admin</span>
      </div>

      {/* Navigation items */}
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
            onClick={() => {
              setActiveComponent(item.action); // Set the active component based on action
              setIsOpen(false); // Close the sidebar on item click
            }}
          >
            {/* Render the icon component */}
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Logout button */}
      <div className="px-4">
        <button
          className="w-full flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"

        >
          <FaSignOutAlt className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
