<script setup lang="ts">
// The menu-bar template: the same two bubbles in one channel. Your bubble's outline stops short
// of the assistant's, which keeps a gap between them without a mask, and the eyes are filled.
withDefaults(defineProps<{ color?: string }>(), { color: '#1E2A32' })
</script>

<template>
  <svg viewBox="4 3 92 92" aria-hidden="true" class="block shrink-0">
    <g fill="none" :stroke="color" stroke-width="6" stroke-linejoin="round">
      <path d="M13 50.45A18 18 0 0 1 8 38V26A18 18 0 0 1 26 8H58A18 18 0 0 1 73.59 17" stroke-linecap="round" />
      <path d="M40 26H74A18 18 0 0 1 92 44V62A18 18 0 0 1 74 80L84 88L64 80H40A18 18 0 0 1 22 62V44A18 18 0 0 1 40 26Z" />
    </g>
    <g :fill="color">
      <rect x="39.76" y="41.3" width="12.48" height="23.4" rx="3.99" />
      <rect x="61.76" y="41.3" width="12.48" height="23.4" rx="3.99" />
    </g>
  </svg>
</template>
