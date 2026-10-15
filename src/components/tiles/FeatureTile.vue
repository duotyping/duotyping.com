<script setup lang="ts">
// One feature: its demo on a white stage, a headline of six words or fewer, and one short line.
defineProps<{ line: string; loop?: boolean }>()
</script>

<template>
  <article class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
    <div
      v-if="loop"
      v-loop
      class="loop flex min-h-[300px] grow items-center justify-center overflow-hidden border-b border-edge bg-stage px-4 py-8 md:min-h-[380px]"
      aria-hidden="true"
    >
      <slot />
    </div>
    <div v-else class="flex min-h-[300px] grow items-center justify-center overflow-hidden border-b border-edge bg-stage px-4 py-8 md:min-h-[380px]">
      <slot />
    </div>
    <div class="flex flex-col gap-2 p-6 lg:px-[30px] lg:py-7">
      <h3 class="fluid font-display font-bold tracking-[-0.02em] [--hi:26] [--lo:22]"><slot name="title" /></h3>
      <p class="fluid leading-[1.5] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">{{ line }}</p>
    </div>
  </article>
</template>
