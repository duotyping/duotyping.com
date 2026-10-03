<script setup lang="ts">
import MarkPaths from './MarkPaths.vue'
import CountBadge from './mock/CountBadge.vue'
import MacWindow from './mock/MacWindow.vue'
import Popup from './mock/Popup.vue'
import RewritePill from './mock/RewritePill.vue'
import Suggestion from './mock/Suggestion.vue'

// The phone tells the same story once, in CSS alone: the marks land and the badge counts
// them (3.2 s), the selection sweeps (3.5 s), Rewrite appears (3.86 s), the popup rises
// (4.48 s). No loop and no timers — on a phone the page mostly scrolls past it.
</script>

<template>
  <div class="stage-phone" aria-hidden="true" inert>
    <div class="canvas relative">
      <svg width="350" height="626" viewBox="0 0 350 626" fill="none" class="absolute top-0 left-0">
        <g transform="translate(57.4 284.6) scale(26)"><MarkPaths tone="desk" /></g>
      </svg>
      <MacWindow class="absolute top-4 left-3.5 h-[262px] w-[322px]">
        <div class="flex flex-col gap-[11px] px-[22px] py-4 text-[13.5px] leading-[1.65]">
          <p>Hi <span class="skel" />,</p>
          <p>Thanks for the quick reply. <span class="sel-full dt-sel" style="--at: 3500ms">I <span class="wavy dt-mark" style="--at: 3200ms">have send</span> the revised contract to legal yesterday. <span class="wavy dt-mark" style="--at: 3200ms">they will be review</span> it by Friday.</span><span class="relative inline-block h-[1em] w-0"><span class="absolute top-[-8px] left-3"><span class="dt-pop inline-block" style="--at: 3860ms"><RewritePill /></span></span></span></p>
        </div>
      </MacWindow>
      <div class="absolute top-[76px] left-[258px]">
        <div class="dt-pop" style="--at: 3200ms"><CountBadge :count="2" :icon="14" /></div>
      </div>
      <div class="absolute top-[206px] left-3.5">
        <div class="dt-pop" style="--at: 4480ms">
          <Popup scope="Sentence by sentence" count="2 suggestions" checked="Both checked on this Mac" note="Nothing changes until you accept." class="w-[322px]">
            <Suggestion label="Sentence 1 of 2" focused actions="accept-skip" original="I have send the revised contract to legal yesterday.">
              I <span class="font-semibold text-clay">sent</span> the revised contract to legal yesterday.
            </Suggestion>
            <Suggestion label="Sentence 2 of 2" original="they will be review it by Friday.">
              <span class="font-semibold text-clay">They will review</span> it by Friday.
            </Suggestion>
          </Popup>
        </div>
      </div>
    </div>
  </div>
</template>
