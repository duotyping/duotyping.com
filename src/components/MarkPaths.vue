<script setup lang="ts">
import { computed } from 'vue'

// The two pencils, one of them the assistant, in their 18-unit box at −38° (Brand board).
// A bare <g>, so any SVG can place it: the lockup, the watermark on a stage, the diagram.
// `part` draws just one of them, for a drawing where each pencil moves on its own.
type Tone = 'paper' | 'ink' | 'desk'
const TONES: Record<Tone, [string, string, string, string, string, number]> = {
  // back, its lead, front, its lead, the sparkle, the back pencil's opacity
  paper: ['#4A2D1E', '#33251C', '#C97A52', '#33251C', '#F1EFE6', 0.95],
  // On ink: the Dark-appearance colours.
  ink: ['#9A6B49', '#3A241A', '#E5A075', '#3A241A', '#F7ECDF', 0.95],
  // Printed faintly into a product stage.
  desk: ['#DCCDB2', '#D2BD9A', '#E2C5A4', '#D2BD9A', '#EEE4CF', 1],
}
const props = withDefaults(defineProps<{ tone?: Tone; part?: 'back' | 'front' }>(), { tone: 'paper' })
const c = computed(() => TONES[props.tone])
</script>

<template>
  <g transform="rotate(38 9 9)">
    <template v-if="part !== 'front'">
      <path
        d="M5.46 3.5a2.3 2.3 0 0 1 4.6 0L10.06 10.102Q10.06 10.7 9.773 11.225L7.972 14.514a.2116 .2116 0 0 1-.423 0L5.747 11.225Q5.46 10.7 5.46 10.102Z"
        :fill="c[0]"
        :opacity="c[5]"
      />
      <path d="M6.868 13.27L8.652 13.27L7.972 14.514a.2116 .2116 0 0 1-.423 0Z" :fill="c[1]" :opacity="c[5]" />
    </template>
    <template v-if="part !== 'back'">
      <path
        d="M7.94 5.5a2.3 2.3 0 0 1 4.6 0L12.54 12.102Q12.54 12.7 12.253 13.225L10.452 16.514a.2116 .2116 0 0 1-.423 0L8.227 13.225Q7.94 12.7 7.94 12.102Z"
        :fill="c[2]"
      />
      <path d="M9.348 15.27L11.132 15.27L10.452 16.514a.2116 .2116 0 0 1-.423 0Z" :fill="c[3]" />
      <path
        d="M10.24 8.61C10.41 9.69 10.89 9.88 11.68 10.05C10.89 10.22 10.41 10.41 10.24 11.49C10.07 10.41 9.59 10.22 8.8 10.05C9.59 9.88 10.07 9.69 10.24 8.61Z"
        :fill="c[4]"
      />
    </template>
  </g>
</template>
