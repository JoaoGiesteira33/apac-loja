/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
                '160': '40rem',
                '176': '44rem',
                '192': '48rem',
            },
            screens: {
                'xs': '375px',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
});
