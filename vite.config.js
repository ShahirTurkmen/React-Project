import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
      // cert: readFileSync("./public/fontello-dev.cert",{encoding:"utf-8"}),
      // key:readFileSync("./public/fontello-dev.key",{encoding:"utf-8"})
  // },
    headers: {
      "Cross-Origin-Resource-Policy": "cross-origin",
      "Cross-Origin-Embedder-Policy":"require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    }
  }
})
