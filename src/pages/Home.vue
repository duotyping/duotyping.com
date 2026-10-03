<script setup lang="ts">
import { useId } from 'vue'
import AppIcon from '../components/AppIcon.vue'
import BrandMark from '../components/BrandMark.vue'
import HeroDemo from '../components/HeroDemo.vue'
import HeroDemoPhone from '../components/HeroDemoPhone.vue'
import HeroHeadline from '../components/HeroHeadline.vue'
import Icon, { type IconName } from '../components/Icon.vue'
import MarkPaths from '../components/MarkPaths.vue'
import ShareActions from '../components/ShareActions.vue'
import CountBadge from '../components/mock/CountBadge.vue'
import Popup from '../components/mock/Popup.vue'
import RewritePill from '../components/mock/RewritePill.vue'
import Suggestion from '../components/mock/Suggestion.vue'
import { usePageHead } from '../head'
import { FEEDBACK_URL, SITE_URL, release } from '../site'

const TITLE = 'DuoTyping — the private writing assistant for Mac'
const DESCRIPTION =
  'DuoTyping checks grammar and tone in the apps you already write in, and changes nothing until you accept. It runs on your Mac by default. Free, no account.'

const PILLARS: [IconName, string, string][] = [
  ['undo', 'Nothing changes until you accept', 'Every suggestion waits for your yes. If the text moved while DuoTyping was checking, it asks again instead of guessing.'],
  ['mac', 'Your words stay on your Mac', 'Local models check your writing right on Apple silicon. DuoTyping never stores what you write.'],
  ['no-account', 'Free, with no account', 'No sign-up, no trial, no tracking. A cloud model is optional, and it runs on your own key.'],
]

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

const FACTS: [IconName, string, string][] = [
  ['no-account', 'No account', 'There’s nothing to sign up for, and nothing to sign in to.'],
  ['no-tracking', 'No tracking', 'No analytics, no telemetry and no crash reporter, in the app or the engine.'],
  ['nothing-kept', 'Nothing kept', 'Neither part stores what you write, not even for a moment longer than the check.'],
  ['key', 'Keys in your Keychain', 'Cloud API keys are stored in the macOS Keychain and never read back into the app.'],
  ['verified', 'Verified models', 'Every model download is checked against a signed catalog before it’s used.'],
  ['selection', 'Only your selection', 'A cloud model gets just the text you selected, billed to your own account.'],
]

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

// Rendered here and handed to search engines as FAQPage, from the one list.
const FAQ = [
  ['Is DuoTyping really free?', 'Yes. There’s no trial, no account and nothing to unlock. If you connect a cloud model, your provider bills you directly for what you use.'],
  ['Does my writing leave my Mac?', 'Not unless you connect a cloud model. With a local model, the check runs on your Mac and nothing you write is sent anywhere. If you connect a cloud provider, the text you check goes straight to that provider, on your own key, and nowhere else. Either way, DuoTyping never stores what you write.'],
  ['Why does it ask for Accessibility access?', 'It’s how macOS lets one app read the text you select in another, and write an accepted change back in place. DuoTyping uses it for exactly that, and never reads password fields. Without it, you can still type or paste into New Note.'],
  ['Which apps does it work in?', 'Most apps where you can select text: Mail, Messages, Notes, Pages, Slack and your browser among them. Marks as you type work in Mail, Messages, Slack, Teams and WhatsApp. For an app that won’t share its text, New Note is the way in: type or paste, check, then copy the result back.'],
  ['Which Macs can run it?', 'Any Mac with Apple silicon on macOS 14 Sonoma or later. Local models need memory too: the smaller ones run in 8 GB, and Qwen2.5 14B recommends 32 GB.'],
  ['Does it work offline?', 'Yes, with a local model. Once it’s downloaded, it checks your writing without a connection. A cloud model needs the internet, of course.'],
  ['Which languages does it support?', 'English. DuoTyping is built and tested for English writing today.'],
]

