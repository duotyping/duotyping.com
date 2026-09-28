<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import MarkPaths from './MarkPaths.vue'
import MenuBarMark from './MenuBarMark.vue'
import CountBadge from './mock/CountBadge.vue'
import MacWindow from './mock/MacWindow.vue'
import Popup from './mock/Popup.vue'
import RewritePill from './mock/RewritePill.vue'
import Suggestion from './mock/Suggestion.vue'
import { introElapsed, reducedMotion } from '../intro'

// The product, a step at a time (Motion board). The email types itself and a wavy line lands
// under each mistake once the next word arrives; the badge counts them. Then the selection
// sweeps, Rewrite appears, ⌃⌥⌘D go down in turn, the popup rises, and Accept fixes the first
// sentence. It fades and plays again every 11.7 s. Times are from the start of each run.
const SEGS = [
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
const FIRST = 2400 // the first run starts as the headline settles
const TYPE = 26
const CYCLE = 11700
const STEPS = [
  [3500, { caret: false }],
  [3900, { sel: true, capM: 0.4, keysOn: true }],
  [4600, { pill: true }],
  [5300, { keys: 1 }],
  [5440, { keys: 2 }],
  [5580, { keys: 3 }],
  [5720, { keys: 4 }],
  [6050, { keys: 0 }],
  [6250, { panel: true }],
  [8450, { press: true }],
  [8750, { panel: false, pill: false, sel: false, press: false, done: true, mk1: false, count: 1, keysOn: false }],
  [11100, { para: false, badge: false, capM: 0 }],
]
const KEYS = ['⌃', '⌥', '⌘', 'D']
// Every step in place at once: what reduced motion shows.
const STILL = { n: TOTAL, mk1: true, mk2: true, count: 2, badge: true, sel: true, pill: true, keys: 0, panel: true, press: false, done: false, para: true, caret: false, capM: 1, keysOn: true }
const RESET = { n: 0, mk1: false, mk2: false, count: 0, badge: false, sel: false, pill: false, keys: 0, panel: false, press: false, done: false, para: true, caret: true, capM: 0, keysOn: false }

// Prerendered at the first frame — an empty email and a blinking caret — so nothing jumps
// when the script picks it up.
const d = reactive({ ...RESET })
const set = (p) => Object.assign(d, p)

const text = computed(() => {
  const v = {}
  let left = d.n
  let at = -1 // which segment the caret follows
  SEGS.forEach(([k, seg], i) => {
    v[k] = seg.slice(0, Math.max(0, left))
    if (at < 0 && d.caret && left <= seg.length) at = i
    left -= seg.length
  })
  if (d.done) Object.assign(v, { t1: 'I ', m1: '' })
  return { ...v, at, caret: ['tcaret', (d.n === 0 || d.n >= TOTAL) && 'is-blink'] }
})

let timers = []
const later = (ms, fn) => timers.push(setTimeout(fn, ms))
const stop = () => {
  timers.forEach(clearTimeout)
  timers = []
}

function play() {
  stop()
  set(RESET)
  let n = 0
  const type = () => {
    n += 1
    const p = { n }
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
const root = ref(null)
let seen = false
let running = false
let io
const sync = () => {
  const go = seen && !document.hidden
  if (go === running) return
  running = go
  stop()
  set(RESET)
  if (go) later(Math.max(0, FIRST - introElapsed()), play)
}
onMounted(() => {
  if (reducedMotion()) return set(STILL)
  io = new IntersectionObserver(([e]) => {
    seen = e.isIntersecting
    sync()
  })
  io.observe(root.value)
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
    <div class="canvas">
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
          <p>Hi Maya,</p>
          <!-- Two lines tall from the start, so the rest of the email never moves as it types. -->
          <p class="min-h-[49.5px] transition-opacity duration-400 ease-out" :class="!d.para && 'opacity-0'">
            <span>{{ text.t0 }}</span><span v-if="text.at === 0" :class="text.caret" />
            <span class="sel" :class="d.sel && 'is-on'">
              <span>{{ text.t1 }}</span><span v-if="text.at === 1" :class="text.caret" />
              <span v-if="d.done" class="dt-in font-semibold text-clay">sent</span>
              <span class="mk" :class="d.mk1 && 'is-on'">{{ text.m1 }}</span><span v-if="text.at === 2" :class="text.caret" />
              <span>{{ text.t2 }}</span><span v-if="text.at === 3" :class="text.caret" />
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
          <p>Best,<br />Sam</p>
        </div>
      </MacWindow>

      <div class="absolute top-[318px] left-[58px]">
        <div class="fade" :class="!d.panel && 'is-out'">
          <Popup scope="Sentence by sentence" count="2 suggestions" checked="Both checked on this Mac" note="Nothing changes until you accept." class="w-[600px]">
            <Suggestion label="Sentence 1 of 2" focused actions="accept-skip" :pressed="d.press" original="I have send the revised contract to legal yesterday.">
              I <span class="font-semibold text-clay">sent</span> the revised contract to legal yesterday.
            </Suggestion>
            <Suggestion label="Sentence 2 of 2" original="they will be review it by Friday.">
              <span class="font-semibold text-clay">They will review</span> it by Friday.
            </Suggestion>
          </Popup>
        </div>
      </div>
    </div>
  </div>
</template>
