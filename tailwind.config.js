/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",

  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
    },
  },
  purge: {
    content: ['./src/**/*.{html,ts}'],
    options: {
      safelist: [
        'fixed', 'top-5', 'right-5', 'w-full', 'max-w-sm', 
        'bg-white', 'bg-green-500', 'bg-red-500', 
        'rounded-lg', 'shadow-md', 'text-white', 'text-green-500', 'text-red-500',
        'font-semibold', 'text-sm', 'text-gray-600', 'text-xl'
      ],
    },
  },
  plugins: [],
}

