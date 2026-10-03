<script setup lang="ts">
import Icon, { type IconName } from '../components/Icon.vue'
import Popup from '../components/demo/Popup.vue'
import Suggestion from '../components/demo/Suggestion.vue'

const REVIEW: [IconName, string, string][] = [
  ['fixes', 'Fixes and rewrites', 'Spelling, grammar and punctuation fixes, plus a fresh version when the tone is off.'],
  ['lines', 'One sentence, or all of it', 'Accept sentence by sentence, or replace the whole selection with one of up to ten versions.'],
  ['shield', 'Safe while you keep typing', 'If your text changed during the check, DuoTyping asks before writing anything.'],
]

// The account's What syncs list (board 22 and the sync spec): each kind has its own switch, all on.
const SYNCS: [string, string][] = [
  ['Writing profiles', 'Every profile and its custom instructions'],
  ['Default profile', 'Which profile checks start with'],
  ['Appearance', 'Auto, Light or Dark'],
  ['Cloud model choice', 'The provider and model, never the key'],
  ['Shortcuts', 'Between your Macs'],
]

// The Profile tab (board 19): named profiles, each with its own writing context, scope and
// instructions. The figure steps through four of them; each line is [loop class, name, writing
// context, its tone in the app's words, scope, variations, custom instructions]. The scope buttons'
// own loops (loop-sw, loop-ss, loop-sv) follow the scopes listed here.
const PROFILES: [string, string, string, string, 'whole' | 'sentence', number, string][] = [
  ['loop-db', 'Work email', 'Business & finance', 'Professional and outcome-oriented, with moderate formality.', 'whole', 3, 'Keep it friendly, and never longer than my original.'],
  ['loop-dl', 'Team chat', 'Casual & personal', 'Relaxed. Contractions and everyday phrases are left alone.', 'sentence', 1, 'Short and friendly. No sign-off.'],
  ['loop-dc', 'Legal drafts', 'Legal', 'Precise, formal and liability-conscious.', 'sentence', 1, 'Never soften an obligation.'],
  ['loop-dp', 'Support replies', 'Customer support & service', 'Warm and empathetic, with plain language over jargon.', 'whole', 2, 'Apologise once, then fix it.'],
]
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
            <Icon :name="icon" class="size-[26px] text-cyan-deep" />
            <div class="flex flex-col gap-[5px]">
              <h3 class="fluid font-semibold [--hi:19] [--lo:17.5]">{{ title }}</h3>
              <p class="fluid leading-[1.6] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">{{ body }}</p>
            </div>
          </li>
          <li class="flex gap-[18px] border-t border-line py-5">
            <Icon name="keyboard" class="size-[26px] text-cyan-deep" />
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
        <div v-loop class="loop flex items-center justify-center overflow-hidden rounded-[22px] border border-edge bg-stage p-4 md:rounded-[28px] md:p-10">
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
          Make a profile for each kind of writing: work email, team chat, legal drafts. Each has its own writing context, from 17, its own way to accept, and a line of your own, like “keep it short”. Grammar rules stay the same everywhere. Only the tone moves.
        </p>
      </div>
      <div class="lg:col-span-6 lg:row-start-1" aria-hidden="true">
        <div v-loop class="loop flex items-center justify-center overflow-hidden rounded-[22px] border border-edge bg-stage p-4 md:rounded-[28px] md:p-[34px]">
          <div class="font-mac flex w-[318px] max-w-full flex-col gap-4 rounded-xl border border-edge bg-panel px-5 py-[18px] text-left text-ink shadow-[0_26px_60px_rgba(24,33,63,0.18),0_3px_10px_rgba(24,33,63,0.08)] md:w-[560px] md:px-6 md:py-[22px]">
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold">Profile</span>
                <!-- The picker shows each profile in turn; every name shares one cell, so nothing moves. -->
                <span class="inline-flex min-w-0 items-center justify-between gap-2 rounded-md border border-key bg-white px-2 py-1 text-[12.5px]">
                  <span class="grid">
                    <span v-for="([loop, name], i) in PROFILES" :key="name" class="[grid-area:1/1] whitespace-nowrap" :class="[loop, i > 0 && 'opacity-0']">{{ name }}<span v-if="i === 0" class="text-ink-3"> — default</span></span>
                  </span>
                  <Icon name="chevron" class="size-3 text-ink-3" />
                </span>
                <span class="mk-btn-2 max-md:hidden">New…</span>
                <span class="mk-btn-2 ml-auto whitespace-nowrap">Make Default</span>
              </div>
              <p class="text-[11px] text-ink-3">Checks start with the default profile, Work email.</p>
            </div>
            <!-- The labels hold still; only each field's value crossfades to the next profile's. -->
            <div class="flex flex-col gap-3.5">
              <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col gap-1">
                  <span class="text-[11px] font-semibold">Name</span>
                  <span class="grid rounded-md border border-key bg-white px-2 py-1 text-[12.5px]">
                    <span v-for="([loop, name], i) in PROFILES" :key="name" class="truncate [grid-area:1/1]" :class="[loop, i > 0 && 'opacity-0']">{{ name }}</span>
                  </span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-[11px] font-semibold">Writing context</span>
                  <span class="flex items-center justify-between gap-1 rounded-md border border-key bg-white px-2 py-1 text-[12.5px]">
                    <span class="grid min-w-0">
                      <span v-for="([loop, name, context], i) in PROFILES" :key="name" class="truncate [grid-area:1/1]" :class="[loop, i > 0 && 'opacity-0']">{{ context }}</span>
                    </span>
                    <Icon name="chevron" class="size-3 shrink-0 text-ink-3" />
                  </span>
                </div>
              </div>
              <p class="grid rounded-[7px] bg-[#F1F3F7] px-[11px] py-2 text-xs leading-[1.45] text-ink-2">
                <span v-for="([loop, name, , tone], i) in PROFILES" :key="name" class="[grid-area:1/1]" :class="[loop, i > 0 && 'opacity-0']">“{{ tone }}”</span>
              </p>
              <div class="flex flex-col gap-1.5">
                <span class="text-[11px] font-semibold">What one accept replaces</span>
                <!-- Work email and Support replies take the whole selection; Team chat and Legal drafts go sentence by sentence. -->
                <div class="grid grid-cols-2 gap-2">
                  <span class="loop-sw rounded-[7px] border border-accent bg-tint px-2.5 py-1.5 text-xs font-semibold">Whole selection</span>
                  <span class="loop-ss rounded-[7px] border border-edge bg-card px-2.5 py-1.5 text-xs font-semibold">Sentence by sentence</span>
                </div>
                <div class="flex items-center justify-between pt-1">
                  <span class="text-[11px] font-semibold">Variations</span>
                  <div class="loop-sv flex items-center overflow-hidden rounded-[7px] border border-key">
                    <span class="flex h-6 w-7 items-center justify-center bg-chip"><Icon name="minus" class="size-3" /></span>
                    <span class="grid w-8 text-center text-[12.5px] font-semibold">
                      <span v-for="([loop, name, , , , variations], i) in PROFILES" :key="name" class="[grid-area:1/1]" :class="[loop, i > 0 && 'opacity-0']">{{ variations }}</span>
                    </span>
                    <span class="flex h-6 w-7 items-center justify-center bg-chip"><Icon name="plus" class="size-3" /></span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11px] font-semibold">Custom instructions</span>
                <span class="grid min-h-[calc(2.9em+14px)] rounded-[7px] border border-key bg-white px-2.5 py-1.5 text-[12.5px] leading-[1.45]">
                  <span v-for="([loop, name, , , , , instructions], i) in PROFILES" :key="name" class="[grid-area:1/1]" :class="[loop, i > 0 && 'opacity-0']">{{ instructions }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-[22px] pt-14 lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:pt-0">
      <div class="flex flex-col gap-[22px] lg:col-span-5 lg:gap-5">
        <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:40] [--lo:30]">Your profiles, on every Mac.</h2>
        <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:18.5] [--lo:16.5]">
          Sign in, and your writing profiles and settings follow you from Mac to Mac. Each kind has its own switch. An account is optional, and it carries settings, never writing: keys, models and anything you check stay on the Mac.
        </p>
      </div>
      <div class="lg:col-span-6 lg:col-start-7" aria-hidden="true">
        <div class="flex items-center justify-center overflow-hidden rounded-[22px] border border-edge bg-stage p-4 md:rounded-[28px] md:p-[34px]">
          <div class="font-mac flex w-[318px] max-w-full flex-col gap-3.5 rounded-xl border border-edge bg-panel px-5 py-[18px] text-left text-ink shadow-[0_26px_60px_rgba(24,33,63,0.18),0_3px_10px_rgba(24,33,63,0.08)] md:w-[540px] md:px-6 md:py-[22px]">
            <div class="flex items-center gap-3">
              <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-[15px] font-bold text-white">Y</span>
              <div class="flex min-w-0 grow flex-col gap-0.5">
                <span class="text-[13.5px] font-semibold">you@example.com</span>
                <span class="flex items-center gap-1.5 text-[11.5px] text-ink-2"><span class="size-1.5 shrink-0 rounded-full bg-[#2F7D3A]" />Signed in with Apple · Synced 2 min ago</span>
              </div>
              <span class="mk-btn-2 max-md:hidden">Sync Now</span>
            </div>
            <div class="flex flex-col">
              <div class="mb-1 text-xs font-semibold">What syncs</div>
              <div class="mb-2 text-[11px] leading-[1.4] text-ink-3">Encrypted in transit and at rest. Turn a row off to keep it on this Mac.</div>
              <div class="flex flex-col rounded-lg border border-edge bg-card">
                <div v-for="([name, detail], i) in SYNCS" :key="name" class="flex items-center gap-3 px-3 py-2" :class="i > 0 && 'border-t border-line'">
                  <div class="flex grow flex-col">
                    <span class="text-[12.5px] font-medium">{{ name }}</span>
                    <span class="text-[11px] text-ink-3">{{ detail }}</span>
                  </div>
                  <!-- A switch, on -->
                  <span class="flex h-[18px] w-[30px] shrink-0 items-center justify-end rounded-full bg-accent p-0.5"><span class="size-3.5 rounded-full bg-white shadow-[0_1px_2px_rgba(24,33,63,0.3)]" /></span>
                </div>
              </div>
            </div>
            <div class="rounded-[7px] bg-[#F1F3F7] px-[11px] py-[9px] text-[11px] leading-[1.45] text-ink-2">
              <strong class="font-semibold text-ink">Stays on this Mac:</strong> API keys, installed models, Accessibility access. Nothing you check is stored, so none of it can sync.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
