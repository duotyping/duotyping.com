<script setup lang="ts">
import Icon, { type IconName } from '../components/Icon.vue'
import Popup from '../components/demo/Popup.vue'
import Suggestion from '../components/demo/Suggestion.vue'

const REVIEW: [IconName, string, string][] = [
  ['fixes', 'Fixes and rewrites', 'Spelling, grammar and punctuation fixes, plus a fresh version when the tone is off.'],
  ['lines', 'One sentence, or all of it', 'Accept sentence by sentence, or replace the whole selection with one of up to ten versions.'],
  ['shield', 'Safe while you keep typing', 'If your text changed during the check, DuoTyping asks before writing anything.'],
]

const PROFILES = ['Legal', 'Medical/healthcare', 'Technology/engineering', 'Business/finance', 'Academic/research', 'Customer support/service', 'Casual/personal', 'Marketing/creative']
// The panel cycles through four of them, in this order: the chip's loop, its line's loop, and
// the tone the app gives that profile (Shared/DomainProfile.swift), in plain words.
const CYCLE: Record<string, [string, string, string]> = {
  'Business/finance': ['loop-pb', 'loop-db', 'professional and outcome-oriented, with moderate formality.'],
  Legal: ['loop-pl', 'loop-dl', 'precise, formal and liability-conscious.'],
  'Customer support/service': ['loop-pc', 'loop-dc', 'warm and empathetic, with plain language over jargon.'],
  'Casual/personal': ['loop-pp', 'loop-dp', 'relaxed; contractions and colloquialisms are fine.'],
}
</script>

