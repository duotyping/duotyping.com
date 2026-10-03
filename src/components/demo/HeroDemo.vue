<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import MarkPaths from '../brand/MarkPaths.vue'
import MenuBarMark from '../brand/MenuBarMark.vue'
import CountBadge from './CountBadge.vue'
import MacWindow from './MacWindow.vue'
import Popup from './Popup.vue'
import RewritePill from './RewritePill.vue'
import Suggestion from './Suggestion.vue'
import { reducedMotion } from '../../utils/motion'

type Seg = 't0' | 't1' | 'm1' | 't2' | 'm2' | 't3'
// A line box, in canvas px: left, right, top, bottom.
type Box = { l: number; r: number; t: number; b: number }
type Aim = 'start' | 'accept' | 'rest'
type State = {
  n: number // characters typed
  mk1: boolean
  mk2: boolean
  count: number
  badge: boolean
  sweep: boolean // the CSS sweep, for reduced motion
  pill: boolean
  keys: number // keycaps down
  panel: boolean
  press: boolean
  done: boolean
  done2: boolean
  card: 1 | 2 // the popup's focused card
  para: boolean
  caret: boolean
  capM: number
  keysOn: boolean
  // The pointer: where, how long the glide takes, pressed, I-beam, and the boxes it has selected.
  cx: number
  cy: number
  cms: number
  cdown: boolean
  ibeam: boolean
  rects: Box[]
}
type Step = Partial<State> & { cur?: [Aim, number]; drag?: number }

// The product, a step at a time (Motion board). The email types itself and a wavy line lands
// under each mistake once the next word arrives; the badge counts them. Then the selection
// sweeps, Rewrite appears, ⌃⌥⌘D go down in turn, the popup rises, and Accept fixes the first
// sentence, then the second. A pointer does the mouse's part: it drags the selection and
// clicks each Accept. It fades and plays again every 13.3 s. Times are from the start of each run.
const SEGS: [Seg, string][] = [
  ['t0', 'Thanks for the quick reply. '],
  ['t1', 'I '],
  ['m1', 'have send'],
  ['t2', ' the revised contract to legal yesterday. '],
  ['m2', 'they will be review'],
  ['t3', ' it by Friday.'],
]
const TOTAL = SEGS.reduce((n, [, text]) => n + text.length, 0)
const MARK1 = 43 // "have send" is marked once " the" is typed after it
const MARK2 = 103 // "they will be review", once " it" is
const FIRST = 600 // the first run starts just after the page settles
const TYPE = 26
const CYCLE = 13300
// `cur: [where, ms]` glides the pointer there, measured off the page at that moment.
// `drag: ms` is the mouse-down drag: the selection follows the pointer, letter by letter.
const STEPS: [number, Step][] = [
  [3450, { cur: ['start', 420] }],
  [3500, { caret: false }],
  [3650, { ibeam: true }], // over the text now
  [3880, { cdown: true }],
  [3900, { drag: 1000, capM: 0.4, keysOn: true }],
  [4950, { cdown: false }],
  [5050, { pill: true }],
  [5300, { keys: 1 }],
  [5440, { keys: 2 }],
  [5580, { keys: 3 }],
  [5720, { keys: 4 }],
  [6050, { keys: 0 }],
  [6250, { panel: true }],
  [7300, { ibeam: false, cur: ['accept', 700] }],
  [8400, { cdown: true }],
  [8450, { press: true }],
  [8650, { cdown: false }],
  // Sentence 1 goes in, and the popup moves on to sentence 2.
  [8750, { pill: false, sweep: false, press: false, done: true, mk1: false, count: 1, keysOn: false, card: 2 }],
  [9150, { cur: ['accept', 600] }],
  [9950, { cdown: true }],
  [10000, { press: true }],
  [10200, { cdown: false }],
  [10300, { panel: false, press: false, done2: true, mk2: false, badge: false, capM: 0 }],
  [10650, { cur: ['rest', 900] }],
  [12700, { para: false }],
]
const KEYS = ['⌃', '⌥', '⌘', 'D']
// Every step in place at once: what reduced motion shows.
const REST = { cx: 640, cy: 560, cms: 0, cdown: false, ibeam: false, rects: [] as Box[] } // between the email and the keys
const STILL: State = { ...REST, n: TOTAL, mk1: true, mk2: true, count: 2, badge: true, sweep: true, pill: true, keys: 0, panel: true, press: false, done: false, done2: false, card: 1, para: true, caret: false, capM: 1, keysOn: true }
const RESET: State = { ...REST, n: 0, mk1: false, mk2: false, count: 0, badge: false, sweep: false, pill: false, keys: 0, panel: false, press: false, done: false, done2: false, card: 1, para: true, caret: true, capM: 0, keysOn: false }

