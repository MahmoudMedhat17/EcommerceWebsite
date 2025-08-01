import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"src")
    }
  }
});
