module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: 'Dancing Script, sans-serif',
      },
      animation: {
        'slide-show': 'slideShow 2s linear  ',
      },

      keyframes: {
        slideShow: {
          from: { height: 0 },
          to: { height: '100%' },
        },
      },
    },
  },
  plugins: [],
};
