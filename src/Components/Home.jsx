import React from "react";
import { FaRegChartBar, FaAccessibleIcon, FaBrain } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiTeacher } from "react-icons/gi";
import LeftDesign from "./LeftDesign";
import RightDesign from "./RightDesign";
import { useState } from "react";
import { useEffect } from "react";
import Choice from "./Choice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
    const navigate = useNavigate();
    const [getStarted, setgetStarted] = useState(false);
    const [userType, setuserType] = useState(Cookies.get("userType"));
    useEffect(() => {
        if (userType === "user") {
            navigate("/User");
        }
        if (userType === "edu") {
            navigate("/Edu");
        }
    });

    function Start() {
        setgetStarted(true);
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="flex flex-col lg:flex-row w-screen h-[80vh] min-h-[700px]">
                <LeftDesign></LeftDesign>
                <div className="w-full lg:w-[60%] flex flex-col items-center justify-center pt-28 gap-14 pb-[10%] h-fit">
                    {getStarted ? (
                        <Choice setgetStarted={setgetStarted}></Choice>
                    ) : (
                        <>
                            <h1 className="mt-10 text-4xl lg:text-5xl font-extrabold mb-6 animate-fade-in-move-down">
                                Welcome
                            </h1>
                            <div className="flex-shrink-0 w-full box-border flex items-center justify-center">
                                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full mx-auto">
                                    <div className="flex flex-col items-center justify-center">
                                        <h1 className="text-3xl lg:text-5xl font-extrabold mb-6 animate-fade-in-move-right leading-tight w-full text-center">
                                            Revolutionize Your Skill Assessment
                                        </h1>
                                        <p className="text-base lg:text-lg mb-8 animate-fade-in-move-right w-full text-center">
                                            Our AI-powered assessment tool
                                            evaluates candidates across various
                                            skill levels, including students,
                                            Persons with Disabilities (PWD), and
                                            vocational learners. Experience the
                                            future of skill evaluation.
                                        </p>

                                        <button
                                            onClick={() => {
                                                Start();
                                            }}
                                            className="flex items-center text-xl bg-[var(--boom-color)] w-fit text-[var(--text-color)] animate-fade-in-move-up hover:scale-110 px-8 py-7 rounded-full shadow-2xl transition duration-300"
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <RightDesign></RightDesign>
            </div>

            <div className="flex flex-col pt-10">
                <div className="mt-14 w-full px-4 lg:px-14 box-border flex flex-col lg:flex-row gap-4">
                    <div className="flex flex-col items-center bg-[var(--main-color)] animate-fade-in-move-left p-6 rounded-lg shadow-2xl">
                        <FaRegChartBar className="text-4xl mb-4" />
                        <h2 className="text-xl font-semibold mb-2">
                            Comprehensive Evaluation
                        </h2>
                        <p className="text-base">
                            Assess a wide spectrum of skills and competencies
                            with our holistic approach.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-[var(--main-color)] animate-fade-in-move-left p-6 rounded-lg shadow-2xl">
                        <AiOutlineUsergroupAdd className="text-4xl mb-4" />
                        <h2 className="text-xl font-semibold mb-2">
                            Inclusive for All
                        </h2>
                        <p className="text-base">
                            Designed with accessibility features for Persons
                            with Disabilities (PWD).
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-[var(--main-color)] animate-fade-in-move-left p-6 rounded-lg shadow-2xl">
                        <FaBrain className="text-4xl mb-4" />
                        <h2 className="text-xl font-semibold mb-2">
                            AI-Powered Personalization
                        </h2>
                        <p className="text-base">
                            Adaptive assessments tailored to individual skill
                            levels and learning needs.
                        </p>
                    </div>

                    <div className="flex flex-col items-center bg-[var(--main-color)] animate-fade-in-move-left p-6 rounded-lg shadow-2xl">
                        <GiTeacher className="text-4xl mb-4" />
                        <h2 className="text-xl font-semibold mb-2">
                            Real-Time Analytics
                        </h2>
                        <p className="text-base">
                            Detailed feedback and analytics to enhance learning
                            outcomes and effectiveness.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
