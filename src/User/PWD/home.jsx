import React from "react";
import { Link } from "react-router-dom";

const PWDhome = () => {
    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "Arial, sans-serif",
                color: "#333",
                lineHeight: "1.6",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#2c3e50",
                    marginBottom: "20px",
                }}
            >
                Welcome to the PWD Section
            </h1>
            <p
                style={{
                    fontSize: "16px",
                    textAlign: "justify",
                    marginBottom: "30px",
                }}
            >
                This section is dedicated to providing an inclusive and
                accessible experience. Explore the following features tailored
                for you:
            </p>

            <div
                style={{
                    marginTop: "20px",
                    borderTop: "1px solid #ddd",
                    paddingTop: "20px",
                }}
            >
                <h2
                    style={{
                        color: "#34495e",
                        marginBottom: "15px",
                    }}
                >
                    Features:
                </h2>
                <ul
                    style={{
                        listStyleType: "none",
                        paddingLeft: "0",
                    }}
                >
                    <li
                        style={{
                            marginBottom: "20px",
                            padding: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                        }}
                    >
                        <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>
                            Online Tests
                        </h3>
                        <p style={{ margin: "0 0 10px" }}>
                            Take online tests designed to assess your skills and
                            provide valuable feedback.
                        </p>
                        <Link
                            to="/PWD/Test"
                            style={{
                                textDecoration: "none",
                                color: "#3498db",
                            }}
                        >
                            Go to Tests
                        </Link>
                    </li>
                    <li
                        style={{
                            marginBottom: "20px",
                            padding: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                        }}
                    >
                        <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>
                            Results and Analytics
                        </h3>
                        <p style={{ margin: "0 0 10px" }}>
                            View your test results and detailed analytics to
                            track your progress.
                        </p>
                        <Link
                            to="/PWD/Result"
                            style={{
                                textDecoration: "none",
                                color: "#3498db",
                            }}
                        >
                            View Results
                        </Link>
                    </li>
                    <li
                        style={{
                            marginBottom: "20px",
                            padding: "10px",
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                        }}
                    >
                        <h3 style={{ margin: "0 0 10px", color: "#2c3e50" }}>
                            Support
                        </h3>
                        <p style={{ margin: "0 0 10px" }}>
                            Get assistance and support whenever you need it.
                        </p>
                        <Link
                            to="/PWD/Support"
                            style={{
                                textDecoration: "none",
                                color: "#3498db",
                            }}
                        >
                            Get Support
                        </Link>
                    </li>
                </ul>
            </div>

            <footer
                style={{
                    marginTop: "30px",
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#7f8c8d",
                }}
            >
                <p>Providing accessibility for everyone, one step at a time.</p>
            </footer>
        </div>
    );
};

export default PWDhome;