usePageHead({
  title: TITLE,
  description: DESCRIPTION,
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'DuoTyping', inLanguage: 'en' },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#app`,
        name: 'DuoTyping',
        url: `${SITE_URL}/`,
        description: DESCRIPTION,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'macOS 14 Sonoma or later',
        processorRequirements: 'Apple silicon',
        ...(release.version && { softwareVersion: release.version }),
        image: `${SITE_URL}/og.png`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: [
          'Grammar, spelling and tone suggestions in the apps you already use',
          'Nothing changes until you accept',
          'Local models that run on your Mac',
          'Optional cloud models with your own API key',
          'Marks as you type in Mail, Messages, Slack, Teams and WhatsApp',
          '17 writing profiles',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
      },
    ],
  },
})

const arrow = useId()
// The privacy diagram's loop: where each dot sets off, its colour, its keyframes' number...
const PACKETS: [number, string, number][] = [[262, '#E0AE62', 1], [542, '#E0AE62', 2], [598, '#E8915F', 3], [318, '#E8915F', 4]]
// ...and the caption for each of its three scenes.
const SCENES = ['By default · your text stays on this Mac', 'If you connect a cloud provider', 'When you download a model']
// The FAQ note's two lines of writing, a word at a time: the line as written, then the fix in clay.
const NOTE_LINES = [
  ['M66 241H104', 'f1a', '#D9CFBA'], ['M114 241H160', 'f1b', '#D9CFBA'], ['M170 241H192', 'f1c', '#D9CFBA'],
  ['M66 270H104', 'f2a', '#D9CFBA'], ['M114 270H160', 'f2b', '#B04E25'], ['M170 270H196', 'f2c', '#D9CFBA'],
]
</script>

