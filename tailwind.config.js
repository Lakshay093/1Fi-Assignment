/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          500: '#635bff',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#1e1b4b',
        },
        fi: {
          purple: '#6b38c2',
          lightPurple: '#f4effc',
          badgeBg: '#eef2ff',
          green: '#10b981',
          textDark: '#111827',
          textMuted: '#6b7280',
        },
      },
    },
  },
  plugins: [],
};
