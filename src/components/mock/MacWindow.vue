<script setup>
// A Mail compose window. With `fields`, the To and Subject rows under the title bar.
defineProps({ fields: Boolean })
</script>

<template>
  <div class="font-mac overflow-hidden rounded-xl border border-black/10 bg-white text-mac-ink shadow-[0_30px_60px_rgba(60,40,20,0.14),0_2px_6px_rgba(60,40,20,0.07)]">
    <div class="relative flex h-[50px] items-center border-b border-[#E6E4E0] bg-[#F6F5F3] px-[18px]">
      <div class="flex gap-2">
        <span class="block size-3 rounded-full bg-[#FF5F57] shadow-[inset_0_0_0_0.5px_#E0443E]" />
        <span class="block size-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_0_0_0.5px_#DEA123]" />
        <span class="block size-3 rounded-full bg-[#28C840] shadow-[inset_0_0_0_0.5px_#1AAB29]" />
      </div>
      <span class="absolute inset-x-0 text-center text-[13px] font-semibold text-[#4A4A4A]">New Message</span>
    </div>
    <template v-if="fields">
      <div class="flex h-10 items-center gap-2 border-b border-[#EEEDEA] px-[22px] text-[13.5px]">
        <span class="text-[#8A8A8E]">To:</span><span>Maya Chen</span>
      </div>
      <div class="flex h-10 items-center gap-2 border-b border-[#EEEDEA] px-[22px] text-[13.5px]">
        <span class="text-[#8A8A8E]">Subject:</span><span>Revised contract</span>
      </div>
    </template>
    <slot />
  </div>
</template>
