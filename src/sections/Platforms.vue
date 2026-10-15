<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import Icon, { type IconName } from '../components/Icon.vue'
import { PLATFORMS, isLive, linkTo, type PlatformId } from '../utils/facts'
import { extensionStore, os } from '../utils/platform'

// Every platform on the home page, as decided on 2026-10-15 (no page per platform): its button once
// its store is live, what it needs and what it does, with the visitor's own one picked out. Mac and
// Windows do the same things, so they share the Desktop card: its icons and tags, each with its own button.
const CARDS: PlatformId[][] = [['mac', 'windows'], ['chrome'], ['web']]
const name = (ids: PlatformId[]) => (ids.length > 1 ? 'Desktop' : PLATFORMS[ids[0]!].name)
const ICON: Record<string, IconName> = { laptop: 'mac', pc: 'windows', browser: 'browser', phone: 'phone' }
const mine = computed<PlatformId>(() => (os.value === 'mac' ? 'mac' : os.value === 'windows' ? 'windows' : os.value === 'phone' ? 'web' : 'chrome'))
const label = (id: PlatformId) => (id === 'chrome' && extensionStore.value === 'edge' ? 'Add to Edge' : PLATFORMS[id].cta)

const copied = ref(false)
let reset: ReturnType<typeof setTimeout> | undefined
const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    return
  }
  copied.value = true
  clearTimeout(reset)
  reset = setTimeout(() => (copied.value = false), 1600)
}
onUnmounted(() => clearTimeout(reset))
</script>

<template>
  <!-- ── Every platform ─────────────────────────────────────────────────────────────── -->
  <section id="platforms" class="wrap scroll-mt-[-40px] pt-[88px] lg:pt-[116px]">
    <div class="mb-8 flex flex-col gap-3.5 lg:mb-12 lg:gap-[18px]">
      <div class="eyebrow">Platforms</div>
      <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:54] [--lo:35]">Wherever you write.</h2>
    </div>
    <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      <li
        v-for="ids in CARDS"
        :key="ids[0]"
        class="flex flex-col gap-4 rounded-[22px] border bg-card p-6"
        :class="ids.includes(mine) ? 'border-accent shadow-[0_0_0_1px_var(--color-accent)]' : 'border-edge'"
      >
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <Icon v-for="id in ids" :key="id" :name="ICON[PLATFORMS[id].device]!" class="size-8 text-ink" />
          </div>
          <span v-if="ids.includes(mine)" class="tag">Yours</span>
        </div>
        <h3 class="font-display text-[22px] font-bold tracking-[-0.02em]">{{ name(ids) }}</h3>
        <ul class="flex flex-wrap gap-1.5" aria-label="What it does">
          <li v-for="t in PLATFORMS[ids[0]!].tags" :key="t" class="rounded-md bg-chip px-2 py-1 text-[12.5px] font-medium text-ink-2">{{ t }}</li>
        </ul>
        <div class="mt-auto flex flex-col gap-4 pt-2">
          <div v-for="id in ids" :key="id" class="flex flex-col gap-2.5">
            <a v-if="isLive(id)" :href="linkTo(PLATFORMS[id].href)" class="btn btn-sm w-full" :class="mine !== id && 'btn-soft'">{{ label(id) }}</a>
            <p class="text-[13px] leading-[1.45] text-ink-3">{{ PLATFORMS[id].requires }}</p>
            <!-- The package manager's line only once there's a release for it to install -->
            <button
              v-if="PLATFORMS[id].install && isLive(id)"
              type="button"
              class="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-chip px-3 py-2 text-left font-mono text-[12px] text-ink-2"
              :aria-label="`Copy ${PLATFORMS[id].install}`"
              @click="copy(PLATFORMS[id].install!)"
            >
              <span class="truncate">{{ PLATFORMS[id].install }}</span>
              <Icon :name="copied ? 'check' : 'copy'" class="size-4 shrink-0" />
            </button>
          </div>
        </div>
      </li>
    </ul>
    <p class="sr-only" role="status">{{ copied ? 'Copied' : '' }}</p>
  </section>
</template>
