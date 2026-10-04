<script setup lang="ts">
import Icon from '../components/Icon.vue'
import CountBadge from '../components/demo/CountBadge.vue'
import InlineRewriteCard from '../components/demo/InlineRewriteCard.vue'
import NoteDemo from '../components/demo/NoteDemo.vue'
import RewritePill from '../components/demo/RewritePill.vue'
import Suggestion from '../components/demo/Suggestion.vue'
</script>

<template>
  <!-- ── How it works ───────────────────────────────────────────────────────────────── -->
  <section id="how" class="wrap flex scroll-mt-[-48px] flex-col gap-7 pt-[88px] lg:scroll-mt-[-68px] lg:gap-[52px] lg:pt-[116px]">
    <div class="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div class="flex flex-col gap-3.5 lg:gap-[18px]">
        <div class="eyebrow">How it works</div>
        <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:61] [--lo:37]">Select. Press. Accept.</h2>
      </div>
      <p class="fluid max-w-[440px] leading-[1.55] text-pretty text-ink-2 [--hi:19] [--lo:17]">
        There’s no new place to write. DuoTyping works on top of the app you’re already in<span class="max-lg:hidden">, and gets out of the way when you’re done</span>.
      </p>
    </div>

    <ol class="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
      <li class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
        <div class="flex h-[196px] items-center justify-center border-b border-edge bg-stage md:h-[214px]" aria-hidden="true">
          <div class="font-mac w-[290px] rounded-[10px] bg-white px-[18px] py-4 text-[13px] leading-[1.62] text-mac-ink shadow-[0_12px_28px_rgba(24,33,63,0.12)] md:w-[300px] md:text-[13.5px]">
            Thanks for the quick reply. <span class="bg-select">I have send the revised contract to legal yesterday.</span> Let me know if anything is missing.
          </div>
        </div>
        <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
          <span class="flex size-[30px] items-center justify-center rounded-full border-[1.5px] border-accent font-mono text-[13px] font-semibold text-accent" aria-hidden="true">1</span>
          <h3 class="fluid mt-1.5 font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">Select what you wrote</h3>
          <p class="text-[16.5px] leading-[1.55] text-pretty text-ink-2">A sentence, a paragraph or a whole email, wherever you’re writing it.</p>
        </div>
      </li>
      <li class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
        <div class="flex h-40 items-center justify-center border-b border-edge bg-stage md:h-[214px]" aria-hidden="true">
          <div class="flex items-center gap-2 md:gap-2.5">
            <span
              v-for="k in ['⌃', '⌥', '⌘', 'D']"
              :key="k"
              :class="k === 'D' && 'border-[#0A0F22] !bg-ink font-semibold text-cyan'"
              class="keycap h-14 min-w-14 rounded-xl px-[13px] text-[23px] md:h-[62px] md:min-w-[62px] md:rounded-[13px] md:px-[15px] md:text-[26px]"
            >{{ k }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
          <span class="flex size-[30px] items-center justify-center rounded-full border-[1.5px] border-accent font-mono text-[13px] font-semibold text-accent" aria-hidden="true">2</span>
          <h3 class="fluid mt-1.5 font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">Press ⌃⌥⌘D</h3>
          <p class="text-[16.5px] leading-[1.55] text-pretty text-ink-2">Or any shortcut you like. DuoTyping reads the text you selected and nothing else.</p>
        </div>
      </li>
      <li class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
        <div class="flex h-[196px] items-center justify-center border-b border-edge bg-stage md:h-[214px]" aria-hidden="true">
          <div class="font-mac w-[300px] rounded-lg shadow-[0_12px_28px_rgba(24,33,63,0.14)]">
            <Suggestion label="Sentence 1 of 2" focused actions="accept" original="I have send the revised contract to legal yesterday." size="text-[13px]" original-size="text-[11px]">
              I <span class="font-semibold text-cyan-deep">sent</span> the revised contract to legal yesterday.
            </Suggestion>
          </div>
        </div>
        <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
          <span class="flex size-[30px] items-center justify-center rounded-full border-[1.5px] border-accent font-mono text-[13px] font-semibold text-accent" aria-hidden="true">3</span>
          <h3 class="fluid mt-1.5 font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">Accept what you like</h3>
          <p class="text-[16.5px] leading-[1.55] text-pretty text-ink-2">Return takes a suggestion, Delete skips it. The text changes right where it was.</p>
        </div>
      </li>
    </ol>

    <div class="mt-3 flex flex-col gap-4 lg:mt-5 lg:gap-6">
      <div class="flex flex-col gap-2.5">
        <h3 class="fluid font-display leading-[1.1] font-bold tracking-[-0.02em] [--hi:30] [--lo:24]">While you type</h3>
        <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:17] [--lo:15.5]">In Mail, Messages, Slack, Teams and WhatsApp, you don’t even need the shortcut.</p>
      </div>
      <div class="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
        <article class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
          <div v-loop class="loop flex h-[250px] items-center justify-center border-b border-edge bg-stage md:h-[380px]" aria-hidden="true">
            <div class="flex items-start gap-2">
              <div class="font-mac w-[262px] rounded-[10px] border border-[#D5D9E2] bg-white px-4 py-3.5 text-[13px] leading-[1.75] text-mac-ink shadow-[0_12px_28px_rgba(24,33,63,0.10)] md:w-[440px] md:text-sm">
                Hi team, just to confirm, I <span class="wavy loop-m1">have send</span> the deck to the client and they <span class="wavy loop-m2">will be review</span> it tomorrow.
                <span class="wavy loop-m3 [--mark:var(--color-slate)]">Please revert back to me if any change is required.</span>
              </div>
              <CountBadge class="loop-badge">
                <span class="inline-grid justify-items-center">
                  <span class="loop-n1 opacity-0 [grid-area:1/1]">1</span><span class="loop-n2 opacity-0 [grid-area:1/1]">2</span><span class="loop-n3 [grid-area:1/1]">3</span>
                </span>
              </CountBadge>
            </div>
          </div>
          <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
            <h4 class="fluid font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">Marks as you type</h4>
            <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">
              Mistakes get a wavy underline while you write (clay for grammar and spelling, slate for tone), and a badge beside the box counts them. Click it to go through them one by one.
            </p>
          </div>
        </article>
        <article class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
          <div v-loop class="loop flex h-[390px] items-center justify-center border-b border-edge bg-stage md:h-[380px]" aria-hidden="true">
            <div class="flex flex-col items-start gap-3">
              <div class="flex items-center gap-2.5">
                <!-- Both sentences share one cell, so the pill never moves when one becomes the other. -->
                <p class="font-mac grid text-[13px] text-mac-ink md:text-sm">
                  <span class="[grid-area:1/1]"><span class="sel-full loop-rsel">Please revert back to me if any change is required.</span></span>
                  <span class="loop-rnew opacity-0 [grid-area:1/1]">Let me know if anything needs changing.</span>
                </p>
                <RewritePill class="loop-rpill" />
              </div>
              <InlineRewriteCard
                original="Please revert back to me if any change is required."
                :words="10"
                :options="['Let me know if anything needs changing.', 'Happy to adjust anything. Just say the word.']"
                class="loop-rpop w-[300px] md:w-[440px]"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
            <h4 class="fluid font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">Rewrite a selection</h4>
            <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">
              Select a sentence and Rewrite appears beside it, with other ways to say the same thing. Pick one, or keep yours.
            </p>
          </div>
        </article>
      </div>
    </div>

    <div class="mt-3 flex flex-col gap-4 lg:mt-5 lg:gap-6">
      <div class="flex flex-col gap-2.5">
        <h3 class="fluid font-display leading-[1.1] font-bold tracking-[-0.02em] [--hi:30] [--lo:24]">Bring your own key</h3>
        <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:17] [--lo:15.5]">
          The first time you open DuoTyping, connect what does the checking: OpenAI or Anthropic with your own key, or any OpenAI-compatible endpoint.
        </p>
      </div>
      <article class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card lg:grid lg:grid-cols-12">
          <div class="flex h-[300px] items-center justify-center bg-stage max-lg:border-b max-lg:border-edge lg:order-2 lg:col-span-7 lg:border-l lg:border-edge" aria-hidden="true">
            <div class="font-mac flex w-[310px] flex-col gap-2 text-ink md:w-[460px]">
              <div class="flex items-center gap-2.5 rounded-[10px] border border-edge bg-panel px-3.5 py-2.5">
                <span class="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#E3E7EA] text-xs font-bold text-slate">O</span>
                <span class="text-[13px] font-semibold">OpenAI</span>
                <span class="rounded border border-[#A9B7C0] px-1.5 text-[10px] font-semibold text-slate">Cloud</span>
                <span class="grow" />
                <span class="inline-flex items-center gap-[5px] text-[11px] font-semibold whitespace-nowrap text-[#2F7D3A]">
                  <span class="inline-block size-1.5 rounded-full bg-[#2F7D3A]" />Connected
                </span>
              </div>
              <div class="flex flex-col gap-[9px] rounded-[10px] border border-accent bg-tint px-3.5 py-2.5">
                <div class="flex items-center gap-2.5">
                  <span class="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#E3E7EA] text-xs font-bold text-slate">A</span>
                  <span class="text-[13px] font-semibold">Anthropic</span>
                  <span class="rounded border border-[#A9B7C0] px-1.5 text-[10px] font-semibold text-slate">Cloud</span>
                </div>
                <span class="text-[11px] text-ink-2">API key</span>
                <span class="-mt-1 rounded-md border border-key bg-white px-[9px] py-1.5 font-mono text-xs leading-normal text-ink">••••••••••••••••••••••••••••••</span>
                <div class="flex items-center gap-2">
                  <span class="mk-btn">Save</span>
                  <span class="flex items-center gap-1.5 text-[11px] text-ink-2"><Icon name="key" :stroke="1.8" class="size-[13px] text-cyan-deep" />Stored in your Mac’s Keychain</span>
                </div>
              </div>
              <div class="flex items-center gap-2.5 rounded-[10px] border border-edge bg-panel px-3.5 py-2.5">
                <span class="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#E3E7EA] text-xs font-bold text-slate">+</span>
                <span class="text-[13px] font-semibold">Your own endpoint</span>
                <span class="rounded border border-[#A9B7C0] px-1.5 text-[10px] font-semibold text-slate">Custom</span>
                <span class="grow" />
                <span class="mk-btn-2">Add</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center gap-2.5 p-6 lg:order-1 lg:col-span-5 lg:p-10">
            <h4 class="fluid font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">A cloud model, with your own key</h4>
            <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">
              Paste a key from OpenAI or Anthropic, or add any OpenAI-compatible endpoint. The key stays in your Mac’s Keychain, and your provider bills you directly.
            </p>
          </div>
      </article>
    </div>

    <article class="mt-3 flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card lg:mt-5 lg:grid lg:grid-cols-12">
      <div v-loop class="loop flex items-center justify-center bg-stage px-4 py-6 max-lg:border-b max-lg:border-edge lg:order-2 lg:col-span-7 lg:border-l lg:border-edge md:h-[492px] md:p-8" aria-hidden="true">
        <NoteDemo class="w-[318px] max-w-full md:w-[480px]" />
      </div>
      <div class="flex flex-col justify-center gap-2.5 p-6 lg:order-1 lg:col-span-5 lg:p-10">
        <Icon name="note" class="size-7 text-cyan-deep" />
        <h4 class="fluid mt-1 font-semibold tracking-[-0.01em] [--hi:26] [--lo:21]">Nothing selected? New Note.</h4>
        <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">
          New Note opens instead: type or paste, check, then copy the result anywhere. It’s also the way in for apps that won’t share their text.
        </p>
      </div>
    </article>
  </section>
</template>
