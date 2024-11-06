import React, { useEffect, useState } from 'react';
import { Trash2, Edit, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addShippingAddress } from '../../store/orderSlice';

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const [addresses, setAddresses] = useState([]);
  const products = cart.items;
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState();

  const calculateAmount = (price, disPercent) =>
    Math.round(price - (price * (disPercent / 100)));

  const initialAddressesFetch = async () => {
    try {
      const response = await fetch(`/api/users/get-addresses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        setAddresses(data.userAddresses);
        setSelectedAddress(data?.userAddresses[0]);
      } else {
        throw new Error(data.message || 'Error getting addresses');
      }
    } catch (error) {
      console.error('Error getting addresses:', error.message);
    }
  };

  const handleAddAddressClick = () => {
    setEditingAddress(null);
    setIsAddressFormOpen(true);
  };

  const subtotal = products.reduce(
    (sum, item) =>
      sum + calculateAmount(item.productId.price, item.productId.discountPercentage) * item.quantity,
    0
  );
  const shipping = 120;
  const tax = subtotal * 0.03;
  const total = subtotal + shipping + tax;

  const handleAddAddress = async (newAddress) => {
    try {
      const response = await fetch(`/api/users/add-addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress),
      });

      const data = await response.json();
      if (response.ok) {
        initialAddressesFetch();
      } else {
        throw new Error(data.message || 'Error adding address');
      }
    } catch (error) {
      console.error('Error adding address:', error.message);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setIsAddressFormOpen(true);
  };

  const handleDeleteAddress = async (id) => {
    try {
      const response = await fetch(`/api/users/delete-address/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (response.ok) {
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address._id !== id)
        );
        if (selectedAddress?._id === id) {
          setSelectedAddress(null);
        }
      } else {
        throw new Error(data.message || 'Error deleting address');
      }
    } catch (error) {
      console.error('Error deleting address:', error.message);
    }
  };

  useEffect(() => {
    initialAddressesFetch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Delivery Address</h2>
            <div className="bg-white rounded-lg p-6 shadow-md">
              {addresses.map((address) => (
                <div className="flex items-center justify-between mb-4 p-3 rounded-lg transition-colors hover:bg-gray-50" key={address._id}>
                  <label className="flex items-center cursor-pointer flex-grow">
                    <input
                      type="radio"
                      name="address"
                      value={address._id}
                      checked={selectedAddress === address}
                      onChange={() => setSelectedAddress(address)}
                      className="mr-2 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">
                      {address.type}, {address.street}, {address.city}, {address.state} {address.zipCode}
                    </span>
                  </label>
                  <div>
                    <button onClick={() => handleEditAddress(address)} className="text-indigo-600 hover:text-indigo-800 mr-2">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteAddress(address._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleAddAddressClick} className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
              + Add New Address
            </button>
          </div>

          <div className="w-full lg:w-1/2">
            <OrderSummary products={products} subtotal={subtotal} shipping={shipping} tax={tax} total={total} selectedAddress={selectedAddress} />
          </div>
        </div>
      </div>

      {isAddressFormOpen && (
        <AddressForm
          onSubmit={handleAddAddress}
          initialData={editingAddress}
          onClose={() => setIsAddressFormOpen(false)}
        />
      )}
    </div>
  );
}

function OrderSummary({ products, subtotal, shipping, tax, total, selectedAddress }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert('Please select a shipping address!');
      return;
    }
    dispatch(addShippingAddress(selectedAddress))
    navigate('/payment');
  };
  const calculateAmount = (price, disPercent) => {
    return Math.round(price - (price * (disPercent / 100)))
  }
  return (<>
    <h2 className="text-2xl font-bold mb-4 text-slate-800">Order Summary</h2>
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="max-h-64 overflow-y-auto mb-4">
        {products.map((product) => (
          <div className="flex items-center mb-4 p-3 rounded-lg transition-colors hover:bg-gray-50" key={product.productId._id}>
            <img src={product.productId.images[0].url} className="w-20 h-28 object-cover rounded-md mr-4" />
            <div>
              <h3 className="font-bold text-indigo-800">{product.productId.name}</h3>
              <p className="text-indigo-600">₹{calculateAmount(product.productId.price, product.productId.discountPercentage).toFixed(2)} </p>
            </div>
          </div>
        ))}
      </div>
      <SummaryDetails subtotal={subtotal} shipping={shipping} tax={tax} total={total} />

      <button onClick={handlePlaceOrder} className="w-full mt-4 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors text-lg font-semibold flex items-center justify-center">
        <ShoppingBag className="mr-2" size={24} />
        Place Order
      </button>

    </div>
  </>
  );
}

function SummaryDetails({ subtotal, shipping, tax, total }) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex justify-between mb-2 text-gray-600">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2 text-gray-600">
        <span>Tax</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2 text-gray-600">
        <span>Delivery Charge</span>
        <span>₹{shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold mt-4 text-xl text-indigo-800">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
}

function AddressForm({ onSubmit, initialData, onClose }) {

  const [formData, setFormData] = useState(initialData || {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    type: '',
    _id: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    handleRemoveData()
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      type: '',
      _id: ''
    })

  };

  const handleRemoveData = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-indigo-800">
          {initialData ? 'Edit Address' : 'Add New Address'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-indigo-600">
              Street
            </label>
            <input
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-2 p-2"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-indigo-600">
              City
            </label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-2 p-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-indigo-600">
                State
              </label>
              <input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-2 p-2"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-indigo-600">
                Country
              </label>
              <input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-2 p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-indigo-600">
                ZIP Code
              </label>
              <input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-2 p-2"
              />
            </div>
            <div className="flex items-center mb-4 gap-2 mt-8">
              {['Home', 'Work', 'Other'].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={formData.type === type}
                    onChange={handleChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-2">{type}</label>
                </div>
              ))}
            </div>
          </div>
          {formData._id && (
            <input type="hidden" name="_id" value={formData._id} />
          )}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleRemoveData}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              {initialData ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 