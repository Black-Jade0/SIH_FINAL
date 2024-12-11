import React from "react";
import { FaChartLine, FaUsers, FaFileCsv, FaFilePdf } from "react-icons/fa";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const ResultsAndAnalytics = () => {
    // Sample data for charts
    const individualPerformanceData = [
        { name: "Jan", score: 70 },
        { name: "Feb", score: 75 },
        { name: "Mar", score: 80 },
        { name: "Apr", score: 85 },
        { name: "May", score: 90 },
        { name: "Jun", score: 95 },
    ];

    const groupAnalysisData = [
        { region: "North", averageScore: 80 },
        { region: "South", averageScore: 85 },
        { region: "East", averageScore: 78 },
        { region: "West", averageScore: 82 },
    ];

    return (
        <div className="pt-20 w-full">
            <section className="w-full box-border p-6 lg:p-10">
                <h1 className="text-3xl font-extrabold mb-6 text-center">
                    Results and Analytics
                </h1>
                <div className="flex flex-row flex-wrap rounded-lg shadow-lg p-8 h-full">
                    {/* Candidate Report Section */}
                    <div className="w-[40%] p-2 flex flex-col h-full">
                        <div className="bg-[var(--main-color)] rounded-lg shadow-lg p-6 h-full">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaChartLine className="mr-2 text-2xl" />{" "}
                                Candidate Report
                            </h2>
                            <div className="flex flex-wrap gap-6">
                                <div className="w-full md:w-2/5">
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={individualPerformanceData}
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
                                <div className="w-full md:w-3/5 flex flex-col justify-center">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Adaptive Feedback
                                    </h3>
                                    <p>
                                        Improve your skills based on detailed
                                        analysis of your strengths and
                                        weaknesses. Personalized feedback will
                                        help you focus on areas needing
                                        improvement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Group Analysis Section */}
                    <div className="w-[60%] p-2 flex flex-col h-full">
                        <div className="bg-[var(--main-color)] h-full rounded-lg shadow-lg p-6 mb-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaUsers className="mr-2 text-2xl" /> Group
                                Analysis
                            </h2>
                            <div className="flex flex-wrap gap-6">
                                <div className="w-full md:w-2/5">
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={groupAnalysisData}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="region" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="averageScore"
                                            stroke="#fff"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </div>
                                <div className="w-full md:w-3/5 flex flex-col justify-center">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Comparative Analysis
                                    </h3>
                                    <p>
                                        Generate detailed reports comparing
                                        results across different regions or
                                        institutions. Visualize trends and
                                        identify key areas for improvement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Downloadable Results Section */}
                    <div className="w-[100%] p-2">
                        <div className="bg-[var(--main-color)] text-white rounded-lg shadow-lg p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaFileCsv className="mr-2 text-2xl" />{" "}
                                Downloadable Results
                            </h2>
                            <p className="mb-4">
                                Export your results in various formats for
                                detailed offline analysis. Choose between CSV or
                                PDF formats.
                            </p>
                            <div className="w-full">
                                <button className="bg-[var(--boom-color)] px-4 py-2 mb-2 rounded-full shadow-lg hover:bg-purple-300 transition duration-300 flex items-center justify-center">
                                    <FaFileCsv className="mr-2" /> Export as CSV
                                </button>
                                <button className="bg-[var(--boom-color)] px-4 py-2 rounded-full shadow-lg hover:bg-purple-300 transition duration-300 flex items-center justify-center">
                                    <FaFilePdf className="mr-2" /> Export as PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResultsAndAnalytics;
