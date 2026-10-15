import { computed, ref } from 'vue'
import { previewLaunch } from './facts'

// What the visitor is on, so the page leads with the button and the demo that fit it. The page is
// prerendered, so it first draws Windows, which runs 89% of desktops in Vietnam, the first market
// (duotyping-specs specs/desktop-companion.md D9), and corrects itself once it loads.
export type Os = 'mac' | 'windows' | 'phone' | 'other'
export const os = ref<Os>('windows')
// A browser that installs from the Chrome Web Store (Chrome, Brave, Arc, Cốc Cốc) or from Edge
// Add-ons; Firefox and Safari get none, since the extension has no build for them.
export const extensionStore = ref<'chrome' | 'edge' | null>(null)

// The keys a review card names beside Accept and Skip: the Mac app's, or the Windows app's. The
// extension names its one key return on every system, as the Mac does. A phone's card names none.
export type KeyNames = { accept: string; skip: string }
export const MAC_KEYS: KeyNames = { accept: 'return', skip: 'delete' }
export const PC_KEYS: KeyNames = { accept: 'Enter', skip: 'Backspace' }
export const visitorKeys = computed(() => (os.value === 'mac' ? MAC_KEYS : os.value === 'phone' ? null : PC_KEYS))

type Brands = { brands?: { brand: string }[]; platform?: string; mobile?: boolean }

let detected = false
export function detectPlatform() {
  if (detected || typeof navigator === 'undefined') return
  detected = true
  const ua = navigator.userAgent
  const hints = (navigator as Navigator & { userAgentData?: Brands }).userAgentData
  const platform = hints?.platform ?? ''
  // iPadOS asks for desktop pages as a Mac; its touch points give it away.
  const touchMac = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1
  if (hints?.mobile || /Android|iPhone|iPod/.test(ua) || touchMac || /iPad/.test(ua)) os.value = 'phone'
  else if (platform === 'macOS' || /Macintosh|Mac OS X/.test(ua)) os.value = 'mac'
  else if (platform === 'Windows' || /Windows NT/.test(ua)) os.value = 'windows'
  else os.value = 'other'

  const brands = hints?.brands?.map((b) => b.brand) ?? []
  if (os.value === 'phone') extensionStore.value = null
  else if (brands.includes('Microsoft Edge') || /Edg\//.test(ua)) extensionStore.value = 'edge'
  else if (brands.includes('Chromium') || brands.includes('Google Chrome') || (/Chrome\//.test(ua) && !/Firefox|FxiOS/.test(ua))) extensionStore.value = 'chrome'

  previewLaunch.value = new URLSearchParams(location.search).has('launch')
}
