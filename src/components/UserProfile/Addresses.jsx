import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [editAdd, setEditAdd] = useState(null);

    const getAddresses = async () => {
        try {
            const response = await fetch('/api/users/get-addresses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }
            setAddresses(data.userAddresses);
        } catch (error) {
            console.error('Edit failed:', error.message);
        }
    }

    const addAddresses = async (formEntries) => {
        console.log('Form entries from user addresses', formEntries)
        try {
            const response = await fetch('/api/users/add-addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formEntries)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }
            getAddresses();
        } catch (error) {
            console.error('Add failed:', error.message);
        }
    }

    const updateAddress = async (formEntries) => {
        try {
            const response = await fetch('/api/users/add-addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formEntries)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }
            getAddresses();
            setEditAdd(null);
        } catch (error) {
            console.error('Update failed:', error.message);
        }
    }

    const handleEditAddress = (id) => {
        const selectedAddress = addresses.find((address) => address._id === id);
        setEditAdd(selectedAddress);
    }

    const handleDeleteAddress = async (id) => {
        try {
            const response = await fetch(`/api/users/delete-address/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Error: ${response.statusText}`);
            }
            getAddresses();
        } catch (error) {
            console.error('Delete failed:', error.message);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            handleDeleteAddress(id);
        }
    };

    useEffect(() => {
        getAddresses();
    }, []);

    const handleAddOrUpdateAddress = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formEntries = Object.fromEntries(formData.entries());
        if (editAdd) {
            updateAddress({ ...formEntries, _id: editAdd._id });
        } else {
            addAddresses(formEntries);
        }

        e.target.reset();
        setEditAdd(null);
    };

    return (
        <div className="bg-white space-y-3 w-full">
            <h2 className="text-2xl font-semibold mb-4">Addresses</h2>
            <div className="space-y-4">
                {addresses?.map((address) => (
                    <div
                        key={address?._id}
                        className="p-4 border border-gray-300 rounded-lg shadow-md bg-white flex justify-between items-center space-x-4"
                    >
                        <p className="flex-grow">
                            {address?.street}, {address?.city}, {address?.state}, {address?.country}, {address?.zipCode},
                            <span className="text-red-500 ml-4">Type: {address.type}</span>
                        </p>
                        <FaEdit className="text-2xl cursor-pointer" onClick={() => handleEditAddress(address?._id)} />
                        <MdDelete className="text-2xl cursor-pointer" onClick={() => handleDelete(address?._id)} />
                    </div>
                ))}
            </div>

            <form onSubmit={handleAddOrUpdateAddress} className="bg-white space-y-4 w-full">
                <div>
                    <label className="block text-lg font-medium mb-2" htmlFor="street">Street</label>
                    <input
                        id="street"
                        name="street"
                        type="text"
                        defaultValue={editAdd ? editAdd.street : ''} // Use defaultValue for uncontrolled input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter street address"
                    />
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2" htmlFor="city">City</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            defaultValue={editAdd ? editAdd.city : ''} // Use defaultValue
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter city"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2" htmlFor="state">State</label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            defaultValue={editAdd ? editAdd.state : ''} // Use defaultValue
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter state"
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2" htmlFor="country">Country</label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            defaultValue={editAdd ? editAdd.country : ''} // Use defaultValue
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter country"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2" htmlFor="zipCode">Zip Code</label>
                        <input
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            defaultValue={editAdd ? editAdd.zipCode : ''} // Use defaultValue
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter zip code"
                        />
                    </div>
                </div>

                <div className="w-1/2">
                    <label className="block text-lg font-medium mb-2">Type of Address</label>
                    <div className="flex gap-4">
                        <label>
                            <input type="radio" name="type" value="Home" defaultChecked={editAdd?.type === 'Home'} />
                            Home
                        </label>
                        <label>
                            <input type="radio" name="type" value="Work" defaultChecked={editAdd?.type === 'Work'} />
                            Work
                        </label>
                        <label>
                            <input type="radio" name="type" value="Other" defaultChecked={editAdd?.type === 'Other'} />
                            Other
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 text-lg font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    {editAdd ? 'Update Address' : 'Add Address'}
                </button>
            </form>
        </div>
    );
};

export default Addresses;
