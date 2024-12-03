import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Choice = ({setgetStarted}) => {
    const navigate = useNavigate();

    // Function to handle navigation based on choice
    const handleChoice = (choice) => {
        if (choice === "educator") {
            navigate("/EduSign");
        } else if (choice === "student") {
            navigate("/StuSign");
        }
    };
    const GoBack = () => {
        setgetStarted(false);
    }

    return (
        <>
            <h1 className="text-3xl font-bold mt-20">Choose Your Role</h1>
            <div className="flex gap-6">
                <button
                    onClick={() => handleChoice("educator")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-md transition duration-300"
                >
                    Educator
                </button>
                <button
                    onClick={() => handleChoice("student")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow-md transition duration-300"
                >
                    Student
                </button>
            </div>
            <button
            onClick={() => {
                GoBack();
            }}
             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow-md transition duration-300">
                Go Back
            </button>
        </>
    );
};

export default Choice;
