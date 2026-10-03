<script setup lang="ts">
import Icon, { type IconName } from '../components/Icon.vue'

// Each promise in the logo's bubble: yours for the yes that's yours to give, the assistant's for
// what it does on your Mac.
const AI = 'M40 26H74A18 18 0 0 1 92 44V62A18 18 0 0 1 74 80L84 88L64 80H40A18 18 0 0 1 22 62V44A18 18 0 0 1 40 26Z'
const PILLARS: [IconName, boolean, string, string][] = [
  ['check', true, 'Nothing changes until you accept', 'Every suggestion waits for your yes. If the text moved while DuoTyping was checking, it asks again instead of guessing.'],
  ['mac', false, 'Your words stay on your Mac', 'Local models check your writing right on Apple silicon. DuoTyping never stores what you write.'],
  ['offline', false, 'Works offline', 'Download a local model once and DuoTyping checks your writing without a connection. A cloud model is optional, on your own key.'],
]
</script>

<template>
  <!-- ── Three promises ─────────────────────────────────────────────────────────────── -->
  <section class="wrap pt-14 lg:pt-[72px]" aria-labelledby="promises">
    <h2 id="promises" class="sr-only">Why DuoTyping</h2>
    <div class="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-5">
      <div v-for="[icon, yours, title, body] in PILLARS" :key="title" class="flex flex-col gap-3.5 rounded-[22px] border border-edge bg-card p-[22px] lg:p-[26px]">
        <!-- The glyph sits on the bubble's body, above its tail. -->
        <div class="relative h-14 w-[63px]" aria-hidden="true">
          <svg viewBox="20 24 74 66" class="size-full"><path :d="AI" :fill="yours ? 'var(--color-terra)' : 'var(--color-ink)'" /></svg>
          <Icon :name="icon" :stroke="2.2" class="absolute top-2 left-[14px] size-[34px]" :class="yours ? 'text-white' : 'text-cyan'" />
        </div>
        <div class="flex flex-col gap-1.5 lg:gap-2.5">
          <h3 class="fluid font-semibold text-ink [--hi:21] [--lo:18.5] lg:mt-1 lg:tracking-[-0.01em]">{{ title }}</h3>
          <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">{{ body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
