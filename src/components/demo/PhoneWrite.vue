<script setup lang="ts">
import Icon from '../Icon.vue'
import SceneMessage from './SceneMessage.vue'

// Write in a phone's browser, as web-prd.md and board L8 draw it: ☰, the draft's title, its save
// tick, Translate, ⋯ and the count that opens Suggestions; the email with Write's marks; the profile
// and Check Now underneath. A tapped mark docks its fix at the bottom, and tapping the fix takes it:
// there's no Accept. Fills the phone's screen under its status bar, which positions the fix.
defineProps<{ small?: boolean }>()
</script>

<template>
  <div class="font-mac flex flex-col text-mac-ink">
    <div class="flex items-center gap-2.5 border-b border-line px-3.5 pt-1 pb-2.5">
      <Icon name="menu" class="size-[18px] shrink-0" />
      <span class="grow truncate font-semibold" :class="small ? 'text-[13px]' : 'text-sm'">Revised contract</span>
      <Icon name="check" class="size-4 shrink-0 text-ink-3" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-ink-2">
        <path d="M1.5 3.5h7M5 2v1.5M3 3.5c.5 2.3 2 4 4 5M7 3.5c-.4 2.4-2 4.3-4.5 5.5M8.5 14l3-7 3 7M9.5 12h4" />
      </svg>
      <span class="text-ink-2">⋯</span>
      <span class="grid shrink-0 rounded-full bg-[#B04227] px-2 text-[11px] leading-[18px] font-bold text-white">
        <span class="ps-old [grid-area:1/1]">2</span><span class="ps-new [grid-area:1/1]">1</span>
      </span>
    </div>
    <SceneMessage web class="grow px-4 pt-3.5" :size="small ? 'text-[13px] leading-[1.6]' : 'text-[14px] leading-[1.6]'" />
    <div class="flex items-center justify-between gap-2 border-t border-line px-3.5 py-2.5">
      <span class="truncate rounded-full border border-edge px-2.5 py-1 text-[11px] text-ink-2">Work · Business &amp; finance ⌄</span>
      <span class="shrink-0 rounded-lg bg-ink px-3 py-1.5 text-[11.5px] font-semibold text-white">Check Now</span>
    </div>

    <!-- The tapped mark's fix, docked full width: the words struck, the fix a pill you tap -->
    <div class="ps-wsheet absolute inset-x-0 bottom-0 rounded-t-[16px] border-t border-edge bg-white px-3.5 pt-2.5 pb-6 shadow-[0_-12px_28px_rgba(24,33,63,0.14)]">
      <div class="flex items-center gap-2 text-xs text-ink-2">
        <span class="size-2 rounded-full bg-[#B04227]" />
        <span class="grow font-semibold text-mac-ink">Grammar</span>
        <span class="flex size-7 items-center justify-center text-base text-ink-3">‹</span>1 of 2<span class="flex size-7 items-center justify-center text-base text-ink-3">›</span>
      </div>
      <div class="mt-2 flex items-center gap-2" :class="small ? 'text-[13.5px]' : 'text-[14.5px]'">
        <span class="text-ink-3 line-through">have send</span>
        <span class="text-ink-3">→</span>
        <span class="ps-wpill rounded-full bg-ink px-3 py-1 font-semibold text-white">sent</span>
      </div>
      <div class="mt-3 flex justify-between text-xs">
        <span class="font-semibold text-ink-2">Skip</span>
        <span class="text-ink-3">Report…</span>
      </div>
    </div>
  </div>
</template>
