import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const InstructionPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Extract query parameters from the URL
    const id = searchParams.get("id");
    const level = searchParams.get("level");
    const subject = searchParams.get("subject");

    const handleStartTest = () => {
        // Navigate to the test page with the same parameters
        navigate(`/User/Test/uploadans?id=${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
            <div className="bg-gray-800 shadow-xl rounded-3xl p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-center text-emerald-400 mb-6">
                    Test Instructions
                </h1>
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold text-gray-300">
                        Level: {level}
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Subject: <span className="font-medium">{subject}</span>
                    </p>
                </div>

                <div className="bg-gray-700 rounded-lg p-6 shadow-sm">
                    <ul className="list-inside list-disc text-gray-300 space-y-3">
                        <li>Read all questions carefully before answering.</li>
                        <li>
                            Ensure a stable internet connection during the test.
                        </li>
                        <li>Once the test starts, it cannot be paused.</li>
                    </ul>
                </div>

                <button
                    onClick={handleStartTest}
                    className="mt-8 w-full bg-gradient-to-r from-emerald-500 to-green-600 text-gray-900 text-lg font-medium py-3 rounded-full shadow-lg hover:shadow-xl transform transition hover:scale-105"
                >
                    Start Test
                </button>
            </div>
        </div>
    );
};

export default InstructionPage;
