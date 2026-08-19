/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'gold-spotlight': {
          '0%, 100%': {
            boxShadow:
              '0 0 0 1px rgba(196, 165, 116, 0.35), 0 0 28px rgba(196, 165, 116, 0.12), inset 0 1px 0 0 rgba(255,255,255,0.06)',
          },
          '50%': {
            boxShadow:
              '0 0 0 1px rgba(196, 165, 116, 0.65), 0 0 48px rgba(196, 165, 116, 0.28), inset 0 1px 0 0 rgba(255,255,255,0.08)',
          },
        },
      },
      animation: {
        'gold-spotlight': 'gold-spotlight 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
