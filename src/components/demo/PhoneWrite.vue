<script setup lang="ts">
import Icon from '../Icon.vue'
import SceneMessage from './SceneMessage.vue'

// Write in a phone's browser, as web-prd.md and board L8 draw it: ☰, the draft's title, its save
// tick, Translate, ⋯ and the count that opens Suggestions; the email with Write's marks; the profile
// and Check Now underneath. A tapped mark docks its fix at the bottom, and tapping the fix takes it:
// there's no Accept. Drawn as the app alone, a card with no phone around it (owner, 2026-10-17): a
// bezel and a status bar only took room from the words. Whoever places it gives it its size.
// Each mark's fix, docked in turn; a fix taken leaves one fewer, so the second says 1 of 1.
const FIXES = [
  { from: 'have send', to: 'sent', of: '1 of 2' },
  { from: 'they will be review', to: 'They will review', of: '1 of 1' },
]
</script>

<template>
  <!-- The card: its corners clip the fix as it slides in and out at the bottom edge. -->
  <div class="font-mac relative flex flex-col overflow-hidden rounded-[28px] bg-white text-mac-ink shadow-[0_24px_50px_-14px_rgba(24,33,63,0.24),0_2px_8px_rgba(24,33,63,0.06)] ring-1 ring-ink/6">
    <div class="flex items-center gap-2.5 border-b border-line px-4 py-2.5">
      <Icon name="menu" class="size-[18px] shrink-0" />
      <span class="grow truncate text-[15px] font-semibold">Revised contract</span>
      <Icon name="check" class="size-4 shrink-0 text-ink-3" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-ink-2">
        <path d="M1.5 3.5h7M5 2v1.5M3 3.5c.5 2.3 2 4 4 5M7 3.5c-.4 2.4-2 4.3-4.5 5.5M8.5 14l3-7 3 7M9.5 12h4" />
      </svg>
      <span class="text-ink-2">⋯</span>
      <!-- The count: 2, then 1, then done -->
      <span class="pw-badge grid shrink-0 place-items-center rounded-full bg-[#B04227] px-2 text-[11px] leading-[18px] font-bold text-white">
        <span class="pw-n2 [grid-area:1/1]">2</span><span class="pw-n1 [grid-area:1/1]">1</span>
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="pw-n0 [grid-area:1/1]"><path d="M2.5 6.3 5 8.7l4.5-5" /></svg>
      </span>
    </div>
    <SceneMessage web class="grow px-[18px] pt-4" size="text-[15.5px] leading-[1.6]" />
    <div class="flex items-center justify-between gap-2 border-t border-line px-4 py-2.5">
      <span class="truncate rounded-full border border-edge px-2.5 py-1 text-[11px] text-ink-2">Work · Business &amp; finance ⌄</span>
      <span class="shrink-0 rounded-lg bg-ink px-3 py-1.5 text-[11.5px] font-semibold text-white">Check Now</span>
    </div>

    <!-- The tapped mark's fix, a sheet over the card's foot, full width: the words struck, the fix a
         pill you tap. Taking it writes it in and closes the sheet; the next mark opens its own. Its
         lower corners are the card's, so they hold even where a browser lets a moving layer slip
         the card's rounded clip. -->
    <div
      v-for="(fix, i) in FIXES"
      :key="fix.from"
      class="pw-sheet absolute inset-x-0 bottom-0 rounded-t-[20px] rounded-b-[28px] border-t border-edge bg-white px-4 pt-2.5 pb-5 shadow-[0_-10px_28px_rgba(24,33,63,0.14)]"
      :class="`pw-sheet${i + 1}`"
    >
      <div class="flex items-center gap-2 text-[13px] text-ink-2">
        <span class="size-2 rounded-full bg-[#B04227]" />
        <span class="grow font-semibold text-mac-ink">Grammar</span>
        <span class="flex size-7 items-center justify-center text-base text-ink-3">‹</span>{{ fix.of }}<span class="flex size-7 items-center justify-center text-base text-ink-3">›</span>
      </div>
      <div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[16px]">
        <span class="text-ink-3 line-through">{{ fix.from }}</span>
        <span class="text-ink-3">→</span>
        <span class="pw-chip relative rounded-full bg-ink px-3 py-1 font-semibold text-white" :class="`pw-chip${i + 1}`">{{ fix.to }}<span class="pw-touch" :class="`pw-t${2 * i + 2}`" /></span>
      </div>
      <div class="mt-3 flex justify-between text-[13px]">
        <span class="font-semibold text-ink-2">Skip</span>
        <span class="text-ink-3">Report…</span>
      </div>
    </div>
  </div>
