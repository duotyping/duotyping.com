<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { os, visitorKeys } from '../utils/platform'

// The three steps, as a demo the visitor drives: a message with its mistakes already selected,
// the real shortcut (or a click on its keys), then Accept or Skip on each card, as the apps do.
// Every reply is canned, so nothing typed or pressed here leaves the page.
type Fix = { from: string; to: string; changed: string; kind: 'Grammar' | 'Tone' }
type Sample = { chip: string; before: string; fixes: Fix[]; after: string }
const SAMPLES: Sample[] = [
  {
    chip: 'I have send',
    before: 'Thanks for the quick reply. ',
    fixes: [
      { from: 'I have send the revised contract to legal yesterday.', to: 'I sent the revised contract to legal yesterday.', changed: 'sent', kind: 'Grammar' },
      { from: 'they will be review it by Friday.', to: 'They will review it by Friday.', changed: 'They will review', kind: 'Grammar' },
    ],
    after: ' Let me know if anything is missing.',
  },
  {
    chip: 'revert back to me',
    before: 'Hi team, the deck is ready for the client. ',
    fixes: [{ from: 'Please revert back to me if any change is required.', to: 'Let me know if anything needs changing.', changed: 'Let me know', kind: 'Tone' }],
    after: '',
  },
  {
    chip: 'too blunt',
    before: 'Thanks for the update. ',
    fixes: [{ from: 'Send me the file ASAP.', to: 'Could you send me the file when you have a moment?', changed: 'Could you', kind: 'Tone' }],
    after: ' Thanks!',
  },
]

const KEYS = computed(() => (os.value === 'mac' ? ['⌃', '⌥', '⌘', 'D'] : os.value === 'windows' ? ['Win', 'Shift', 'D'] : ['Alt', 'Shift', 'D']))
const sample = ref(0)
const step = ref<'select' | 'review' | 'done'>('select')
const at = ref(0) // the card the review is on
const taken = ref<boolean[]>([]) // per fix: accepted
const said = ref('') // what a screen reader hears after each move

const current = computed(() => SAMPLES[sample.value]!)
const card = computed(() => current.value.fixes[at.value])

function pick(i: number) {
  sample.value = i
  step.value = 'select'
  at.value = 0
  taken.value = []
  said.value = ''
}
function check() {
  if (step.value !== 'select') return
  step.value = 'review'
  said.value = `${current.value.fixes.length} suggestion${current.value.fixes.length > 1 ? 's' : ''}.`
}
function next(accept: boolean) {
  if (step.value !== 'review' || !card.value) return
  taken.value[at.value] = accept
  said.value = accept ? `Changed to: ${card.value.to}` : 'Skipped. Your sentence stays.'
  at.value += 1
  if (at.value >= current.value.fixes.length) step.value = 'done'
}

// The shortcut works while the demo is on screen: ⌃⌥⌘D, Win+Shift+D or the extension's
// Alt+Shift+D, whichever this keyboard has. In the review, Return or Enter takes a card, and Delete
// or Backspace skips it; the card names them as this keyboard does.
const root = ref<HTMLElement | null>(null)
let inView = false
let io: IntersectionObserver | undefined
const onKey = (e: KeyboardEvent) => {
  if (!inView || e.code !== 'KeyD' && step.value !== 'review') return
  const shortcut = e.code === 'KeyD' && ((e.ctrlKey && e.altKey && e.metaKey) || (e.metaKey && e.shiftKey) || (e.altKey && e.shiftKey))
  if (shortcut) {
    e.preventDefault()
    if (step.value === 'done') pick(sample.value)
    check()
  } else if (step.value === 'review' && root.value?.contains(document.activeElement)) {
    if (e.key === 'Enter') { e.preventDefault(); next(true) }
    else if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); next(false) }
    else if (e.key === 'Escape') pick(sample.value)
  }
}
onMounted(() => {
  io = new IntersectionObserver(([e]) => (inView = !!e?.isIntersecting), { threshold: 0.4 })
  if (root.value) io.observe(root.value)
  addEventListener('keydown', onKey)
})
onUnmounted(() => {
  io?.disconnect()
  removeEventListener('keydown', onKey)
})
</script>

