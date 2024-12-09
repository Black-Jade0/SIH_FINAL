import React from "react";
import {
    FaHome,
    FaChartBar,
    FaFileAlt,
    FaAccessibleIcon,
    FaQuestionCircle,
    FaCog,
} from "react-icons/fa";
import ProfileSection from "./ProfileSection";

const Sidebar = ({ activeSection }) => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const getActiveClass = (id) => {
        return activeSection === id
            ? "bg-[var(--main-color)] rounded-md text-white"
            : "text-gray-400";
    };

    return (
        <div className="h-screen w-[15%] sticky top-0 left-0 shadow-lg pr-2 pl-2">
            <div className="mt-4 flex flex-col gap-1 h-full items-center">
                <ProfileSection />

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--main-color)] rounded-md  hover:text-gray-200 ${getActiveClass(
                        "dashboard"
                    )}`}
                    onClick={() => scrollToSection("dashboard")}
                >
                    <FaChartBar className="inline mb-1 mr-4" />
                    Dashboard
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--main-color)] rounded-md  hover:text-gray-200 ${getActiveClass(
                        "test"
                    )}`}
                    onClick={() => scrollToSection("test")}
                >
                    <FaChartBar className="inline mb-1 mr-4" />
                    Test
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--main-color)] rounded-md hover:text-gray-200 ${getActiveClass(
                        "assessments"
                    )}`}
                    onClick={() => scrollToSection("assessments")}
                >
                    <FaFileAlt className="inline mb-1 mr-4" />
                    Assessment Creation
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--main-color)] rounded-md hover:text-gray-200 ${getActiveClass(
                        "accessibility"
                    )}`}
                    onClick={() => scrollToSection("accessibility")}
                >
                    <FaAccessibleIcon className="inline mb-1 mr-4" />
                    Accessibility
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--main-color)] rounded-md hover:text-gray-200 ${getActiveClass(
                        "reports"
                    )}`}
                    onClick={() => scrollToSection("reports")}
                >
                    <FaChartBar className="inline mb-1 mr-4" />
                    Performance Reports
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--main-color)] rounded-md hover:text-gray-200 ${getActiveClass(
                        "resultandanalytics"
                    )}`}
                    onClick={() => scrollToSection("resultandanalytics")}
                >
                    <FaCog className="inline mb-1 mr-4" />
                    Result And Analytics
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--main-color)] rounded-md hover:text-gray-200 ${getActiveClass(
                        "support"
                    )}`}
                    onClick={() => scrollToSection("support")}
                >
                    <FaQuestionCircle className="inline mb-1 mr-4" />
                    Help & Support
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
