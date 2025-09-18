/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clean Professional Color System
        primary: '#1F2937',     // Slate Gray 800 - headings
        secondary: '#3B82F6',   // Blue 500 - CTAs
        accent: '#10B981',      // Emerald 500 - success/highlights

        // Neutral Palette
        background: '#FFFFFF',  // Pure White
        surface: '#F9FAFB',     // Gray 50
        border: '#E5E7EB',      // Gray 200

        // Text Colors
        'text-primary': '#111827',   // Gray 900
        'text-secondary': '#6B7280', // Gray 500
        'text-muted': '#9CA3AF',     // Gray 400

        // Semantic Colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}