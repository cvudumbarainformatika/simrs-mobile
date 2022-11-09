
module.exports = {
  // purge: [],
  // darkMode: false, 
  content: [
    './screens/**/*.{html,js,jsx,ts,tsx}',
    './pages/**/*.{html,js,jsx,ts,tsx}',
    './components/**/*.{html,js,jsx,ts,tsx}',
    './src/layouts/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    minWidth: {
      '6rem': '24',
    },
    extend: {
      backgroundImage: theme => ({
        grd: 'linear-gradient(45deg, #50abdf, #1f78aa)'
      }),
      colors: {
        transparent: 'transparent',
        primary: '#0D5A86',
        grad:'#187DC1',
        secondary: '#06b8b8',
        dark      : '#161b2ef1',
        darkPage : '#0d101a',

        positive  : '#198754',
        negative  : '#dc3545',
        info      : '#0d6efd',
        warning: '#FFC257',
        
        white: '#ffffff',
        'gray': {
          light: '#e5e7eb',
          DEFAULT: '#9ca3af',
          dark: '#4b5563',
        },
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [],
}