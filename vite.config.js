import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import javascriptObfuscator from "vite-plugin-javascript-obfuscator";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        injectRegister: "auto",
        registerType: "autoUpdate",
        srcDir: "public",
        // filename: "firebase-messaging-sw.js",
        devOptions: { enabled: true, type: "classic" },
        // injectManifest: {
        //   injectionPoint: "self.__WB_MANIFEST",
        // },
        manifest: {
          name: "Prime eLeague",
          short_name: "Prime eLeague",
          scope: "/",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#000000",
          icons: [
            {
              src: "/icon-192-maskable.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "favicon",
            },
            {
              src: "/icon-512-maskable.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "favicon",
            },
            {
              src: "/icon-512-maskable.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
          maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.destination === "document",
              handler: "NetworkFirst",
              options: { cacheName: "html-cache" },
            },
          ],
        },
      }),
      // Conditional obfuscation based on environment variable
      isProduction &&
        javascriptObfuscator({
          options: {
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            stringArray: true,
            rotateStringArray: true,
            stringArrayEncoding: ['rc4'],
            stringArrayThreshold: 0.75,
            splitStrings: true,
            // disableConsoleOutput: false,
            // debugProtection: isProduction ? true : false,
            target: "browser",
          },
          include: ["src/**/*.{js,jsx,ts,tsx}"],
          exclude: [
            "node_modules/**",
            "public/**",
            "src/**/*.test.{js,jsx,ts,tsx}",
          ],
          apply: "build",
        }),
    ],
    server: {
      proxy: {
        "/socket.io": {
          target: "https://staging-backend.primeeleague.com",
          // target: "https://backend.primeeleague.com",
          ws: true,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    commonjsOptions: {
      esmExternals: true,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ["react", "react-dom"],
      exclude: ["vite-plugin-javascript-obfuscator"], // Exclude plugin from optimization
    },

    build: {
      sourcemap: !isProduction, // Only generate source maps in development
      minify: isProduction ? "esbuild" : false,
      chunkSizeWarningLimit: 10000,
    },
  };
});
