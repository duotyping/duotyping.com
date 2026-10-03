<script setup lang="ts">
import { computed } from 'vue'

// The two bubbles, yours behind and the assistant's in front with its two tall eyes, in the
// 18-unit box (the app icon's 100-unit art at 0.18). A bare <g>, so any SVG can place it: the
// lockup, the watermark on a stage.
type Tone = 'paper' | 'ink' | 'desk'
const TONES: Record<Tone, [string, string, string, string]> = {
  // your bubble, the assistant's, its eyes, the outline
  paper: ['#D7784F', '#18213F', '#3EE6FF', '#0A0F22'],
  // On ink: the outline turns paper, so the midnight bubble keeps its edge.
  ink: ['#D7784F', '#18213F', '#3EE6FF', '#F6F7F9'],
  // Printed faintly into a product stage.
  desk: ['#EBCDBD', '#CDD3E2', '#E3E7EF', '#C3CAD8'],
}
const props = withDefaults(defineProps<{ tone?: Tone }>(), { tone: 'paper' })
const c = computed(() => TONES[props.tone])
</script>

<template>
  <g transform="scale(0.18)" :stroke="c[3]" stroke-width="2.4" stroke-linejoin="round">
    <path d="M26 8H58A18 18 0 0 1 76 26V38A18 18 0 0 1 58 56L68 64L48 56H26A18 18 0 0 1 8 38V26A18 18 0 0 1 26 8Z" :fill="c[0]" />
    <path d="M40 26H74A18 18 0 0 1 92 44V62A18 18 0 0 1 74 80L84 88L64 80H40A18 18 0 0 1 22 62V44A18 18 0 0 1 40 26Z" :fill="c[1]" />
    <g :fill="c[2]" stroke="none">
      <rect x="40.56" y="42.8" width="10.88" height="20.4" rx="3.48" />
      <rect x="62.56" y="42.8" width="10.88" height="20.4" rx="3.48" />
    </g>
  </g>
</template>
