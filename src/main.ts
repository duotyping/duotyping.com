import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { vLoop, vReveal } from './utils/motion'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'
import './style.css'

const routes = [
  { path: '/', component: Home },
  // The app links to both from every Settings tab.
  { path: '/privacy', component: () => import('./pages/Privacy.vue') },
  { path: '/terms', component: () => import('./pages/Terms.vue') },
  // Every client's Send Feedback… opens it, with its setup in the query.
  { path: '/feedback', component: () => import('./pages/Feedback.vue') },
  // The browser opens it when the extension is removed.
  { path: '/uninstalled', component: () => import('./pages/Uninstalled.vue') },
  // Prerendered as dist/404.html, which Cloudflare serves for any unknown path...
  { path: '/404', component: NotFound },
  // ...and hydrated here, whatever that path was.
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.directive('loop', vLoop)
  app.directive('reveal', vReveal)
})
