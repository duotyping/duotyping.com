<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// Pronounce: click a word, hear it, and see it lit beside its IPA, slowly if you like. It speaks
// only with a voice that lives on this device: a browser's online voices would send the word
// away, and this page sends nothing. With none, the word still lights up.
const WORDS: [string, string][] = [
  ['record', '/ˈrek.ɚd/'],
  ['schedule', '/ˈskedʒ.uːl/'],
  ['colleague', '/ˈkɑː.liːɡ/'],
]
const lit = ref<number | null>(null)
const slow = ref(false)
const voice = ref<SpeechSynthesisVoice | null>(null)
const ready = ref(false)

const pickVoice = () => {
  const local = speechSynthesis.getVoices().filter((v) => v.localService && v.lang.startsWith('en'))
  voice.value = local.find((v) => v.lang === 'en-US') ?? local[0] ?? null
  ready.value = true
}
let clear: ReturnType<typeof setTimeout> | undefined
function say(i: number) {
  lit.value = i
  clearTimeout(clear)
  if (!voice.value) {
    clear = setTimeout(() => (lit.value = null), 900)
    return
  }
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(WORDS[i]![0])
  u.voice = voice.value
  u.lang = voice.value.lang
  u.rate = slow.value ? 0.55 : 0.95
  u.onend = () => (lit.value = null)
  speechSynthesis.speak(u)
}
onMounted(() => {
  if (!('speechSynthesis' in window)) return void (ready.value = true)
  pickVoice()
  speechSynthesis.addEventListener('voiceschanged', pickVoice)
})
onUnmounted(() => {
  clearTimeout(clear)
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  speechSynthesis.removeEventListener('voiceschanged', pickVoice)
})
</script>

<template>
  <div class="font-mac flex w-[310px] max-w-full flex-col items-center gap-5 md:w-[440px]">
    <div class="grid w-full grid-cols-3 gap-2.5">
      <button
        v-for="([word, ipa], i) in WORDS"
        :key="word"
        type="button"
        class="flex cursor-pointer flex-col items-center gap-1 rounded-xl border px-2 py-3.5 transition-colors duration-200 ease-out"
        :class="lit === i ? 'border-accent bg-tint' : 'border-edge bg-panel hover:border-key'"
        :aria-label="`Hear ${word}, ${ipa}`"
        @click="say(i)"
      >
        <span class="text-[17px] font-semibold text-mac-ink md:text-[19px]">{{ word }}</span>
        <span class="text-[13px] text-ink-3 md:text-sm">{{ ipa }}</span>
      </button>
    </div>
    <label class="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ink-2">
      <input v-model="slow" type="checkbox" class="size-4 accent-[var(--color-accent)]" />Slowly
    </label>
    <p class="min-h-[1.5em] text-center text-[12.5px] text-ink-3">
      {{ !ready ? '' : voice ? 'In your browser’s own voice, offline.' : 'No offline voice in this browser; the apps use your system’s.' }}
    </p>
  </div>
</template>
