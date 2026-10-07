import { ref } from 'vue'

// Two counters (docs/specs/site-analytics-consent.md in the app repo). Cloudflare Web Analytics
// sets no cookie and keeps no IP address, so it runs for everyone. Google Analytics sets cookies,
// so it loads only after Accept; index.html sets its consent default to denied before anything.
const GA_ID = 'G-4T27V43Q6F'
// Public by design (it ships in the page): Cloudflare dashboard › Web Analytics › duotyping.com.
// Empty until the owner adds the site there, and then nothing loads.
const CF_BEACON_TOKEN = ''

const KEY = 'duotyping-consent'
const DAY = 86_400_000
// CNIL: ask again 6 months after a refusal; an accept lasts at most 13 months.
const ACCEPT_LASTS = 395 * DAY
const REJECT_LASTS = 182 * DAY

interface Choice {
  analytics: boolean
  at: number
}

/** Whether the banner shows. False on the server, so the prerendered page never carries it. */
export const consentOpen = ref(false)

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function read(): Choice | null {
  try {
    const choice = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Choice | null
    if (!choice) return null
    return Date.now() - choice.at < (choice.analytics ? ACCEPT_LASTS : REJECT_LASTS) ? choice : null
  } catch {
    return null
  }
}

function loadScript(src: string, attrs: Record<string, string> = {}) {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  for (const [name, value] of Object.entries(attrs)) script.setAttribute(name, value)
  document.head.append(script)
}

let gaLoaded = false
function startGoogleAnalytics() {
  window.gtag('consent', 'update', { analytics_storage: 'granted' })
  if (gaLoaded) return
  gaLoaded = true
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

function stopGoogleAnalytics() {
  window.gtag('consent', 'update', { analytics_storage: 'denied' })
  // Clear what an earlier Accept left: GA's cookies sit on the bare domain.
  for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
    if (!name.startsWith('_ga')) continue
    for (const domain of ['', `; domain=.${location.hostname}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
    }
  }
}

/** Once, in the browser: the cookieless counter, then GA if accepted, else the banner. */
export function startAnalytics() {
  if (CF_BEACON_TOKEN) {
    loadScript('https://static.cloudflareinsights.com/beacon.min.js', {
      'data-cf-beacon': JSON.stringify({ token: CF_BEACON_TOKEN }),
    })
  }
  const choice = read()
  if (choice?.analytics) startGoogleAnalytics()
  else if (!choice) consentOpen.value = true
}

/** Accept or Reject, from the banner. Storing the choice itself needs no consent. */
export function chooseAnalytics(analytics: boolean) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics, at: Date.now() } satisfies Choice))
  } catch {
    // Private mode: the choice holds for this page, and the banner asks again next visit.
  }
  consentOpen.value = false
  if (analytics) startGoogleAnalytics()
  else stopGoogleAnalytics()
}
