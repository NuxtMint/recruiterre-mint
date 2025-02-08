import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        'jobs-primary': '#2563eb',
        'jobs-accent': '#4f46e5',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
