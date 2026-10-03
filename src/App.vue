<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <!-- Parked above the screen until it has focus. -->
  <a
    href="#main"
    class="fixed top-3 left-3 z-50 -translate-y-24 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-paper transition-transform duration-150 focus:translate-y-0"
  >Skip to content</a>
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
</template>
