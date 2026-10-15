<script setup lang="ts">
import { computed, ref } from 'vue'
import ShareActions from '../components/ShareActions.vue'
import HeroDemo from '../components/demo/HeroDemo.vue'
import HeroDemoPhone from '../components/demo/HeroDemoPhone.vue'
import PlatformScene from '../components/demo/PlatformScene.vue'
import { PLATFORMS, WEB_APP_URL } from '../utils/facts'
import { desktopCta, extensionCta } from '../utils/cta'
import { os } from '../utils/platform'

type Scene = 'mac' | 'windows' | 'chrome' | 'phone'
const SCENES: [Scene, string][] = [['mac', 'Mac'], ['windows', 'Windows'], ['chrome', 'Chrome'], ['phone', 'Phone']]
const picked = ref<Scene | null>(null)
// The demo opens on the visitor's own system, Windows until the page knows which.
const scene = computed<Scene>(() => picked.value ?? ({ mac: 'mac', windows: 'windows', phone: 'phone', other: 'chrome' } as const)[os.value])
// This computer's app, or on another system the extension; "Try in browser" always sits beside it.
const primary = computed(() => desktopCta.value ?? extensionCta.value)
const desktop = computed(() => os.value === 'mac' || os.value === 'windows')
const facts = computed(() => (desktop.value ? 'Free to try, no account needed · Or bring your own key' : 'Free daily checks with a free account'))
const requires = computed(() => PLATFORMS[os.value === 'mac' ? 'mac' : os.value === 'windows' ? 'windows' : 'chrome'].requires)
</script>

<template>
  <!-- ── Hero ───────────────────────────────────────────────────────────────────────── -->
  <section id="top" class="@container relative xl:flex xl:min-h-[860px] xl:items-center">
    <div class="wrap flex flex-col gap-[22px] pt-9 sm:max-w-[640px] sm:gap-7 sm:pt-14 xl:box-content xl:w-[520px] xl:max-w-none xl:gap-[28px] xl:pt-0 xl:pr-0">
      <div class="eyebrow">For Mac, Windows, Chrome and the web</div>
      <h1 class="hero-title font-display leading-[1.04] font-bold tracking-[-0.035em] text-ink">
        <!-- Screen readers hear the line itself; the struck word is decoration. -->
        <span class="sr-only">Say it well. Keep it yours.</span>
        <span aria-hidden="true">
          Say it <del class="text-struck decoration-terra decoration-[0.07em]">good</del> <ins class="bg-[linear-gradient(transparent_58%,var(--color-tag)_58%)] px-[0.04em] no-underline">well</ins>.<br />
          Keep it yours.
        </span>
      </h1>
      <p class="fluid max-w-[540px] leading-[1.55] text-pretty text-ink-2 [--hi:21] [--lo:17.5]">
        Grammar and tone in any app.<br />Nothing changes until you say yes.
      </p>
      <!-- A phone: Write works right here, and the apps are a link to send on. -->
      <div class="mt-1 flex flex-col gap-3.5 sm:hidden">
        <a class="btn w-full" :href="WEB_APP_URL">Try in browser</a>
        <ShareActions copy soft />
        <p class="text-center text-sm leading-normal text-ink-3">Write works in your phone’s browser. Send the link to your computer for the apps.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3 max-sm:hidden">
        <template v-if="primary">
          <span v-if="primary.soon" class="btn btn-soon">Coming soon</span>
          <a v-else class="btn" :href="primary.href">{{ primary.label }}</a>
          <a class="btn btn-soft" :href="WEB_APP_URL">Try in browser</a>
        </template>
        <a v-else class="btn" :href="WEB_APP_URL">Try in browser</a>
      </div>
      <p class="-mt-2.5 text-[14.5px] leading-[1.6] text-ink-3 max-sm:hidden">{{ facts }}<br />{{ requires }}</p>
      <div class="flex flex-wrap items-center gap-2 max-sm:hidden" role="group" aria-label="See the demo on">
        <span class="mr-1 text-[14.5px] text-ink-3">See it on</span>
        <button
          v-for="[id, label] in SCENES"
          :key="id"
          type="button"
          class="h-9 cursor-pointer rounded-full border px-3.5 text-[14px] font-semibold transition-colors duration-200 ease-out"
          :class="scene === id ? 'border-ink bg-ink text-white' : 'border-edge bg-card text-ink hover:border-key'"
          :aria-pressed="scene === id"
          @click="picked = id"
        >{{ label }}</button>
      </div>
      <HeroDemoPhone class="sm:hidden" />
    </div>
    <div class="wrap pt-12 max-sm:hidden xl:contents">
      <HeroDemo v-if="scene === 'mac'" />
      <PlatformScene v-else :key="scene" :platform="scene" />
    </div>
  </section>
</template>
