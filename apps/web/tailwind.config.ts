import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        site: '1180px',
      },
      colors: {
        forest: {
          50: '#f3f7f1',
          100: '#e3ecdf',
          200: '#c8dac0',
          300: '#a8c49c',
          400: '#7fa66f',
          500: '#5f874f',
          600: '#4b703f',
          700: '#406034',
          800: '#334d2b',
          900: '#293f24',
          950: '#142111',
        },
        earth: {
          50: '#faf8f3',
          100: '#f2ede1',
          200: '#e5dac5',
          300: '#d2bea0',
          400: '#ba9d76',
          500: '#a5835b',
          600: '#896849',
          700: '#6f523d',
          800: '#5e4637',
          900: '#523e32',
          950: '#2f211a',
        },
        bark: {
          50: '#fbf7ed',
          100: '#f4e7c8',
          200: '#e8cf93',
          300: '#dab45c',
          400: '#c99a35',
          500: '#ad7d25',
          600: '#8d5f1f',
          700: '#72491d',
          800: '#603d1d',
          900: '#52341c',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Lora', 'Georgia', 'serif'],
      },
      fontSize: {
        label: ['0.72rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
        caption: ['0.8rem', { lineHeight: '1.25rem' }],
        'body-sm': ['0.92rem', { lineHeight: '1.55rem' }],
        body: ['1rem', { lineHeight: '1.75rem' }],
        'body-lg': ['1.125rem', { lineHeight: '1.8rem' }],
        h5: ['1.25rem', { lineHeight: '1.7rem' }],
        h4: ['1.5rem', { lineHeight: '2rem' }],
        h3: ['1.875rem', { lineHeight: '2.35rem' }],
        h2: ['2.25rem', { lineHeight: '2.75rem' }],
        h1: ['clamp(2.5rem,5vw,4.75rem)', { lineHeight: '1.04' }],
      },
      boxShadow: {
        card: '0 12px 30px rgba(47, 33, 26, 0.06)',
        'card-lg': '0 22px 50px rgba(47, 33, 26, 0.10)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}

export default config