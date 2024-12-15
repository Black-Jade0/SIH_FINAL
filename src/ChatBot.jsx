import React, { useEffect } from "react";

const ChatbotComponent = () => {
    useEffect(() => {
        // Load the chatbot script dynamically
        const script = document.createElement("script");
        script.src = "https://chatbotcopy-dmm3.onrender.com/copilot/index.js";
        script.async = true;

        // Append script to the body
        document.body.appendChild(script);

        // Wait for the script to load completely before trying to access `window.mountChainlitWidget`
        script.onload = () => {
            if (typeof window.mountChainlitWidget === "function") {
                console.log("Initializing chatbot...");
                window.mountChainlitWidget({
                    chainlitServer: "https://chatbotcopy-dmm3.onrender.com/",
                });
            } else {
                console.error(
                    "mountChainlitWidget function is not available on window object"
                );
            }
        };

        // Cleanup the script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};

export default ChatbotComponent;