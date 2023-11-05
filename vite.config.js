import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  //Dev settings:
  server:{proxy:{'/api':"http://localhost:5550"}},

  //Deployment settings:
//   server: {
//     hmr: {
//         host: "localhost",
//         protocol: "ws",
//     },
//   },
});
