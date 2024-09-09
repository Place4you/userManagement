/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",

  ],
  theme: {
    extend: {
      screens: {
        'tablet': { 'min': '700px', 'max': '1025px' }, // Custom tablet breakpoint
      },
      fontFamily: {
        gilroy: ['Gilroy', 'sans-serif'], // Custom font
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },       
        slideInToRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        infiniteScroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        slideInFromRight: 'slideInFromRight 300ms ease-in-out',
        slideInToRight: 'slideInToRight 300ms ease-in-out',
        infiniteScroll: 'infinite-scroll 25s linear infinite',

        slide: 'slide 15s linear infinite',
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

