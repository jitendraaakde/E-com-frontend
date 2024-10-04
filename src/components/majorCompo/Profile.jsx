import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Addresses from "../UserProfile/Addresses";
import EditProfile from "../profileCompo/EditProfile";
import OrderHistory from "../UserProfile/OrderHistory";

const Profile = () => {


    return (
        <div className="px-[10%] w-full flex pt-8 gap-8 mb-10">
            <div className="w-[35%] space-y-6">
                <div className="w-full p-6 border border-gray-300 flex items-center justify-around gap-x-4 rounded-lg shadow-md bg-white">
                    <FaUserAlt className="text-4xl text-blue-600" />
                    <p className="text-xl font-semibold">{formData.name}</p>
                </div>
                <div className="grid grid-cols-1 mt-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                    <button className="p-4 border-b border-gray-200 text-xl hover:bg-blue-100 transition-colors duration-200">Profile</button>
                    <button className="p-4 border-b border-gray-200 text-xl hover:bg-blue-100 transition-colors duration-200">Orders</button>
                    <button className="p-4 border-b border-gray-200 text-xl hover:bg-blue-100 transition-colors duration-200">Addresses</button>
                    <button className="p-4 border-b border-gray-200 text-xl hover:bg-blue-100 transition-colors duration-200">Forgot Password</button>
                    <button className="p-4 border-b border-gray-200 text-xl hover:bg-red-100 transition-colors duration-200">Delete Account</button>
                    <button className="p-4 text-xl hover:bg-red-100 transition-colors duration-200">Sign Out</button>
                </div>
            </div>
            <div className="w-full bg-blue-100 rounded-lg shadow-md border border-gray-300">
                <EditProfile />
                <Addresses />
                <OrderHistory />
            </div>
        </div>

    );
}

export default Profile;
