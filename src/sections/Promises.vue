<script setup lang="ts">
const PILLARS: [string, string][] = [
  ['Nothing changes until you accept', 'Every suggestion waits for your yes. If the text moved while DuoTyping was checking, it asks again instead of guessing.'],
  ['Your words stay on your Mac', 'Local models check your writing right on Apple silicon. DuoTyping never stores what you write.'],
  ['Free, with no account', 'No sign-up, no trial, no tracking. A cloud model is optional, and it runs on your own key.'],
]
</script>

<template>
  <!-- ── Three promises ─────────────────────────────────────────────────────────────── -->
  <section class="wrap pt-14 lg:pt-[72px]" aria-labelledby="promises">
    <h2 id="promises" class="sr-only">Why DuoTyping</h2>
    <div class="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-5">
      <div v-for="[title, body] in PILLARS" :key="title" class="flex flex-col gap-3.5 rounded-[22px] border border-edge bg-card p-[22px] lg:p-[26px]">
        <!-- The two bubbles, small: yours, then the assistant's. -->
        <div class="flex gap-1.5" aria-hidden="true">
          <span class="h-4 w-[22px] rounded-[7px_7px_7px_2px] bg-terra" />
          <span class="h-4 w-[22px] rounded-[7px_7px_2px_7px] bg-ink" />
        </div>
        <div class="flex flex-col gap-1.5 lg:gap-2.5">
          <h3 class="fluid font-semibold text-ink [--hi:21] [--lo:18.5] lg:mt-1 lg:tracking-[-0.01em]">{{ title }}</h3>
          <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">{{ body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
