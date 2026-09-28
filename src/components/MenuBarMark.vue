<script setup>
import { useId } from 'vue'

// The menu-bar template: the same two pencils in one channel, a gap cut between them and the
// sparkle cut out of the front one, so it stays two pencils at 16 px. The mask id is per
// instance: an id shared across the page resolves to the first copy, and a copy inside a
// display:none stage renders nothing.
defineProps({ color: { type: String, default: '#1E2A32' } })
const id = useId()
</script>

<template>
  <svg viewBox="0 0 18 18" aria-hidden="true" class="block shrink-0">
    <g transform="translate(9 9) scale(1.0485) translate(-9.411 -8.796) rotate(38 9 9)" :fill="color">
      <mask :id="id" maskUnits="userSpaceOnUse" x="-2" y="-2" width="22" height="22">
        <rect x="-2" y="-2" width="22" height="22" fill="#FFFFFF" />
        <path
          d="M8.34 5.5a2.3 2.3 0 0 1 4.6 0L12.94 12.102Q12.94 12.7 12.653 13.225L10.852 16.514a.2116 .2116 0 0 1-.423 0L8.627 13.225Q8.34 12.7 8.34 12.102Z"
          fill="#000000"
          stroke="#000000"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
      </mask>
      <path
        d="M5.06 3.5a2.3 2.3 0 0 1 4.6 0L9.66 10.102Q9.66 10.7 9.373 11.225L7.572 14.514a.2116 .2116 0 0 1-.423 0L5.347 11.225Q5.06 10.7 5.06 10.102Z"
        :mask="`url(#${id})`"
      />
      <path
        fill-rule="evenodd"
        d="M8.34 5.5a2.3 2.3 0 0 1 4.6 0L12.94 12.102Q12.94 12.7 12.653 13.225L10.852 16.514a.2116 .2116 0 0 1-.423 0L8.627 13.225Q8.34 12.7 8.34 12.102ZM10.64 8.55C10.82 9.67 11.32 9.87 12.14 10.05C11.32 10.23 10.82 10.43 10.64 11.55C10.46 10.43 9.96 10.23 9.14 10.05C9.96 9.87 10.46 9.67 10.64 8.55Z"
      />
    </g>
  </svg>
</template>
