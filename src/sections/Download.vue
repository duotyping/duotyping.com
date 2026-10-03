<script setup lang="ts">
import AppIcon from '../components/brand/AppIcon.vue'
import ShareActions from '../components/ShareActions.vue'
</script>

<template>
  <!-- ── Download ───────────────────────────────────────────────────────────────────── -->
  <section id="download" class="wrap flex scroll-mt-[-60px] flex-col items-center gap-[22px] pt-[100px] pb-[88px] text-center lg:scroll-mt-[-92px] lg:gap-[30px] lg:pt-[140px] lg:pb-[124px]">
    <AppIcon class="[--icon:104px] lg:[--icon:120px]" />
    <h2 class="fluid mt-1.5 font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:67] [--lo:40]">Say it well, wherever you write.</h2>
    <p class="fluid leading-[1.55] text-pretty text-ink-2 [--hi:21] [--lo:17.5]">Local by default. Every change is yours to accept.</p>
    <ShareActions class="w-full sm:hidden" />
    <div class="flex flex-col items-center gap-[22px] sm:mt-1.5 sm:gap-4">
      <span class="btn btn-soon max-sm:hidden">Coming soon</span>
      <p class="text-sm text-ink-3 sm:text-[14.5px]">macOS 14 Sonoma or later · Apple silicon</p>
    </div>
  </section>
</template>
