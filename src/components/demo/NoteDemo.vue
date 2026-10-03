<script setup lang="ts">
import MacWindow from './MacWindow.vue'
import Suggestion from './Suggestion.vue'
</script>

<template>
  <!-- New Note as the app draws it (ManualInputViewController): the arrival banner, your text and its
       count, Check text and Copy, the status line, the cards, and the promise at the foot. The loop
       checks, accepts the fix into the box (the status line stays, the card goes, as in the app),
       then copies the result. -->
  <MacWindow title="New Note">
    <div class="px-4 pt-3.5">
      <div class="mb-2.5 flex items-start gap-2 rounded-[7px] border border-[#9ED7E3] bg-tag px-[11px] py-[9px] text-[11.5px] leading-[1.4] text-ink">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" class="mt-px shrink-0">
          <circle cx="8" cy="8" r="6.3" stroke="#0A6F84" stroke-width="1.4" /><path d="M8 4.6v4.2M8 11.2v.01" stroke="#0A6F84" stroke-width="1.6" stroke-linecap="round" />
        </svg>
        Nothing was selected — check it here instead.
      </div>
      <div class="mb-1.5 font-mono text-[9px] tracking-[0.1em] text-ink-3 uppercase">Your text</div>
      <div class="relative rounded-lg border border-edge bg-white px-[13px] pt-[11px] pb-[21px] text-[13px] leading-[1.55] text-mac-ink md:text-[13.5px]">
        <!-- Both versions share one cell, so accepting the fix never moves anything around it. -->
        <p class="grid">
          <span class="loop-nold [grid-area:1/1]">Thanks for the update. I <span class="wavy">have send</span> the contract to legal yesterday.</span>
          <span class="loop-nnew opacity-0 [grid-area:1/1]">Thanks for the update. I <span class="rounded-[3px] bg-tag">sent</span> the contract to legal yesterday.</span>
        </p>
        <span class="absolute right-2 bottom-1.5 font-mono text-[10px] text-ink-3">68 / 1,900</span>
      </div>
      <div class="flex items-center gap-2 pt-2.5 pb-3">
        <span class="mk-btn loop-ncheck">Check text</span>
        <span class="mk-kbd">⌘↵</span>
        <span class="grid">
          <span class="mk-btn-2 loop-ncopy [grid-area:1/1]">Copy</span>
          <span class="loop-ncopied inline-flex items-center justify-center gap-1.5 rounded-md border border-[#AFCFB4] bg-[#E4F2E6] px-[11px] text-[12px] font-semibold text-[#2F7D3A] opacity-0 [grid-area:1/1]">✓ Copied</span>
        </span>
        <span class="loop-nstat ml-auto text-[11px] text-ink-3">1.2 s</span>
      </div>
    </div>
    <!-- Each slot folds to nothing while it's hidden, so the window never holds an empty gap. -->
    <div class="loop-nslot-stat grid grid-rows-[1fr]"><div class="min-h-0 overflow-hidden">
      <div class="loop-nstat flex items-center gap-2 border-b border-line px-4 pb-[9px] text-[11.5px] text-ink-2">
        <span class="size-1.5 rounded-full bg-cyan-deep" />1 found on this Mac<span class="text-ink-3">·</span>cloud is off
      </div>
    </div></div>
    <div class="loop-nslot-card grid grid-rows-[1fr]"><div class="min-h-0 overflow-hidden">
      <div class="loop-ncard p-2.5">
        <Suggestion label="Sentence 1 of 1" focused actions="accept-skip" original="I have send the contract to legal yesterday." size="text-[13px]" original-size="text-[11px]">
          I <span class="font-semibold text-cyan-deep">sent</span> the contract to legal yesterday.
        </Suggestion>
      </div>
    </div></div>
    <div class="border-t border-line px-3.5 py-2 text-[11px] text-ink-3">Nothing here touches another app — accept rewrites this box.</div>
  </MacWindow>
</template>
