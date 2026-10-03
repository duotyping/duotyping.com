<script setup lang="ts">
import { useId } from 'vue'
import MarkPaths from './MarkPaths.vue'

// The app icon as the system renders it: the two bubbles on a quiet neutral tile, with a soft
// shadow under them, placed as Icon Composer places the art on its 824-point tile. Sized by
// --icon, so a breakpoint can change it; corners and shadow follow.
const id = useId()
</script>

<template>
  <div class="app-icon">
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" class="block size-full">
      <defs>
        <filter :id="`${id}-blur`" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <g transform="translate(-1.254 -0.263) scale(1.0771)">
        <g :filter="`url(#${id}-blur)`" fill="#1A1B1E" opacity="0.22" transform="translate(0 0.36) scale(0.18)">
          <path d="M31.76 15.49H63.76A18 18 0 0 1 81.76 33.49V45.49A18 18 0 0 1 63.76 63.49L73.76 71.49L53.76 63.49H31.76A18 18 0 0 1 13.76 45.49V33.49A18 18 0 0 1 31.76 15.49Z" />
          <path d="M40 26H74A18 18 0 0 1 92 44V62A18 18 0 0 1 74 80L84 88L64 80H40A18 18 0 0 1 22 62V44A18 18 0 0 1 40 26Z" />
        </g>
        <MarkPaths />
      </g>
    </svg>
  </div>
</template>