</template>

<style>
/* Write on a phone, every 8 s, here and in SceneMessage's web marks. A tap (a soft touch circle, as
   a screen recording shows one) rings the first mark and its fix slides up; a tap on the fix writes
   it in, lit for a moment, the count drops to 1 and the sheet goes. The second mark goes the same
   way and the count turns to a tick; a rest on the clean email, then it fades back to the start.
   Without motion, or before CSS runs, it rests on the first mark tapped and its fix docked. */
.pw-mark {
  text-decoration: underline solid #B04227 2px;
  text-underline-offset: 3px;
  text-decoration-skip-ink: none;
  background: rgb(176 66 39 / 0.12);
  border-radius: 2px;
}
.pw-mark1 { box-shadow: 0 0 0 2px var(--color-ink); }
.pw-lit { border-radius: 2px; }
.pw-new1, .pw-new2, .pw-n1, .pw-n0 { opacity: 0; }
/* Out of sight, a sheet sits its shadow's depth below the card, so none of it shades the foot. */
.pw-sheet2 { transform: translateY(calc(100% + 40px)); }
.pw-touch {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border-radius: 50%;
  background: rgb(120 128 150 / 0.4);
  box-shadow: inset 0 0 0 1.5px rgb(255 255 255 / 0.6), 0 1px 6px rgb(24 33 63 / 0.16);
  opacity: 0;
  pointer-events: none;
}

/* The taps and what each one moves share their keyframes, each started at its moment by its delay:
   the first mark at 0.6 s, its fix at 2.45 s, the second mark at 3.6 s, its fix at 5.45 s. */
@media (prefers-reduced-motion: no-preference) {
  .pw-touch { animation: pw-touch 8s ease-out infinite backwards; }
  .pw-t1 { animation-delay: 0.55s; }
  .pw-t2 { animation-delay: 2.4s; }
  .pw-t3 { animation-delay: 3.55s; }
  .pw-t4 { animation-delay: 5.4s; }
  .pw-mark { animation: pw-ring 8s ease-out infinite backwards; }
  .pw-mark1 { animation-delay: 0.6s; }
  .pw-mark2 { animation-delay: 3.6s; }
  .pw-sheet { animation: pw-sheet 8s infinite backwards; }
  .pw-sheet1 { animation-delay: 0.75s; }
  .pw-sheet2 { animation-delay: 3.75s; }
  .pw-chip { animation: pw-press 8s ease-out infinite backwards; }
  .pw-chip1 { animation-delay: 2.45s; }
  .pw-chip2 { animation-delay: 5.45s; }
  .pw-lit { animation: pw-lit 8s ease-out infinite backwards; }
  .pw-lit1 { animation-delay: 2.75s; }
  .pw-lit2 { animation-delay: 5.75s; }
  .pw-old1 { animation: pw-old1 8s infinite; }
  .pw-new1 { animation: pw-new1 8s infinite; }
  .pw-old2 { animation: pw-old2 8s infinite; }
  .pw-new2 { animation: pw-new2 8s infinite; }
  .pw-n2 { animation: pw-n2 8s infinite; }
  .pw-n1 { animation: pw-n1 8s infinite; }
  .pw-n0 { animation: pw-n0 8s infinite; }
  .pw-badge { animation: pw-badge 8s infinite; }
}

