/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                'desktop': 'calc(100% - (128px + 180px + 32px))',
                'mobile': 'calc(100% - 32px)'
            },
            screens: {
                'mobile': '320px'
            },
            boxShadow: {
                'custom': '0 -4px 32px #0003'
            },
            backdropBlur: {
                's': '4px'
            },
            backgroundImage: {
                'image-inherit': 'inherit'
            },
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideOut: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                faseIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                faseOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' }
                },
                scaleIn: {
                    '0%': { scale: '0' },
                    '100%': { scale: '1' }
                },
                scaleOut: {
                    '0%': { scale: '1' },
                    '100%': { scale: '0' }
                },
                heightIn: {
                    '0%': { height: '0' },
                    '100%': { height: '50vh' }
                },
                blurFilter: {
                    '0%': { backdropFilter: 'blur(0)' },
                    '100%': { backdropFilter: 'blur(4px)' }
                }
            },
            animation: {
                'slide-in': 'slideIn 0.5s ease',
                'slide-out': 'slideOut 0.5s ease',
                'fade-in': 'faseIn 0.5s ease',
                'fade-out': 'faseOut 0.5s ease',
                'scale-in': 'scaleIn 0.5s ease',
                'scale-out': 'scaleOut 0.5s ease',
                'height-in': 'heightIn 0.2s ease',
                'blurFilter-in': 'blurFilter .3s ease'
            },
        },
    },
    plugins: [],
    darkMode: 'class'
}