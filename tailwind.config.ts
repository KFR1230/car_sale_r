import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    fontSize: {
      'title-clamp': 'clamp(1.25rem, 4vw , 2.25rem)',
      'subTitle-clamp': 'clamp(0.55rem, 4vw , 0.875rem)',
      'info-clamp': 'clamp(0.55rem, 4vw , 1.375rem)',
      'text-clamp': 'clamp(1.5rem, 2.5vw, 4rem)',
      'content-clamp': 'clamp(0.75rem, 2.5vw, 1.25rem)',
      xs: ['0.75rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.875rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.375rem', '1.75rem'],
      '3xl': ['1.5rem', '1.8rem'],
    },
    boxShadow: {
      bottomRight:
        ' 5px 10px 15px -3px rgb(0 0 0 / 0.1), 5px 4px 6px -4px rgb(0 0 0 / 0.1)',
      bottom:
        ' 0px 10px 15px -3px rgb(0 0 0 / 0.1), 0px 5px 6px -4px rgb(0 0 0 / 0.1)',
      shadowInner: 'inset 0 0 30px 0px rgba(181, 181, 181, 0.77)',
      banner: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: {
            transform: 'scaleY(0)',
          },
          to: {
            transform: 'scaleY(1)',
          },
        },
        'accordion-left': {
          '0%': {
            transform: 'scaleX(0)',
          },
          '100%': {
            transform: 'scaleX(1)',
          },
        },
        'accordion-right': {
          '0%': {
            transform: 'scaleX(1)',
          },
          '100%': {
            transform: 'scaleX(0)',
            display: 'hidden',
          },
        },
        'show-content': {
          from: {
            opacity: '0.5',
          },
          to: {
            opacity: '1',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'accordion-right': 'accordion-right 0.5s ease forwards',
        'accordion-left': 'accordion-left 0.5s ease',
        'show-content': 'show-content 0.5s 0.2s ease-out forwards',
        'close-content': 'show-content 0.5s 0.2s ease-out reverse forwards',
        'show-text': 'show-content 1s 0.5s ease-out forwards',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 5px 5px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), {}],
} satisfies Config;

export default config;
