import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B0E0E6',
        lightBlue: '#E1EBED',
        grayBlue: '#A7B5B7',
        mutedGray: '#8D9087',
        beige: '#CDB7AB',
        softPink: '#D9C8C0',
        softBeige: '#ECE6DE',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(17, 24, 39, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
