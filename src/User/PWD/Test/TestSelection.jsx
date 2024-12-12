import axios from "axios";
import { BASE_URL } from "../../../../config";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PWDtest = () => {
    const [pdfs, setPdfs] = useState([]);
    const [error, setError] = useState("");
    const [images, setImages] = useState({}); // Store images for each subject
    const navigate = useNavigate(); // Initialize the navigate function
    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/pdfs`);
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
    const [subject, setSubject] = useState("");
    const [level, setLevel] = useState("");
    const [data, setData] = useState();
    const requestsender = async (id, subject, level) => {
        console.log("got here: ", id, level, subject);
        const response = await axios.get(
            BASE_URL + "/user/getparseddata2",
            {
                withCredentials: true,
            },
            {
                id: id,
                subject: subject,
                level: level,
            }
        );
        console.log("Got the data from backend: ", response.data);
        setData(response.data);
        setSubject(subject);
        setLevel(level);
    };
    if (data) {
        navigate("/User/PWD/Test/questionpaper", {
            state: {
                data: data.data,
                subject: subject,
                level: level,
            },
        });
    }
    return (
        <section className="w-full box-border p-6 lg:p-10">
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <h2 className="text-3xl text-left font-extrabold mt-4">
                        Online Tests
                    </h2>
                    <ul className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pdfs.map((pdf, index) => (
                            <li
                                key={pdf.id}
                                data-test-index={index}
                                onClick={() => {
                                    requestsender(
                                        pdf.id,
                                        pdf.subject,
                                        pdf.level
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
                                    <span className="font-medium">Level:</span>{" "}
                                    {pdf.level}
                                </p>
                                <p className="text-sm mt-2">
                                    <span className="font-medium">
                                        Uploaded on:
                                    </span>{" "}
                                    {new Date(pdf.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    );
};
export default PWDtest;
