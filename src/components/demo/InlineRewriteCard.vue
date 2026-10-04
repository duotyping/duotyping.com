<script setup lang="ts">
// The card the Rewrite pill opens, as the app draws it (InlineRewriteCardView): its title, the word
// count and Escape; the selection as written; then the options, where only the focused one shows its
// chip and Replace selection.
defineProps<{ original: string; words: number; options: string[] }>()
</script>

<template>
  <div class="font-mac overflow-hidden rounded-[10px] border border-edge bg-panel text-left text-ink shadow-[0_24px_60px_rgba(24,33,63,0.2),0_3px_10px_rgba(24,33,63,0.08)]">
    <div class="flex items-center gap-[9px] border-b border-edge px-[13px] pt-[11px] pb-[9px]">
      <span class="grow text-[12.5px] font-semibold">Rewrite your selection</span>
      <span class="text-[11px] text-ink-3">{{ words }} words</span>
      <span class="mk-kbd">esc</span>
    </div>
    <div class="mx-[9px] mt-[9px] rounded-lg border border-[#E6E9EF] bg-[#F1F3F7] px-[11px] py-2">
      <div class="mb-1 font-mono text-[8.5px] tracking-[0.1em] text-ink-3 uppercase">Selected</div>
      <p class="text-[11.5px] leading-[1.4] text-struck">{{ original }}</p>
    </div>
    <div class="flex flex-col gap-[7px] p-[9px]">
      <div v-for="(text, i) in options" :key="text" class="rounded-lg border px-3 py-2.5" :class="i === 0 ? 'border-accent bg-tint' : 'border-edge bg-card'">
        <div class="flex items-center gap-[7px]" :class="i === 0 ? 'mb-1.5' : 'mb-[5px]'">
          <span class="grow text-[10.5px] text-ink-3">Option {{ i + 1 }} of {{ options.length + 1 }}</span>
          <span class="mk-tag border border-[#A9B7C0] bg-transparent px-[7px] py-px text-slate">OpenAI · your key</span>
        </div>
        <p class="text-[13.5px] leading-[1.4]" :class="i === 0 && 'mb-[9px]'">{{ text }}</p>
        <div v-if="i === 0" class="flex items-center gap-[7px]">
          <span class="mk-btn">Replace selection</span>
          <span class="mk-kbd">return</span>
        </div>
      </div>
    </div>
  </div>
</template>