// Prerendered at the first frame — an empty email and a blinking caret — so nothing jumps
// when the script picks it up.
const d = reactive<State>({ ...RESET })
const canvas = ref<HTMLElement | null>(null)
// Where the pointer goes, in canvas px: the canvas is scaled, so undo that from the rects.
function aim(where: Aim, ms: number): Partial<State> {
  if (where === 'rest') return { ...REST, cms: ms }
  const c = canvas.value!.getBoundingClientRect()
  const s = c.width / 1000
  const r = canvas.value!.querySelector(where === 'accept' ? '.mk-btn' : '.sel')?.getClientRects()[0]
  if (!s || !r) return {}
  const x = where === 'start' ? r.left : r.left + r.width / 2
  return { cx: (x - c.left) / s, cy: (r.top + r.height * 0.6 - c.top) / s, cms: ms }
}
let raf = 0
function set({ cur, drag: ms, ...p }: Step) {
  if (ms) drag(ms)
  if (p.sweep === false) p.rects = []
  Object.assign(d, p, cur && aim(...cur))
}

// The pointer rides a curve from the first letter along line one and down to the last, the
// way a hand drags; each frame selects every letter before it, the way text does, and draws
// the selection as one box per line behind the letters, so the marks keep their colour.
function drag(ms: number) {
  const box = canvas.value?.querySelector('.sel')
  if (!box) return
  const c = canvas.value!.getBoundingClientRect()
  const s = c.width / 1000
  if (!s) return
  const chars: Box[] = []
  const walk = document.createTreeWalker(box, NodeFilter.SHOW_TEXT)
  for (let n: Text | null; (n = walk.nextNode() as Text | null); ) {
    for (let i = 0; i < n.length; i++) {
      const r = new Range()
      r.setStart(n, i)
      r.setEnd(n, i + 1)
      const b = r.getClientRects()[0]
      if (b) chars.push({ l: (b.left - c.left) / s, r: (b.right - c.left) / s, t: (b.top - c.top) / s, b: (b.bottom - c.top) / s })
    }
  }
  const [first, last] = [chars[0], chars.at(-1)]
  if (!first || !last) return
  const mid = (ch: Box) => (ch.t + ch.b) / 2
  const lineEnd = Math.max(...chars.filter((ch) => Math.abs(ch.t - first.t) < 2).map((ch) => ch.r))
  const P = [{ x: first.l, y: mid(first) }, { x: lineEnd + 30, y: mid(first) }, { x: last.r, y: mid(last) }]
  const before = (ch: Box, x: number, y: number) => y >= ch.b || (y >= ch.t && x > (ch.l + ch.r) / 2)
  const t0 = performance.now()
  const frame = (now: number) => {
    const t = Math.min(1, (now - t0) / ms)
    const e = t < 0.5 ? 2 * t * t : 1 - (2 - 2 * t) ** 2 / 2
    const q = (k: 'x' | 'y') => (1 - e) ** 2 * P[0][k] + 2 * (1 - e) * e * P[1][k] + e * e * P[2][k]
    const [x, y] = [q('x'), q('y')]
    let k = 0
    while (k < chars.length && before(chars[k]!, x, y)) k++
    const rects: Box[] = []
    for (const ch of chars.slice(0, k)) {
      const line = rects.at(-1)
      if (line && Math.abs(line.t - ch.t) < 2) line.r = ch.r
      else rects.push({ ...ch })
    }
    Object.assign(d, { cx: x, cy: y, cms: 0, rects })
    if (t < 1) raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)
}

const text = computed(() => {
  const v = {} as Record<Seg, string>
  let left = d.n
  let at = -1 // which segment the caret follows
  SEGS.forEach(([k, seg], i) => {
    v[k] = seg.slice(0, Math.max(0, left))
    if (at < 0 && d.caret && left <= seg.length) at = i
    left -= seg.length
  })
  if (d.done) Object.assign(v, { t1: 'I ', m1: '' })
  if (d.done2) v.m2 = ''
  return { ...v, at, caret: ['tcaret', (d.n === 0 || d.n >= TOTAL) && 'is-blink'] }
})

let timers: ReturnType<typeof setTimeout>[] = []
const later = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
const stop = () => {
  timers.forEach(clearTimeout)
  timers = []
  cancelAnimationFrame(raf)
}

