import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../../config";

const Uploadans = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
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

    const uploadAnswerPdf = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) {
            alert("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", file);
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
                
                navigate('/User/Evaluation', { 
                    state: { 
                        data: response.data.data
                    }
                });
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
        <div className="container">
            <h2>Upload Answers</h2>
            <button onClick={(e) => getTest(e, id)} className="btn btn-primary">
                Get PDF
            </button>

            <h3>Or Upload Your Answer PDF</h3>
            <input type="file" accept=".pdf" onChange={uploadAnswerPdf} />

            <h3>Request Evaluation</h3>
            <button
                onClick={() => alert("Upload PDF first to request evaluation.")}
                className="btn btn-success"
                disabled={loading}
            >
                {loading ? "Processing..." : "Request Evaluation"}
            </button>
        </div>
    );
};

export default Uploadans;