<template>
  <!-- ── Hero ───────────────────────────────────────────────────────────────────────── -->
  <section id="top" class="@container relative xl:flex xl:min-h-[850px] xl:items-center">
    <div class="wrap flex flex-col gap-[22px] pt-9 sm:max-w-[640px] sm:gap-7 sm:pt-14 xl:box-content xl:w-[520px] xl:max-w-none xl:gap-[30px] xl:pt-0 xl:pr-0">
      <div class="eyebrow">The private writing assistant for Mac</div>
      <HeroHeadline />
      <p class="fluid max-w-[540px] leading-[1.55] text-pretty text-ink-2 [--hi:21] [--lo:17.5]">
        DuoTyping checks grammar and tone in the apps you already write in, and changes nothing until you say so. It runs on your Mac by default, so what you write stays there.
      </p>
      <!-- A phone can't install a Mac app, so here the call is to pass the link on. -->
      <div class="mt-1 flex flex-col gap-[18px] sm:hidden">
        <ShareActions copy />
        <p class="text-center text-sm leading-normal text-ink-3">
          DuoTyping is a Mac app, so send yourself the link for when it’s out.<br />Free · macOS 14 or later · Apple silicon
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-x-[30px] gap-y-3 max-sm:hidden">
        <span class="btn btn-soon">Coming soon</span>
        <a
          href="#how"
          class="inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold text-ink underline decoration-ink/28 decoration-[1.5px] underline-offset-[5px] transition-[text-decoration-color] duration-150 hover:decoration-ink"
        >See how it works<Icon name="arrow-down" class="size-[18px]" /></a>
      </div>
      <p class="-mt-2.5 text-[14.5px] text-ink-3 max-sm:hidden">Free · macOS 14 Sonoma or later · Apple silicon</p>
      <HeroDemoPhone class="sm:hidden" />
    </div>
    <div class="wrap pt-12 max-sm:hidden xl:contents">
      <HeroDemo />
    </div>
  </section>

  <!-- ── Three promises ─────────────────────────────────────────────────────────────── -->
  <section class="wrap pt-14 lg:pt-[72px]" aria-labelledby="promises">
    <h2 id="promises" class="sr-only">Why DuoTyping</h2>
    <div class="flex flex-col lg:grid lg:grid-cols-3">
      <div
        v-for="([icon, title, body], i) in PILLARS"
        :key="title"
        class="flex gap-4 py-[22px] lg:flex-col lg:gap-3.5 lg:px-10 lg:py-0 lg:first:pl-0"
        :class="i > 0 && 'border-t border-line lg:border-t-0 lg:border-l'"
      >
        <Icon :name="icon" class="size-[26px] text-clay lg:size-7" />
        <div class="flex flex-col gap-1.5 lg:gap-3.5">
          <h3 class="fluid font-semibold text-ink [--hi:21] [--lo:18.5] lg:mt-1 lg:tracking-[-0.01em]">{{ title }}</h3>
          <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">{{ body }}</p>
        </div>
      </div>
    </div>
  </section>

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
        <div class="flex h-[196px] items-center justify-center bg-stage md:h-[214px]" aria-hidden="true">
          <div class="font-mac w-[290px] rounded-[10px] bg-white px-[18px] py-4 text-[13px] leading-[1.62] text-mac-ink shadow-[0_12px_28px_rgba(60,40,20,0.12)] md:w-[300px] md:text-[13.5px]">
            Thanks for the quick reply. <span class="bg-select">I have send the revised contract to legal yesterday.</span> Let me know if anything is missing.
          </div>
        </div>
        <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
          <span class="flex size-[30px] items-center justify-center rounded-full border-[1.5px] border-clay font-mono text-[13px] font-semibold text-clay" aria-hidden="true">1</span>
          <h3 class="fluid mt-1.5 font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">Select what you wrote</h3>
          <p class="text-[16.5px] leading-[1.55] text-pretty text-ink-2">A sentence, a paragraph or a whole email, wherever you’re writing it.</p>
        </div>
      </li>
      <li class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
        <div class="flex h-40 items-center justify-center bg-stage md:h-[214px]" aria-hidden="true">
          <div class="flex items-center gap-2 md:gap-2.5">
            <span
              v-for="k in ['⌃', '⌥', '⌘', 'D']"
              :key="k"
              class="keycap h-14 min-w-14 rounded-xl px-[13px] text-[23px] md:h-[62px] md:min-w-[62px] md:rounded-[13px] md:px-[15px] md:text-[26px]"
            >{{ k }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
          <span class="flex size-[30px] items-center justify-center rounded-full border-[1.5px] border-clay font-mono text-[13px] font-semibold text-clay" aria-hidden="true">2</span>
          <h3 class="fluid mt-1.5 font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">Press ⌃⌥⌘D</h3>
          <p class="text-[16.5px] leading-[1.55] text-pretty text-ink-2">Or any shortcut you like. DuoTyping reads the text you selected and nothing else.</p>
        </div>
      </li>
      <li class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
        <div class="flex h-[196px] items-center justify-center bg-stage md:h-[214px]" aria-hidden="true">
          <div class="font-mac w-[300px] rounded-lg shadow-[0_12px_28px_rgba(74,45,30,0.14)]">
            <Suggestion label="Sentence 1 of 2" focused actions="accept" original="I have send the revised contract to legal yesterday." size="text-[13px]" original-size="text-[11px]">
              I <span class="font-semibold text-clay">sent</span> the revised contract to legal yesterday.
            </Suggestion>
          </div>
        </div>
        <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
          <span class="flex size-[30px] items-center justify-center rounded-full border-[1.5px] border-clay font-mono text-[13px] font-semibold text-clay" aria-hidden="true">3</span>
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
          <div v-loop class="loop flex h-[250px] items-center justify-center bg-stage md:h-[380px]" aria-hidden="true">
            <div class="flex items-start gap-2">
              <div class="font-mac w-[262px] rounded-[10px] border border-[#D6CFBC] bg-white px-4 py-3.5 text-[13px] leading-[1.75] text-mac-ink shadow-[0_12px_28px_rgba(60,40,20,0.10)] md:w-[440px] md:text-sm">
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
          <div v-loop class="loop flex h-[390px] items-center justify-center bg-stage md:h-[380px]" aria-hidden="true">
            <div class="flex flex-col items-start gap-3">
              <div class="flex items-center gap-2.5">
                <!-- Both sentences share one cell, so the pill never moves when one becomes the other. -->
                <p class="font-mac grid text-[13px] text-mac-ink md:text-sm">
                  <span class="[grid-area:1/1]"><span class="sel-full loop-rsel">Please revert back to me if any change is required.</span></span>
                  <span class="loop-rnew opacity-0 [grid-area:1/1]">Let me know if anything needs changing.</span>
                </p>
                <RewritePill class="loop-rpill" />
              </div>
              <Popup scope="Rewrite" count="Other ways to say it" note="Nothing changes until you pick one." class="loop-rpop w-[300px] md:w-[440px]">
                <Suggestion label="Option 1 of 3" focused actions="replace" size="text-[13.5px]">Let me know if anything needs changing.</Suggestion>
                <Suggestion label="Option 2 of 3" size="text-[13.5px]">Happy to adjust anything. Just say the word.</Suggestion>
              </Popup>
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
        <h3 class="fluid font-display leading-[1.1] font-bold tracking-[-0.02em] [--hi:30] [--lo:24]">Install a model, or bring your own key</h3>
        <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:17] [--lo:15.5]">
          The first time you open DuoTyping, choose what does the checking: a model on your Mac, a cloud provider with your own key, or both.
        </p>
      </div>
      <div class="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
        <article class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
          <div class="flex h-80 items-center justify-center bg-stage md:h-[300px]" aria-hidden="true">
            <div class="font-mac flex w-[310px] flex-col gap-2 text-ink md:w-[460px]">
              <div class="flex items-center gap-3 rounded-[10px] border border-edge bg-panel px-3.5 py-[11px]">
                <div class="flex grow flex-col gap-[3px]">
                  <div class="flex flex-wrap items-center gap-x-2 gap-y-[3px]">
                    <span class="text-[13px] font-semibold whitespace-nowrap">Qwen3 1.7B</span>
                    <span class="rounded bg-[#E6E0CF] px-[7px] py-px text-[10px] font-semibold whitespace-nowrap text-ink-2">Fastest</span>
                  </div>
                  <span class="text-[11.5px] text-ink-2">983.6 MB · 8 GB memory</span>
                </div>
                <span class="mk-btn-2">Install</span>
              </div>
              <div class="flex flex-col gap-[9px] rounded-[10px] border border-clay bg-tint px-3.5 py-[11px]">
                <div class="flex items-center gap-3">
                  <div class="flex grow flex-col gap-[3px]">
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-[3px]">
                      <span class="text-[13px] font-semibold whitespace-nowrap">Qwen3 4B Instruct 2507</span>
                      <span class="rounded bg-clay px-[7px] py-px text-[10px] font-semibold whitespace-nowrap text-white">Recommended</span>
                    </div>
                    <span class="text-[11.5px] text-ink-2">2.28 GB · 8 GB memory · balanced</span>
                  </div>
                  <span class="mk-btn-2">Pause</span>
                </div>
                <div class="h-[5px] overflow-hidden rounded-[3px] bg-chip"><div class="h-[5px] w-[62%] rounded-[3px] bg-clay" /></div>
                <div class="flex items-center gap-[7px]">
                  <Icon name="verified" class="size-[15px] text-[#2F7D3A]" />
                  <span class="text-[11.5px] text-ink-2">1.4 GB of 2.28 GB · signature verified</span>
                </div>
              </div>
              <div class="flex items-center gap-3 rounded-[10px] border border-edge bg-panel px-3.5 py-[11px]">
                <div class="flex grow flex-col gap-[3px]">
                  <div class="flex flex-wrap items-center gap-x-2 gap-y-[3px]">
                    <span class="text-[13px] font-semibold whitespace-nowrap">Qwen2.5 14B Instruct</span>
                    <span class="rounded bg-[#E6E0CF] px-[7px] py-px text-[10px] font-semibold whitespace-nowrap text-ink-2">Most capable</span>
                  </div>
                  <span class="text-[11.5px] text-ink-2">8.32 GB · 32 GB memory recommended</span>
                </div>
                <span class="mk-btn-2">Install</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
            <h4 class="fluid font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">A local model, installed once</h4>
            <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">
              Pick a size that fits your Mac: download size and memory are on every row. It’s checked against a signed catalog before it loads, then works offline.
            </p>
          </div>
        </article>
        <article class="flex flex-col overflow-hidden rounded-[22px] border border-edge bg-card">
          <div class="flex h-[300px] items-center justify-center bg-stage" aria-hidden="true">
            <div class="font-mac flex w-[310px] flex-col gap-2 text-ink md:w-[460px]">
              <div class="flex items-center gap-2.5 rounded-[10px] border border-edge bg-panel px-3.5 py-2.5">
                <span class="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#E3E7EA] text-xs font-bold text-slate">O</span>
                <span class="text-[13px] font-semibold">OpenAI</span>
                <span class="rounded border border-[#A9B7C0] px-1.5 text-[10px] font-semibold text-slate">Cloud</span>
                <span class="grow" />
                <span class="inline-flex items-center gap-[5px] rounded-md border border-edge bg-card px-2 py-[3px] text-[11px] whitespace-nowrap text-ink-2 max-md:hidden">
                  gpt-4.1-mini <Icon name="chevron" class="size-[11px] text-ink-3" />
                </span>
                <span class="inline-flex items-center gap-[5px] text-[11px] font-semibold whitespace-nowrap text-[#2F7D3A]">
                  <span class="inline-block size-1.5 rounded-full bg-[#2F7D3A]" />Connected
                </span>
              </div>
              <div class="flex flex-col gap-[9px] rounded-[10px] border border-clay bg-tint px-3.5 py-2.5">
                <div class="flex items-center gap-2.5">
                  <span class="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-[#E3E7EA] text-xs font-bold text-slate">A</span>
                  <span class="text-[13px] font-semibold">Anthropic</span>
                  <span class="rounded border border-[#A9B7C0] px-1.5 text-[10px] font-semibold text-slate">Cloud</span>
                </div>
                <span class="text-[11px] text-ink-2">API key</span>
                <span class="-mt-1 rounded-md border border-key bg-white px-[9px] py-1.5 font-mono text-xs leading-normal text-ink">••••••••••••••••••••••••••••••</span>
                <div class="flex items-center gap-2">
                  <span class="mk-btn">Save</span>
                  <span class="flex items-center gap-1.5 text-[11px] text-ink-2"><Icon name="key" :stroke="1.8" class="size-[13px] text-gold" />Stored in your Mac’s Keychain</span>
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
          <div class="flex flex-col gap-2.5 p-6 lg:p-[30px]">
            <h4 class="fluid font-semibold tracking-[-0.01em] [--hi:22] [--lo:20]">A cloud model, with your own key</h4>
            <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:16.5] [--lo:15.5]">
              Paste a key from OpenAI or Anthropic, or add any OpenAI-compatible endpoint. The key stays in your Mac’s Keychain, and your provider bills you directly.
            </p>
          </div>
        </article>
      </div>
    </div>

    <div class="flex gap-3.5 rounded-2xl border-[1.5px] border-dashed border-[#CFC6B2] p-[18px] lg:items-center lg:gap-[18px] lg:rounded-[18px] lg:px-[26px] lg:py-5">
      <Icon name="note" class="size-6 text-clay lg:size-7" />
      <p class="fluid leading-normal text-ink-2 [--hi:17] [--lo:15.5]">
        <strong class="font-semibold text-ink">Nothing selected?</strong> New Note opens instead: type or paste, check, then copy the result anywhere. It’s also the way in for apps that won’t share their text.
      </p>
    </div>
  </section>

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

  <!-- ── Privacy ────────────────────────────────────────────────────────────────────── -->
  <section id="privacy" class="@container mt-[88px] scroll-mt-[-32px] bg-ink text-paper lg:mt-[132px] lg:scroll-mt-[-68px]">
    <div class="wrap flex flex-col gap-7 pt-[72px] pb-[76px] lg:gap-16 lg:pt-[116px] lg:pb-28">
      <div class="flex flex-col gap-7 lg:gap-6">
        <div class="flex flex-col gap-3.5 lg:gap-6">
          <div class="eyebrow text-amber">Privacy</div>
          <h2 class="fluid max-w-[900px] font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance text-paper [--hi:61] [--lo:35]">
            Local by default.<br />Cloud only if you choose it.
          </h2>
        </div>
        <p class="fluid max-w-[760px] leading-[1.55] text-pretty text-night-text [--hi:20] [--lo:17]">
          DuoTyping is built in two parts, on purpose. The app you see only goes online to check for updates. A separate engine runs the model on your Mac, and only goes online to download a model, or to reach a cloud provider you chose to connect.
        </p>
      </div>

      <!-- Wide: the whole picture at once, 1200 × 400, scaled to the column below 1440 -->
      <figure v-loop class="loop diagram-fit max-lg:hidden">
        <figcaption class="sr-only">
          On your Mac, the app you’re writing in shares only the text you select with DuoTyping, which passes it to the DuoTyping engine. The engine runs the model on this Mac, and only goes online for the signed model catalog, and for your cloud provider if you connect one.
        </figcaption>
        <div class="canvas" aria-hidden="true">
          <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none" class="absolute top-0 left-0">
            <defs>
              <marker :id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M1 1 9 5 1 9" stroke="#E0AE62" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              </marker>
            </defs>
            <rect x="1" y="1" width="858" height="398" rx="26" stroke="#5A6873" stroke-width="1.5" stroke-dasharray="7 7" />
            <path d="M262 216H318" stroke="#E0AE62" stroke-width="1.8" :marker-start="`url(#${arrow})`" :marker-end="`url(#${arrow})`" />
            <path d="M542 216H598" stroke="#E0AE62" stroke-width="1.8" :marker-start="`url(#${arrow})`" :marker-end="`url(#${arrow})`" />
            <!-- A download only comes in; the provider gets your text and answers, so both ways. -->
            <path class="loop-ct" d="M942 118C900 118 880 150 830 170" stroke="#E0AE62" stroke-width="1.6" stroke-dasharray="5 6" :marker-end="`url(#${arrow})`" />
            <path class="loop-pv" d="M830 262C880 282 900 300 942 300" stroke="#E0AE62" stroke-width="1.6" stroke-dasharray="5 6" :marker-start="`url(#${arrow})`" :marker-end="`url(#${arrow})`" />
            <!-- What travels between the boxes: your text in amber, the suggestions in clay. -->
            <g v-for="[x, color, n] in PACKETS" :key="n" class="opacity-0" :class="`loop-q${n}`">
              <circle :cx="x" cy="216" r="11" :fill="color" opacity="0.26" />
              <circle :cx="x" cy="216" r="5.5" :fill="color" />
            </g>
          </svg>
          <div class="absolute top-[26px] left-[30px] flex items-center gap-[9px] font-mono text-[12.5px] font-medium tracking-[0.12em] text-night-text uppercase">
            <Icon name="mac" class="size-[18px]" />Your Mac
          </div>
          <div class="absolute top-[340px] left-[30px] grid justify-items-start font-mono text-[12.5px] font-medium tracking-[0.12em] whitespace-nowrap text-amber uppercase">
            <span v-for="(scene, i) in SCENES" :key="scene" class="flex items-center gap-2.5 opacity-0 [grid-area:1/1]" :class="`loop-cap${i + 1}`">
              <span class="size-[7px] shrink-0 rounded-full bg-amber shadow-[0_0_0_3px_rgb(224_174_98/0.2)]" />{{ scene }}
            </span>
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
            <span class="text-[14.5px] leading-[1.4] text-night-mute">Runs the model on this Mac</span>
          </div>
          <div class="loop-cat absolute top-[50px] left-[944px] flex h-[136px] w-64 flex-col justify-center gap-1.5 rounded-2xl border-[1.5px] border-dashed border-night-dash p-5">
            <span class="text-[17.5px] font-semibold text-night-text">Model catalog</span>
            <span class="text-[14.5px] leading-[1.4] text-night-mute">Signed downloads, checked before use</span>
          </div>
          <div class="loop-prov absolute top-[232px] left-[944px] flex h-[136px] w-64 flex-col justify-center gap-1.5 rounded-2xl border-[1.5px] border-dashed border-night-dash p-5">
            <span class="text-[17.5px] font-semibold text-night-text">Your cloud provider</span>
            <span class="text-[14.5px] leading-[1.4] text-night-mute">Only if you connect one</span>
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
            <svg width="14" height="40" viewBox="0 0 14 40" fill="none"><path d="M7 3V36" stroke="#E0AE62" stroke-width="1.7" /><path d="M2.5 31 7 36l4.5-5" stroke="#E0AE62" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="font-mono text-[11px] tracking-[0.1em] text-night-mute uppercase">Selection</span>
          </div>
          <div class="flex flex-col gap-1 rounded-[14px] border border-night-line bg-night-card px-[18px] py-4">
            <span class="flex items-center gap-[9px] text-[16.5px] font-semibold text-paper"><BrandMark tone="ink" class="size-[22px]" />DuoTyping</span>
            <span class="text-sm leading-[1.4] text-night-mute">Only goes online for updates</span>
          </div>
          <div class="flex h-10 items-center gap-2.5 pl-[22px]" aria-hidden="true">
            <svg width="14" height="40" viewBox="0 0 14 40" fill="none"><path d="M7 3V36" stroke="#E0AE62" stroke-width="1.7" /><path d="M2.5 31 7 36l4.5-5" stroke="#E0AE62" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="font-mono text-[11px] tracking-[0.1em] text-night-mute uppercase">Text</span>
          </div>
          <div class="flex flex-col gap-1 rounded-[14px] border border-night-line bg-night-card px-[18px] py-4">
            <span class="text-[16.5px] font-semibold text-paper">DuoTyping engine</span>
            <span class="text-sm leading-[1.4] text-night-mute">Runs the model on this Mac</span>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="flex h-10 items-center gap-2.5 pl-[22px]">
            <svg width="14" height="40" viewBox="0 0 14 40" fill="none" aria-hidden="true"><path d="M7 3V36" stroke="#E0AE62" stroke-width="1.7" stroke-dasharray="4 5" /><path d="M2.5 31 7 36l4.5-5" stroke="#E0AE62" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span class="font-mono text-[11px] tracking-[0.1em] text-night-mute uppercase">Only goes online for</span>
          </div>
          <div class="flex flex-col gap-1 rounded-[14px] border-[1.5px] border-dashed border-night-dash px-[18px] py-4">
            <span class="text-[16.5px] font-semibold text-night-text">Model catalog</span>
            <span class="text-sm leading-[1.4] text-night-mute">Signed downloads, checked before use</span>
          </div>
          <div class="flex flex-col gap-1 rounded-[14px] border-[1.5px] border-dashed border-night-dash px-[18px] py-4">
            <span class="text-[16.5px] font-semibold text-night-text">Your cloud provider</span>
            <span class="text-sm leading-[1.4] text-night-mute">Only if you connect one, with your key</span>
          </div>
        </div>
      </figure>

      <div class="grid grid-cols-1 gap-y-[34px] max-lg:mt-4 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
        <div v-for="[icon, title, body] in FACTS" :key="title" class="flex gap-4">
          <Icon :name="icon" class="size-[26px] text-amber" />
          <div class="flex flex-col gap-1.5">
            <h3 class="text-[18.5px] font-semibold text-paper">{{ title }}</h3>
            <p class="fluid leading-[1.55] text-pretty text-night-text [--hi:15.5] [--lo:15]">{{ body }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

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
            <span class="tag tag-outline">Optional</span>
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

  <!-- ── FAQ ────────────────────────────────────────────────────────────────────────── -->
  <section id="faq" class="faq wrap grid grid-cols-1 scroll-mt-[-40px] gap-7 pt-20 lg:scroll-mt-[-68px] lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 lg:pt-[116px]">
    <div class="contents lg:col-span-4 lg:flex lg:flex-col lg:gap-[22px]">
      <div class="order-1 flex flex-col gap-3.5 lg:order-none lg:gap-[22px]">
        <div class="eyebrow">FAQ</div>
        <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:54] [--lo:35]">Fair questions.</h2>
      </div>
      <p class="order-3 text-base text-ink-2 lg:order-none lg:text-[17px] lg:leading-[1.55]">
        Something else on your mind? <a :href="FEEDBACK_URL" class="font-semibold text-clay underline transition-colors hover:text-clay-hover">Send feedback</a>
      </p>
      <svg v-loop width="384" height="340" viewBox="0 0 384 340" fill="none" aria-hidden="true" class="loop block overflow-visible max-lg:hidden">
        <g transform="rotate(-4 150 170)">
          <rect x="42" y="40" width="228" height="280" rx="16" fill="#4A2D1E" opacity="0.07" />
          <rect x="36" y="30" width="228" height="280" rx="16" fill="#FBFAF5" stroke="#DDD6C6" stroke-width="1.5" />
          <path d="M58 54V290" stroke="#F0CDB9" stroke-width="1.5" stroke-linecap="round" />
          <path d="M60 223H240M60 250H240M60 277H240" stroke="#EAE3D3" stroke-width="1.5" stroke-linecap="round" />
          <!-- Each stroke is its own path, drawn by its dash: pathLength 1 makes the dash the whole stroke. -->
          <path class="loop-fq" d="M104 112C104 82 124 64 148 64C174 64 192 82 192 106C192 128 176 138 162 148C152 155 148 164 148 178" pathLength="1" stroke-dasharray="1" stroke="#B04E25" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
          <circle class="loop-fd" cx="148" cy="208" r="7.5" fill="#B04E25" />
          <path v-for="[d, n, color] in NOTE_LINES" :key="n" :class="`loop-${n}`" :d="d" pathLength="1" stroke-dasharray="1" :stroke="color" stroke-width="6" stroke-linecap="round" />
          <path class="loop-fw" d="M114 249q2.9-3.4 5.8 0q2.9 3.4 5.8 0q2.9-3.4 5.8 0q2.9 3.4 5.8 0q2.9-3.4 5.8 0q2.9 3.4 5.8 0q2.9-3.4 5.8 0q2.9 3.4 5.8 0" stroke="#B04E25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <path d="M292 34H350A18 18 0 0 1 368 52V78A18 18 0 0 1 350 96H318L302 112L304 96H292A18 18 0 0 1 274 78V52A18 18 0 0 1 292 34Z" fill="#F3E4C6" stroke="#8A5A1E" stroke-width="1.8" stroke-linejoin="round" />
        <circle v-for="(x, i) in [302, 321, 340]" :key="x" class="loop-fb" :style="{ animationDelay: `${i * 0.2}s` }" :cx="x" cy="65" r="4.2" fill="#8A5A1E" />
        <path class="loop-fs" d="M18 55C19 61.5 20.5 63 27 64C20.5 65 19 66.5 18 73C17 66.5 15.5 65 9 64C15.5 63 17 61.5 18 55Z" fill="#B8802A" />
        <path class="loop-fs" style="animation-delay: 0.15s" d="M366 123C367.2 130.9 369.1 132.8 377 134C369.1 135.2 367.2 137.1 366 145C364.8 137.1 362.9 135.2 355 134C362.9 132.8 364.8 130.9 366 123Z" fill="#B8802A" />
        <path class="loop-fs" style="animation-delay: 0.3s" d="M22 311C22.8 316 24 317.2 29 318C24 318.8 22.8 320 22 325C21.2 320 20 318.8 15 318C20 317.2 21.2 316 22 311Z" fill="#E2B461" />
        <!-- The logo's two pencils, apart so each can write its line: they stack back at rest. -->
        <g class="loop-pen1"><g transform="translate(164 132) scale(8.4)"><MarkPaths part="back" /></g></g>
        <g class="loop-pen2"><g transform="translate(164 132) scale(8.4)"><MarkPaths part="front" /></g></g>
      </svg>
    </div>
    <div class="order-2 lg:order-none lg:col-span-7 lg:col-start-6">
      <div class="border-b border-line">
        <details v-for="([q, a], i) in FAQ" :key="q" class="border-t border-line" :open="i === 0">
          <summary class="flex min-h-11 cursor-pointer items-center justify-between gap-6 py-[18px] text-left lg:py-5">
            <span class="fluid font-semibold text-ink [--hi:19.5] [--lo:17.5]">{{ q }}</span>
            <span class="faq-icon flex size-8 shrink-0 items-center justify-center rounded-full bg-sand text-ink" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M6 12h12" />
                <path class="bar" d="M12 6v12" />
              </svg>
            </span>
          </summary>
          <p class="fluid -mt-1.5 pr-16 pb-[22px] leading-[1.6] text-pretty text-ink-2 [--hi:17] [--lo:16] lg:pb-6">{{ a }}</p>
        </details>
      </div>
    </div>
  </section>

  <!-- ── Download ───────────────────────────────────────────────────────────────────── -->
  <section id="download" class="wrap flex scroll-mt-[-60px] flex-col items-center gap-[22px] pt-[100px] pb-[88px] text-center lg:scroll-mt-[-92px] lg:gap-[30px] lg:pt-[140px] lg:pb-[124px]">
    <AppIcon class="[--icon:104px] lg:[--icon:120px]" />
    <h2 class="fluid mt-1.5 font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:67] [--lo:40]">Say it well, wherever you write.</h2>
    <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:21] [--lo:17.5]">Free for Mac. No account, nothing to unlock.</p>
    <ShareActions class="w-full sm:hidden" />
    <div class="flex flex-col items-center gap-[22px] sm:mt-1.5 sm:gap-4">
      <span class="btn btn-soon max-sm:hidden">Coming soon</span>
      <p class="text-sm text-ink-3 sm:text-[14.5px]">macOS 14 Sonoma or later · Apple silicon</p>
    </div>
  </section>
</template>
