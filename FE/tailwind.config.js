// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
        // Add other file types as needed
    ],

    theme: {
        extend: {
            colors: {
                'black-rgba': 'rgba(255, 255, 255, 0.5)',
                'linear-carousel1':
                    'linear-gradient(135deg, #e66465, #9198e5);',
            },
            height: {
                124: '25rem',
                150: '37.5rem',
                100: '6.25rem',
            },
            width: {
                124: '25rem',
                150: '37.5rem',
                100: '6.25rem',
            },
            fontFamily: {
                roboto: ['"Roboto Slab"', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
    variants: {
        scrollbar: ['rounded'],
    },
}
