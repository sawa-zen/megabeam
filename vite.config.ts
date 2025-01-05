import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  // local ip からもアクセスできるようにする
  server: {
    host: '0.0.0.0'
  },
  plugins: [basicSsl(), react()],
  css: {
    modules: {
      localsConvention: 'dashes',
    }
  }
})
