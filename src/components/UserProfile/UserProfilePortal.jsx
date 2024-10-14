import React, { useState } from 'react'
import { FaLock, FaUser, FaBox, FaSignOutAlt, FaRegAddressCard } from 'react-icons/fa'
import Addresses from './Addresses'
import { IoLogOut } from "react-icons/io5";
import OrderHistory from './OrderHistory';
import { useSelector } from 'react-redux';
import { RiEditBoxLine } from "react-icons/ri";



export default function UserProfilePortal() {
    const [activeTab, setActiveTab] = useState('profile')

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileContent />
            case 'changePassword':
                return <ChangePasswordContent />
            case 'deleteAccount':
                return <DeleteAccountContent />
            case 'orderHistory':
                return <OrderHistory />
            case 'addresses':
                return <Addresses />
            case 'logout':
                return <LogoutUser />
            default:
                return <ProfileContent />
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <aside className="w-full md:w-64 bg-white shadow-md">
                <nav className="p-4">
                    <h2 className="text-2xl font-bold mb-6 text-center md:text-left">My Account</h2>
                    <ul className="space-y-2">
                        {[
                            { id: 'profile', label: 'Profile', icon: FaUser },
                            { id: 'orderHistory', label: 'Order History', icon: FaBox },
                            { id: 'addresses', label: 'Addresses', icon: FaRegAddressCard },
                            { id: 'changePassword', label: 'Change Password', icon: FaLock },
                            { id: 'deleteAccount', label: 'Delete Account', icon: FaSignOutAlt },
                            { id: 'logout', label: 'logout', icon: IoLogOut },
                        ].map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === item.id
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5 mr-2" />
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}

function ProfileContent() {
    const { user } = useSelector((store) => store.user);
    const [editable, setEditable] = useState(true)
    const handleEditable = () => {
        setEditable(!editable)
    }
    console.log('user details', user)
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formEntries = Object.fromEntries(formData.entries());
        console.log(formEntries)
        handleSubmitBackend(formEntries)
    };

    const handleSubmitBackend = async (formEntries) => {
        try {
            const response = await fetch('/api/users/edit-user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formEntries),
            });

            const data = await response.json();
            console.log('user data from back', data.msg);
            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Edit failed:', error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold">My Profile</h2>
                    <button type='button'
                        className="w-full md:w-auto  flex justify-center items-center gap-3 font-bold text-xl" onClick={handleEditable}
                    >Edit Information
                        <RiEditBoxLine />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="name"
                            defaultValue={user?.name || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-2 py-3 border-2"
                            placeholder="John Doe"
                            disabled={editable}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={user?.email || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-2 py-3 border-2"
                            placeholder="john@example.com"
                            disabled={editable}

                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            defaultValue={user?.phone || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-2 py-3 border-2"
                            placeholder="+91 xxxxxxxxxxx"
                            disabled={editable}

                        />
                    </div>


                </div>
                <button
                    type="submit"
                    className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Save Details
                </button>

            </div>
        </form>
    );
}

function ChangePasswordContent() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Change Password</h2>
            <form className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Update Password
                </button>
            </form>
        </div>
    )
}

function DeleteAccountContent() {
    const [showConfirmation, setShowConfirmation] = useState(false)

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Delete Account</h2>
            <p className="text-red-600">Warning: This action cannot be undone.</p>
            {!showConfirmation ? (
                <button
                    onClick={() => setShowConfirmation(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Delete My Account
                </button>
            ) : (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Are you sure you want to delete your account?</strong>
                    <p className="text-sm">Please confirm your decision.</p>
                    <div className="mt-4">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2">
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setShowConfirmation(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
function LogoutUser() {
    const [showConfirmation, setShowConfirmation] = useState(false)

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Logout</h2>
            <p className="text-red-600">Thank you for visiting! We hope to see you again soon.
            </p>
            {!showConfirmation ? (
                <button
                    onClick={() => setShowConfirmation(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Logout
                </button>
            ) : (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Are you sure you want to logout from your account?</strong>
                    <p className="text-sm">Please confirm your decision.</p>
                    <div className="mt-4">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2">
                            Yes, Logout
                        </button>
                        <button
                            onClick={() => setShowConfirmation(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

