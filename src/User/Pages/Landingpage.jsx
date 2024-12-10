import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AssessmentCreation from "../Assessmentcreation/AssessmentCreation";
import PerformanceReports from "../performanceReports/PerformanceReports";
import AccessibilityOptions from "../accessibility/AccessibilityOptions";
import Dashboard from "../Dashboard/Dashboard";
import Support from "../support/Support";
import ResultsAndAnalytics from "../Result/ResultsAndAnalytics";
import Test from "../test/test";

const LandingPage = () => {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const sections = document.querySelectorAll(".section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.6, // Adjust this to consider how much of the section needs to be visible
            }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);
    return (
        <div className="flex flex-row w-screen">
            <Sidebar activeSection={activeSection} />

            {/* Main Content */}
            <div className="flex flex-col w-[85%] right-0  min-h-screen">
                <div id="dashboard" className="section w-full">
                    <Dashboard />
                </div>

                <div id="test" className="section w-full">
                    <Test />
                </div>

                <div id="reports" className="section w-full">
                    <PerformanceReports />
                </div>

                <div id="resultandanalytics" className="section w-full">
                    <ResultsAndAnalytics />
                </div>

                <div id="support" className="section w-full">
                    <Support />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
