<script setup lang="ts">
import BrandMark from '../brand/BrandMark.vue'
import MarkPaths from '../brand/MarkPaths.vue'
import SceneMessage from './SceneMessage.vue'
import Suggestion from './Suggestion.vue'

// What a phone sees in the hero: Write in the phone's own browser, the same email's mistakes
// marked, then fixed from a sheet, on the clock PlatformScene's styles keep (its ps-* classes).
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
        <div class="flex items-center gap-2 border-b border-line px-4 pt-1 pb-2.5">
          <BrandMark class="size-[18px]" />
          <span class="text-sm font-semibold text-mac-ink">Write</span>
          <span class="grow" />
          <span class="text-[11px] text-ink-3">Saved</span>
        </div>
        <SceneMessage class="font-mac px-4 pt-3.5" size="text-[13px] leading-[1.6]" />
        <div class="ps-sheet absolute inset-x-0 bottom-0 rounded-t-[16px] border-t border-edge bg-white px-3 pt-2 pb-6 shadow-[0_-12px_28px_rgba(24,33,63,0.14)]">
          <div class="mx-auto mb-2.5 h-1 w-9 rounded-full bg-key" />
          <div class="ps-acc font-mac">
            <Suggestion label="Grammar" focused actions="accept" cloud="" :keys="null" original="I have send" size="text-[13px]">
              I <span class="font-semibold text-cyan-deep">sent</span> the revised contract to legal yesterday.
            </Suggestion>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
