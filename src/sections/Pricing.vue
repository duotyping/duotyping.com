<script setup lang="ts">
import Icon from '../components/Icon.vue'
import { PLANS } from '../utils/facts'
</script>

<template>
  <!-- ── Pricing: each plan's price and what it gives ───────────────────────────────── -->
  <section id="pricing" class="wrap scroll-mt-[-40px] pt-[88px] lg:pt-[116px]">
    <div class="mb-8 flex flex-col gap-3.5 lg:mb-12 lg:gap-[18px]">
      <div class="eyebrow">Pricing</div>
      <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:54] [--lo:35]">Free to start.</h2>
    </div>
    <ul class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
      <li v-for="plan in PLANS" :key="plan.name" class="flex flex-col gap-4 rounded-[22px] border border-edge bg-card p-6 lg:p-8">
        <div class="flex items-center gap-3">
          <h3 class="font-display text-[24px] font-bold tracking-[-0.02em]">{{ plan.name }}</h3>
          <span v-if="plan.soon" class="tag">Coming soon</span>
        </div>
        <p class="flex flex-wrap items-baseline gap-x-2">
          <span class="font-display text-[34px] leading-none font-bold tracking-[-0.03em] text-ink">{{ plan.price }}</span>
          <span v-if="plan.per" class="text-[15px] text-ink-2">{{ plan.per }}</span>
        </p>
        <p class="text-[15.5px] text-ink-2">{{ plan.line }}</p>
        <ul class="flex flex-col gap-3 border-t border-line pt-4">
          <li v-for="item in plan.items" :key="item" class="flex gap-2.5 text-[15px] leading-[1.45] text-ink">
            <Icon name="check" class="mt-0.5 size-[18px] shrink-0 text-cyan-deep" />{{ item }}
          </li>
        </ul>
      </li>
    </ul>
    <p class="mt-5 text-[14px] text-ink-3">Prices are in US dollars. Sales tax or VAT, where it applies, is added at checkout.</p>
  </section>
</template>
