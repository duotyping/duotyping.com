<script setup lang="ts">
// The review popup: a scope tag, what it found, the cards, and the way back to your text.
// `count` and `note` are slots too, so a phone can drop the half that doesn't fit.
defineProps<{
  scope: 'Sentence by sentence' | 'Rewrite' | 'Whole selection'
  count?: string
  checked?: string // the status line under the header: "Both checked by OpenAI"
  original?: string // Whole selection shows your text above the proposals
  note?: string
}>()
</script>

<template>
  <div class="font-mac overflow-hidden rounded-[10px] border border-edge bg-panel text-left text-ink shadow-[0_26px_60px_rgba(24,33,63,0.22),0_3px_10px_rgba(24,33,63,0.10)]">
    <div class="flex items-center gap-2.5 px-3.5 pt-3 pb-2.5">
      <span
        class="shrink-0 rounded-[5px] px-2 text-[10.5px] font-semibold whitespace-nowrap"
        :class="scope === 'Whole selection' ? 'border border-[#9ED7E3] bg-[#E6F7FB] py-0.5 text-ink' : 'bg-tag py-[3px] text-cyan-deep'"
      >{{ scope }}</span>
      <span class="grow text-xs text-ink-2"><slot name="count">{{ count }}</slot></span>
      <span class="flex size-[22px] items-center justify-center">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="#4E5862" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </span>
    </div>
    <div v-if="checked" class="flex items-center gap-2 border-b border-edge px-3.5 pb-2.5">
      <span class="inline-block size-1.5 rounded-full bg-cyan-deep" />
      <span class="text-[11.5px] text-ink-2">{{ checked }}</span>
    </div>
    <div v-if="original" class="mx-2.5 rounded-lg border border-[#E5DFCE] bg-[#F1F3F7] px-3 py-2.5">
      <div class="mb-[5px] font-mono text-[9px] tracking-[0.1em] text-ink-3 uppercase">Your text</div>
      <p class="text-xs leading-[1.45] text-ink-3">{{ original }}</p>
    </div>
    <div class="flex flex-col gap-2 p-2.5">
      <slot />
    </div>
    <div class="flex items-center gap-3 border-t border-edge px-3.5 py-[9px]">
      <span class="grow text-[11.5px] text-ink-3"><slot name="note">{{ note }}</slot></span>
      <span class="text-[11.5px] whitespace-nowrap text-cyan-deep">Return to text ↩</span>
    </div>
  </div>
</template>
