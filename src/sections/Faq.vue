<script lang="ts">
// Rendered here and handed to search engines as FAQPage, from the one list.
export const FAQ: [string, string][] = [
  ['Which apps does it work in?', 'On Mac and Windows, most apps where you can select text, with marks as you type in the chat and mail apps you switch on. In Chrome and Edge, the sites you switch on. For anything else there’s Write, on the web and your phone: type or paste, check, then copy.'],
  ['Which computers can run it?', 'A Mac with macOS 14 or later, Apple silicon or Intel; a PC with Windows 10 22H2 or Windows 11; Chrome 119 or later, or Edge. Write runs in any current browser, phones included.'],
  ['Do I need an account?', 'Not on Mac or Windows: both work signed out, with your own key or 20 free checks to start. The browser extension and Write on the web need a free account, which also gives you more checks each day.'],
  ['What does it cost?', 'DuoTyping’s own checks are free to start, and a free account gives you more every day. Pro, with more again, is $10 a month or $96 a year, plus tax where it applies. On your own key, your provider bills you directly.'],
  ['What does DuoTyping keep?', 'On your own key, nothing: your text goes straight to your provider. With DuoTyping’s checks, it keeps each check, encrypted, to improve DuoTyping, and never logs or sells it. Delete Account, in the web app, deletes your account after 90 days.'],
  ['Does it work offline?', 'No: checks need a connection, to your provider or to DuoTyping. Pronounce works offline in the apps, and drafts you keep in Write on your computer stay there either way.'],
  ['Which languages does it support?', 'English today, with more languages coming: DuoTyping is becoming a multilingual writing assistant. Translate already reads most languages.'],
  ['Why does the Mac app ask for Accessibility access?', 'It’s how macOS lets one app read the text you select in another, and write an accepted change back in place. DuoTyping uses it for exactly that, and never reads password fields. Without it, you can still type or paste into Write.'],
]
</script>

<script setup lang="ts">
import { useId } from 'vue'
import { FEEDBACK_URL } from '../utils/site'

// The assistant's answer, a line at a time.
// A soft shadow under both bubbles. It stays put while they bob, so they lift off the page.
const shadow = useId()
const ANSWER = [['M65 61H97', 'f1a'], ['M65 69H93', 'f1b'], ['M65 77H83', 'f1c']]

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
        Something else on your mind? <a :href="FEEDBACK_URL" class="font-semibold text-accent underline transition-colors hover:text-accent-hover">Send feedback</a>
      </p>
      <!-- A question and its answer, in the logo's two bubbles: yours asks, the assistant's answers.
           Drawn on the logo's 100-unit grid, spread apart so each bubble has room to speak. -->
      <svg v-loop width="384" height="340" viewBox="0 0 384 340" fill="none" aria-hidden="true" class="loop block overflow-visible max-lg:hidden">
        <defs>
          <filter :id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.8" /></filter>
        </defs>
        <g :filter="`url(#${shadow})`" fill="#18213F" opacity="0.2" transform="translate(18 18) scale(3.2)">
          <path d="M20 6H62A16 16 0 0 1 78 22V36A16 16 0 0 1 62 52L70 60L52 52H20A16 16 0 0 1 4 36V22A16 16 0 0 1 20 6Z" />
          <path d="M46 44H92A16 16 0 0 1 108 60V78A16 16 0 0 1 92 94L100 102L82 94H46A16 16 0 0 1 30 78V60A16 16 0 0 1 46 44Z" />
        </g>
        <g transform="translate(18 6) scale(3.2)" stroke-linecap="round" stroke-linejoin="round">
          <g class="loop-fy">
            <path d="M20 6H62A16 16 0 0 1 78 22V36A16 16 0 0 1 62 52L70 60L52 52H20A16 16 0 0 1 4 36V22A16 16 0 0 1 20 6Z" fill="#D7784F" />
            <!-- pathLength 1 makes the dash the whole stroke, so the question mark draws itself. -->
            <path class="loop-fq" d="M34 21.5C34 15.5 37.5 12 41.5 12C46 12 49 15 49 19C49 22.5 46.5 24.5 44 26.2C42.2 27.5 41.5 29 41.5 32" pathLength="1" stroke-dasharray="1" stroke="#FFFFFF" stroke-width="3.6" />
            <circle class="loop-fd" cx="41.5" cy="39.5" r="2.3" fill="#FFFFFF" />
          </g>
          <g class="loop-fa">
            <path d="M46 44H92A16 16 0 0 1 108 60V78A16 16 0 0 1 92 94L100 102L82 94H46A16 16 0 0 1 30 78V60A16 16 0 0 1 46 44Z" fill="#18213F" />
            <g class="loop-fe" fill="#3EE6FF">
              <rect x="40" y="62.5" width="7" height="13" rx="2.3" />
              <rect x="51" y="62.5" width="7" height="13" rx="2.3" />
            </g>
            <path v-for="[d, n] in ANSWER" :key="n" :class="`loop-${n}`" :d="d" pathLength="1" stroke-dasharray="1" stroke="#3EE6FF" stroke-width="3.4" />
          </g>
        </g>
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
