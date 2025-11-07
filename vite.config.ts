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
        secure:false, 
        rewrite: (path) => path.replace(/^\/products/, "/products"),
      },
      "/categories":{
        target:"http://localhost:5000",
        changeOrigin: true,
        secure:false,
        rewrite: (path) => path.replace(/^\/categories/, "/categories"),
      },
      "/wishlist":{
        target:"http://localhost:5000",
        changeOrigin: true,
        secure:false,
        rewrite: (path) => path.replace(/^\/wishlist/, "/wishlist"),
      },
      "users":{
        target:"http://localhost:5000"
      }
    },
    watch:{
      // This line disables the json-auth watch ability when new data is stored inside json so we can prevent reloading of the browser when the form is submitted to store a new user.
      ignored:[
        "**/db.json",
        "**/node_modules/**"
      ]
    }
  }
});