<template>
  <!-- ── You stay the author ────────────────────────────────────────────────────────── -->
  <section id="review" class="wrap flex scroll-mt-[-48px] flex-col pt-[88px] lg:scroll-mt-[-68px] lg:gap-[88px] lg:pt-[116px]">
    <!-- On a phone the popup sits between the intro and the list, so the wrapper that keeps
         them together on desktop dissolves (contents) and each takes its place by order. -->
    <div class="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center lg:gap-x-6">
      <div class="contents lg:col-span-5 lg:flex lg:flex-col lg:gap-6">
        <div class="order-1 flex flex-col gap-7 lg:order-none lg:gap-6">
          <div class="flex flex-col gap-3.5 lg:gap-6">
            <div class="eyebrow">You stay the author</div>
            <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:51] [--lo:37]">See every change before it’s made.</h2>
          </div>
          <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:19] [--lo:17]">Changed words are marked, your original sits right underneath, and nothing is written until you accept it.</p>
        </div>
        <ul class="order-3 flex flex-col lg:order-none">
          <li v-for="[icon, title, body] in REVIEW" :key="title" class="flex gap-[18px] border-t border-line py-5">
            <Icon :name="icon" class="size-[26px] text-clay" />
            <div class="flex flex-col gap-[5px]">
              <h3 class="fluid font-semibold [--hi:19] [--lo:17.5]">{{ title }}</h3>
              <p class="fluid leading-[1.6] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">{{ body }}</p>
            </div>
          </li>
          <li class="flex gap-[18px] border-t border-line py-5">
            <Icon name="keyboard" class="size-[26px] text-clay" />
            <div class="flex flex-col gap-[5px]">
              <h3 class="fluid font-semibold [--hi:19] [--lo:17.5]">All from the keyboard</h3>
              <p class="fluid leading-[1.6] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">
                <kbd class="kbd-inline">↑</kbd> <kbd class="kbd-inline">↓</kbd> to move, <kbd class="kbd-inline">return</kbd> to accept,
                <kbd class="kbd-inline">delete</kbd> to skip, <kbd class="kbd-inline">esc</kbd> to close.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="order-2 lg:order-none lg:col-span-6 lg:col-start-7" aria-hidden="true">
        <div v-loop class="loop flex items-center justify-center overflow-hidden rounded-[22px] bg-desk p-4 md:rounded-[28px] md:p-10">
          <Popup
            scope="Whole selection"
            original="Regarding to your email, we are not able to confirm the delivery date until the supplier will give us the update. Sorry for any inconvenient."
            class="w-[318px] max-w-full md:w-[600px]"
          >
            <template #count>
              <span class="inline-grid">
                <span v-for="n in [2, 3]" :key="n" class="[grid-area:1/1]" :class="n === 2 ? 'loop-wa opacity-0' : 'loop-wb'">{{ n }} proposals<span class="max-md:hidden"> · Business/finance</span></span>
              </span>
            </template>
            <Suggestion label="Proposal 1 of 3" focused actions="replace" class="loop-w1">
              Following up on your email: we can’t confirm a delivery date until our supplier updates us. Apologies for the inconvenience.
            </Suggestion>
            <Suggestion label="Proposal 2 of 3" class="loop-w2">
              Thanks for your email. We’re unable to confirm a delivery date until we hear back from our supplier. Apologies for the delay.
            </Suggestion>
            <Suggestion label="Proposal 3 of 3" cloud="Anthropic · your key" class="loop-w3 max-md:hidden">
              In response to your email, we cannot confirm a delivery date until the supplier provides an update. We apologise for the inconvenience.
            </Suggestion>
            <template #note>Close to decline<span class="max-md:hidden">, and nothing is written</span>.</template>
          </Popup>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-[22px] pt-14 lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:pt-0">
      <div class="flex flex-col gap-[22px] lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:gap-5">
        <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:40] [--lo:30]">Tuned to how you write.</h2>
        <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:18.5] [--lo:16.5]">
          Pick one of 17 writing profiles and the tone follows: precise for legal, warm for support, relaxed for personal notes. Add a line of your own, like “keep it short”. Grammar rules stay the same everywhere. Only the tone moves.
        </p>
      </div>
      <div class="lg:col-span-6 lg:row-start-1" aria-hidden="true">
        <div v-loop class="loop flex items-center justify-center overflow-hidden rounded-[22px] bg-stage p-4 md:rounded-[28px] md:p-[34px]">
          <div class="font-mac flex w-[318px] max-w-full flex-col gap-4 rounded-xl border border-edge bg-panel px-6 py-[22px] text-left text-ink shadow-[0_26px_60px_rgba(74,45,30,0.18),0_3px_10px_rgba(74,45,30,0.08)] md:w-[560px]">
            <div>
              <div class="text-[13.5px] font-bold">Writing profile</div>
              <div class="mt-[3px] text-xs text-ink-2">Changes the tone. Grammar rules stay the same.</div>
            </div>
            <div class="flex flex-wrap gap-[7px]">
              <span
                v-for="p in PROFILES"
                :key="p"
                class="rounded-[7px] border px-[11px] py-[7px] text-xs md:text-[12.5px]"
                :class="[p === 'Business/finance' ? 'border-clay bg-tint font-semibold' : 'border-edge bg-card font-medium', CYCLE[p]?.[0]]"
              >
                <!-- A bold copy holds the chip at its selected width, so nothing moves as the weight changes. -->
                <span v-if="CYCLE[p]" class="inline-grid text-center"><span class="[grid-area:1/1]">{{ p }}</span><span class="invisible font-semibold [grid-area:1/1]">{{ p }}</span></span>
                <template v-else>{{ p }}</template>
              </span>
              <span class="rounded-[7px] border border-dashed border-pill px-[11px] py-[7px] text-xs font-medium text-ink-2 md:text-[12.5px]">9 more</span>
            </div>
            <p class="grid rounded-[7px] bg-[#F2EFE4] px-[11px] py-[9px] text-xs leading-[1.45] text-ink-2">
              <span v-for="([, line, tone], name, i) in CYCLE" :key="name" class="[grid-area:1/1]" :class="[line, i > 0 && 'opacity-0']">
                <strong class="font-bold text-ink">{{ name }}</strong>: {{ tone }}
              </span>
            </p>
            <div class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold">Custom instructions</span>
              <div class="min-h-[calc(2.9em+18px)] rounded-[7px] border border-key bg-white px-2.5 py-2 text-[13px] leading-[1.45]">Keep it friendly, and never longer than my original.</div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold">Versions to suggest</span>
              <div class="flex items-center overflow-hidden rounded-[7px] border border-key">
                <span class="flex h-7 w-[30px] items-center justify-center bg-chip"><Icon name="minus" class="size-3.5" /></span>
                <span class="w-[34px] text-center text-[13px] font-semibold">3</span>
                <span class="flex h-7 w-[30px] items-center justify-center bg-chip"><Icon name="plus" class="size-3.5" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
