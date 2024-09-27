import { useState } from "react";

const EditProfile = () => {

    const [formData, setFormData] = useState({
        name: "Jitendra Aakde",
        email: "jitendra@example.com",
        mobile: "123-456-7890",
        address: "123 Main Street, City, Country"
    });

    // Handler to update form data state
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };


    return <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 w-full">
        <h2 className="text-2xl font-semibold mb-6 ">Edit Profile</h2>

        {/* Name Field */}
        <div>
            <label className="block text-lg font-medium mb-2" htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        {/* Email Field */}
        <div>
            <label className="block text-lg font-medium mb-2" htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        {/* Mobile Number Field */}
        <div>
            <label className="block text-lg font-medium mb-2" htmlFor="mobile">Mobile Number</label>
            <input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        {/* Primary Address Field */}
        <div>
            <label className="block text-lg font-medium mb-2" htmlFor="address">Primary Address</label>
            <input
                id="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        {/* Save Button */}
        <button className="w-full py-3 text-lg font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            Save
        </button>
    </div>
}

export default EditProfile