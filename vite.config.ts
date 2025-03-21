import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@styles', replacement: path.resolve(__dirname, './src/styles') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: '@contexts', replacement: path.resolve(__dirname, './src/contexts') }
    ]
  }
})
