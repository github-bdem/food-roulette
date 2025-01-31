/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: figure out why path.resolve is so busted according to eslint

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, './src/components'),
      "@assets": path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: [react(), tailwindcss(), tsconfigPaths()],
})
