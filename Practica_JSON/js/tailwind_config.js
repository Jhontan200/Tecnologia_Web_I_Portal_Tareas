tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#ea2a33",
                "comic-red": "#EF4444",
                "nature-green": "#10b981",
                "background-dark": "#000000",
            },
            fontFamily: {
                "comic-display": ["Bangers", "cursive"],
                "comic-body": ["Comic Neue", "cursive"],
                "nature-display": ["Be Vietnam Pro", "sans-serif"],
                "nature-body": ["Noto Sans", "sans-serif"],
            },
            animation: {
                'pop-in': 'popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
            },
            keyframes: {
                popIn: {
                    '0%': { opacity: '0', transform: 'scale(0.8) rotate(-2deg)' },
                    '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
}