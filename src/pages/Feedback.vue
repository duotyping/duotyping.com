<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePageHead } from '../utils/head'
import { IDEAS_URL, SUPPORT_EMAIL, formUrl, mailUrl, setupLine } from '../utils/feedback'
import Mascot from '../components/brand/Mascot.vue'

// duotyping-specs specs/user-feedback.md §5 (F1), drawn in ui-design/site/01-feedback.html FB1–FB5.
// No form, no fields, nothing stored: the page reads its query once and links out.
usePageHead({
  title: 'Feedback — DuoTyping',
  description: 'Report one suggestion from the app, post a bug, an idea or a question on GitHub, or write to us privately.',
  path: '/feedback',
})

// Prerendered with no query (FB2); a client's Send Feedback… brings one, read once the page is live.
const setup = ref('')
// The mascot's moods (FB5): nod once at the setup it read, look while the mail app has the person,
// and otherwise only the blink. mark.css shows each one's resting pose under Reduce Motion.
const waiting = ref(false)
const mood = computed(() => (waiting.value ? 'look' : setup.value ? 'nod' : 'idle'))

let armed = false
let noMailApp: ReturnType<typeof setTimeout> | undefined
const onBlur = () => {
  if (waiting.value) armed = true
}
const onFocus = () => {
  if (armed) waiting.value = armed = false
}
// The mail app takes focus; when nothing does, there's nothing to wait on.
function emailed() {
  waiting.value = true
  armed = false
  clearTimeout(noMailApp)
  noMailApp = setTimeout(() => {
    if (!armed) waiting.value = false
  }, 2000)
}

onMounted(() => {
  setup.value = setupLine(location.search)
  addEventListener('blur', onBlur)
  addEventListener('focus', onFocus)
})
onUnmounted(() => {
  removeEventListener('blur', onBlur)
  removeEventListener('focus', onFocus)
  clearTimeout(noMailApp)
})

const external = '<path d="M9 3h4v4M13 3 7.5 8.5"/><path d="M11 9.5V13H3V5h3.5"/>'
</script>

<template>
  <article class="wrap pt-10 pb-24 md:pt-14 lg:pb-32">
    <div class="mx-auto flex max-w-[720px] flex-col gap-3.5">
      <div class="flex items-center gap-3 md:gap-5">
        <Mascot class="[--dtm-size:48px] md:[--dtm-size:64px]" :mood="mood" />
        <div class="flex min-w-0 flex-col gap-2.5 md:gap-3.5">
          <div class="eyebrow">Feedback</div>
          <h1 class="font-display text-[32px] leading-[1.06] font-bold tracking-[-0.03em] text-balance md:text-[44px]">Tell us what went wrong, or what you’d like</h1>
        </div>
      </div>
      <p class="text-[15.5px] leading-[1.55] text-ink-2 md:text-[16.5px]">Pick the way that fits. Nothing on this page sends your text anywhere.</p>
      <p v-if="setup" class="mt-1 inline-flex flex-wrap items-baseline gap-x-2 self-start rounded-2xl border border-line bg-card px-3 py-1.5 text-xs text-ink-2 md:text-[13px]">
        Your setup <b class="font-semibold text-ink">{{ setup }}</b>
      </p>

      <ol class="mt-2.5 flex flex-col gap-3.5">
        <li class="way">
          <span class="way-num">1</span>
          <div class="flex min-w-0 flex-1 flex-col gap-2">
            <h2>Something wrong with one suggestion?</h2>
            <p>Use <b>Report…</b> on its card: it tells DuoTyping which check, without your text.<template v-if="setup"> It’s quicker than anything below, and the only way that points at the exact suggestion.</template></p>
          </div>
          <!-- The card's own Report…, as the apps draw it; the words carry it on a phone. -->
          <div aria-hidden="true" class="hidden w-[236px] shrink-0 rounded-[10px] border border-key bg-card px-3 py-2.5 text-xs shadow-[0_6px_16px_rgba(24,33,63,.08)] sm:block">
            <span class="rounded-full bg-tag px-2 py-0.5 text-[11px] font-semibold text-cyan-deep">Grammar</span>
            <p class="mt-1.5 leading-[1.45]"><s class="text-struck">their</s> <b class="text-ink">there</b></p>
            <div class="mt-2 flex items-center gap-1.5">
              <span class="rounded-md bg-accent px-2 py-1 text-[11px] font-semibold text-white">Accept</span>
              <span class="rounded-md bg-chip px-2 py-1 text-[11px] font-semibold text-ink">Skip</span>
              <span class="ml-auto rounded-[5px] bg-tag px-1.5 py-0.5 text-[11.5px] font-semibold text-cyan-deep ring-2 ring-tag">Report…</span>
            </div>
          </div>
        </li>

        <li class="way">
          <span class="way-num">2</span>
          <div class="flex min-w-0 flex-1 flex-col gap-2">
            <h2>A bug, an idea or a question</h2>
            <p v-if="setup">Post it on GitHub, where others can add to it. Ideas stay open with the label <i>idea</i>, and a 👍 on one is a vote.</p>
            <p v-else>Post it on GitHub. The form asks for your DuoTyping version, system and provider: they’re in About.</p>
            <div class="mt-1 flex flex-wrap items-center gap-4">
              <a :href="formUrl(setup)" target="_blank" rel="noopener" class="btn btn-sm max-sm:w-full">
                Open the form on GitHub
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="external" />
                <span class="sr-only">(opens in a new tab)</span>
              </a>
              <a :href="IDEAS_URL" target="_blank" rel="noopener" class="way-link">See the ideas ↗</a>
            </div>
            <p class="fine">What you post there is public. Describe your text; don’t paste it.</p>
          </div>
        </li>

        <li id="private" class="way scroll-mt-24">
          <span class="way-num">3</span>
          <div class="flex min-w-0 flex-1 flex-col gap-2">
            <h2>Something private, or about your data</h2>
            <p>Write to <b>{{ SUPPORT_EMAIL }}</b>. Paste <b>Copy Support Info</b> from About, so we can find the check.</p>
            <div class="mt-1 flex flex-wrap items-center gap-4">
              <a :href="mailUrl(setup)" class="btn btn-sm btn-soft max-sm:w-full" @click="emailed">Email support</a>
              <span class="fine" aria-live="polite">{{ waiting ? 'Finish in your mail app.' : 'Only you and DuoTyping read it.' }}</span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </article>
</template>