function play() {
  stop()
  set(RESET)
  let n = 0
  const type = () => {
    n += 1
    const p: Step = { n }
    if (n === MARK1) Object.assign(p, { mk1: true, count: 1, badge: true, capM: 1 })
    if (n === MARK2) Object.assign(p, { mk2: true, count: 2 })
    set(p)
    if (n < TOTAL) later(TYPE, type)
  }
  later(250, type)
  for (const [ms, p] of STEPS) later(ms, () => set(p))
  later(CYCLE, play)
}

// It only plays while someone can see it. Off screen, in a hidden tab (where timers are
// throttled and the steps would drift apart) or display:none on a phone, it rests at the
// start and begins again from the top when it's back.
const root = ref<HTMLElement | null>(null)
let seen = false
let running = false
let io: IntersectionObserver | undefined
const sync = () => {
  const go = seen && !document.hidden
  if (go === running) return
  running = go
  stop()
  set(RESET)
  if (go) later(FIRST, play)
}
onMounted(() => {
  if (reducedMotion()) return set(STILL)
  io = new IntersectionObserver(([e]) => {
    seen = !!e?.isIntersecting
    sync()
  })
  io.observe(root.value!)
  document.addEventListener('visibilitychange', sync)
})
onUnmounted(() => {
  stop()
  io?.disconnect()
  document.removeEventListener('visibilitychange', sync)
})
</script>

