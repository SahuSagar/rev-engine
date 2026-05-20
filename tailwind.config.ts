import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ferrari: {
          red: '#DC2626',
          yellow: '#FCD34D',
          dark: '#0A0A0A',
          card: '#111111',
          border: '#1F1F1F',
        },
      },
    },
  },
}

export default config
