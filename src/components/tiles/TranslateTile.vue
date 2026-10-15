<script setup lang="ts">
// Translate, as the apps show it: what you wrote in your language, three ways to say it in
// English, and Use This on the one you pick. A CSS loop; still, it shows all three.
const OPTIONS = [
  'Could you send me the contract before Friday?',
  'Please send me the contract by Friday.',
  'Can you get the contract to me before Friday?',
]
</script>

<template>
  <div class="font-mac flex w-[310px] max-w-full flex-col gap-3 text-left text-ink md:w-[440px]">
    <div class="flex items-center gap-2.5 rounded-[10px] border border-edge bg-panel px-3.5 py-3 shadow-[0_8px_22px_rgba(24,33,63,0.08)]">
      <span class="rounded-[5px] border border-key px-1.5 py-px text-[10.5px] font-semibold text-ink-2">VI</span>
      <span class="text-[13.5px] leading-[1.45] text-mac-ink md:text-[14.5px]">Anh gửi giúp em bản hợp đồng trước thứ Sáu nhé.</span>
    </div>
    <div class="flex items-center gap-2 pl-1 text-[11.5px] text-ink-3">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M2 7l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
      Into <span class="rounded-[5px] bg-tag px-1.5 py-px font-semibold text-cyan-deep">English</span> · 3 ways to say it
    </div>
    <div class="overflow-hidden rounded-[10px] border border-edge bg-panel shadow-[0_24px_60px_rgba(24,33,63,0.16),0_3px_10px_rgba(24,33,63,0.08)]">
      <div
        v-for="(text, i) in OPTIONS"
        :key="text"
        class="tr-opt flex items-center gap-3 px-3.5 py-2.5"
        :class="[i > 0 && 'border-t border-edge', i === 0 && 'bg-tint']"
        :style="{ '--i': i }"
      >
        <span class="grow text-[13px] leading-[1.45] md:text-[14px]">{{ text }}</span>
        <span v-if="i === 0" class="tr-use mk-btn shrink-0">Use This</span>
      </div>
    </div>
  </div>
</template>

<style>
@media (prefers-reduced-motion: no-preference) {
  .tr-opt { animation: tr-opt 8s calc(var(--i) * 260ms) infinite; }
  .tr-use { animation: tr-use 8s infinite; }
}
@keyframes tr-opt { 0%, 12%, 96%, 100% { opacity: 0; transform: translateY(6px); } 17%, 92% { opacity: 1; transform: none; } }
@keyframes tr-use { 0%, 54%, 59%, 100% { transform: none; } 55.5%, 57.5% { transform: scale(0.94); background: var(--color-accent-press); } }
</style>
