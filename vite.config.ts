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
  },
  server:{
    proxy:{
      "/products":{
        target: "http://localhost:5000", // Here making sure to hit the backend endpoint of products and not the React dev server.
        changeOrigin: true,
      },
      "/categories":{
        target:"http://localhost:5000",
        changeOrigin: true,

      },
      "/wishlist":{
        target:"http://localhost:5000",
        changeOrigin: true,

      }
    }
  }
});
