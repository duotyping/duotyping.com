import { ref, watch, type Directive } from 'vue'

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// One switch for everything that moves on the page, so anyone can stop it (WCAG 2.2.2): the
// header's pause button sets it, and every v-loop figure and the hero demo hold still while it's on.
export const motionPaused = ref(false)
export const toggleMotion = () => (motionPaused.value = !motionPaused.value)

// The figure loops are CSS, and CSS starts them when the page paints, so by the time you
// scroll to one it would be halfway through its story. v-loop starts each figure from its
// first frame the first time it comes into view, and pauses it while it's off screen or paused.
// Without JavaScript the loops simply run from load; with Reduce Motion there are none.
type Loop = { io: IntersectionObserver; visible: boolean; seen: boolean }
const loops = new Map<HTMLElement, Loop>()

const apply = (el: HTMLElement, loop: Loop) => {
  const all = el.getAnimations({ subtree: true })
  if (!loop.visible || motionPaused.value) return all.forEach((a) => a.pause())
  all.forEach((a) => {
    if (!loop.seen) a.currentTime = 0
    a.play()
  })
  loop.seen = true
}
watch(motionPaused, () => loops.forEach((loop, el) => apply(el, loop)))

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

// Registered app-wide in main.ts; this tells templates it exists.
declare module 'vue' {
  interface GlobalDirectives {
    vLoop: typeof vLoop
  }
}
