<script setup lang="ts">
import Icon from '../components/Icon.vue'
import ShareActions from '../components/ShareActions.vue'
import HeroDemo from '../components/demo/HeroDemo.vue'
import HeroDemoPhone from '../components/demo/HeroDemoPhone.vue'
</script>

<template>
  <!-- ── Hero ───────────────────────────────────────────────────────────────────────── -->
  <section id="top" class="@container relative xl:flex xl:min-h-[850px] xl:items-center">
    <div class="wrap flex flex-col gap-[22px] pt-9 sm:max-w-[640px] sm:gap-7 sm:pt-14 xl:box-content xl:w-[520px] xl:max-w-none xl:gap-[30px] xl:pt-0 xl:pr-0">
      <div class="eyebrow">The private writing assistant for Mac</div>
      <h1 class="hero-title font-display leading-[1.04] font-bold tracking-[-0.035em] text-ink">
        <!-- Screen readers hear the line itself; the struck word is decoration. -->
        <span class="sr-only">Say it well. Keep it yours.</span>
        <span aria-hidden="true">
          Say it <del class="text-struck decoration-terra decoration-[0.07em]">good</del> <ins class="bg-[linear-gradient(transparent_58%,var(--color-tag)_58%)] px-[0.04em] no-underline">well</ins>.<br />
          Keep it yours.
        </span>
      </h1>
      <p class="fluid max-w-[540px] leading-[1.55] text-pretty text-ink-2 [--hi:21] [--lo:17.5]">
        DuoTyping checks grammar and tone in the apps you already write in, and changes nothing until you say so. It checks with your own OpenAI or Anthropic key, and keeps nothing you write.
      </p>
      <!-- A phone can't install a Mac app, so here the call is to pass the link on. -->
      <div class="mt-1 flex flex-col gap-[18px] sm:hidden">
        <ShareActions copy />
        <p class="text-center text-sm leading-normal text-ink-3">
          DuoTyping is a Mac app, so send yourself the link for when it’s out.<br />macOS 14 or later · Apple silicon
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-x-[30px] gap-y-3 max-sm:hidden">
        <span class="btn btn-soon">Coming soon</span>
        <a
          href="#how"
          class="inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold text-ink underline decoration-ink/28 decoration-[1.5px] underline-offset-[5px] transition-[text-decoration-color] duration-150 hover:decoration-ink"
        >See how it works<Icon name="arrow-down" class="size-[18px]" /></a>
      </div>
      <p class="-mt-2.5 text-[14.5px] text-ink-3 max-sm:hidden">macOS 14 Sonoma or later · Apple silicon</p>
      <HeroDemoPhone class="sm:hidden" />
    </div>
    <div class="wrap pt-12 max-sm:hidden xl:contents">
      <HeroDemo />
    </div>
  </section>
</template>
