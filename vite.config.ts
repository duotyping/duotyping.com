import { existsSync, readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// public/appcast.xml is the Sparkle feed the app repo's `make release` commits here: the one
// place the shipped build is named. Vite won't let code import from public/, so the page gets
// its text as a constant instead. Baked, not fetched: the push that updates the feed is the
// push that redeploys the page, so the Download link can never lag the release. Before the
// first release there is no feed, and the link falls back to the releases page.
const appcast = existsSync('public/appcast.xml') ? readFileSync('public/appcast.xml', 'utf8') : ''

export default defineConfig({
  define: { __APPCAST__: JSON.stringify(appcast), __YEAR__: new Date().getFullYear() },
  plugins: [vue(), tailwindcss()],
  ssgOptions: {
    formatting: 'minify',
    // /privacy is dist/privacy.html; Cloudflare serves it at /privacy (auto-trailing-slash).
    dirStyle: 'flat',
    // The whole stylesheet is small enough to inline into every page, so nothing blocks the
    // first paint and nothing is loaded twice. Inlined whole, never pruned to "critical"
    // rules: the page's scripted states (scrolled header, open menu, demo steps) are classes
    // the prerendered HTML doesn't carry yet, and pruning would drop them.
    beastiesOptions: { path: 'dist', publicPath: '/', inlineThreshold: 200_000 },
  },
})
