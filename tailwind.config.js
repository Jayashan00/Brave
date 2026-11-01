/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#16233F', 50: '#EEF1F7', 100: '#D9DFEC', 300: '#8A98B8', 500: '#3A4C74', 700: '#1D2D50', 800: '#16233F', 900: '#0E1730' },
        gold: { DEFAULT: '#D9A21B', 100: '#FBF1D6', 300: '#ECC458', 600: '#B7850F', 700: '#8E670B' },
        crimson: { DEFAULT: '#A62830', 100: '#F7E1E2', 700: '#831E25' },
        chalk: '#F5F6F8',
        slate: { DEFAULT: '#5B6474' },
        line: '#DDE1E8',
      },
      fontFamily: {
        slab: ['"Zilla Slab"', '"Noto Sans Sinhala"', '"Noto Sans Tamil"', 'Georgia', 'serif'],
        sans: ['"Public Sans"', '"Noto Sans Sinhala"', '"Noto Sans Tamil"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 1px 2px rgba(22,35,63,.06), 0 8px 24px -12px rgba(22,35,63,.25)',
        deep: '0 30px 60px -30px rgba(14,23,48,.55)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        kenburns: { from: { transform: 'scale(1.0)' }, to: { transform: 'scale(1.12)' } },
      },
      animation: { marquee: 'marquee 40s linear infinite', kenburns: 'kenburns 9s ease-out forwards' },
    },
  },
  plugins: [],
};
