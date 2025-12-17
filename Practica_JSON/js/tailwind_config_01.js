tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#EF4444",
                "background-light": "#F3F4F6",
                "background-dark": "#111827",
                "comic-yellow": "#FCD34D",
                "comic-blue": "#3B82F6",
                "comic-purple": "#8B5CF6",
            },
            fontFamily: {
                display: ['"Bangers"', 'cursive'],
                body: ['"Comic Neue"', 'cursive'],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
            },
            boxShadow: {
                'comic': '6px 6px 0px 0px rgba(0,0,0,1)',
                'comic-dark': '6px 6px 0px 0px #FCD34D',
                'comic-hover': '12px 12px 0px 0px rgba(0,0,0,1)',
            },
            animation: {
                'pop-in': 'popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                'slide-up-fade': 'slideUpFade 0.8s ease-out forwards',
                'card-entrance': 'cardEntrance 0.6s ease-out forwards',
                'bg-pan': 'bgPan 20s linear infinite',
                'molecule-drift': 'moleculeDrift 5s ease-in-out infinite alternate',
                'subtle-glow': 'subtleGlow 3s ease-in-out infinite alternate',
                'flame-pulse': 'flamePulse 3s ease-in-out infinite alternate',
            },
            keyframes: {
                popIn: {
                    '0%': { opacity: '0', transform: 'scale(0.5) rotate(-5deg)' },
                    '70%': { transform: 'scale(1.1) rotate(3deg)' },
                    '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
                },
                slideUpFade: {
                    '0%': { opacity: '0', transform: 'translateY(20px) rotate(2deg)' },
                    '100%': { opacity: '1', transform: 'translateY(0) rotate(1deg)' },
                },
                cardEntrance: {
                    '0%': { opacity: '0', transform: 'translateY(100px) scale(0.9)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
                bgPan: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '100% 100%' },
                },
                moleculeDrift: {
                    '0%, 100%': {
                        transform: 'translateX(0px) translateY(0px) rotate(0deg)',
                        filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))'
                    },
                    '50%': {
                        transform: 'translateX(10px) translateY(5px) rotate(2deg)',
                        filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.8))'
                    },
                },
                subtleGlow: {
                    '0%, 100%': { transform: 'scale(1.0)', filter: 'drop-shadow(0 0 5px rgba(139, 92, 246, 0.3))' },
                    '50%': { transform: 'scale(1.01)', filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.6))' },
                },
                flamePulse: {
                    '0%': { filter: 'drop-shadow(0 0 5px #EF4444)', transform: 'scale(1.0)' },
                    '50%': { filter: 'drop-shadow(0 0 15px #FCD34D)', transform: 'scale(1.05)' },
                    '100%': { filter: 'drop-shadow(0 0 5px #EF4444)', transform: 'scale(1.0)' },
                }
            }
        },
    },
};