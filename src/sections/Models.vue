<script setup lang="ts">
import Icon from '../components/Icon.vue'

// Sizes are the signed catalog's (catalog/models.json in the app repo), as the app prints them.
const LOCAL = [
  ['Qwen3 1.7B', '4-bit', 'Fastest'],
  ['Llama 3.2 3B Instruct', '4-bit', ''],
  ['Qwen3 4B Instruct 2507', '4-bit · 2.28 GB · 8 GB memory', 'Balanced'],
  ['Qwen2.5 14B Instruct', '4-bit · 32 GB memory recommended', 'Most capable'],
]
const CLOUD = [
  ['O', 'OpenAI', 'GPT-4o mini, GPT-4.1 nano, GPT-4.1 mini, GPT-4o, GPT-4.1'],
  ['A', 'Anthropic', 'Claude Haiku 4.5, Claude Sonnet 5, Claude Opus 5'],
  ['+', 'Your own endpoint', 'Any OpenAI-compatible API, with your own headers'],
]
</script>

<template>
  <!-- ── Models ─────────────────────────────────────────────────────────────────────── -->
  <section id="models" class="wrap flex scroll-mt-[-40px] flex-col gap-7 pt-20 lg:scroll-mt-[-68px] lg:gap-[52px] lg:pt-[116px]">
    <div class="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div class="flex flex-col gap-3.5 lg:gap-[18px]">
        <div class="eyebrow">Models</div>
        <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:54] [--lo:35]">Pick the engine.<br class="max-lg:hidden" /> Change it any time.</h2>
      </div>
      <p class="fluid max-w-[470px] leading-[1.55] text-pretty text-ink-2 [--hi:18.5] [--lo:17]">
        DuoTyping doesn’t ship with a model, so you choose one when you first open it. Download a local model once and it works offline, or connect a cloud model with your own key. Or both.
      </p>
    </div>
    <div class="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
      <article class="flex flex-col gap-[22px] rounded-3xl border border-edge bg-card p-[22px] md:p-[34px]">
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 class="fluid font-display font-[650] tracking-[-0.02em] [--hi:27] [--lo:24]">On this Mac</h3>
            <span class="tag">Works offline</span>
          </div>
          <p class="text-base leading-[1.55] text-ink-2">Runs on Apple silicon. Download it once and it works without a connection.</p>
        </div>
        <ul class="flex flex-col border-b border-line">
          <li v-for="[name, meta, tag] in LOCAL" :key="name" class="flex items-center justify-between gap-4 border-t border-line py-3.5 md:py-4">
            <div class="flex flex-col gap-[3px]">
              <span class="text-[17px] font-semibold">{{ name }}</span>
              <span class="text-sm text-ink-3">{{ meta }}</span>
            </div>
            <span v-if="tag" class="tag">{{ tag }}</span>
          </li>
        </ul>
        <div class="flex items-center gap-2.5 text-sm text-ink-2"><Icon name="lock" class="size-[18px] text-gold" />A signed catalog. Every file is checked before it loads.</div>
      </article>
      <article class="flex flex-col gap-[22px] rounded-3xl border border-edge bg-card p-[22px] md:p-[34px]">
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 class="fluid font-display font-[650] tracking-[-0.02em] [--hi:27] [--lo:24]">Cloud, with your key</h3>
            <span class="tag border border-[#A9B7C0] bg-transparent text-slate">Optional</span>
          </div>
          <p class="text-base leading-[1.55] text-ink-2">Runs alongside local: your local results show first, and the cloud adds its own as they arrive.</p>
        </div>
        <ul class="flex flex-col border-b border-line">
          <li v-for="[initial, name, models] in CLOUD" :key="name" class="flex items-center gap-3.5 border-t border-line py-3.5 md:py-4">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E3E7EA] text-[15px] font-bold text-slate" aria-hidden="true">{{ initial }}</span>
            <div class="flex flex-col gap-[3px]">
              <span class="text-[17px] font-semibold">{{ name }}</span>
              <span class="text-sm leading-[1.45] text-ink-3">{{ models }}</span>
            </div>
          </li>
        </ul>
        <div class="flex items-center gap-2.5 text-sm text-ink-2"><Icon name="key" class="size-[18px] text-gold" />Your key stays in the macOS Keychain. Your provider bills you directly.</div>
      </article>
    </div>
  </section>
</template>
