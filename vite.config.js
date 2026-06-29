import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const root = dirname(fileURLToPath(import.meta.url))

// Multi-page: gallery (root index.html) + every tema-* folder + optional temp pages.
function buildInput() {
  const input = { main: resolve(root, 'index.html') }
  for (const name of ['_imgcheck.html']) {
    const p = resolve(root, name)
    if (fs.existsSync(p)) input[name.replace('.html', '')] = p
  }
  for (const entry of fs.readdirSync(root)) {
    if (entry.startsWith('tema-')) {
      const p = resolve(root, entry, 'index.html')
      if (fs.existsSync(p)) input[entry] = p
    }
  }
  return input
}

export default defineConfig({
  root,
  // Deploy kökü: Vercel/root için '/', GitHub Pages alt-yolu için VITE_BASE ile '/<repo>/'
  base: process.env.VITE_BASE || '/',
  server: { host: true, port: 5173 },
  build: {
    outDir: 'dist',
    rollupOptions: { input: buildInput() },
  },
})
