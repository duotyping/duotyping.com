<script setup lang="ts">
import { ref } from 'vue'

// Check again with another profile: the same words, read in the tone each profile asks for.
// Grammar stays the same everywhere; only the tone moves.
const ORIGINAL = 'Send me the file ASAP.'
const PROFILES: [string, string][] = [
  ['Work email', 'Could you send me the file when you have a moment?'],
  ['Team chat', 'Can you send me the file when you get a sec?'],
  ['Legal', 'Please provide the file at your earliest convenience.'],
]
const at = ref(0)
</script>

<template>
  <div class="font-mac flex w-[310px] max-w-full flex-col gap-4 md:w-[440px]">
    <div class="flex flex-wrap gap-2" role="group" aria-label="Check with the profile">
      <button
        v-for="([name], i) in PROFILES"
        :key="name"
        type="button"
        class="h-8 cursor-pointer rounded-full border px-3 text-[13px] font-semibold transition-colors duration-200 ease-out"
        :class="at === i ? 'border-ink bg-ink text-white' : 'border-edge bg-panel text-ink hover:border-key'"
        :aria-pressed="at === i"
        @click="at = i"
      >{{ name }}</button>
    </div>
    <div class="rounded-lg border border-accent bg-tint px-[13px] py-[11px] text-left shadow-[0_18px_40px_rgba(24,33,63,0.12)]">
      <div class="mb-[7px] text-[11px] text-ink-2">{{ PROFILES[at]![0] }} · Tone</div>
      <p class="mb-1 grid text-[15px] leading-[1.45] text-ink">
        <span
          v-for="([name, text], i) in PROFILES"
          :key="name"
          class="[grid-area:1/1] transition-opacity duration-200 ease-out"
          :class="at === i ? 'opacity-100' : 'opacity-0'"
          :aria-hidden="at !== i"
        >{{ text }}</span>
      </p>
      <p class="text-[13px] leading-[1.4] text-ink-3 line-through">{{ ORIGINAL }}</p>
    </div>
  </div>
</template>
