import React from "react";
import {
    FaChartLine,
    FaHistory,
    FaUserFriends,
    FaLightbulb,
} from "react-icons/fa";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const PerformanceReports = () => {
    // Sample data for charts
    const performanceData = [
        { name: "Jan", score: 60 },
        { name: "Feb", score: 70 },
        { name: "Mar", score: 80 },
        { name: "Apr", score: 85 },
        { name: "May", score: 90 },
        { name: "Jun", score: 95 },
    ];

    return (
        <div className="pt-20 w-full">
            <section className="w-full box-border p-6 lg:p-10">
                <div className="rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-extrabold mb-6 text-center">
                        Performance Reports
                    </h1>

                    {/* First row with 70% - 30% ratio */}
                    <div className="grid grid-cols-10 gap-6 mb-6">
                        {/* Real-Time Analytics (70%) */}
                        <div className="col-span-7 bg-[var(--main-color)] text-white rounded-lg shadow-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaChartLine className="mr-2 text-2xl" />{" "}
                                Real-Time Analytics
                            </h2>
                            <div className="flex-1">
                                <LineChart
                                    width={400}
                                    height={300}
                                    data={performanceData}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </div>
                            <p className="mt-4">
                                View your strengths and weaknesses across
                                various skill areas with detailed charts and
                                metrics.
                            </p>
                        </div>

                        {/* Assessment History (30%) */}
                        <div className="col-span-3 bg-[var(--main-color)] text-white rounded-lg shadow-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaHistory className="mr-2 text-2xl" />{" "}
                                Assessment History
                            </h2>
                            <div className="flex-1">
                                <p className="mb-4">
                                    View all your past assessments with detailed
                                    reports. Download your reports for offline
                                    analysis.
                                </p>
                                <button className="px-4 py-2 rounded-full shadow-lg hover:bg-green-300 transition duration-300">
                                    Download Reports
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Second row with 50% - 50% ratio */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Compare Performance (50%) */}
                        <div className="bg-[var(--main-color)] rounded-lg shadow-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaUserFriends className="mr-2 text-2xl" />{" "}
                                Compare Performance
                            </h2>
                            <p className="mb-4">
                                Compare your performance over time or against a
                                group of peers. Analyze trends and improve your
                                results.
                            </p>
                            <button className="bg-[var(--boom-color)] px-4 py-2 rounded-full shadow-lg hover:bg-purple-300 transition duration-300">
                                Compare Now
                            </button>
                        </div>

                        {/* Suggested Learning Paths (50%) */}
                        <div className="bg-[var(--main-color)] rounded-lg shadow-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaLightbulb className="mr-2 text-2xl" />{" "}
                                Suggested Learning Paths
                            </h2>
                            <p className="mb-4">
                                Get AI-driven suggestions for improving your
                                skills based on your performance. Explore
                                tailored learning paths to enhance your
                                abilities.
                            </p>
                            <button className=" px-4 py-2 rounded-full shadow-lg bg-[var(--boom-color)] transition duration-300">
                                View Suggestions
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PerformanceReports;
