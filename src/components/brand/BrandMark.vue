<script setup lang="ts">
import MarkPaths from './MarkPaths.vue'

withDefaults(defineProps<{ tone?: 'paper' | 'ink' }>(), { tone: 'paper' })
</script>

<template>
  <!-- Cropped to the bubbles themselves, so the box can be sized like a glyph. -->
  <svg viewBox="2.32 2.11 14.4 14.4" fill="none" aria-hidden="true" class="block shrink-0">
    <MarkPaths :tone="tone" />
  </svg>
</template>
