<script setup lang="ts">
import MarkPaths from '../brand/MarkPaths.vue'
import PhoneWrite from './PhoneWrite.vue'

// What a phone sees in the hero: Write in the phone's own browser, the same email's mistakes
// marked, each tapped and fixed in turn, on PhoneWrite's own 8 s clock (its pw-* classes). The
// visitor is already holding the phone, so there's none drawn around it: Write is a card on the
// desk, the mascot peeking over its top edge. Drawn at 350 × 470 and scaled to the column, as the
// stage-phone rule does.
</script>

<template>
  <!-- Decoration: the copy above it says everything this shows. -->
  <div v-loop class="stage-phone loop" aria-hidden="true" inert>
    <div class="canvas relative">
      <svg width="350" height="470" viewBox="0 0 350 470" fill="none" class="absolute top-0 left-0">
        <g transform="translate(230 -8) scale(5.5)"><MarkPaths tone="desk" /></g>
      </svg>
      <PhoneWrite class="absolute top-[56px] left-[14px] h-[400px] w-[322px]" />
    </div>
  </div>
</template>
