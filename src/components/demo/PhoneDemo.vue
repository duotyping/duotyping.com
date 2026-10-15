<script setup lang="ts">
import MarkPaths from '../brand/MarkPaths.vue'
import PhoneWrite from './PhoneWrite.vue'

// What a phone sees in the hero: Write in the phone's own browser, the same email's mistakes
// marked, one tapped and fixed, on the clock PlatformScene's styles keep (its ps-* classes).
// Drawn at 350 × 626 and scaled to the phone, as the stage-phone rule does.
</script>

<template>
  <!-- Decoration: the copy above it says everything this shows. -->
  <div v-loop class="stage-phone loop" aria-hidden="true" inert>
    <div class="canvas relative">
      <svg width="350" height="626" viewBox="0 0 350 626" fill="none" class="absolute top-0 left-0">
        <g transform="translate(57.4 284.6) scale(26)"><MarkPaths tone="desk" /></g>
      </svg>
      <div class="absolute top-[18px] left-[29px] h-[590px] w-[292px] overflow-hidden rounded-[42px] border-[10px] border-[#0F1530] bg-white shadow-[0_24px_56px_rgba(24,33,63,0.26)]">
        <div class="flex h-9 items-center justify-between px-5 text-xs font-semibold text-mac-ink">
          9:41<span class="h-5 w-[78px] rounded-full bg-[#0F1530]" /><span class="flex gap-[3px]"><span v-for="n in 3" :key="n" class="size-1.5 rounded-full bg-mac-ink" /></span>
        </div>
        <PhoneWrite small class="h-[534px]" />
      </div>
    </div>
  </div>
</template>
