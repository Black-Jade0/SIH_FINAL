import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Signcss.css";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

const EduSign = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-in and sign-up modes

    // React Hook Form setup for Sign-In
    const {
        register: registerSignIn,
        handleSubmit: handleSignInSubmit,
        reset: resetSignIn,
    } = useForm();

    // React Hook Form setup for Sign-Up
    const {
        register: registerSignUp,
        handleSubmit: handleSignUpSubmit,
        reset: resetSignUp,
    } = useForm();

    // Handle sign-in form submission
    const onSignInSubmit = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/edu/signin`, data, {
                withCredentials: true, // Ensure cookies are included
            });
            console.log("Sign-In Response:", response.data);
            navigate("/");
            console.log("Sign-In successful!");
        } catch (error) {
            console.error(
                "Sign-In Error:",
                error.response?.data || error.message
            );
            alert("Sign-In failed!");
        }
        resetSignIn();
    };

    // Handle sign-up form submission
    const onSignUpSubmit = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/edu/signup`, data, {
                withCredentials: true, // Ensure cookies are included
            });
            console.log("Sign-Up Response:", response.data);
            navigate("/");
            console.log("Sign-Up successful!");
        } catch (error) {
            console.error(
                "Sign-Up Error:",
                error.response?.data || error.message
            );
            alert("Sign-Up failed!");
        }
        resetSignUp();
    };

    // Toggle sign-in/sign-up modes
    const handleToggle = () => {
        setIsSignUp((prev) => !prev);
    };

    return (
        <div className="flex flex-row w-screen h-fit">
            <div className={`cont ${isSignUp ? "s--signup" : ""}`}>
                {/* Sign-In Form */}
                <div className="form sign-in">
                    <h2>Welcome</h2>
                    <form onSubmit={handleSignInSubmit(onSignInSubmit)}>
                        <label>
                            <span>Email</span>
                            <input
                                type="email"
                                {...registerSignIn("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email format",
                                    },
                                })}
                            />
                        </label>
                        <label>
                            <span>Password</span>
                            <input
                                type="password"
                                {...registerSignIn("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                            />
                        </label>
                        <p className="forgot-pass">Forgot password?</p>
                        <button type="submit" className="submit">
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Sub-container for toggle */}
                <div className="sub-cont">
                    <div className="img">
                        <div className="img__text m--up">
                            <h3>Don't have an account? Please Sign up!</h3>
                        </div>
                        <div className="img__text m--in">
                            <h3>
                                If you already have an account, just sign in.
                            </h3>
                        </div>
                        <div className="img__btn" onClick={handleToggle}>
                            <span className="m--up">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>

                    {/* Sign-Up Form */}
                    <div className="form sign-up">
                        <h2>Create your Account</h2>
                        <form onSubmit={handleSignUpSubmit(onSignUpSubmit)}>
                            <label>
                                <span>Name</span>
                                <input
                                    type="text"
                                    {...registerSignUp("username", {
                                        required: "Name is required",
                                    })}
                                />
                            </label>
                            <label>
                                <span>Last Name</span>
                                <input
                                    type="text"
                                    {...registerSignUp("lastname", {
                                        required: "Last name is required",
                                    })}
                                />
                            </label>
                            <label>
                                <span>Email</span>
                                <input
                                    type="email"
                                    {...registerSignUp("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email format",
                                        },
                                    })}
                                />
                            </label>
                            <label>
                                <span>Password</span>
                                <input
                                    type="password"
                                    {...registerSignUp("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}
                                />
                            </label>
                            <button type="submit" className="submit">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EduSign;
