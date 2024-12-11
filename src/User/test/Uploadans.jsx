import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../../config";

const Uploadans = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const id = searchParams.get("id");

    const getTest = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/user/pdf/${id}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch the PDF.");
            }

            const contentType = response.headers.get("Content-Type");
            if (contentType === "application/pdf") {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                window.open(url, "_blank");
            } else {
                throw new Error(
                    "Unexpected content type. Expected a PDF file."
                );
            }
        } catch (error) {
            console.error("Error fetching the PDF:", error);
            alert("Failed to fetch the PDF. Please try again.");
        }
    };

    const uploadAnswerPdf = async () => {
        if (!selectedFile) {
            alert("No file selected. Please choose a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", selectedFile);
        formData.append("infoFile", JSON.stringify({ id }));

        try {
            setLoading(true);
            const response = await axios.post(
                `${BASE_URL}/user/uploadforevalv1`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                alert("Answer PDF uploaded successfully!");
                navigate("/User/Evaluation");
            } else {
                throw new Error(response.data.error || "Upload failed");
            }
        } catch (error) {
            console.error("Error uploading PDF:", error);
            alert("Failed to upload the answer PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-24 px-4 py-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                Get PDF and Upload Answer
            </h2>

            {/* Section for Getting PDF */}
            <div className="mb-8 text-center">
                <h3 className="text-lg font-semibold text-gray-600 mb-4">
                    Download Question PDF
                </h3>
                <button
                    onClick={(e) => getTest(e, id)}
                    className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-md shadow transition"
                >
                    Get PDF
                </button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center mb-8">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-4 text-sm text-gray-500">OR</span>
                <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            {/* Section for Uploading PDF */}
            <div className="mb-8 text-center">
                <h3 className="text-lg font-semibold text-gray-600 mb-4">
                    Upload Your Answer PDF
                </h3>
                <label
                    htmlFor="file-upload"
                    className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-md shadow transition cursor-pointer"
                >
                    Choose File
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
            </div>

            {/* Evaluation Request */}
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-600 mb-4">
                    Request Evaluation
                </h3>
                <button
                    onClick={uploadAnswerPdf}
                    className={`px-6 py-2 text-white font-medium rounded-md shadow transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Request Evaluation"}
                </button>
            </div>
        </div>
    );
};

export default Uploadans;
