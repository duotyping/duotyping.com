<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from './brand/BrandMark.vue'
import { FEEDBACK_URL } from '../utils/site'

const route = useRoute()
const at = (hash: string) => (route.path === '/' ? hash : `/${hash}`)
const COLUMNS = computed((): [string, [string, string][]][] => [
  ['Product', [[at('#download'), 'Coming soon'], [at('#how'), 'How it works'], [at('#privacy'), 'Privacy'], [at('#models'), 'Models']]],
  ['Help', [[at('#faq'), 'FAQ'], [FEEDBACK_URL, 'Send feedback']]],
  ['Legal', [['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Use']]],
])
// The build's year, so the prerendered page and the hydrated one always agree.
const YEAR = __YEAR__
</script>

<template>
  <footer class="wrap flex flex-col gap-8 border-t border-line pt-10 pb-9 md:gap-12 md:pt-12 md:pb-10">
    <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
      <div class="flex flex-col gap-3 md:gap-3.5">
        <a :href="route.path === '/' ? '#top' : '/'" aria-label="DuoTyping home" class="flex items-center gap-[9px] self-start text-ink md:gap-2.5">
          <BrandMark class="size-7 md:size-[30px]" />
          <span class="text-[18.5px] font-semibold tracking-[-0.02em] md:text-xl">DuoTyping</span>
        </a>
        <p class="text-[15px] text-ink-2 md:text-[15.5px]">The private writing assistant for Mac.</p>
      </div>
      <div class="flex flex-wrap gap-x-7 gap-y-6 md:gap-x-[72px]">
        <nav v-for="[title, links] in COLUMNS" :key="title" :aria-label="title" class="flex flex-col gap-1">
          <span class="mb-2 font-mono text-xs font-medium tracking-[0.12em] text-ink-3 uppercase">{{ title }}</span>
          <a v-for="[href, label] in links" :key="label" :href="href" class="nav-link min-h-9 text-[15px] font-normal whitespace-nowrap md:text-[15.5px]">{{ label }}</a>
        </nav>
      </div>
    </div>
    <div class="flex flex-col gap-1.5 text-[13px] text-ink-3 md:flex-row md:justify-between md:text-[13.5px]">
      <span>© {{ YEAR }} DuoTyping</span>
      <span>Mac and macOS are trademarks of Apple Inc.</span>
    </div>
  </footer>
</template>
