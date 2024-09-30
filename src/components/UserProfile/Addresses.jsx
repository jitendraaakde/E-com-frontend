import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const Addresses = () => {
    // Example state for existing addresses
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            street: "123 Main Street",
            city: "New York",
            state: "NY",
            country: "USA",
            zipCode: "10001",
        }
    ]);

    // State for new address form inputs
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
    });

    // Handler to update new address form state
    const handleAddressChange = (e) => {
        const { id, value } = e.target;
        setNewAddress((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Handler to add a new address
    const handleAddAddress = () => {
        setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
        setNewAddress({
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
        });
    };

    return (
        <div className="bg-white  space-y-3 w-full">
            <h2 className="text-2xl font-semibold mb-4">Addresses</h2>

            {/* Existing Addresses Section */}
            <div className="space-y-4">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="p-4 border border-gray-300 rounded-lg shadow-md bg-white flex justify-between items-center space-x-4"
                    >
                        <p className="flex-grow">
                            {address.street}, {address.city}, {address.state}, {address.country}, {address.zipCode}
                        </p>
                        <FaEdit className="text-2xl cursor-pointer" />
                        <MdDelete className="text-2xl cursor-pointer" />
                    </div>
                ))}
            </div>

            {/* Add New Address Section */}
            <div className="bg-white  space-y-4 w-full">
                {/* Street Field */}
                <div>
                    <label className="block text-lg font-medium mb-2" htmlFor="street">Street</label>
                    <input
                        id="street"
                        type="text"
                        value={newAddress.street}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter street address"
                    />
                </div>

                {/* City and State Fields (50% width each) */}
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2" htmlFor="city">City</label>
                        <input
                            id="city"
                            type="text"
                            value={newAddress.city}
                            onChange={handleAddressChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter city"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2" htmlFor="state">State</label>
                        <input
                            id="state"
                            type="text"
                            value={newAddress.state}
                            onChange={handleAddressChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter state"
                        />
                    </div>
                </div>

                {/* Country and Zip Code Fields (50% width each) */}
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2" htmlFor="country">Country</label>
                        <input
                            id="country"
                            type="text"
                            value={newAddress.country}
                            onChange={handleAddressChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter country"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-lg font-medium mb-2" htmlFor="zipCode">Zip Code</label>
                        <input
                            id="zipCode"
                            type="text"
                            value={newAddress.zipCode}
                            onChange={handleAddressChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter zip code"
                        />
                    </div>
                </div>

                {/* Add Address Button */}
                <button
                    onClick={handleAddAddress}
                    className="w-full py-3 text-lg font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Add Address
                </button>
            </div>
        </div>
    );
};

export default Addresses;
