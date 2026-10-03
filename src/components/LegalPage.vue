<script setup lang="ts">
defineProps<{ title: string; updated: string }>()
</script>

<template>
  <article class="wrap pt-14 pb-24 lg:pt-20 lg:pb-32">
    <div class="mx-auto">
      <div class="eyebrow">Legal</div>
      <h1 class="fluid mt-3.5 font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:54] [--lo:37] lg:mt-[18px]">{{ title }}</h1>
      <p class="mt-4 text-sm text-ink-3">Last updated {{ updated }}</p>
      <div class="legal mt-10">
        <slot />
      </div>
    </div>
  </article>
</template>
