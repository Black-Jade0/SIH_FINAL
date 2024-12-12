import React from "react";
import { Link } from "react-router-dom";

const PWDhome = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-300 text-gray-800">
            <div className="w-full max-w-6xl p-6 bg-white shadow-3xl rounded-lg">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
                    Welcome to the PWD Section
                </h1>
                <p className="text-lg text-center text-gray-700 mb-8">
                    This section is dedicated to providing an inclusive and
                    accessible experience. Explore the features tailored for you.
                </p>
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "Online Tests",
                            description:
                                "Take online tests designed to assess your skills and provide valuable feedback.",
                            link: "/PWD/Test",
                            buttonText: "Go to Tests",
                        },
                        {
                            title: "Results and Analytics",
                            description:
                                "View your test results and detailed analytics to track your progress.",
                            link: "/PWD/Result",
                            buttonText: "View Results",
                        },
                        {
                            title: "Support",
                            description:
                                "Get assistance and support whenever you need it.",
                            link: "/PWD/Support",
                            buttonText: "Get Support",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow hover:shadow-lg hover:bg-gray-100 transition"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                {feature.description}
                            </p>
                            <Link
                                to={feature.link}
                                className="block text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                            >
                                {feature.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="mt-10 text-center text-sm text-gray-600">
                <p>Providing accessibility for everyone, one step at a time.</p>
            </footer>
        </div>
    );
};

export default PWDhome;
