// tailwind.config.js
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
            },
            height: {
                124: '31.25rem',
                100: '6.25rem',
            },
            width: {
                124: '31.25rem',
                100: '6.25rem',
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
    variants: {
        scrollbar: ['rounded'],
    },
}
