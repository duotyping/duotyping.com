<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from './brand/BrandMark.vue'
import Icon from './Icon.vue'
import ShareActions from './ShareActions.vue'
import { headerCta } from '../utils/cta'
import { WEB_APP_URL } from '../utils/facts'
import { detectPlatform } from '../utils/platform'

const route = useRoute()
// "#faq" on the home page, "/#faq" everywhere else. A bare "/#faq" on the home page would
// reload it whenever the address carries a query string.
const at = (hash: string) => (route.path === '/' ? hash : `/${hash}`)
const LINKS = [
  ['#features', 'Features'],
  ['#platforms', 'Platforms'],
  ['#pricing', 'Pricing'],
  ['#faq', 'FAQ'],
]

// 88 % paper and an 18 px blur from the first paint, so the page never shows through even before
// (or without) the script; once the page moves, a soft shadow too (Components board). At the top
// it sits on paper, so it looks the same as none. The blur sits on a layer of its own: on the
// header itself it would make the header the phone menu's containing block, and the menu, fixed
// below the header's 64 px, would open with no height.
const scrolled = ref(false)
const onScroll = () => (scrolled.value = scrollY > 0)

// The phone menu covers the page under the header, and the page behind it goes inert, so Tab
// and a screen reader stay in the menu. Synchronous, so the scroll lock is off again before
// a tapped link starts scrolling to its section.
const open = ref(false)
const close = () => (open.value = false)
watch(
  open,
  (on) => {
    document.documentElement.style.overflow = on ? 'hidden' : ''
    for (const el of document.querySelectorAll<HTMLElement>('main, footer')) el.inert = on
  },
  { flush: 'sync' },
)
const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
let wide: MediaQueryList | undefined
onMounted(() => {
  detectPlatform()
  onScroll()
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('keydown', onKey)
  wide = matchMedia('(min-width: 64rem)')
  wide.addEventListener('change', close)
})
onUnmounted(() => {
  removeEventListener('scroll', onScroll)
  removeEventListener('keydown', onKey)
  wide?.removeEventListener('change', close)
  close()
})
</script>

<template>
  <header
    class="sticky top-0 z-40 h-16 border-b border-ink/8 transition-shadow duration-200 ease-out lg:h-[76px]"
    :class="scrolled && 'shadow-[0_8px_24px_rgba(24,33,63,0.06)]'"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 transition-colors duration-200 ease-out [-webkit-backdrop-filter:blur(18px)] [backdrop-filter:blur(18px)]"
      :class="open ? 'bg-paper' : 'bg-paper/88'"
    />
    <div class="wrap flex h-full items-center justify-between max-lg:pr-[calc(var(--gutter)-8px)]">
      <a :href="route.path === '/' ? '#top' : '/'" aria-label="DuoTyping home" class="flex items-center gap-[9px] text-ink lg:gap-2.5">
        <BrandMark class="size-7 lg:size-8" />
        <span class="text-[18.5px] font-semibold tracking-[-0.02em] lg:text-[21px]">DuoTyping</span>
      </a>
      <div class="flex items-center gap-1 lg:gap-6">
        <nav aria-label="Main" class="hidden items-center gap-8 lg:flex">
          <a v-for="[hash, label] in LINKS" :key="hash" :href="at(hash)" class="nav-link">{{ label }}</a>
          <div class="flex items-center gap-2.5">
            <a :href="WEB_APP_URL" class="btn btn-soft h-11 rounded-xl px-[18px] text-[15.5px]">Use now</a>
            <a v-if="headerCta" :href="headerCta.href" class="btn h-11 rounded-xl px-[18px] text-[15.5px]">{{ headerCta.label }}</a>
          </div>
        </nav>
        <a :href="WEB_APP_URL" class="btn btn-soft mr-1 h-9 rounded-[10px] px-3.5 text-[14.5px] lg:hidden">Use now</a>
        <button
          type="button"
          class="flex size-11 cursor-pointer items-center justify-center text-ink lg:hidden"
          aria-controls="menu"
          :aria-expanded="open"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <Icon :name="open ? 'close' : 'menu'" :class="open ? 'size-[22px]' : 'size-6'" />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-show="open" id="menu" class="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-paper lg:hidden">
        <nav aria-label="Menu" class="wrap flex flex-col pt-3 pb-6">
          <a
            v-for="[hash, label] in LINKS"
            :key="hash"
            :href="at(hash)"
            class="flex min-h-14 items-center justify-between border-b border-line font-display text-2xl font-semibold tracking-[-0.02em] text-ink"
            @click="close"
          >
            {{ label }}<Icon name="arrow-right" class="size-5 text-ink-3" />
          </a>
          <div class="mt-[22px] flex flex-col gap-2.5">
            <a :href="WEB_APP_URL" class="btn w-full">Use now</a>
            <!-- A phone can't install the apps, so pass the link on; a tablet-sized window might be a computer. -->
            <ShareActions class="sm:hidden" soft />
            <a v-if="headerCta" :href="headerCta.href" class="btn btn-soft w-full max-sm:hidden">{{ headerCta.label }}</a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
