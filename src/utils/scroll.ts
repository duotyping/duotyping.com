import type { Router } from 'vue-router'
import { reducedMotion } from './motion'

// In-page links glide to their section instead of jumping, the same way in every browser. CSS
// scroll-behavior isn't enough: iOS skips it when the phone menu's scroll lock lifts in the same
// tick as the link, each browser picks its own pace, and Chrome would also drift slowly back on
// Back. So the page is scrolled here, a frame at a time, to where its CSS puts the section: under
// the header (scroll-padding-top), less the section's own scroll-margin-top. Back and Forward
// restore their place at once, as they do everywhere; without the script, links simply jump.

// Ease in and out (cubic): it leaves gently, travels, and settles.
const ease = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)
// 300 ms for a short hop, longer the further it goes, never more than 850.
const durationFor = (px: number) => Math.min(850, 300 + px / 10)

export const targetOf = (hash: string) => {
  if (hash.length < 2) return null
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)))
  } catch {
    return null
  }
}

/** Where the page scrolls to for `el`, as the browser itself would put it. */
export function scrollTopFor(el: Element) {
  const root = document.documentElement
  const pad = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const top = el.getBoundingClientRect().top + scrollY - pad - margin
  return Math.round(Math.max(0, Math.min(root.scrollHeight - root.clientHeight, top)))
}

// Anything the visitor does to scroll takes over from a glide.
const INPUT = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const
let stopGlide: (() => void) | undefined

/** Scrolls to `el` (smoothly unless motion is reduced), then calls `done`. */
export function glideTo(el: Element, done?: () => void) {
  stopGlide?.()
  const from = scrollY
  const ms = reducedMotion() ? 0 : durationFor(Math.abs(scrollTopFor(el) - from))
  let raf = 0
  const stop = () => {
    cancelAnimationFrame(raf)
    INPUT.forEach((type) => removeEventListener(type, stop))
    if (stopGlide === stop) stopGlide = undefined
  }
  const t0 = performance.now()
  const frame = (now: number) => {
    const t = ms ? Math.min(1, (now - t0) / ms) : 1
    // Measured every frame, so a layout that settles on the way still lands right.
    scrollTo(0, from + (scrollTopFor(el) - from) * ease(t))
    if (t < 1) raf = requestAnimationFrame(frame)
    else {
      stop()
      done?.()
    }
  }
  INPUT.forEach((type) => addEventListener(type, stop, { passive: true }))
  stopGlide = stop
  if (ms) raf = requestAnimationFrame(frame)
  else frame(t0)
}

/** Moves focus to a section after a link to it, as following an in-page link should. */
export function focusSection(el: HTMLElement) {
  const focusable = 'a[href], button, input, select, textarea, summary, [tabindex]'
  const heading = el.matches('h1, h2, h3, h4, h5, h6') ? el : el.querySelector<HTMLElement>('h1, h2, h3')
  const target = el.matches(focusable) ? el : heading ?? el
  if (!target.matches(focusable)) {
    target.tabIndex = -1
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
  target.focus({ preventScroll: true })
}

/**
 * Once, in the browser: every same-page link (the header's, the menu's, the footer's, any
 * href="#…") glides to its section, keeps the address and Back in step through the router, and
 * hands focus to the section. A page opened at an address with a section in it (from another
 * page's /#faq, say) lands on it at once, as the browser puts it, and is put back on it once the
 * visitor's own version of the page has drawn, since that can move it, unless the visitor has
 * scrolled by then. A reload, or Back to the page, keeps the place the browser restores.
 */
export function glideInPageLinks(router: Router) {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as Element | null)?.closest?.('a[href]')
    if (!(a instanceof HTMLAnchorElement) || (a.target && a.target !== '_self') || a.hasAttribute('download')) return
    const url = new URL(a.href)
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return
    const el = targetOf(url.hash)
    if (!el) return
    e.preventDefault()
    // A link's own handler (the phone menu closing, and with it the scroll lock) has run by now.
    const { path, query } = router.currentRoute.value
    if (url.hash !== location.hash) void router.push({ path, query, hash: url.hash })
    glideTo(el, () => focusSection(el))
  }
  // Back and Forward restore their own scroll position; a glide on its way gives way to them.
  const onPop = () => stopGlide?.()
  document.addEventListener('click', onClick)
  addEventListener('popstate', onPop)

  const landing = targetOf(location.hash)
  const visit = performance.getEntriesByType?.('navigation')[0] as PerformanceNavigationTiming | undefined
  if (landing && (!visit || visit.type === 'navigate')) {
    let moved = false
    const onInput = () => (moved = true)
    INPUT.forEach((type) => addEventListener(type, onInput, { passive: true, once: true }))
    void document.fonts.ready.then(() =>
      requestAnimationFrame(() => {
        INPUT.forEach((type) => removeEventListener(type, onInput))
        if (!moved && !stopGlide) scrollTo(0, scrollTopFor(landing))
      }),
    )
  }

  return () => {
    stopGlide?.()
    document.removeEventListener('click', onClick)
    removeEventListener('popstate', onPop)
  }
}
