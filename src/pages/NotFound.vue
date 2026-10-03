<script setup lang="ts">
import { usePageHead } from '../utils/head'

usePageHead({
  title: 'Page not found — DuoTyping',
  description: 'There’s nothing at this address.',
  path: '/404',
  noindex: true,
})
</script>

<template>
  <section class="wrap flex min-h-[64vh] flex-col items-start justify-center gap-6 py-24">
    <div class="eyebrow">404 · Page not found</div>
    <h1 class="fluid max-w-[760px] font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:61] [--lo:37]">There’s nothing at this address.</h1>
    <p class="fluid max-w-[540px] leading-[1.55] text-pretty text-ink-2 [--hi:19] [--lo:17]">The link may be out of date, or the address may have a typo.</p>
    <a href="/" class="btn mt-2">Go to the home page</a>
  </section>
</template>
