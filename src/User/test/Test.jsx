import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import TestSelection from "../../Test/TestSelection";
import axios from "axios";
import { Link } from "react-router-dom";

const Test = () => {
    const [pdfs, setPdfs] = useState([]);
    const [error, setError] = useState("");
    const [images, setImages] = useState({}); // Store images for each subject
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/pdfs`, {
                    withCredentials: true,
                });
                setPdfs(response.data);

                // Fetch images for all subjects
                const imageRequests = response.data.map(async (pdf) => {
                    const query = pdf.subject;
                    try {
                        const imageResponse = await axios.get(
                            `${BASE_URL}/images/searchImage`,
                            {
                                params: { query },
                            }
                        );
                        return {
                            subject: query,
                            image: imageResponse.data.urls?.small,
                        };
                    } catch (error) {
                        console.error(
                            `Error fetching image for ${query}:`,
                            error
                        );
                        return { subject: query, image: null }; // Fallback for failed image requests
                    }
                });

                // Resolve all image requests and map to subjects
                const resolvedImages = await Promise.all(imageRequests);
                const imageMap = resolvedImages.reduce(
                    (acc, { subject, image }) => {
                        acc[subject] = image;
                        return acc;
                    },
                    {}
                );
                setImages(imageMap);
            } catch (err) {
                console.error("Error fetching PDFs:", err);
                setError("Failed to fetch PDFs");
            }
        };

        fetchPdfs();
    }, []);

    const navigateInstruction = (id, level, subject) => {
        try {
            navigate(
                `/User/Test/instructions?id=${id}&level=${level}&subject=${subject}`
            );
        } catch (error) {
            console.error("Error navigating to instructions page:", error);
        }
    };

    const handleAdaptiveTest = () => {
        navigate("/adaptivelevel");
    };
    return (
        <>
            <section className="w-full box-border p-6 lg:p-10">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <h2 className="text-3xl text-left font-extrabold mt-4">
                            Your Tests
                        </h2>
                        <ul className="pt-8 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pdfs.map((pdf) => (
                                <li
                                    key={pdf.id}
                                    onClick={() => {
                                        navigateInstruction(
                                            pdf.id,
                                            pdf.level,
                                            pdf.subject
                                        );
                                    }}
                                    className="hover:cursor-pointer flex flex-col gap-2 bg-[var(--main-color)] rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow"
                                >
                                    <div className="h-40 w-full rounded mb-4 overflow-hidden">
                                        {images[pdf.subject] ? (
                                            <img
                                                src={images[pdf.subject]}
                                                alt={pdf.subject}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <p className="text-center mt-16">
                                                No Image
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-lg ">
                                        <span className="font-medium ">
                                            Subject:
                                        </span>{" "}
                                        {pdf.subject}
                                    </p>
                                    <p className="text-lg">
                                        <span className="font-medium">
                                            Level:
                                        </span>{" "}
                                        {pdf.level}
                                    </p>
                                    <p className="text-sm mt-2">
                                        <span className="font-medium">
                                            Uploaded on:
                                        </span>{" "}
                                        {new Date(
                                            pdf.createdAt
                                        ).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </section>
            <TestSelection />

            <section className="w-full box-border p-6 lg:p-10">
                <h2 className="text-3xl text-left font-extrabold mt-4">
                    Adaptive Test
                </h2>
                <p className="text-lg text-center m-4">
                    Experience a personalized test designed to adapt to your
                    skill level.
                </p>
                <div>
                    <button
                        onClick={handleAdaptiveTest}
                        className="bg-[var(--main-color)] text-white rounded-lg shadow hover:shadow-lg hover:opacity-90 transition"
                    >
                        Start Adaptive Test
                    </button>
                </div>
            </section>
        </>
    );

};

export default Test;
