import React from "react";
import {
    FaChartBar,
    FaCalendarAlt,
    FaLightbulb,
    FaCog,
    FaUsers,
} from "react-icons/fa";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const Dashboard = () => {
    // Sample data for charts
    const skillProgressData = [
        { name: "MCQs", value: 75 },
        { name: "Practical Exams", value: 60 },
        { name: "Essays", value: 85 },
    ];

    return (
        <section className="w-full box-border p-6 lg:p-10">
            <div className="rounded-lg shadow-lg w-full">
                <h1 className="text-3xl font-extrabold mb-6 text-center">
                    Dashboard
                </h1>

                <div className="flex flex-wrap -m-2 mb-8 w-full">
                    {/* Assessment Overview */}
                    <div className="p-2 w-1/3">
                        <div className="bg-[var(--main-color)] rounded-lg shadow-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaChartBar className="mr-2 text-2xl" />{" "}
                                Analysis
                            </h2>
                            <div className="flex-1">
                                <LineChart
                                    width={300}
                                    height={300}
                                    data={skillProgressData}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </div>
                            <p className="mt-4">
                                Track your performance and skill progress
                            </p>
                        </div>
                    </div>

                    {/* Skill Progress Bar */}
                    <div className="p-2 w-1/3">
                        <div className="bg-[var(--main-color)] h-full rounded-lg shadow-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaChartBar className="mr-2 text-2xl" /> Test
                            </h2>
                            <div className="flex-1">
                                <p className="mb-4">
                                    Start your online or offline assessments
                                </p>
                                <div className="bg-[var(--background-color)] p-4 rounded-lg shadow-lg">
                                    <p>
                                        <strong>MCQs:</strong> 75%
                                    </p>
                                    <p>
                                        <strong>Practical Exams:</strong> 60%
                                    </p>
                                    <p>
                                        <strong>Essays:</strong> 85%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Exams */}
                    <div className="p-2 w-1/3">
                        <div className="bg-[var(--main-color)] h-full rounded-lg shadow-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaCalendarAlt className="mr-2 text-2xl" />{" "}
                                Upcoming Exams
                            </h2>
                            <div className="flex-1">
                                <p className="mb-4">
                                    A calendar view or list of scheduled exams,
                                    deadlines, and notifications.
                                </p>
                                <div className="bg-[var(--background-color)] p-4 rounded-lg shadow-lg">
                                    <p>
                                        <strong>Math Exam:</strong> Sep 25, 2024
                                    </p>
                                    <p>
                                        <strong>History Essay:</strong> Sep 30,
                                        2024
                                    </p>
                                    <p>
                                        <strong>Science Lab:</strong> Oct 05,
                                        2024
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personalized Feedback */}
                    <div className="p-2 w-1/2">
                        <div className="bg-[var(--main-color)] rounded-lg shadow-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaLightbulb className="mr-2 text-2xl" /> Result
                            </h2>
                            <div className="flex-1">
                                <p className="mb-4">
                                    AI-powered insights and advice on improving
                                    weak areas based on prior assessments.
                                </p>
                                <div className="bg-[var(--background-color)] p-4 rounded-lg shadow-lg">
                                    <p>
                                        <strong>Improvement Areas:</strong>{" "}
                                        Focus on MCQs.
                                    </p>
                                    <p>
                                        <strong>Strengths:</strong> Strong in
                                        Essays.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Accessibility Settings */}
                    <div className="p-2 w-1/2">
                        <div className="bg-[var(--main-color)] rounded-lg shadow-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-4 flex items-center">
                                <FaCog className="mr-2 text-2xl" />{" "}
                                Accessibility Settings
                            </h2>
                            <div className="flex-1">
                                <p className="mb-4">
                                    Quick access to enable or adjust
                                    voice-to-text, text-to-speech, or other
                                    accessibility features.
                                </p>
                                <div className="bg-[var(--background-color)] p-4 rounded-lg shadow-lg">
                                    <p>
                                        <strong>Voice-to-Text:</strong> Enabled
                                    </p>
                                    <p>
                                        <strong>Text-to-Speech:</strong>{" "}
                                        Disabled
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
