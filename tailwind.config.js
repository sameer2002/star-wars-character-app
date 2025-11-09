/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1976d2',
                secondary: '#dc004e',
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
}