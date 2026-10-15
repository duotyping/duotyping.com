<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon, { type IconName } from '../components/Icon.vue'
import BrandMark from '../components/brand/BrandMark.vue'

// Privacy as a demo: pick who checks your writing, and the path redraws to say where your text
// goes and what's kept (duotyping-specs product/api-prd.md; the Privacy Policy says it in full).
type Choice = { id: string; name: string; via?: string; to: string; kept: string }
// OpenAI, Anthropic and any OpenAI-compatible endpoint take the same path, so they're one choice.
const CHOICES: Choice[] = [
  { id: 'duo', name: 'DuoTyping', via: 'DuoTyping’s server', to: 'Claude, by Anthropic', kept: 'Kept, encrypted, to improve DuoTyping. Never logged, never sold.' },
  { id: 'key', name: 'Your own key', to: 'OpenAI, Anthropic or your endpoint', kept: 'Checks go straight from your computer to your provider. DuoTyping keeps none of them.' },
]
const at = ref(0)
const choice = computed(() => CHOICES[at.value]!)

const FACTS: [IconName, string][] = [
  ['lock', 'Passwords and secure fields are never read'],
  ['selection', 'Marks as you type only where you switch them on'],
  ['shield', 'This site sets no cookies'],
]
</script>

<template>
  <!-- ── Privacy: your choice of AI ─────────────────────────────────────────────────── -->
  <section id="privacy" class="mt-[88px] scroll-mt-[-32px] bg-ink text-paper lg:mt-[120px]">
    <div class="wrap flex flex-col gap-8 pt-[72px] pb-[76px] lg:gap-12 lg:pt-[104px] lg:pb-[100px]">
      <div class="flex flex-col gap-3.5 lg:gap-5">
        <div class="eyebrow text-cyan">Privacy</div>
        <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance text-paper [--hi:58] [--lo:35]">
          <del class="text-night-mute decoration-terra decoration-[0.07em]">Our</del> Your choice of AI.
        </h2>
        <p class="fluid text-night-text [--hi:19] [--lo:16.5]">Pick who checks your writing, and see where it goes.</p>
      </div>

      <div class="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
        <div class="flex flex-col gap-3 lg:col-span-4">
          <div class="grid grid-cols-2 gap-2" role="group" aria-label="Who checks your writing">
            <button
              v-for="(c, i) in CHOICES"
              :key="c.id"
              type="button"
              class="flex h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-[15px] font-semibold transition-colors duration-200 ease-out"
              :class="at === i ? 'border-cyan bg-cyan/12 text-paper' : 'border-night-line bg-night-card text-night-text hover:border-night-dash'"
              :aria-pressed="at === i"
              @click="at = i"
            >{{ c.name }}</button>
          </div>
          <p class="text-[13.5px] text-night-mute">Your own key works in the Mac and Windows apps.</p>
        </div>

        <figure class="flex flex-col gap-5 rounded-[22px] border border-night-line bg-night-card/60 p-5 md:p-8 lg:col-span-8">
          <div class="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3" aria-hidden="true">
            <span class="flex items-center gap-2.5 rounded-2xl border border-night-line bg-night-card px-4 py-3.5 text-[15.5px] font-semibold text-paper md:shrink-0">
              <Icon name="selection" class="size-5 text-terra" />Your app
            </span>
            <template v-if="choice.via">
              <span class="self-center text-night-mute md:rotate-0 max-md:rotate-90">→</span>
              <span class="flex items-center gap-2.5 rounded-2xl border border-cyan/60 bg-night-card px-4 py-3.5 text-[15.5px] font-semibold text-paper md:shrink-0">
                <BrandMark tone="ink" class="size-5" />{{ choice.via }}
              </span>
            </template>
            <span class="self-center text-night-mute max-md:rotate-90">→</span>
            <span class="flex items-center gap-2.5 rounded-2xl border-[1.5px] border-dashed border-night-dash px-4 py-3.5 text-[15.5px] font-semibold text-night-text md:shrink-0">
              {{ choice.to }}
            </span>
          </div>
          <figcaption class="flex items-start gap-3 text-[16px] leading-[1.5] text-night-text md:text-[17px]" role="status">
            <Icon :name="choice.via ? 'lock' : 'nothing-kept'" class="mt-0.5 size-[22px] shrink-0 text-cyan" />
            <span><span class="sr-only">With {{ choice.name }}: </span>{{ choice.kept }}</span>
          </figcaption>
        </figure>
      </div>

      <ul class="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-night-line pt-8 md:grid-cols-3">
        <li v-for="[icon, text] in FACTS" :key="text" class="flex items-center gap-3 text-[15.5px] text-night-text">
          <Icon :name="icon" class="size-[22px] shrink-0 text-cyan" />{{ text }}
        </li>
      </ul>
      <a href="/privacy" class="-mt-2 self-start text-[15.5px] font-semibold text-cyan underline underline-offset-4">Read the Privacy Policy</a>
    </div>
  </section>
</template>
