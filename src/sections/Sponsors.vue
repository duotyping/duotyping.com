<script setup lang="ts">
import { SPONSORS } from '../utils/facts'
</script>

<template>
  <!-- ── Our sponsors ───────────────────────────────────────────────────────────────── -->
  <section aria-labelledby="sponsors-title" class="wrap pt-12 lg:pt-10">
    <div class="flex flex-col items-center gap-5 border-y border-line py-7 lg:flex-row lg:gap-12 lg:py-8">
      <h2 id="sponsors-title" class="eyebrow shrink-0 !text-ink-3">Our sponsors</h2>
      <!-- Each company's own logo goes in public/sponsors/, from its brand page; until then its
           name stands in, set as a quiet wordmark. -->
      <ul class="flex flex-wrap items-center justify-center gap-x-9 gap-y-4 lg:grow lg:justify-between">
        <li v-for="name in SPONSORS" :key="name" class="font-display text-[18px] font-semibold tracking-[-0.02em] whitespace-nowrap text-ink-3 lg:text-[21px]">{{ name }}</li>
      </ul>
    </div>
  </section>
</template>
