<script setup lang="ts">
import MarkPaths from './MarkPaths.vue'

withDefaults(defineProps<{ tone?: 'paper' | 'ink' }>(), { tone: 'paper' })
</script>

<template>
  <!-- Cropped to the pencils themselves, so the box can be sized like a glyph. -->
  <svg viewBox="2.12 1.5 14.58 14.58" fill="none" aria-hidden="true" class="block shrink-0">
    <MarkPaths :tone="tone" />
  </svg>
</template>
