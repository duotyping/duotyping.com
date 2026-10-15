import { ref } from 'vue'
import { CHROME_STORE_URL, DOWNLOAD_URL } from './site'

// Every platform's facts in one place: the header, the hero, the platform cards, the pricing and
// the structured data all read them, so a store launch is a change here and nowhere else.
// Each status follows duotyping-specs specs/release-1.0.0.md: only the web app is live today.

export type PlatformId = 'mac' | 'windows' | 'chrome' | 'web'
export type Platform = {
  name: string
  device: 'laptop' | 'pc' | 'browser' | 'phone'
  live: boolean
  cta: string // what the button says once it's live
  href: string
  requires: string
  install?: string // a package manager's line, where there is one, shown once the platform is live
  tags: string[] // what this platform does that the others may not
}

export const WEB_APP_URL = 'https://app.duotyping.com/'
// The Microsoft Store and Edge Add-ons pages, once the listings exist (windows-store-listing.md).
export const WINDOWS_STORE_URL = ''
export const EDGE_ADDONS_URL = ''

export const PLATFORMS: Record<PlatformId, Platform> = {
  mac: {
    name: 'Mac',
    device: 'laptop',
    live: false,
    cta: 'Download for Mac',
    href: DOWNLOAD_URL,
    requires: 'macOS 14 or later · Apple silicon or Intel',
    install: 'brew install redevify/tap/duotyping',
    tags: ['Any app', 'Your own key', 'Translate', 'Pronounce'],
  },
  windows: {
    name: 'Windows',
    device: 'pc',
    live: false,
    cta: 'Get it for Windows',
    href: WINDOWS_STORE_URL,
    requires: 'Windows 10 22H2 or Windows 11',
    tags: ['Any app', 'Your own key', 'Translate', 'Pronounce'],
  },
  chrome: {
    name: 'Chrome and Edge',
    device: 'browser',
    live: false,
    cta: 'Add to Chrome',
    href: CHROME_STORE_URL,
    requires: 'Chrome 119 or later, or Edge',
    tags: ['Sites you switch on', 'Rewrite', 'Free account'],
  },
  web: {
    name: 'Web and phone',
    device: 'phone',
    live: true,
    cta: 'Start writing',
    href: WEB_APP_URL,
    requires: 'Any current browser · installs on a phone',
    tags: ['Write', 'Translate', 'Drafts on every device'],
  },
}

// Open the page with ?launch to see it as it will be on launch day, every store live.
export const previewLaunch = ref(false)
export const isLive = (id: PlatformId) => PLATFORMS[id].live || previewLaunch.value

// The plans, as the API counts them today (duotyping-api wrangler.jsonc; product/web-prd.md §4.3).
// No prices until the owner sets one (decided 2026-10-15).
export const PLANS = [
  {
    name: 'Free',
    line: 'For everyday writing.',
    items: ['20 checks on each computer, no account', 'With a free account, every day: 20 checks, 200 marks as you type, 50 translations', 'Spelling marks in Write, never counted'],
  },
  {
    name: 'Pro',
    soon: true,
    line: 'For writing all day.',
    items: ['Every day: 300 checks, 1,000 marks as you type, 300 translations', 'Within a fair monthly limit', 'Everything in Free'],
  },
  {
    name: 'Your own key',
    line: 'On Mac and Windows.',
    items: ['Checks with no daily limit', 'OpenAI, Anthropic or any OpenAI-compatible endpoint', 'Billed by your provider; DuoTyping keeps nothing'],
  },
]

// Shown as the companies' logos, which go in public/sponsors/ as each company's own artwork.
export const SPONSORS = ['Anthropic', 'Cloudflare', 'Google', 'Apple', 'Microsoft', 'Better Auth']
