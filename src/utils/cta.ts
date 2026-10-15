import { computed } from 'vue'
import { EDGE_ADDONS_URL, PLATFORMS, isLive, linkTo } from './facts'
import { extensionStore, os } from './platform'

// A button the page draws: a link once its store is live, "Coming soon" until then.
export type Cta = { label: string; href?: string; soon?: boolean }
const link = (label: string, href: string): Cta => ({ label, href: linkTo(href) })
const SOON: Cta = { label: 'Coming soon', soon: true }

// The app for this computer: Mac or Windows. A phone or another system gets none.
export const desktopCta = computed<Cta | null>(() => {
  if (os.value === 'mac') return isLive('mac') ? link(PLATFORMS.mac.cta, PLATFORMS.mac.href) : SOON
  if (os.value === 'windows') return isLive('windows') ? link(PLATFORMS.windows.cta, PLATFORMS.windows.href) : SOON
  return null
})

// The extension, where this browser can take it.
export const extensionCta = computed<Cta | null>(() => {
  if (!extensionStore.value) return null
  const edge = extensionStore.value === 'edge'
  if (!isLive('chrome')) return null
  return link(edge ? 'Add to Edge' : 'Add to Chrome', edge ? EDGE_ADDONS_URL : PLATFORMS.chrome.href)
})

// The header's one button: the extension in a browser that takes it, else this computer's app.
export const headerCta = computed<Cta | null>(() => extensionCta.value ?? desktopCta.value)
