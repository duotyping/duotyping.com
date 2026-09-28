<script setup>
import { useId } from 'vue'

// The app icon as the system renders it: the pencils on a cream tile, each with a soft cast
// shadow and a sheen. Brand board: the download call only. Sized by --icon, so a breakpoint
// can change it — corners and shadow follow (120 px: 27 px corners, a 10/24 shadow).
const id = useId()
const BACK = 'M5.46 3.5a2.3 2.3 0 0 1 4.6 0L10.06 10.102Q10.06 10.7 9.773 11.225L7.972 14.514a.2116 .2116 0 0 1-.423 0L5.747 11.225Q5.46 10.7 5.46 10.102Z'
const FRONT = 'M7.94 5.5a2.3 2.3 0 0 1 4.6 0L12.54 12.102Q12.54 12.7 12.253 13.225L10.452 16.514a.2116 .2116 0 0 1-.423 0L8.227 13.225Q7.94 12.7 7.94 12.102Z'
</script>

<template>
  <div class="app-icon">
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" class="block size-full">
      <defs>
        <filter :id="`${id}-blur`" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.3" />
        </filter>
        <linearGradient :id="`${id}-sheen`" x1="0.1" y1="0" x2="0.75" y2="1">
          <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.34" />
          <stop offset="0.42" stop-color="#FFFFFF" stop-opacity="0.07" />
          <stop offset="1" stop-color="#FFFFFF" stop-opacity="0" />
        </linearGradient>
        <linearGradient :id="`${id}-sheen-back`" x1="0.1" y1="0" x2="0.75" y2="1">
          <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.09" />
          <stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.02" />
          <stop offset="1" stop-color="#000000" stop-opacity="0.1" />
        </linearGradient>
      </defs>
      <g transform="translate(1.08 1.08) scale(0.88)">
        <g transform="rotate(38 9 9)">
          <path :d="BACK" transform="translate(0.22 0.38)" fill="#2C1C12" opacity="0.26" :filter="`url(#${id}-blur)`" />
          <path :d="BACK" fill="#4A2D1E" opacity="0.95" />
          <path d="M6.868 13.27L8.652 13.27L7.972 14.514a.2116 .2116 0 0 1-.423 0Z" fill="#33251C" opacity="0.95" />
          <path :d="BACK" :fill="`url(#${id}-sheen-back)`" />
          <path :d="FRONT" transform="translate(0.22 0.38)" fill="#2C1C12" opacity="0.34" :filter="`url(#${id}-blur)`" />
          <path :d="FRONT" fill="#C97A52" />
          <path d="M9.348 15.27L11.132 15.27L10.452 16.514a.2116 .2116 0 0 1-.423 0Z" fill="#33251C" />
          <path :d="FRONT" :fill="`url(#${id}-sheen)`" />
          <path
            d="M10.24 8.61C10.41 9.69 10.89 9.88 11.68 10.05C10.89 10.22 10.41 10.41 10.24 11.49C10.07 10.41 9.59 10.22 8.8 10.05C9.59 9.88 10.07 9.69 10.24 8.61Z"
            fill="#F1EFE6"
          />
        </g>
      </g>
    </svg>
  </div>
</template>
