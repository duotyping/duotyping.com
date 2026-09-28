<script setup>
import { computed } from 'vue'

// The page's line icons, on a 24-unit grid, drawn once here. [markup, stroke width].
const ICONS = {
  download: ['<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14"/>', 2],
  'arrow-down': ['<path d="M12 5v14M6.5 13.5 12 19l5.5-5.5"/>', 2],
  'arrow-right': ['<path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5"/>', 1.8],
  share: ['<path d="M12 3.5v11M8 7.5l4-4 4 4"/><path d="M7 10.5H6a1.8 1.8 0 0 0-1.8 1.8v6.4A1.8 1.8 0 0 0 6 20.5h12a1.8 1.8 0 0 0 1.8-1.8v-6.4a1.8 1.8 0 0 0-1.8-1.8h-1"/>', 2],
  copy: ['<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>', 1.9],
  check: ['<path d="M5.5 12.5l4.2 4.2L18.5 8"/>', 2],
  menu: ['<path d="M4 7.5h16M4 12h16M4 16.5h16"/>', 1.8],
  close: ['<path d="M6 6l12 12M18 6 6 18"/>', 1.8],
  undo: ['<path d="M19 5v6.5a3 3 0 0 1-3 3H6"/><path d="M9.5 11 6 14.5 9.5 18"/>', 1.7],
  mac: ['<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M9 20h6M12 16.5V20"/>', 1.7],
  'no-account': ['<circle cx="12" cy="8.5" r="3.4"/><path d="M5.2 19.5c1.2-3 3.8-4.8 6.8-4.8s5.6 1.8 6.8 4.8"/><path d="M4 4l16 16"/>', 1.7],
  note: ['<rect x="3.5" y="4" width="17" height="16" rx="2.6"/><path d="M3.5 8.2h17"/><path d="M8.5 16.8l.5-2.3 5.3-5.3 1.8 1.8-5.3 5.3-2.3.5Z"/>', 1.7],
  fixes: ['<path d="M3.5 16.5 7.5 6l4 10.5M5 12.8h5"/><path d="M13.5 15.2l2.6 2.6 4.6-5.3"/>', 1.7],
  lines: ['<path d="M4 6.5h16M4 11.5h11M4 16.5h14"/>', 1.7],
  shield: ['<path d="M12 3.5 5.5 6.2v5.1c0 4.1 2.8 7.3 6.5 8.9 3.7-1.6 6.5-4.8 6.5-8.9V6.2L12 3.5Z"/><path d="M9 12.2l2.1 2.1 4-4.1"/>', 1.7],
  keyboard: ['<rect x="2.8" y="6.2" width="18.4" height="11.6" rx="2.2"/><path d="M6.8 10h.01M10 10h.01M13.2 10h.01M16.4 10h.01M8 14h8"/>', 1.7],
  'no-tracking': ['<path d="M3 12s3.3-6 9-6 9 6 9 6-3.3 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="2.5"/><path d="M4 4l16 16"/>', 1.7],
  'nothing-kept': ['<rect x="4" y="4.5" width="16" height="4.2" rx="1.2"/><path d="M5.6 8.7v8.8a1.6 1.6 0 0 0 1.6 1.6h9.6a1.6 1.6 0 0 0 1.6-1.6V8.7"/><path d="M10 12.5l4 4M14 12.5l-4 4"/>', 1.7],
  key: ['<circle cx="8" cy="12" r="3.6"/><path d="M11.6 12H20.5M17.2 12v3M20.5 12v2.4"/>', 1.7],
  verified: ['<path d="M12 3.2l2.3 1.7 2.9-.1.9 2.7 2.3 1.7-.9 2.8.9 2.8-2.3 1.7-.9 2.7-2.9-.1L12 20.8l-2.3-1.7-2.9.1-.9-2.7-2.3-1.7.9-2.8-.9-2.8 2.3-1.7.9-2.7 2.9.1Z"/><path d="M9 12l2 2 4-4"/>', 1.7],
  selection: ['<path d="M4 6.5h16M4 17.5h16"/><rect x="4" y="9.6" width="16" height="4.8" rx="1.2"/>', 1.7],
  lock: ['<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7"/>', 1.7],
  chevron: ['<path d="M6.5 9.5 12 15l5.5-5.5"/>', 2],
  minus: ['<path d="M6 12h12"/>', 2],
  plus: ['<path d="M12 6v12M6 12h12"/>', 2],
}

const props = defineProps({ name: { type: String, required: true }, stroke: Number })
const icon = computed(() => ICONS[props.name])
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke ?? icon[1]"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="block shrink-0"
    v-html="icon[0]"
  />
</template>
