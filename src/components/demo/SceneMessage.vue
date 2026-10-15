<script setup lang="ts">
// The email the hero's Windows, browser and phone scenes check, the same one the Mac demo types:
// two mistakes marked, then selected, then fixed in place. Each fixed sentence shares a cell with
// the one it replaces, so nothing reflows when one becomes the other. On the web nothing is
// selected: the first mark is tapped and fixed alone, in Write's own marks.
withDefaults(defineProps<{ size?: string; web?: boolean }>(), { size: 'text-[15px] leading-[1.7]' })
</script>

<template>
  <div class="text-mac-ink" :class="size">
    <p>Hi <span class="skel [--w:3.2em]" />,</p>
    <p class="mt-3">Thanks for the quick reply.</p>
    <p class="grid">
      <span class="ps-old [grid-area:1/1]"><span :class="!web && 'ps-sel'">I <span :class="web ? 'ps-wmark ps-tap' : 'ps-mark'">have send</span> the revised contract to legal yesterday.</span></span>
      <span class="ps-new [grid-area:1/1]">I sent the revised contract to legal yesterday.</span>
    </p>
    <p v-if="web"><span class="ps-wmark">they will be review</span> it by Friday.</p>
    <p v-else class="grid">
      <span class="ps-old [grid-area:1/1]"><span class="ps-sel"><span class="ps-mark">they will be review</span> it by Friday.</span></span>
      <span class="ps-new [grid-area:1/1]">They will review it by Friday.</span>
    </p>
    <p class="mt-3">Let me know if anything is missing.</p>
    <p class="mt-3">Best,<br /><span class="skel [--w:4em]" /></p>
  </div>
</template>
