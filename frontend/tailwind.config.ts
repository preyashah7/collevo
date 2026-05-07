module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Premium color system
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A360A',
          900: '#7C2D12'
        },
        dark: '#0F172A',
        surface: '#FFFFFF',
        background: '#F8FAFC',
        border: '#E2E8F0',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
        'text-muted': '#94A3B8',
        'accent-light': '#FFF7ED',
        success: '#059669',
        warning: '#D97706',
        danger: '#DC2626',
        safe: '#10B981',
        moderate: '#F59E0B',
        reach: '#EF4444'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        h1: ['36px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        h2: ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        label: ['11px', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }]
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
}
