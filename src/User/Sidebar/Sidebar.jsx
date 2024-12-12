import React, { useEffect } from "react";
import { FaChartBar, FaQuestionCircle, FaCog } from "react-icons/fa";
import ProfileSection from "./ProfileSection";
import GoogleTranslate from "../../../Backend/src/GoogleTranslate";

const Sidebar = ({ activeSection, setActiveSection }) => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const getActiveClass = (id) => {
        return activeSection === id
            ? "bg-[var(--sidebarselect-color)] transition-colors duration-500 rounded-md"
            : "transition-colors duration-500";
    };

    // Update activeSection on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                "dashboard",
                "test",
                "reports",
                "resultandanalytics",
                "support",
            ];

            sections.forEach((sectionId) => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveSection(sectionId);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [setActiveSection]);

    return (
        <div className="h-screen w-[15%] sticky top-0 left-0 shadow-lg pr-2 pl-2 bg-[var(--sidebar-color)]">
            <div className="mt-4 flex flex-col gap-1 h-full items-center">
                <ProfileSection />

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--boom-color)] rounded-md ${getActiveClass(
                        "home"
                    )}`}
                    onClick={() => scrollToSection("home")}
                >
                    <FaChartBar className="inline mb-1 mr-4" />
                    Home
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--boom-color)] rounded-md ${getActiveClass(
                        "test"
                    )}`}
                    onClick={() => scrollToSection("test")}
                >
                    <FaChartBar className="inline mb-1 mr-4" />
                    Test
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--boom-color)] rounded-md ${getActiveClass(
                        "reports"
                    )}`}
                    onClick={() => scrollToSection("reports")}
                >
                    <FaChartBar className="inline mb-1 mr-4" />
                    Performance Reports
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--boom-color)] rounded-md ${getActiveClass(
                        "resultandanalytics"
                    )}`}
                    onClick={() => scrollToSection("resultandanalytics")}
                >
                    <FaCog className="inline mb-1 mr-4" />
                    Result And Analytics
                </button>

                <button
                    className={`w-full text-left p-8 flex items-center hover:bg-[var(--boom-color)] rounded-md ${getActiveClass(
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
