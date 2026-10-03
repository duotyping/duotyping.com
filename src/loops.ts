import type { Directive } from 'vue'

// The figure loops are CSS, and CSS starts them when the page paints, so by the time you
// scroll to one it would be halfway through its story. v-loop starts each figure from its
// first frame the first time it comes into view, and pauses it while it's off screen.
// Without JavaScript the loops simply run from load; with Reduce Motion there are none.
const loops = new WeakMap<HTMLElement, IntersectionObserver>()

export const vLoop: Directive<HTMLElement> = {
  mounted(el) {
    if (!el.getAnimations || !window.IntersectionObserver) return
    const each = (fn: (a: Animation) => void) => el.getAnimations({ subtree: true }).forEach(fn)
    let seen = false
    each((a) => a.pause())
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return each((a) => a.pause())
        each((a) => {
          if (!seen) a.currentTime = 0
          a.play()
        })
        seen = true
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    loops.set(el, io)
  },
  unmounted: (el) => loops.get(el)?.disconnect(),
}
