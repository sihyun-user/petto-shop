module.exports = {
  theme: {
    extend: {
      colors: {
        colorPrimary: '#967D6C',
        colorPrimaryLight: '#E8E1DA',
        colorPrimaryDark: '#786056',
        colorSecondary: '#bda697',
        colorGrayLight: '#f8f8f8',
        colorGray: '#e5e7eb',
        colorGrayDark: '#636363',
        colorBlack: '#333333',
        colorBlackDark: '#1e1e1e',
        colorRed: '#f87171',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      },
      screens: {
        xs: '480px'
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1200px',
          xl: '1200px',
          '2xl': '1200px'
        }
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.7s forwards'
      }
    }
  },
  plugins: []
}
