<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import Icon from './Icon.vue'
import { MAIL_SELF, SHARE } from '../utils/site'

// A disk image is no use on a phone, so there the call to action hands the link on to the
// visitor's Mac: the share sheet (AirDrop, Messages, Mail) where the browser has one, and a
// mail to yourself where it doesn't — the plain href, which works without any script at all.
defineProps<{ copy?: boolean }>()

const share = async (e: MouseEvent) => {
  if (!navigator.share) return
  e.preventDefault()
  try {
    await navigator.share(SHARE)
  } catch {
    /* dismissed the sheet */
  }
}

const copied = ref(false)
let reset: ReturnType<typeof setTimeout> | undefined
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(SHARE.url)
  } catch {
    return // clipboard blocked: the address bar still has it
  }
  copied.value = true
  clearTimeout(reset)
  reset = setTimeout(() => (copied.value = false), 1600)
}
onUnmounted(() => clearTimeout(reset))
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <a class="btn w-full" :href="MAIL_SELF" @click="share">
      <Icon name="share" class="size-[19px]" />Send to my Mac
    </a>
    <button
      v-if="copy"
      type="button"
      class="flex h-12 cursor-pointer items-center justify-center gap-2 text-base font-semibold text-ink"
      @click="copyLink"
    >
      <Icon :name="copied ? 'check' : 'copy'" class="size-[18px]" />{{ copied ? 'Link copied' : 'Copy link' }}
    </button>
    <span v-if="copy" class="sr-only" role="status">{{ copied ? 'Link copied' : '' }}</span>
  </div>
</template>
