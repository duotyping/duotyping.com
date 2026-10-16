import { type Directive } from 'vue'

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// The figure loops are CSS, and CSS starts them when the page paints, so by the time you
// scroll to one it would be halfway through its story. v-loop starts each figure from its
// first frame the first time it comes into view, and pauses it while it's off screen.
// Without JavaScript the loops simply run from load; with Reduce Motion there are none.
type Loop = { io: IntersectionObserver; visible: boolean; seen: boolean }
const loops = new Map<HTMLElement, Loop>()

const apply = (el: HTMLElement, loop: Loop) => {
  const all = el.getAnimations({ subtree: true })
  if (!loop.visible) return all.forEach((a) => a.pause())
  all.forEach((a) => {
    if (!loop.seen) a.currentTime = 0
    a.play()
  })
  loop.seen = true
}

export const vLoop: Directive<HTMLElement> = {
  mounted(el) {
    if (!el.getAnimations || !window.IntersectionObserver) return
    el.getAnimations({ subtree: true }).forEach((a) => a.pause())
    const loop: Loop = {
      visible: false,
      seen: false,
      io: new IntersectionObserver(
        ([entry]) => {
          loop.visible = !!entry?.isIntersecting
          apply(el, loop)
        },
        { threshold: 0.3 },
      ),
    }
    loop.io.observe(el)
    loops.set(el, loop)
  },
  unmounted(el) {
    loops.get(el)?.io.disconnect()
    loops.delete(el)
  },
}

// Section headings and cards rise into place the first time they scroll into view, once (the
// [data-reveal] rules in style.css). Only what's still below the screen when the page wakes up
// waits for it, so nothing already on screen blinks out; the prerendered page and a page without
// script show everything as it is, and so does Reduce Motion. Whatever arrives together follows
// on 70 ms apart, at most four steps.
let reveals: IntersectionObserver | undefined
const reveal = (entries: IntersectionObserverEntry[]) => {
  let n = 0
  for (const { isIntersecting, target } of entries) {
    if (!isIntersecting || !(target instanceof HTMLElement)) continue
    target.style.setProperty('--reveal-delay', `${Math.min(n++, 4) * 70}ms`)
    target.dataset.reveal = 'in'
    reveals?.unobserve(target)
  }
}

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (!window.IntersectionObserver || reducedMotion() || el.getBoundingClientRect().top < innerHeight) return
    reveals ??= new IntersectionObserver(reveal, { rootMargin: '0px 0px -6% 0px' })
    el.dataset.reveal = 'out'
    reveals.observe(el)
  },
  unmounted(el) {
    reveals?.unobserve(el)
  },
}

// Registered app-wide in main.ts; this tells templates they exist.
declare module 'vue' {
  interface GlobalDirectives {
    vLoop: typeof vLoop
    vReveal: typeof vReveal
  }
}
