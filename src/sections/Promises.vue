<script setup lang="ts">
import Icon, { type IconName } from '../components/Icon.vue'

const PILLARS: [IconName, string, string][] = [
  ['undo', 'Nothing changes until you accept', 'Every suggestion waits for your yes. If the text moved while DuoTyping was checking, it asks again instead of guessing.'],
  ['mac', 'Your words stay on your Mac', 'Local models check your writing right on Apple silicon. DuoTyping never stores what you write.'],
  ['no-account', 'Free, with no account', 'No sign-up, no trial, no tracking. A cloud model is optional, and it runs on your own key.'],
]
</script>

<template>
  <!-- ── Three promises ─────────────────────────────────────────────────────────────── -->
  <section class="wrap pt-14 lg:pt-[72px]" aria-labelledby="promises">
    <h2 id="promises" class="sr-only">Why DuoTyping</h2>
    <div class="flex flex-col lg:grid lg:grid-cols-3">
      <div
        v-for="([icon, title, body], i) in PILLARS"
        :key="title"
        class="flex gap-4 py-[22px] lg:flex-col lg:gap-3.5 lg:px-10 lg:py-0 lg:first:pl-0"
        :class="i > 0 && 'border-t border-line lg:border-t-0 lg:border-l'"
      >
        <Icon :name="icon" class="size-[26px] text-clay lg:size-7" />
        <div class="flex flex-col gap-1.5 lg:gap-3.5">
          <h3 class="fluid font-semibold text-ink [--hi:21] [--lo:18.5] lg:mt-1 lg:tracking-[-0.01em]">{{ title }}</h3>
          <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">{{ body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
