// vite.config.js
import { defineConfig } from "file:///E:/Systango/e-commerce_frontend_jitendra_aakde/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Systango/e-commerce_frontend_jitendra_aakde/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://e-comm-backend-ugos.onrender.com/",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
export {
  vite_config_default as default
};

