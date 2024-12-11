import React, { useState } from "react";

const ProfileSettingForm = () => {
    const [formData, setFormData] = useState({
        phone: "",
        currentStd: "",
        age: "",
        gender: "",
        fieldOfInterest: "",
        stream: "",
        state: "",
        city: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${BASE_URL}/profilesetup`,
                {
                    ...formData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Profile Saved Successfully!");
            } else {
                throw new Error("Failed to save profile");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("An error occurred while saving your profile.");
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">
                Set Your Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                />
                <select
                    name="currentStd"
                    value={formData.currentStd}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                >
                    <option value="">Select Current Standard</option>
                    <option value="10th">10th</option>
                    <option value="11th">11th</option>
                    <option value="12th">12th</option>
                </select>
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="text"
                    name="fieldOfInterest"
                    placeholder="Field of Interest"
                    value={formData.fieldOfInterest}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                />
                <input
                    type="text"
                    name="stream"
                    placeholder="Stream"
                    value={formData.stream}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-800 text-gray-200 rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-gray-100 py-3 rounded-md hover:bg-purple-700 transition duration-300"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
};
export default ProfileSettingForm;
