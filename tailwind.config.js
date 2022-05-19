module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: 'Dancing Script, sans-serif',
      },
      animation: {
        'fade-in': 'fadeIn 1s linear ',
      },

      fontSize: {
        xxs: ['.6rem', '0.7rem'],
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
