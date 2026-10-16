<script setup lang="ts">
// The email the hero's Windows, browser and phone scenes check, the same one the Mac demo types:
// two mistakes marked, then selected, then fixed in place. Each fixed sentence shares a cell with
// the one it replaces, so nothing reflows when one becomes the other. On the web nothing is
// selected: each mark is tapped and fixed in turn, in Write's own marks, on PhoneWrite's clock
// (its pw-* classes), the words written lit for a moment.
withDefaults(defineProps<{ size?: string; web?: boolean }>(), { size: 'text-[15px] leading-[1.7]' })
</script>

<template>
  <div class="text-mac-ink" :class="size">
    <p>Hi <span class="skel [--w:3.2em]" />,</p>
    <p class="mt-3">Thanks for the quick reply.</p>
    <template v-if="web">
      <p class="grid">
        <span class="pw-old1 [grid-area:1/1]">I <span class="pw-mark pw-mark1 relative">have send<span class="pw-touch pw-t1" /></span> the revised contract to legal yesterday.</span>
        <span class="pw-new1 [grid-area:1/1]">I <span class="pw-lit pw-lit1">sent</span> the revised contract to legal yesterday.</span>
      </p>
      <p class="grid">
        <span class="pw-old2 [grid-area:1/1]"><span class="pw-mark pw-mark2 relative">they will be review<span class="pw-touch pw-t3" /></span> it by Friday.</span>
        <span class="pw-new2 [grid-area:1/1]"><span class="pw-lit pw-lit2">They will review</span> it by Friday.</span>
      </p>
    </template>
    <template v-else>
      <p class="grid">
        <span class="ps-old [grid-area:1/1]"><span class="ps-sel">I <span class="ps-mark">have send</span> the revised contract to legal yesterday.</span></span>
        <span class="ps-new [grid-area:1/1]">I sent the revised contract to legal yesterday.</span>
      </p>
      <p class="grid">
        <span class="ps-old [grid-area:1/1]"><span class="ps-sel"><span class="ps-mark">they will be review</span> it by Friday.</span></span>
        <span class="ps-new [grid-area:1/1]">They will review it by Friday.</span>
      </p>
    </template>
    <p class="mt-3">Let me know if anything is missing.</p>
    <p class="mt-3">Best,<br /><span class="skel [--w:4em]" /></p>
  </div>
</template>
