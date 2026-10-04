<script setup lang="ts">
import { useId } from 'vue'
import Icon, { type IconName } from '../components/Icon.vue'
import BrandMark from '../components/brand/BrandMark.vue'

const FACTS: [IconName, string, string][] = [
  ['lock', 'Never your passwords', 'Password fields and other secure text are skipped entirely: never read, never marked.'],
  ['shield', 'Signed updates', 'Every update is signed, and checked against that signature before it installs.'],
  ['nothing-kept', 'Nothing kept', 'Neither part stores what you write, not even for a moment longer than the check.'],
  ['key', 'Keys in your Keychain', 'Cloud API keys are stored in the macOS Keychain and never read back into the app.'],
  ['verified', 'Checked destinations', 'A provider you add yourself must be a public HTTPS address, checked before every request.'],
  ['selection', 'Only your selection', 'Your provider gets just the text you check, billed to your own account.'],
]

const arrow = useId()
// The privacy diagram's loop: where each dot sets off, its colour, its keyframes' number.
const PACKETS: [number, string, number][] = [[262, '#D7784F', 1], [542, '#D7784F', 2], [598, '#3EE6FF', 3], [318, '#3EE6FF', 4]]
</script>

<template>
  <!-- ── Privacy ────────────────────────────────────────────────────────────────────── -->
  <section id="privacy" class="@container mt-[88px] scroll-mt-[-32px] bg-ink text-paper lg:mt-[132px] lg:scroll-mt-[-68px]">
    <div class="wrap flex flex-col gap-7 pt-[72px] pb-[76px] lg:gap-16 lg:pt-[116px] lg:pb-28">
      <div class="flex flex-col gap-7 lg:gap-6">
        <div class="flex flex-col gap-3.5 lg:gap-6">
          <div class="eyebrow text-cyan">Privacy</div>
          <h2 class="fluid max-w-[900px] font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance text-paper [--hi:61] [--lo:35]">
            Your provider, your key.<br />Nothing kept in between.
          </h2>
        </div>
        <p class="fluid max-w-[760px] leading-[1.55] text-pretty text-night-text [--hi:20] [--lo:17]">
          DuoTyping is built in two parts, on purpose. The app you see only goes online to check for updates. A separate engine holds your key, and sends the text you check to the provider you connected, and nowhere else.
        </p>
      </div>

      <!-- Wide: the whole picture at once, 1200 × 400, scaled to the column below 1440 -->
      <figure v-loop class="loop diagram-fit max-lg:hidden">
        <figcaption class="sr-only">
          On your Mac, the app you’re writing in shares only the text you select with DuoTyping, which passes it to the DuoTyping engine. The engine sends it to the cloud provider you connected, on your own key, and passes the suggestions back.
        </figcaption>
        <div class="canvas" aria-hidden="true">
          <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none" class="absolute top-0 left-0">
            <defs>
              <marker :id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M1 1 9 5 1 9" stroke="#7F8BB5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              </marker>
            </defs>
            <rect x="1" y="1" width="858" height="398" rx="26" stroke="#5A6873" stroke-width="1.5" stroke-dasharray="7 7" />
            <path d="M262 216H318" stroke="#7F8BB5" stroke-width="1.8" :marker-start="`url(#${arrow})`" :marker-end="`url(#${arrow})`" />
            <path d="M542 216H598" stroke="#7F8BB5" stroke-width="1.8" :marker-start="`url(#${arrow})`" :marker-end="`url(#${arrow})`" />
            <!-- The provider gets your text and answers, so both ways. -->
            <path class="loop-pv" d="M830 216H942" stroke="#3EE6FF" stroke-width="1.6" stroke-dasharray="5 6" :marker-start="`url(#${arrow})`" :marker-end="`url(#${arrow})`" />
            <!-- What travels between the boxes: your text in terracotta, the suggestions in cyan. -->
            <g v-for="[x, color, n] in PACKETS" :key="n" class="opacity-0" :class="`loop-q${n}`">
              <circle :cx="x" cy="216" r="11" :fill="color" opacity="0.26" />
              <circle :cx="x" cy="216" r="5.5" :fill="color" />
            </g>
          </svg>
          <div class="absolute top-[26px] left-[30px] flex items-center gap-[9px] font-mono text-[12.5px] font-medium tracking-[0.12em] text-night-text uppercase">
            <Icon name="mac" class="size-[18px]" />Your Mac
          </div>
          <div class="absolute top-[340px] left-[30px] flex items-center gap-2.5 font-mono text-[12.5px] font-medium tracking-[0.12em] whitespace-nowrap text-cyan uppercase">
            <span class="size-[7px] shrink-0 rounded-full bg-cyan shadow-[0_0_0_3px_rgb(62_230_255/0.2)]" />Your text goes only to your provider
          </div>
          <div class="loop-app absolute top-[136px] left-10 flex h-40 w-[222px] flex-col justify-center gap-1.5 rounded-2xl border border-night-line bg-night-card p-5">
            <span class="text-[17.5px] font-semibold text-paper">The app you’re writing in</span>
            <span class="text-[14.5px] leading-[1.4] text-night-mute">Shares only the text you select</span>
          </div>
          <div class="loop-duo absolute top-[136px] left-80 flex h-40 w-[222px] flex-col justify-center gap-1.5 rounded-2xl border border-night-line bg-night-card p-5">
            <span class="flex items-center gap-2.5 text-[17.5px] font-semibold text-paper"><BrandMark tone="ink" class="size-[26px]" />DuoTyping</span>
            <span class="text-[14.5px] leading-[1.4] text-night-mute">Only goes online for updates</span>
          </div>
          <div class="loop-engine absolute top-[136px] left-[600px] flex h-40 w-[230px] flex-col justify-center gap-1.5 rounded-2xl border border-night-line bg-night-card p-5">
            <span class="text-[17.5px] font-semibold text-paper">DuoTyping engine</span>
            <span class="text-[14.5px] leading-[1.4] text-night-mute">Holds your key, talks to your provider</span>
          </div>
          <div class="loop-prov absolute top-[148px] left-[944px] flex h-[136px] w-64 flex-col justify-center gap-1.5 rounded-2xl border-[1.5px] border-dashed border-night-dash p-5">
            <span class="text-[17.5px] font-semibold text-night-text">Your cloud provider</span>
            <span class="text-[14.5px] leading-[1.4] text-night-mute">Gets only the text you check</span>
          </div>
        </div>
      </figure>

      <!-- Narrow: the same path, top to bottom -->
      <figure class="flex max-w-[560px] flex-col gap-7 lg:hidden">
        <figcaption class="sr-only">How your text moves through DuoTyping</figcaption>
        <div class="flex flex-col rounded-[20px] border-[1.5px] border-dashed border-night-dash px-3.5 pt-4 pb-3.5">
          <div class="mb-3 flex items-center gap-2 font-mono text-[11.5px] font-medium tracking-[0.12em] text-night-text uppercase">
            <Icon name="mac" class="size-4" />Your Mac
          </div>
          <div class="flex flex-col gap-1 rounded-[14px] border border-night-line bg-night-card px-[18px] py-4">
            <span class="text-[16.5px] font-semibold text-paper">The app you’re writing in</span>
            <span class="text-sm leading-[1.4] text-night-mute">Shares only the text you select</span>
          </div>
          <div class="flex h-10 items-center gap-2.5 pl-[22px]" aria-hidden="true">
            <svg width="14" height="40" viewBox="0 0 14 40" fill="none"><path d="M7 3V36" stroke="#7F8BB5" stroke-width="1.7" /><path d="M2.5 31 7 36l4.5-5" stroke="#7F8BB5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="font-mono text-[11px] tracking-[0.1em] text-night-mute uppercase">Selection</span>
          </div>
          <div class="flex flex-col gap-1 rounded-[14px] border border-night-line bg-night-card px-[18px] py-4">
            <span class="flex items-center gap-[9px] text-[16.5px] font-semibold text-paper"><BrandMark tone="ink" class="size-[22px]" />DuoTyping</span>
            <span class="text-sm leading-[1.4] text-night-mute">Only goes online for updates</span>
          </div>
          <div class="flex h-10 items-center gap-2.5 pl-[22px]" aria-hidden="true">
            <svg width="14" height="40" viewBox="0 0 14 40" fill="none"><path d="M7 3V36" stroke="#7F8BB5" stroke-width="1.7" /><path d="M2.5 31 7 36l4.5-5" stroke="#7F8BB5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="font-mono text-[11px] tracking-[0.1em] text-night-mute uppercase">Text</span>
          </div>
          <div class="flex flex-col gap-1 rounded-[14px] border border-night-line bg-night-card px-[18px] py-4">
            <span class="text-[16.5px] font-semibold text-paper">DuoTyping engine</span>
            <span class="text-sm leading-[1.4] text-night-mute">Holds your key, talks to your provider</span>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex h-10 items-center gap-2.5 pl-[22px]">
            <svg width="14" height="40" viewBox="0 0 14 40" fill="none" aria-hidden="true"><path d="M7 3V36" stroke="#7F8BB5" stroke-width="1.7" stroke-dasharray="4 5" /><path d="M2.5 31 7 36l4.5-5" stroke="#7F8BB5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="font-mono text-[11px] tracking-[0.1em] text-night-mute uppercase">Only goes online for</span>
          </div>
          <div class="flex flex-col gap-1 rounded-[14px] border-[1.5px] border-dashed border-night-dash px-[18px] py-4">
            <span class="text-[16.5px] font-semibold text-night-text">Your cloud provider</span>
            <span class="text-sm leading-[1.4] text-night-mute">Gets only the text you check, on your key</span>
          </div>
        </div>
      </figure>

      <div class="grid grid-cols-1 gap-y-[34px] max-lg:mt-4 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
        <div v-for="[icon, title, body] in FACTS" :key="title" class="flex gap-4">
          <Icon :name="icon" class="size-[26px] text-cyan" />
          <div class="flex flex-col gap-1.5">
            <h3 class="text-[18.5px] font-semibold text-paper">{{ title }}</h3>
            <p class="fluid leading-[1.55] text-pretty text-night-text [--hi:15.5] [--lo:15]">{{ body }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
