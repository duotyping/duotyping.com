<script setup lang="ts">
import { chooseAnalytics, consentOpen } from '../utils/consent'
</script>

<template>
  <!-- Doesn't block the page or take focus: the site works the same until, or without, a choice.
       Accept and Reject look alike and sit side by side, so neither is the easy way out. -->
  <section
    v-if="consentOpen"
    role="region"
    aria-labelledby="consent-title"
    class="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-[560px] flex-col gap-3.5 rounded-2xl border border-edge bg-card p-5 shadow-[0_12px_40px_rgb(24_33_63/0.16)] md:bottom-6 md:p-6"
  >
    <h2 id="consent-title" class="text-[15.5px] font-semibold text-ink">Count this visit with Google Analytics?</h2>
    <p class="text-[14.5px] leading-normal text-ink-2">
      It sets cookies, so it runs only if you agree. Without it we still see anonymous page counts, with no cookies.
      <a href="/privacy" class="underline underline-offset-2">Privacy Policy</a>
    </p>
    <div class="flex gap-2.5">
      <button type="button" class="consent-choice" @click="chooseAnalytics(false)">Reject</button>
      <button type="button" class="consent-choice" @click="chooseAnalytics(true)">Accept</button>
    </div>
  </section>
</template>

<style scoped>
.consent-choice {
  flex: 1;
  height: 44px;
  border: 1px solid var(--color-key);
  border-radius: 12px;
  background: var(--color-card);
  color: var(--color-ink);
  font: 600 15px var(--font-sans);
}
.consent-choice:hover { background: var(--color-sand); }
.consent-choice:active { translate: 0 1px; }
</style>
