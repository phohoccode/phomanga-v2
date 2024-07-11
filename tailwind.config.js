/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        './src/assets/index.css'
    ],
    theme: {
        extend: {
            spacing: {
                'desktop': 'calc(100% - (128px + 180px + 32px))',
                'mobile': 'calc(100% - 32px)',
                'chapter-desktop': 'calc(10% - 11px)',
                'chapter-table': 'calc(20% - 10px)',
                'chapter-mobile': 'calc(33.33333% - 8px)'
            },
            screens: {
                'mobile': '320px'
            },
            boxShadow: {
                'custom': '0 -4px 32px #0003',
                'comic': '0 4px 8px #0000001a'
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
                fromRightIn: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideOut: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                fromRightOut: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(100%)' },
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
                    '100%': { height: '45vh' }
                },
                blurFilter: {
                    '0%': { backdropFilter: 'blur(0)' },
                    '100%': { backdropFilter: 'blur(4px)' }
                },
                topToBottom: {
                    '0%': { transform: 'translateY(-200%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                bottomToTop: {
                    '0%': { transform: 'translateY(200%)' },
                    '100%': { transform: 'translateX(0)' },
                }
                
            },
            animation: {
                'slide-in': 'slideIn 0.3s ease',
                'slide-out': 'slideOut 0.3s ease',
                'from-rigth-in': 'fromRightIn 0.3s ease',
                'from-rigth-out': 'fromRightOut 0.3s ease',
                'fade-in': 'faseIn 0.3s ease',
                'fade-out': 'faseOut 0.3s ease',
                'scale-in': 'scaleIn 0.3s ease',
                'scale-out': 'scaleOut 0.3s ease',
                'height-in': 'heightIn 0.3s ease',
                'blurFilter-in': 'blurFilter .3s ease',
                'top-to-bottom': 'topToBottom ease .3s',
                'bottom-to-top': 'bottomToTop ease .3s'
            },
        },
    },
    plugins: [],
    darkMode: 'class'
}