<template>
  <!-- ── Try it ─────────────────────────────────────────────────────────────────────── -->
  <section id="try" ref="root" class="wrap scroll-mt-[-40px] pt-[72px] lg:pt-24">
    <div class="flex flex-col gap-6 rounded-[28px] border border-edge bg-card p-5 md:p-9 lg:gap-8 lg:p-12">
      <div class="flex flex-col gap-2.5">
        <h2 class="fluid font-display leading-[1.06] font-bold tracking-[-0.03em] text-balance [--hi:46] [--lo:31]">
          <template v-if="os === 'phone'">Try it: tap the keys</template>
          <template v-else>Try it: press <span class="whitespace-nowrap">{{ KEYS.join(os === 'mac' ? '' : '+') }}</span></template>
        </h2>
        <p class="fluid text-ink-2 [--hi:18] [--lo:16]">{{ os === 'phone' ? '' : 'Or click the keys. ' }}Nothing you do here leaves the page.</p>
      </div>

      <!-- The keys take what they need, so the Mac's four never run into the review. -->
      <div class="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        <!-- The message, its mistakes already selected -->
        <div class="font-mac rounded-xl border border-key bg-white px-5 py-4 text-[15px] leading-[1.7] text-mac-ink shadow-[0_12px_28px_rgba(24,33,63,0.08)] md:text-base">
          {{ current.before
          }}<template v-for="(fix, i) in current.fixes" :key="fix.from"
            ><span
              class="rounded-[3px] transition-[background-color] duration-200 ease-out"
              :class="taken[i] ? 'bg-tag' : step === 'select' || (step === 'review' && i >= at) ? 'bg-select' : ''"
              >{{ taken[i] ? fix.to : fix.from }}</span
            >{{ i < current.fixes.length - 1 ? ' ' : '' }}</template
          >{{ current.after }}
        </div>

        <!-- The shortcut -->
        <div class="flex justify-center">
          <button
            type="button"
            class="group flex cursor-pointer items-center gap-2 rounded-2xl p-1 disabled:cursor-default"
            :disabled="step === 'review'"
            :aria-label="`Check the selection (${KEYS.join(' ')})`"
            @click="step === 'done' ? (pick(sample), check()) : check()"
          >
            <span
              v-for="k in KEYS"
              :key="k"
              class="keycap h-[52px] min-w-[52px] rounded-[11px] px-3 text-[17px] transition-[translate,background-color] duration-100 ease-out group-active:translate-y-0.5"
              :class="k === 'D' ? 'border-[#0A0F22] !bg-ink font-semibold text-cyan' : step === 'review' ? 'bg-tag' : ''"
            >{{ k }}</span>
          </button>
        </div>

        <!-- The review: one card at a time, as the app shows it -->
        <div class="font-mac min-h-[218px]">
          <div v-if="step === 'review' && card" class="overflow-hidden rounded-[10px] border border-edge bg-panel text-left text-ink shadow-[0_26px_60px_rgba(24,33,63,0.18),0_3px_10px_rgba(24,33,63,0.08)]">
            <div class="flex items-center gap-2.5 px-3.5 pt-3 pb-2.5">
              <span class="rounded-[5px] bg-tag px-2 py-[3px] text-[10.5px] font-semibold text-cyan-deep">Sentence by sentence</span>
              <span class="text-xs text-ink-2">{{ card.kind }} · {{ at + 1 }} of {{ current.fixes.length }}</span>
            </div>
            <div class="mx-2.5 mb-2.5 rounded-lg border border-accent bg-tint px-[13px] py-[11px]">
              <p class="mb-1 text-[15px] leading-[1.45]">
                <template v-for="(part, j) in card.to.split(card.changed)" :key="j"
                  ><span v-if="j > 0" class="font-semibold text-cyan-deep">{{ card.changed }}</span>{{ part }}</template
                >
              </p>
              <p class="mb-3 text-[13px] leading-[1.4] text-ink-3 line-through">{{ card.from }}</p>
              <div class="flex flex-wrap items-center gap-2">
                <button type="button" class="mk-btn cursor-pointer px-4 py-[7px] text-[13px]" @click="next(true)">Accept</button>
                <span v-if="visitorKeys" class="mk-kbd">{{ visitorKeys.accept }}</span>
                <button type="button" class="mk-btn-2 cursor-pointer px-4 py-[6px] text-[13px]" @click="next(false)">Skip</button>
                <span v-if="visitorKeys" class="mk-kbd">{{ visitorKeys.skip }}</span>
              </div>
            </div>
            <div class="border-t border-edge px-3.5 py-[9px] text-[11.5px] text-ink-3">Nothing changes until you accept.</div>
          </div>
          <div v-else class="flex h-full min-h-[218px] flex-col items-start justify-center gap-3 rounded-[10px] border border-dashed border-key px-5 py-4 text-[14.5px] text-ink-3">
            <template v-if="step === 'done'">
              <span class="font-semibold text-ink">Done: only what you accepted changed.</span>
              <button type="button" class="cursor-pointer font-semibold text-cyan-deep underline underline-offset-4" @click="pick(sample)">Start over</button>
            </template>
            <span v-else>The review appears here.</span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="mr-1 text-[14.5px] text-ink-3">Try another:</span>
        <button
          v-for="(s, i) in SAMPLES"
          :key="s.chip"
          type="button"
          class="h-9 cursor-pointer rounded-full border px-3.5 text-[14px] font-semibold transition-colors duration-200 ease-out"
          :class="i === sample ? 'border-ink bg-ink text-white' : 'border-edge bg-card text-ink hover:border-key'"
          :aria-pressed="i === sample"
          @click="pick(i)"
        >“{{ s.chip }}”</button>
      </div>
      <p class="sr-only" role="status">{{ said }}</p>
    </div>
  </section>
</template>
