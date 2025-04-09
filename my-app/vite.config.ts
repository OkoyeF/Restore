import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import mkcert from 'vite-plugin-mkcert'  // Comment out this import

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    // https: false  // Explicitly disable HTTPS
  },
  plugins: [react()],  // Remove mkcert() from plugins
})