<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '../components/brand/AppIcon.vue'
import ShareActions from '../components/ShareActions.vue'
import { desktopCta, extensionCta } from '../utils/cta'
import { PLATFORMS, WEB_APP_URL } from '../utils/facts'

// The closing call: the same buttons as the hero, for whoever read this far.
const primary = computed(() => desktopCta.value ?? extensionCta.value)
const requires = computed(() => PLATFORMS[primary.value?.id ?? 'web'].requires)
</script>

<template>
  <!-- ── Download ───────────────────────────────────────────────────────────────────── -->
  <section id="download" class="wrap flex scroll-mt-[-60px] flex-col items-center gap-[22px] pt-[100px] pb-[88px] text-center lg:scroll-mt-[-92px] lg:gap-[30px] lg:pt-[140px] lg:pb-[124px]">
    <AppIcon v-reveal class="[--icon:104px] lg:[--icon:120px]" />
    <h2 v-reveal class="fluid mt-1.5 font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:67] [--lo:40]">Say it well, wherever you write.</h2>
    <p v-reveal class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:21] [--lo:17.5]">Every change is yours to accept.</p>
    <div class="flex w-full flex-col gap-3.5 sm:hidden">
      <a class="btn w-full" :href="WEB_APP_URL">Try in browser</a>
      <ShareActions soft />
    </div>
    <div class="flex flex-col items-center gap-4 max-sm:hidden sm:mt-1.5">
      <div class="flex flex-wrap items-center justify-center gap-3">
        <template v-if="primary">
          <a class="btn" :href="primary.href">{{ primary.label }}</a>
          <a class="btn btn-soft" :href="WEB_APP_URL">Try in browser</a>
        </template>
        <a v-else class="btn" :href="WEB_APP_URL">Try in browser</a>
      </div>
      <p class="text-[14.5px] text-ink-3">{{ requires }}</p>
    </div>
  </section>
</template>
