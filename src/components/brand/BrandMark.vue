<script setup lang="ts">
import MarkPaths from './MarkPaths.vue'

withDefaults(defineProps<{ tone?: 'paper' | 'ink' }>(), { tone: 'paper' })
</script>

<template>
  <!-- Cropped to the bubbles themselves, so the box can be sized like a glyph. -->
  <svg viewBox="1.1 0.78 15.8 15.8" fill="none" aria-hidden="true" class="block shrink-0">
    <MarkPaths :tone="tone" />
  </svg>
</template>
