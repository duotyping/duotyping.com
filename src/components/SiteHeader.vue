<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from './brand/BrandMark.vue'
import Icon from './Icon.vue'
import ShareActions from './ShareActions.vue'

const route = useRoute()
// "#how" on the home page, "/#how" everywhere else. A bare "/#how" on the home page would
// reload it whenever the address carries a query string.
const at = (hash: string) => (route.path === '/' ? hash : `/${hash}`)
const LINKS = [
  ['#how', 'How it works'],
  ['#privacy', 'Privacy'],
  ['#models', 'Models'],
  ['#faq', 'FAQ'],
]

// Once the page moves: 88 % paper, an 18 px blur and a soft shadow (Components board).
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
    class="sticky top-0 z-40 h-16 border-b border-ink/8 transition-[background-color,box-shadow] duration-200 ease-out lg:h-[76px]"
    :class="open ? 'bg-paper' : scrolled && 'bg-paper/88 shadow-[0_8px_24px_rgba(30,42,50,0.06)] backdrop-blur-[18px]'"
  >
    <div class="wrap flex h-full items-center justify-between max-lg:pr-[calc(var(--gutter)-8px)]">
      <a :href="route.path === '/' ? '#top' : '/'" aria-label="DuoTyping home" class="flex items-center gap-[9px] text-ink lg:gap-2.5">
        <BrandMark class="size-7 lg:size-8" />
        <span class="text-[18.5px] font-semibold tracking-[-0.02em] lg:text-[21px]">DuoTyping</span>
      </a>
      <nav aria-label="Main" class="hidden items-center gap-9 lg:flex">
        <a v-for="[hash, label] in LINKS" :key="hash" :href="at(hash)" class="nav-link">{{ label }}</a>
        <span class="btn btn-soon btn-sm">Coming soon</span>
      </nav>
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
          <div class="mt-[22px]">
            <!-- A phone can't install it, so pass the link on; a tablet-sized window might be a Mac. -->
            <ShareActions class="sm:hidden" />
            <span class="btn btn-soon w-full max-sm:hidden">Coming soon</span>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
