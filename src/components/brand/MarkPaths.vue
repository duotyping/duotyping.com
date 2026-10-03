<script setup lang="ts">
import { computed } from 'vue'

// The two bubbles, yours behind and the assistant's in front with its two tall eyes, in the
// 18-unit box (the app icon's 100-unit art at 0.18). A bare <g>, so any SVG can place it: the
// lockup, the watermark on a stage.
type Tone = 'paper' | 'ink' | 'desk'
const TONES: Record<Tone, [string, string, string]> = {
  // your bubble, the assistant's, its eyes
  paper: ['#D7784F', '#18213F', '#3EE6FF'],
  // On the midnight band: the assistant's bubble lifts a step, so it doesn't vanish into it.
  ink: ['#D7784F', '#3A4A86', '#3EE6FF'],
  // Printed faintly into a product stage.
  desk: ['#EBCDBD', '#CDD3E2', '#E3E7EF'],
}
const props = withDefaults(defineProps<{ tone?: Tone }>(), { tone: 'paper' })
const c = computed(() => TONES[props.tone])
</script>

<template>
  <!-- The tight stack, with no outline: Icon Composer's glass rim draws the edges on the real icon. -->
  <g transform="scale(0.18)">
    <path d="M31.76 15.49H63.76A18 18 0 0 1 81.76 33.49V45.49A18 18 0 0 1 63.76 63.49L73.76 71.49L53.76 63.49H31.76A18 18 0 0 1 13.76 45.49V33.49A18 18 0 0 1 31.76 15.49Z" :fill="c[0]" />
    <path d="M40 26H74A18 18 0 0 1 92 44V62A18 18 0 0 1 74 80L84 88L64 80H40A18 18 0 0 1 22 62V44A18 18 0 0 1 40 26Z" :fill="c[1]" />
    <g :fill="c[2]">
      <rect x="42.91" y="44.31" width="9.33" height="17.49" rx="2.99" />
      <rect x="61.76" y="44.31" width="9.33" height="17.49" rx="2.99" />
    </g>
  </g>
</template>
