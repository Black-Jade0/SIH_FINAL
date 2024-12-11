// src/components/ProfileSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
    const navigate = useNavigate();
    const handleclick = () => {
        navigate("/Profilesetup");
    };

    return (
        <div className="flex flex-col items-center py-6 border-b border-gray-700">
            <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="rounded-full w-20 h-20 shadow-lg hover:scale-105 transition-transform duration-300 ease-out"
            />
            <h2 className="text-white mt-4 text-lg">FutureFramework</h2>
            <button
                onClick={() => {
                    handleclick();
                }}
                className="text-sm text-gray-400 hover:text-gray-100 mt-2"
            >
                Edit Profile
            </button>
        </div>
    );
};

export default ProfileSection;
