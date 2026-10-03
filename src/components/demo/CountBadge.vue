<script setup lang="ts">
import MenuBarMark from '../brand/MenuBarMark.vue'

// The badge beside the box you're typing in: the menu-bar mark and how many marks it holds.
// The slot stands in for the number when the badge has to count up.
withDefaults(defineProps<{ count?: number | string; icon?: number }>(), { icon: 15 })
</script>

<template>
  <div class="font-mac inline-flex items-center gap-1.5 rounded-lg border border-pill bg-panel px-[9px] py-1.5 shadow-[0_6px_18px_rgba(74,45,30,0.15)]">
    <MenuBarMark color="#4A3F33" :style="{ width: `${icon}px`, height: `${icon}px` }" />
    <span class="rounded-[9px] bg-clay px-1.5 text-[11.5px] leading-[17px] font-bold text-white"><slot>{{ count }}</slot></span>
  </div>
</template>
