import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
  plugins: [
    {
      name: 'clean-urls',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const map = {
            '/admin':  '/admin.html',
            '/events': '/events.html',
          }
          if (map[req.url]) {
            req.url = map[req.url]
          }
          next()
        })
      },
    },
  ],
})
