<script setup lang="ts">
import { SPONSORS } from '../utils/facts'
</script>

<template>
  <!-- ── Our sponsors ───────────────────────────────────────────────────────────────── -->
  <section aria-labelledby="sponsors-title" class="wrap pt-12 lg:pt-10">
    <div class="flex flex-col items-center gap-5 border-y border-line py-7 lg:flex-row lg:gap-12 lg:py-8">
      <h2 id="sponsors-title" class="eyebrow shrink-0 !text-ink-3">Our sponsors</h2>
      <!-- Each company's logo from public/sponsors/: placeholders, the names as quiet wordmarks,
           until the companies' own logos replace them (src/utils/facts.ts). -->
      <ul class="flex flex-wrap items-center justify-center gap-x-9 gap-y-4 lg:grow lg:justify-between">
        <li v-for="s in SPONSORS" :key="s.name" class="flex">
          <img :src="s.logo" :alt="s.name" :width="s.width" :height="s.height" class="h-[18px] w-auto lg:h-[21px]" />
        </li>
      </ul>
    </div>
  </section>
</template>
