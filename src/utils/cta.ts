import { computed } from 'vue'
import { EDGE_ADDONS_URL, PLATFORMS, isLive, linkTo, type PlatformId } from './facts'
import { extensionStore, os } from './platform'

// A button the page draws, only once its store is live; until then the page offers the web app.
export type Cta = { id: PlatformId; label: string; href: string }
const link = (id: PlatformId, label: string, href: string): Cta => ({ id, label, href: linkTo(href) })

// The app for this computer: Mac or Windows. A phone or another system gets none.
export const desktopCta = computed<Cta | null>(() => {
  const id = os.value === 'mac' || os.value === 'windows' ? os.value : null
  return id && isLive(id) ? link(id, PLATFORMS[id].cta, PLATFORMS[id].href) : null
})

// The extension, where this browser can take it.
export const extensionCta = computed<Cta | null>(() => {
  if (!extensionStore.value || !isLive('chrome')) return null
  const edge = extensionStore.value === 'edge'
  return link('chrome', edge ? 'Add to Edge' : 'Add to Chrome', edge ? EDGE_ADDONS_URL : PLATFORMS.chrome.href)
})

// The header's one button: the extension in a browser that takes it, else this computer's app.
export const headerCta = computed<Cta | null>(() => extensionCta.value ?? desktopCta.value)
