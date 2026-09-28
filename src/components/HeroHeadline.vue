<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { introElapsed, reducedMotion } from '../intro'

// Motion board. Line one types itself, "good" is flagged, struck and corrected — once, on
// first view, in CSS. Line two then loops through four endings for as long as the page is
// open: type, hold 2.6 s, erase, next.
const ENDINGS = ['Keep it yours.', 'Keep your voice.', 'Keep it clear.', 'Keep it kind.']
const START = 2600
const CHAR = 45
const ERASE = 28
const HOLD = 2600
const GAP = 260

// [character, when it lands]. The gold caret rides the newest one, and waits 450 ms under the
// "d" of "good" until the flag takes over.
const SAY = [...'Say it '].map((ch, i) => [ch, 300 + CHAR * i])
const GOOD = [...'good'].map((ch, i) => [ch, 615 + CHAR * i])

// As prerendered, line two reads "Keep it yours." — revealed at 2.6 s by CSS, so a page
// without script, and every crawler, still gets the whole line.
const line2 = ref(ENDINGS[0])
const caret = ref('is-intro')
let timer

onMounted(() => {
  if (reducedMotion()) return // the first ending, a steady caret
  let w = 0
  let n = ENDINGS[0].length
  let back = true
  let wait = HOLD
  const t = introElapsed()
  if (t < START) {
    // Still ahead of line two's moment: clear it and type it in on the beat.
    line2.value = ''
    caret.value = 'is-hidden'
    n = 0
    back = false
    wait = START - t
  }
  const step = () => {
    const word = ENDINGS[w]
    n += back ? -1 : 1
    line2.value = word.slice(0, n)
    caret.value = 'is-typing'
    if (!back && n === word.length) {
      back = true
      caret.value = 'is-idle'
      timer = setTimeout(step, HOLD)
      return
    }
    if (back && n === 0) {
      back = false
      w = (w + 1) % ENDINGS.length
      timer = setTimeout(step, GAP)
      return
    }
    timer = setTimeout(step, back ? ERASE : CHAR)
  }
  timer = setTimeout(step, wait)
})
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <h1 class="hero-title font-display leading-[1.04] font-bold tracking-[-0.035em] text-ink">
    <!-- Screen readers hear the line itself; the struck word is decoration. -->
    <span class="sr-only">Say it well. Keep it yours.</span>
    <span aria-hidden="true">
      <span v-for="([ch, at], i) in SAY" :key="i" class="dt-k" :style="{ '--at': `${at}ms` }">{{ ch }}</span>
      <del class="dt-good"><span
          v-for="([ch, at], i) in GOOD"
          :key="i"
          class="dt-k"
          :style="{ '--at': `${at}ms`, '--hold': i === GOOD.length - 1 ? '450ms' : null }"
        >{{ ch }}</span><span class="dt-strike" /><span class="dt-wave" /></del> <span class="dt-well"><ins class="text-clay no-underline">well</ins>.</span>
      <br />
      <span class="dt-show" style="--at: 2600ms">{{ line2 }}</span><span class="dt-caret" :class="caret" />
    </span>
  </h1>
</template>
