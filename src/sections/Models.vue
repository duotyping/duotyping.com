<script setup lang="ts">
import Icon from '../components/Icon.vue'

// The models the app offers out of the box (ProviderRegistry in the app repo), and the custom route.
const PROVIDERS = [
  ['O', 'OpenAI', 'GPT-4o mini'],
  ['A', 'Anthropic', 'Claude Haiku 4.5'],
]
const CUSTOM = [
  ['Any OpenAI-compatible API', 'A gateway, or a model you serve yourself'],
  ['Your own models', 'List the model names your endpoint takes'],
  ['Your own headers', 'And a key typed in, or read from an environment variable'],
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
        DuoTyping doesn’t ship with a model: the first time you open it, connect the provider you already use, with your own key. Change it any time in Settings.
      </p>
    </div>
    <div class="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
      <article class="flex flex-col gap-[22px] rounded-3xl border border-edge bg-card p-[22px] md:p-[34px]">
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 class="fluid font-display font-[650] tracking-[-0.02em] [--hi:27] [--lo:24]">Cloud, with your key</h3>
            <span class="tag">Ready to connect</span>
          </div>
          <p class="text-base leading-[1.55] text-ink-2">Paste a key and DuoTyping checks with that provider. Only the text you check is sent.</p>
        </div>
        <ul class="flex flex-col border-b border-line">
          <li v-for="[initial, name, models] in PROVIDERS" :key="name" class="flex items-center gap-3.5 border-t border-line py-3.5 md:py-4">
            <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E3E7EA] text-[15px] font-bold text-slate" aria-hidden="true">{{ initial }}</span>
            <div class="flex flex-col gap-[3px]">
              <span class="text-[17px] font-semibold">{{ name }}</span>
              <span class="text-sm leading-[1.45] text-ink-3">{{ models }}</span>
            </div>
          </li>
        </ul>
        <div class="flex items-center gap-2.5 text-sm text-ink-2"><Icon name="key" class="size-[18px] text-cyan-deep" />Your key stays in the macOS Keychain. Your provider bills you directly.</div>
      </article>
      <article class="flex flex-col gap-[22px] rounded-3xl border border-edge bg-card p-[22px] md:p-[34px]">
        <div class="flex flex-col gap-2.5">
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 class="fluid font-display font-[650] tracking-[-0.02em] [--hi:27] [--lo:24]">Your own endpoint</h3>
            <span class="tag">Custom</span>
          </div>
          <p class="text-base leading-[1.55] text-ink-2">Add Provider takes any endpoint that speaks the OpenAI API.</p>
        </div>
        <ul class="flex flex-col border-b border-line">
          <li v-for="[name, detail] in CUSTOM" :key="name" class="flex flex-col gap-[3px] border-t border-line py-3.5 md:py-4">
            <span class="text-[17px] font-semibold">{{ name }}</span>
            <span class="text-sm leading-[1.45] text-ink-3">{{ detail }}</span>
          </li>
        </ul>
        <div class="flex items-center gap-2.5 text-sm text-ink-2"><Icon name="lock" class="size-[18px] text-cyan-deep" />Public HTTPS addresses only, checked before every request.</div>
      </article>
    </div>
  </section>
</template>
