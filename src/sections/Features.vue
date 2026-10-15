<script setup lang="ts">
import CountBadge from '../components/demo/CountBadge.vue'
import DraftDemo from '../components/demo/DraftDemo.vue'
import InlineRewriteCard from '../components/demo/InlineRewriteCard.vue'
import RewritePill from '../components/demo/RewritePill.vue'
import FeatureTile from '../components/tiles/FeatureTile.vue'
import PronounceTile from '../components/tiles/PronounceTile.vue'
import ToneTile from '../components/tiles/ToneTile.vue'
import TranslateTile from '../components/tiles/TranslateTile.vue'

// Where each feature works today, from the feature inventory (duotyping-specs product/*-prd.md).
const ON = {
  marks: ['Mac', 'Windows', 'Chrome', 'Web'],
  rewrite: ['Mac', 'Windows', 'Chrome'],
  translate: ['Mac', 'Windows', 'Web'],
  pronounce: ['Mac', 'Windows', 'Web'],
  tone: ['Mac', 'Windows', 'Chrome', 'Web'],
  write: ['Mac', 'Windows', 'Web'],
}
</script>

<template>
  <!-- ── Features: every one shown working ──────────────────────────────────────────── -->
  <section id="features" class="wrap scroll-mt-[-40px] pt-[72px] lg:pt-24">
    <div class="mb-8 flex flex-col gap-3.5 lg:mb-12 lg:gap-[18px]">
      <div class="eyebrow">Features</div>
      <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:54] [--lo:35]">Every feature, working.</h2>
    </div>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
      <FeatureTile loop line="Mistakes get a wavy line while you type, in apps you switch on." :on="ON.marks">
        <div class="flex items-start gap-2">
          <div class="font-mac w-[262px] rounded-[10px] border border-key bg-white px-4 py-3.5 text-[13px] leading-[1.75] text-mac-ink shadow-[0_12px_28px_rgba(24,33,63,0.10)] md:w-[400px] md:text-sm">
            Hi team, just to confirm, I <span class="wavy loop-m1">have send</span> the deck to the client and they <span class="wavy loop-m2">will be review</span> it tomorrow.
            <span class="wavy loop-m3 [--mark:var(--color-slate)]">Please revert back to me if any change is required.</span>
          </div>
          <CountBadge class="loop-badge">
            <span class="inline-grid justify-items-center">
              <span class="loop-n1 opacity-0 [grid-area:1/1]">1</span><span class="loop-n2 opacity-0 [grid-area:1/1]">2</span><span class="loop-n3 [grid-area:1/1]">3</span>
            </span>
          </CountBadge>
        </div>
        <template #title>Marks as you type</template>
      </FeatureTile>

      <FeatureTile loop line="Select a sentence and pick a better way to say it." :on="ON.rewrite">
        <div class="flex flex-col items-start gap-3">
          <div class="flex items-center gap-2.5">
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
            class="loop-rpop w-[300px] md:w-[420px]"
          />
        </div>
        <template #title>Rewrite a sentence</template>
      </FeatureTile>

      <FeatureTile loop line="Write it in your language; get three ways to say it." :on="ON.translate">
        <TranslateTile />
        <template #title>Translate <del class="text-struck decoration-terra decoration-[0.08em]">later</del> right here</template>
      </FeatureTile>

      <FeatureTile line="Click a word to hear it, lit beside its IPA." :on="ON.pronounce">
        <PronounceTile />
        <template #title>Hear how it sounds</template>
      </FeatureTile>

      <FeatureTile line="Switch the profile and watch the same sentence change tone." :on="ON.tone">
        <ToneTile />
        <template #title>Same words, any tone</template>
      </FeatureTile>

      <FeatureTile loop line="Nothing selected? Write opens. On the web, drafts follow you." :on="ON.write">
        <DraftDemo class="w-[318px] max-w-full origin-center md:w-[440px] lg:scale-90" />
        <template #title>A quiet place to <del class="text-struck decoration-terra decoration-[0.08em]">writing</del> write</template>
      </FeatureTile>
    </div>
  </section>
</template>
