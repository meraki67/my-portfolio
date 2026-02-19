import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "my-portfolio", // NOTE: set this to your repo name if you are deploying to GitHub Pages, otherwise you can remove this line
})
