<script setup lang="ts">
// The animated mark, as duotyping-specs ui-design/mascot/01-reference.html draws it: the moods and
// poses are src/styles/mark.css's, never keyframes of a page's own.
import '../../styles/mark.css'

defineProps<{ mood?: string; pose?: string }>()
</script>

<template>
  <span class="dtm" v-bind="{ 'data-mood': mood, 'data-pose': pose }" aria-hidden="true">
    <span class="dtm-burst"><i v-for="n in 16" :key="n" /></span>
    <span class="dtm-art">
      <span class="dtm-you-move"><span class="dtm-you" /></span>
      <span class="dtm-ai-move"><span class="dtm-ai"><span class="dtm-eyes"><span class="dtm-eye dtm-l" /><span class="dtm-eye dtm-r" /></span></span></span>
    </span>
  </span>
</template>