<template>
  <!-- Decoration: the copy beside it says everything this shows. -->
  <div ref="root" class="stage-desk" aria-hidden="true" inert>
    <!-- The menu bar runs the stage's whole width, however wide the screen: it belongs to the
         stage, not the canvas, which is only drawn 1000 px across. -->
    <div class="stage-menubar" />
    <div ref="canvas" class="canvas">
      <!-- Wider than the canvas, so the pencils aren't cut off where a wide screen shows more. -->
      <svg width="1400" height="778" viewBox="0 0 1400 778" fill="none" class="absolute top-0 left-0">
        <g transform="translate(282 34) scale(55.6)"><MarkPaths tone="desk" /></g>
      </svg>

      <!-- DuoTyping in the menu bar, where the 1440 board draws it -->
      <span class="absolute top-1 left-[778px] flex rounded-[5px] bg-ink/8 px-1.5 py-[3px]"><MenuBarMark class="size-4" /></span>
      <div class="absolute top-[36px] right-[190px] flex flex-row-reverse items-end gap-1.5">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
          <path d="M3 18C9 17 14 13 15.5 3" stroke="#B8802A" stroke-width="1.8" stroke-linecap="round" />
          <path d="M11.8 6.2 15.6 2.5l3 4.3" stroke="#B8802A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="stage-label">Lives in your menu bar</span>
      </div>

      <!-- The shortcut -->
      <div class="fade absolute top-[680px] left-[556px] flex flex-col gap-3.5" :class="!d.keysOn && 'is-out'">
        <span class="stage-label">Select, then press</span>
        <div class="flex items-center gap-[9px]">
          <span
            v-for="(k, i) in KEYS"
            :key="k"
            class="keycap keycap-press h-[54px] min-w-[54px] rounded-[11px] px-[13px] text-[22px]"
            :class="d.keys > i && 'is-down'"
          >{{ k }}</span>
        </div>
      </div>
      <svg width="1000" height="778" viewBox="0 0 1000 778" fill="none" class="absolute top-0 left-0 transition-opacity duration-300 ease-out" :class="!d.keysOn && 'opacity-0'">
        <path d="M544 735C500 735 470 710 466 664" stroke="#B8802A" stroke-width="2" stroke-linecap="round" stroke-dasharray="0.5 7" />
        <path d="M456 673 466 660 477 672" stroke="#B8802A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <!-- Marks as you type: the badge beside the box, and what it is -->
      <div class="absolute top-[214px] left-[740px]">
        <div class="fade" :class="!d.badge && 'is-out'"><CountBadge :count="d.count" /></div>
      </div>
      <div class="absolute top-[256px] left-[744px]">
        <div class="fade flex flex-col items-start gap-1.5" :class="!d.capM && 'is-out'" :style="d.capM ? { opacity: d.capM } : null">
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
            <path d="M6 20V3M1.5 8 6 3l4.5 5" stroke="#B8802A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="stage-label leading-[1.5]">Marks as<br />you type</span>
        </div>
      </div>

      <MacWindow fields class="absolute top-[72px] left-[36px] h-[420px] w-[700px]">
        <div class="flex flex-col gap-[11px] px-[22px] py-4 text-[15px] leading-[1.65]">
          <p>Hi <span class="skel" />,</p>
          <!-- Two lines tall from the start, so the rest of the email never moves as it types. -->
          <p class="min-h-[49.5px] transition-opacity duration-400 ease-out" :class="!d.para && 'opacity-0'">
            <span>{{ text.t0 }}</span><span v-if="text.at === 0" :class="text.caret" />
            <span class="sel" :class="d.sweep && 'is-on'">
              <span>{{ text.t1 }}</span><span v-if="text.at === 1" :class="text.caret" />
              <span v-if="d.done" class="dt-in font-semibold text-clay">sent</span>
              <span class="mk" :class="d.mk1 && 'is-on'">{{ text.m1 }}</span><span v-if="text.at === 2" :class="text.caret" />
              <span>{{ text.t2 }}</span><span v-if="text.at === 3" :class="text.caret" />
              <span v-if="d.done2" class="dt-in font-semibold text-clay">They will review</span>
              <span class="mk" :class="d.mk2 && 'is-on'">{{ text.m2 }}</span><span v-if="text.at === 4" :class="text.caret" />
              <span>{{ text.t3 }}</span><span v-if="text.at === 5" :class="text.caret" />
            </span>
            <span class="relative inline-block h-[1em] w-0">
              <span class="absolute top-[-8px] left-3">
                <span class="fade inline-block" :class="!d.pill && 'is-out'"><RewritePill /></span>
              </span>
            </span>
          </p>
          <p>Let me know if anything is missing before then.</p>
          <p>Best,<br /><span class="skel [--w:2.5em]" /></p>
        </div>
      </MacWindow>
      <!-- The dragged selection, one box per line: multiply keeps the letters and marks their colour. -->
      <span
        v-for="(r, i) in d.rects"
        :key="i"
        class="absolute bg-select mix-blend-multiply"
        :style="{ left: `${r.l}px`, top: `${r.t}px`, width: `${r.r - r.l}px`, height: `${r.b - r.t}px` }"
      />

      <div class="absolute top-[318px] left-[58px]">
        <div class="fade" :class="!d.panel && 'is-out'">
          <Popup scope="Sentence by sentence" count="2 suggestions" checked="Both checked on this Mac" note="Nothing changes until you accept." class="w-[600px]">
            <Suggestion
              label="Sentence 1 of 2"
              :focused="d.card === 1"
              :actions="d.card === 1 ? 'accept-skip' : undefined"
              :pressed="d.press"
              original="I have send the revised contract to legal yesterday."
              class="transition-opacity duration-300"
              :class="d.card > 1 && 'opacity-50'"
            >
              I <span class="font-semibold text-clay">sent</span> the revised contract to legal yesterday.
            </Suggestion>
            <Suggestion
              label="Sentence 2 of 2"
              :focused="d.card === 2"
              :actions="d.card === 2 ? 'accept-skip' : undefined"
              :pressed="d.press"
              original="they will be review it by Friday."
            >
              <span class="font-semibold text-clay">They will review</span> it by Friday.
            </Suggestion>
          </Popup>
        </div>
      </div>

      <!-- The mouse: a macOS arrow with its tip on the point, or over text the I-beam centred on it. -->
      <span
        class="absolute top-0 left-0 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.28)] transition-[translate] ease-[cubic-bezier(0.45,0,0.2,1)]"
        :style="{ translate: `${d.cx}px ${d.cy}px`, transitionDuration: `${d.cms}ms` }"
      >
        <svg v-if="d.ibeam" width="11" height="20" viewBox="0 0 11 20" fill="none" class="-translate-1/2 transition-[scale] duration-90 ease-out" :class="d.cdown && 'scale-86'">
          <path d="M2 1.5c2 0 3.5.7 3.5 2.3v12.4c0 1.6 1.5 2.3 3.5 2.3M9 1.5c-2 0-3.5.7-3.5 2.3M5.5 16.2c0 1.6-1.5 2.3-3.5 2.3M3.5 10h4" stroke="#fff" stroke-width="3" stroke-linecap="round" />
          <path d="M2 1.5c2 0 3.5.7 3.5 2.3v12.4c0 1.6 1.5 2.3 3.5 2.3M9 1.5c-2 0-3.5.7-3.5 2.3M5.5 16.2c0 1.6-1.5 2.3-3.5 2.3M3.5 10h4" stroke="#1D1D1F" stroke-width="1.3" stroke-linecap="round" />
        </svg>
        <svg v-else width="17" height="25" viewBox="0 0 17 25" fill="none" class="origin-[2px_2px] transition-[scale] duration-90 ease-out" :class="d.cdown && 'scale-86'">
          <path d="M1.5 1.5v19.2l4.6-4.4 2.9 6.9 3-1.3-2.9-6.8h6.3L1.5 1.5Z" fill="#1D1D1F" stroke="#fff" stroke-width="1.5" stroke-linejoin="round" />
        </svg>
      </span>
    </div>
  </div>
</template>