/* A touch: in, a moment's hold, out a little larger. */
@keyframes pw-touch {
  0% { opacity: 0; transform: scale(0.55); }
  1.5% { opacity: 1; transform: scale(1); }
  4% { opacity: 0.9; transform: scale(1.04); }
  7%, 100% { opacity: 0; transform: scale(1.3); }
}
/* A tapped mark: its tint pulses and it's ringed until its fix is taken, 2.07 s later. */
@keyframes pw-ring {
  0% { box-shadow: 0 0 0 0 rgb(24 33 63 / 0); background-color: rgb(176 66 39 / 0.12); }
  1.5% { box-shadow: 0 0 0 2px rgb(24 33 63); background-color: rgb(176 66 39 / 0.26); }
  6%, 25.8% { box-shadow: 0 0 0 2px rgb(24 33 63); background-color: rgb(176 66 39 / 0.12); }
  27%, 100% { box-shadow: 0 0 0 0 rgb(24 33 63 / 0); background-color: rgb(176 66 39 / 0.12); }
}
/* A fix: up in 0.5 s as iOS moves a sheet, held, and down in 0.4 s the moment it's taken. */
@keyframes pw-sheet {
  0% { transform: translateY(calc(100% + 40px)); animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1); }
  6.25% { transform: none; }
  24.6% { transform: none; animation-timing-function: cubic-bezier(0.4, 0, 1, 1); }
  29.6%, 100% { transform: translateY(calc(100% + 40px)); }
}
@keyframes pw-press {
  0%, 0.5% { transform: none; background-color: var(--color-ink); }
  1.5%, 2.75% { transform: scale(0.92); background-color: var(--color-accent-press); }
  4.5%, 100% { transform: none; background-color: var(--color-ink); }
}
/* The words just written, lit and fading back to the page. */
@keyframes pw-lit {
  0%, 4.5% { background-color: var(--color-tag); }
  17%, 100% { background-color: rgb(217 248 255 / 0); }
}
/* The sentences: each fixed when its fix is taken (2.67 s, 5.67 s), and all set back at 7.3 s.
   The old words go before the new ones come, so the two are never seen over each other. */
@keyframes pw-old1 { 0%, 33.4%, 97.5%, 100% { opacity: 1; } 34.4%, 93.75% { opacity: 0; } }
@keyframes pw-new1 { 0%, 34.4%, 93.75%, 100% { opacity: 0; } 36%, 91.25% { opacity: 1; } }
@keyframes pw-old2 { 0%, 70.9%, 97.5%, 100% { opacity: 1; } 71.9%, 93.75% { opacity: 0; } }
@keyframes pw-new2 { 0%, 71.9%, 93.75%, 100% { opacity: 0; } 73.5%, 91.25% { opacity: 1; } }
/* The count: 2, 1, then a tick on the assistant's colour, popping a little at each change. */
@keyframes pw-n2 { 0%, 33.4%, 97.5%, 100% { opacity: 1; } 34.4%, 93.75% { opacity: 0; } }
@keyframes pw-n1 { 0%, 34.4%, 71.9%, 100% { opacity: 0; } 35.9%, 70.9% { opacity: 1; } }
@keyframes pw-n0 { 0%, 71.9%, 93.75%, 100% { opacity: 0; } 73.4%, 91.25% { opacity: 1; } }
@keyframes pw-badge {
  0%, 33.4%, 37.9%, 71.4% { transform: none; background-color: #B04227; }
  35.4% { transform: scale(1.2); background-color: #B04227; }
  73.4% { transform: scale(1.2); background-color: var(--color-cyan-deep); }
  75.9%, 91.25% { transform: none; background-color: var(--color-cyan-deep); }
  93.75%, 100% { transform: none; background-color: #B04227; }
}
</style>
