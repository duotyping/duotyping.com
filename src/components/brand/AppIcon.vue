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
      <g transform="translate(2.228 2.294) scale(0.7524)">
        <g :filter="`url(#${id}-blur)`" fill="#1A1B1E" opacity="0.22" transform="translate(0 0.36) scale(0.18)">
          <path d="M26 8H58A18 18 0 0 1 76 26V38A18 18 0 0 1 58 56L68 64L48 56H26A18 18 0 0 1 8 38V26A18 18 0 0 1 26 8Z" />
          <path d="M40 26H74A18 18 0 0 1 92 44V62A18 18 0 0 1 74 80L84 88L64 80H40A18 18 0 0 1 22 62V44A18 18 0 0 1 40 26Z" />
        </g>
        <MarkPaths />
      </g>
    </svg>
  </div>
</template>
