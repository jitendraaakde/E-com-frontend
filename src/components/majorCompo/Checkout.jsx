import React, { useState } from 'react';
import { Trash2, Edit, ShoppingBag } from 'lucide-react';
import { useSelector } from 'react-redux';

const initialAddresses = [
  { id: 1, name: 'John Doe', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', street: '456 Elm St', city: 'Los Angeles', state: 'CA', zip: '90001', phone: '987-654-3210' },
];

const initialProducts = [
  { id: 1, name: 'Vintage Denim Jacket', price: 89.99, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Boho Maxi Dress', price: 69.99, image: '/placeholder.svg?height=80&width=80' },
  { id: 3, name: 'Retro Sneakers', price: 59.99, image: '/placeholder.svg?height=80&width=80' },
];

export default function Checkout() {

  const cart = useSelector(state => state.cart)
  console.log('cart.items', cart.items)
  const [addresses, setAddresses] = useState(initialAddresses);
  const products = cart.items

  console.log(cart.items)
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const tax = subtotal * 0.08;
  const deliveryCharge = 5.99;
  const total = subtotal + tax + deliveryCharge;

  const handleAddAddress = (newAddress) => {
    if (editingAddress) {
      setAddresses(addresses.map(addr => addr.id === editingAddress.id ? { ...newAddress, id: editingAddress.id } : addr));
      setEditingAddress(null);
    } else {
      setAddresses([...addresses, { id: addresses.length + 1, ...newAddress }]);
    }
    setIsAddressFormOpen(false);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsAddressFormOpen(true);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    if (selectedAddress === id) {
      setSelectedAddress(addresses[0]?.id);
    }
  };
  console.log(products)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Delivery Address</h2>
            <div className="bg-white rounded-lg p-6 shadow-md">
              {addresses.map((address) => (
                <div key={address.id} className="flex items-center justify-between mb-4 p-3 rounded-lg transition-colors hover:bg-gray-50">
                  <label className="flex items-center cursor-pointer flex-grow">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="mr-2 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">
                      {address.name}, {address.street}, {address.city}, {address.state} {address.zip}
                    </span>
                  </label>
                  <div>
                    <button onClick={() => handleEditAddress(address)} className="text-indigo-600 hover:text-indigo-800 mr-2">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteAddress(address.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setIsAddressFormOpen(true)} className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
              + Add New Address
            </button>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Order Summary</h2>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="max-h-64 overflow-y-auto mb-4">
                {products.map((product) => (
                  <div key={product.productId._id} className="flex items-center mb-4 p-3 rounded-lg transition-colors hover:bg-gray-50">
                    <img src={product.productId.images[0].url} className="w-20 h-28 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-bold text-indigo-800">{product.productId.name}</h3>
                      <p className="text-indigo-600">${product.productId.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Delivery Charge</span>
                  <span>${deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mt-4 text-xl text-indigo-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors text-lg font-semibold flex items-center justify-center">
              <ShoppingBag className="mr-2" size={24} />
              Place Order
            </button>
          </div>
        </div>
      </div>
      {isAddressFormOpen && (
        <AddressForm onSubmit={handleAddAddress} initialData={editingAddress} onClose={() => setIsAddressFormOpen(false)} />
      )}
    </div>
  );
}

function AddressForm({ onSubmit, initialData, onClose }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-indigo-800">
          {initialData ? 'Edit Address' : 'Add New Address'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-indigo-600">Full Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-indigo-600">Street Address</label>
            <input id="street" name="street" value={formData.street} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-indigo-600">City</label>
              <input id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-indigo-600">State</label>
              <input id="state" name="state" value={formData.state} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-indigo-600">ZIP Code</label>
              <input id="zip" name="zip" value={formData.zip} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-indigo-600">Phone Number</label>
              <input id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              {initialData ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}