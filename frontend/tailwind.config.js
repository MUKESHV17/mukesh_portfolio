/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#030014',
        'cyber-card': 'rgba(3, 0, 20, 0.45)',
        'space-dark': '#0b042c',
        'neon-cyan': '#00f5ff',
        'neon-magenta': '#ff007f',
        'neon-green': '#39ff14',
        'neon-blue': '#0575e6',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 245, 255, 0.35)',
        'neon-magenta': '0 0 15px rgba(255, 0, 127, 0.35)',
        'neon-green': '0 0 15px rgba(57, 255, 20, 0.35)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite alternate',
        'text-glow': 'textGlow 3s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 245, 255, 0.2), inset 0 0 5px rgba(0, 245, 255, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.6), inset 0 0 10px rgba(0, 245, 255, 0.3)' },
        },
        textGlow: {
          '0%': { textShadow: '0 0 4px rgba(0, 245, 255, 0.2)' },
          '100%': { textShadow: '0 0 12px rgba(0, 245, 255, 0.6), 0 0 20px rgba(255, 0, 127, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
