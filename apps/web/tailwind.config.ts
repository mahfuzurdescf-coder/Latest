import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary — forest green palette
        forest: {
          950: '#0D1F0D',
          900: '#1C3A1C',
          800: '#2D5A27',
          700: '#3B6D11',
          600: '#4A7D1F',
          500: '#5A8A3C',
          400: '#72A050',
          300: '#8FBA6A',
          200: '#B5D490',
          100: '#D5EAB8',
          50:  '#EAF3DE',
        },
        // Neutral — earth & stone
        earth: {
          950: '#0F0F0C',
          900: '#1A1A16',
          800: '#2C2C28',
          700: '#3D3C38',
          600: '#4F4E49',
          500: '#6B6960',
          400: '#8A8880',
          300: '#A8A69E',
          200: '#C8C3B4',
          100: '#E0DCD0',
          50:  '#F5F2EB',
        },
        // Accent — warm bark & amber
        bark: {
          900: '#3D2009',
          800: '#5C3210',
          700: '#7A4A1E',
          600: '#9A6030',
          500: '#B07038',
          400: '#C88040',
          300: '#D4933A',
          200: '#E8B870',
          100: '#F5D8A8',
          50:  '#FAEEDA',
        },
        // Conservation green — for CTA buttons & highlights
        conservation: {
          DEFAULT: '#2D5A27',
          light: '#3B6D11',
          dark: '#1C3A1C',
        },
        // Donation amber — distinct CTA color
        donation: {
          DEFAULT: '#B07038',
          light: '#D4933A',
          dark: '#7A4A1E',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },

      fontSize: {
        // Display — hero headings
        'display-xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-lg': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-md': ['3rem',    { lineHeight: '1.1',  letterSpacing: '-0.01em', fontWeight: '400' }],
        // Headings
        'h1': ['2.5rem',  { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h2': ['2rem',    { lineHeight: '1.2',  letterSpacing: '-0.005em', fontWeight: '500' }],
        'h3': ['1.5rem',  { lineHeight: '1.3',  fontWeight: '500' }],
        'h4': ['1.25rem', { lineHeight: '1.4',  fontWeight: '500' }],
        'h5': ['1.125rem',{ lineHeight: '1.5',  fontWeight: '500' }],
        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body':    ['1rem',     { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem',{ lineHeight: '1.6' }],
        // UI
        'label':   ['0.75rem',  { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '500' }],
        'caption': ['0.6875rem',{ lineHeight: '1.4' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },

      maxWidth: {
        'site':      '1280px',
        'prose-lg':  '780px',
        'prose':     '680px',
        'prose-sm':  '580px',
      },

      borderRadius: {
        'sm':  '4px',
        'md':  '6px',
        'lg':  '10px',
        'xl':  '14px',
        '2xl': '20px',
      },

      boxShadow: {
        // Minimal shadows — conservation design is flat
        'card':   '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-lg':'0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        'focus':  '0 0 0 3px rgba(59,109,17,0.25)',
      },

      typography: () => ({
        conservation: {
          css: {
            '--tw-prose-body':          '#4F4E49',   // earth.600
            '--tw-prose-headings':      '#1A1A16',   // earth.900
            '--tw-prose-links':         '#3B6D11',   // forest.700
            '--tw-prose-bold':          '#1A1A16',   // earth.900
            '--tw-prose-code':          '#2C2C28',   // earth.800
            '--tw-prose-pre-bg':        '#F5F2EB',   // earth.50
            '--tw-prose-quotes':        '#4F4E49',   // earth.600
            '--tw-prose-quote-borders': '#4A7D1F',   // forest.600
            '--tw-prose-hr':            '#C8C3B4',   // earth.200
            '--tw-prose-th-borders':    '#C8C3B4',   // earth.200
            '--tw-prose-td-borders':    '#E0DCD0',   // earth.100
            maxWidth: 'none',
            fontSize: '1.0625rem',
            lineHeight: '1.75',
            h1: { fontFamily: 'Lora, Georgia, serif', fontWeight: '500' },
            h2: { fontFamily: 'Lora, Georgia, serif', fontWeight: '500' },
            h3: { fontWeight: '500' },
            'blockquote p': {
              fontFamily: 'Lora, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              lineHeight: '1.6',
            },
            a: { textDecoration: 'underline', textDecorationColor: '#8FBA6A' }, // forest.300
          },
        },
      }),

      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
