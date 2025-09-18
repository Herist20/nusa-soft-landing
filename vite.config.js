import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // PWA Support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Nusa Software - Web & App Development',
        short_name: 'Nusa Software',
        description: 'Professional web and mobile app development services',
        theme_color: '#3B82F6',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),

    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),

    // Brotli compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),

    // Image optimization
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],

  // Build optimization
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    rollupOptions: {
      output: {
        // Code splitting
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'emailjs': ['@emailjs/browser'],
          'animations': ['./src/style.css']
        },
        // Asset file naming
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `images/[name]-[hash][extname]`
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return `fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js'
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps for production debugging
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Asset inlining threshold (4kb)
    assetsInlineLimit: 4096,
    // Target modern browsers
    target: 'es2015',
    // Polyfill
    polyfillModulePreload: true
  },

  // CSS optimization
  css: {
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },

  // Development server
  server: {
    port: 3000,
    strictPort: false,
    open: true,
    cors: true
  },

  // Preview server
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
    cors: true
  },

  // Performance optimizations
  optimizeDeps: {
    include: ['vue', 'vue-router', '@emailjs/browser'],
    exclude: []
  }
})