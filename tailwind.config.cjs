/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        colors: {
            primary: "#6beba5",
            secondary: "#e3e2e7",
            white: "#ffffff",
            black: "#000000",
            gray: {
                100: "#66666a",
                200: "#242426",
            },
            border: "#28292b",
            green: {
                100: "#328457",
                200: "#2a6a4a",
            },
        },
    },
    plugins: [],
};
