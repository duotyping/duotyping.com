<script setup>
// One card in the popup: where it came from, the new text with the change in clay, your
// original struck through underneath, and the keys that act on it.
defineProps({
  label: String, // "Sentence 1 of 2"
  focused: Boolean, // the card the keyboard is on
  cloud: String, // a cloud model's card says so: "Anthropic · your key"
  original: String,
  actions: String, // 'accept' · 'accept-skip' · 'replace'
  pressed: Boolean, // Accept, mid-press (the demo)
  size: { type: String, default: 'text-sm' }, // the suggestion's own size
  originalSize: { type: String, default: 'text-xs' },
})
</script>

<template>
  <div class="rounded-lg border px-[13px] py-[11px]" :class="focused ? 'border-clay bg-tint' : 'border-edge bg-card'">
    <div class="mb-[7px] flex items-center gap-2">
      <span class="text-[11px] text-ink-2">{{ label }}</span>
      <span v-if="cloud" class="mk-tag mk-tag-cloud">
        <svg width="10" height="9" viewBox="0 0 13 12" fill="none" aria-hidden="true">
          <path d="M3.6 9.2a2.6 2.6 0 0 1 .3-5.18 3.4 3.4 0 0 1 6.5.9 2.3 2.3 0 0 1-.5 4.28H3.6Z" stroke="#3D4E59" stroke-width="1.2" stroke-linejoin="round" />
        </svg>{{ cloud }}
      </span>
      <span v-else class="mk-tag">
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <rect x="1.5" y="2.5" width="9" height="7" rx="1.5" stroke="#8A5A1E" stroke-width="1.3" />
          <path d="M4 11h4" stroke="#8A5A1E" stroke-width="1.3" stroke-linecap="round" />
        </svg>On this Mac
      </span>
    </div>
    <p class="leading-[1.45] text-ink" :class="[size, original ? 'mb-1' : actions ? 'mb-2.5' : '']"><slot /></p>
    <p v-if="original" class="leading-[1.4] text-ink-3 line-through" :class="[originalSize, actions && 'mb-2.5']">{{ original }}</p>
    <div v-if="actions" class="flex flex-wrap items-center gap-2">
      <span class="mk-btn transition-[background-color,scale] duration-120 ease-out" :class="pressed && 'scale-96 bg-[#8F3C1B]'">
        {{ actions === 'replace' ? 'Replace selection' : 'Accept' }}
      </span>
      <span class="mk-kbd">return</span>
      <template v-if="actions === 'accept-skip'">
        <span class="mk-btn-2">Skip</span>
        <span class="mk-kbd">delete</span>
      </template>
    </div>
  </div>
</template>
