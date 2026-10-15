<script setup lang="ts">
// What DuoTyping is built on, named as text. None of their makers sponsors or endorses it, and their
// logos aren't ours to use: Apple bars its own, and Anthropic allows only artwork it supplies.
const BUILT_ON = ['Claude', 'Cloudflare', 'Better Auth', 'macOS', 'Windows', 'Chrome']
</script>

<template>
  <!-- ── Built on ───────────────────────────────────────────────────────────────────── -->
  <section aria-labelledby="built-on-title" class="wrap pt-12 lg:pt-10">
    <div class="flex flex-col items-center gap-5 border-y border-line py-7 lg:flex-row lg:gap-12 lg:py-8">
      <h2 id="built-on-title" class="eyebrow shrink-0 !text-ink-3">Built on</h2>
      <ul class="flex flex-wrap items-center justify-center gap-x-9 gap-y-4 lg:grow lg:justify-between">
        <li v-for="name in BUILT_ON" :key="name" class="font-display text-[18px] font-semibold tracking-[-0.01em] text-ink-3 lg:text-[21px]">{{ name }}</li>
      </ul>
    </div>
  </section>
</template>
