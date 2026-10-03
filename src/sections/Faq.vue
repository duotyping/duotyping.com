<script lang="ts">
// Rendered here and handed to search engines as FAQPage, from the one list.
export const FAQ: [string, string][] = [
  ['Is DuoTyping really free?', 'Yes. There’s no trial, no account and nothing to unlock. If you connect a cloud model, your provider bills you directly for what you use.'],
  ['Does my writing leave my Mac?', 'Not unless you connect a cloud model. With a local model, the check runs on your Mac and nothing you write is sent anywhere. If you connect a cloud provider, the text you check goes straight to that provider, on your own key, and nowhere else. Either way, DuoTyping never stores what you write.'],
  ['Why does it ask for Accessibility access?', 'It’s how macOS lets one app read the text you select in another, and write an accepted change back in place. DuoTyping uses it for exactly that, and never reads password fields. Without it, you can still type or paste into New Note.'],
  ['Which apps does it work in?', 'Most apps where you can select text: Mail, Messages, Notes, Pages, Slack and your browser among them. Marks as you type work in Mail, Messages, Slack, Teams and WhatsApp. For an app that won’t share its text, New Note is the way in: type or paste, check, then copy the result back.'],
  ['Which Macs can run it?', 'Any Mac with Apple silicon on macOS 14 Sonoma or later. Local models need memory too: the smaller ones run in 8 GB, and Qwen2.5 14B recommends 32 GB.'],
  ['Does it work offline?', 'Yes, with a local model. Once it’s downloaded, it checks your writing without a connection. A cloud model needs the internet, of course.'],
  ['Which languages does it support?', 'English. DuoTyping is built and tested for English writing today.'],
]
</script>

<script setup lang="ts">
import MarkPaths from '../components/brand/MarkPaths.vue'
import { FEEDBACK_URL } from '../utils/site'

// The FAQ note's two lines of writing, a word at a time: the line as written, then the fix in clay.
const NOTE_LINES = [
  ['M66 241H104', 'f1a', '#D9CFBA'], ['M114 241H160', 'f1b', '#D9CFBA'], ['M170 241H192', 'f1c', '#D9CFBA'],
  ['M66 270H104', 'f2a', '#D9CFBA'], ['M114 270H160', 'f2b', '#B04E25'], ['M170 270H196', 'f2c', '#D9CFBA'],
]
</script>

<template>
  <!-- ── FAQ ────────────────────────────────────────────────────────────────────────── -->
  <section id="faq" class="faq wrap grid grid-cols-1 scroll-mt-[-40px] gap-7 pt-20 lg:scroll-mt-[-68px] lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 lg:pt-[116px]">
    <div class="contents lg:col-span-4 lg:flex lg:flex-col lg:gap-[22px]">
      <div class="order-1 flex flex-col gap-3.5 lg:order-none lg:gap-[22px]">
        <div class="eyebrow">FAQ</div>
        <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:54] [--lo:35]">Fair questions.</h2>
      </div>
      <p class="order-3 text-base text-ink-2 lg:order-none lg:text-[17px] lg:leading-[1.55]">
        Something else on your mind? <a :href="FEEDBACK_URL" class="font-semibold text-clay underline transition-colors hover:text-clay-hover">Send feedback</a>
      </p>
      <svg v-loop width="384" height="340" viewBox="0 0 384 340" fill="none" aria-hidden="true" class="loop block overflow-visible max-lg:hidden">
        <g transform="rotate(-4 150 170)">
          <rect x="42" y="40" width="228" height="280" rx="16" fill="#4A2D1E" opacity="0.07" />
          <rect x="36" y="30" width="228" height="280" rx="16" fill="#FBFAF5" stroke="#DDD6C6" stroke-width="1.5" />
          <path d="M58 54V290" stroke="#F0CDB9" stroke-width="1.5" stroke-linecap="round" />
          <path d="M60 223H240M60 250H240M60 277H240" stroke="#EAE3D3" stroke-width="1.5" stroke-linecap="round" />
          <!-- Each stroke is its own path, drawn by its dash: pathLength 1 makes the dash the whole stroke. -->
          <path class="loop-fq" d="M104 112C104 82 124 64 148 64C174 64 192 82 192 106C192 128 176 138 162 148C152 155 148 164 148 178" pathLength="1" stroke-dasharray="1" stroke="#B04E25" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
          <circle class="loop-fd" cx="148" cy="208" r="7.5" fill="#B04E25" />
          <path v-for="[d, n, color] in NOTE_LINES" :key="n" :class="`loop-${n}`" :d="d" pathLength="1" stroke-dasharray="1" :stroke="color" stroke-width="6" stroke-linecap="round" />
          <path class="loop-fw" d="M114 249q2.9-3.4 5.8 0q2.9 3.4 5.8 0q2.9-3.4 5.8 0q2.9 3.4 5.8 0q2.9-3.4 5.8 0q2.9 3.4 5.8 0q2.9-3.4 5.8 0q2.9 3.4 5.8 0" stroke="#B04E25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <path d="M292 34H350A18 18 0 0 1 368 52V78A18 18 0 0 1 350 96H318L302 112L304 96H292A18 18 0 0 1 274 78V52A18 18 0 0 1 292 34Z" fill="#F3E4C6" stroke="#8A5A1E" stroke-width="1.8" stroke-linejoin="round" />
        <circle v-for="(x, i) in [302, 321, 340]" :key="x" class="loop-fb" :style="{ animationDelay: `${i * 0.2}s` }" :cx="x" cy="65" r="4.2" fill="#8A5A1E" />
        <path class="loop-fs" d="M18 55C19 61.5 20.5 63 27 64C20.5 65 19 66.5 18 73C17 66.5 15.5 65 9 64C15.5 63 17 61.5 18 55Z" fill="#B8802A" />
        <path class="loop-fs" style="animation-delay: 0.15s" d="M366 123C367.2 130.9 369.1 132.8 377 134C369.1 135.2 367.2 137.1 366 145C364.8 137.1 362.9 135.2 355 134C362.9 132.8 364.8 130.9 366 123Z" fill="#B8802A" />
        <path class="loop-fs" style="animation-delay: 0.3s" d="M22 311C22.8 316 24 317.2 29 318C24 318.8 22.8 320 22 325C21.2 320 20 318.8 15 318C20 317.2 21.2 316 22 311Z" fill="#E2B461" />
        <!-- The logo's two pencils, apart so each can write its line: they stack back at rest. -->
        <g class="loop-pen1"><g transform="translate(164 132) scale(8.4)"><MarkPaths part="back" /></g></g>
        <g class="loop-pen2"><g transform="translate(164 132) scale(8.4)"><MarkPaths part="front" /></g></g>
      </svg>
    </div>
    <div class="order-2 lg:order-none lg:col-span-7 lg:col-start-6">
      <div class="border-b border-line">
        <details v-for="([q, a], i) in FAQ" :key="q" class="border-t border-line" :open="i === 0">
          <summary class="flex min-h-11 cursor-pointer items-center justify-between gap-6 py-[18px] text-left lg:py-5">
            <span class="fluid font-semibold text-ink [--hi:19.5] [--lo:17.5]">{{ q }}</span>
            <span class="faq-icon flex size-8 shrink-0 items-center justify-center rounded-full bg-sand text-ink" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M6 12h12" />
                <path class="bar" d="M12 6v12" />
              </svg>
            </span>
          </summary>
          <p class="fluid -mt-1.5 pr-16 pb-[22px] leading-[1.6] text-pretty text-ink-2 [--hi:17] [--lo:16] lg:pb-6">{{ a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
