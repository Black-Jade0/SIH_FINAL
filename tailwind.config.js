/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                "fade-in" : "fadeIn 5s ease-out 1s forwards",
                "fade-in-move-left": "fadeInMoveLeft 1s ease-out",
                "fade-in-move-down": "fadeInMoveDown 1s ease-out",
                "fade-in-move-right": "fadeInMoveRight 1s ease-out",
                "fade-in-move-up": "fadeInMoveUp 1s ease-out",
                "inc-size-box": "sizeInc 4s linear",
                "dec-size-box": "sizeDec 4s linear",
            },
            keyframes: {
                fadeIn: {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
                fadeInMoveLeft: {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(100px)", // Start position, moved 100px to the left
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)", // End position, at the original location
                    },
                },
                fadeInMoveDown: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-100px)", // Start position, moved 100px to the left
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)", // End position, at the original location
                    },
                },
                fadeInMoveRight: {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(-100px)", // Start position, moved 100px to the left
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)", // End position, at the original location
                    },
                },
                fadeInMoveUp: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(100px)", // Start position, moved 100px to the left
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)", // End position, at the original location
                    },
                },
            },
        },
    },
    plugins: [],
};
