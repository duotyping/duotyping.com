<script setup lang="ts">
// One card in the popup: which provider checked it, the new text with the change in deep cyan, your
// original struck through underneath, and the keys that act on it.
withDefaults(
  defineProps<{
    label: string // "Sentence 1 of 2"
    focused?: boolean // the card the keyboard is on
    cloud?: string // the provider and whose key: "OpenAI · your key"; empty in a note, which has no chip
    original?: string
    actions?: 'accept' | 'accept-skip' | 'replace'
    pressed?: boolean // Accept, mid-press (the demo)
    size?: string // the suggestion's own size
    originalSize?: string
  }>(),
  { cloud: 'OpenAI · your key', size: 'text-sm', originalSize: 'text-xs' },
)
</script>

<template>
  <div class="rounded-lg border px-[13px] py-[11px]" :class="focused ? 'border-accent bg-tint' : 'border-edge bg-card'">
    <div class="mb-[7px] flex items-center gap-2">
      <span class="text-[11px] text-ink-2">{{ label }}</span>
      <span v-if="cloud" class="mk-tag border border-[#A9B7C0] bg-transparent px-[7px] py-px text-slate">
        <svg width="10" height="9" viewBox="0 0 13 12" fill="none" aria-hidden="true">
          <path d="M3.6 9.2a2.6 2.6 0 0 1 .3-5.18 3.4 3.4 0 0 1 6.5.9 2.3 2.3 0 0 1-.5 4.28H3.6Z" stroke="#3D4E59" stroke-width="1.2" stroke-linejoin="round" />
        </svg>{{ cloud }}
      </span>
    </div>
    <p class="leading-[1.45] text-ink" :class="[size, original ? 'mb-1' : actions ? 'mb-2.5' : '']"><slot /></p>
    <p v-if="original" class="leading-[1.4] text-ink-3 line-through" :class="[originalSize, actions && 'mb-2.5']">{{ original }}</p>
    <div v-if="actions" class="flex flex-wrap items-center gap-2">
      <span class="mk-btn transition-[background-color,scale] duration-120 ease-out" :class="pressed && 'scale-96 bg-accent-press'">
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
