import React, { useEffect } from "react";

const GoogleTranslate = () => {
    useEffect(() => {
        // Add Google Translate script
        const addScript = () => {
            const script = document.createElement("script");
            script.src =
                "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        };

        // Initialize Google Translate
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages:
                        "hi,bn,te,ta,mr,gu,kn,ml,pa,or,ur,as,sa,ks,ne,sd,mai,bh,bo,kok,mni,doi", // Indian languages
                    layout: window.google.translate.TranslateElement
                        .Dropdown,
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };

        addScript();

        // Cleanup
        return () => {
            delete window.googleTranslateElementInit;
        };
    }, []);

    return (
        <div
            id="google_translate_element"
            className="absolute top-0 right-0 z-40 rounded-md shadow-md w-40 max-h-20 overflow-auto"
        >
        </div>
    );
};

export default GoogleTranslate;

