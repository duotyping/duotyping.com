<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Mascot from '../components/brand/Mascot.vue'
import { usePageHead } from '../utils/head'
import { feedbackFromExtension } from '../utils/feedback'
import { ACCOUNT_PRIVACY_URL, CHROME_STORE_URL } from '../utils/site'

// duotyping-specs specs/user-feedback.md §8 (F1), drawn in ui-design/site/02-uninstalled.html UN1–UN2.
// The browser opens it when the extension is removed, with ?v= only. Static: it collects nothing.
usePageHead({
  title: 'DuoTyping is removed — DuoTyping',
  description: 'DuoTyping is removed from your browser. If you left over the button, a wrong suggestion or privacy, there may be a better way.',
  path: '/uninstalled',
  noindex: true,
})

// The version passes on to the feedback page, so its setup line names the extension (UN1).
const feedback = ref('/feedback')
onMounted(() => (feedback.value = feedbackFromExtension(location.search)))
</script>

<template>
  <article class="wrap pt-10 pb-24 md:pt-14 lg:pb-32">
    <div class="mx-auto flex max-w-[720px] flex-col gap-3.5">
      <div class="flex items-center gap-3 md:gap-5">
        <!-- UN2: cry once, ending Snoozed (faded, eyes shut), which Reduce Motion shows at once; motion approved by the owner, 2026-10-13. -->
        <Mascot class="[--dtm-size:48px] md:[--dtm-size:64px]" mood="cry" />
        <div class="flex min-w-0 flex-col gap-2.5 md:gap-3.5">
          <div class="eyebrow">Uninstalled</div>
          <h1 class="font-display text-[32px] leading-[1.06] font-bold tracking-[-0.03em] text-balance md:text-[44px]">DuoTyping is removed from your browser</h1>
        </div>
      </div>
      <p class="text-[15.5px] leading-[1.55] text-ink-2 md:text-[16.5px]">Thanks for trying it. Nothing more goes from this browser to DuoTyping. If you left for one of these reasons, there may be a better way.</p>

      <ol class="mt-2.5 flex flex-col gap-3.5">
        <li class="way">
          <span class="way-num">1</span>
          <div class="flex min-w-0 flex-1 flex-col gap-2">
            <h2>The button got in the way</h2>
            <p>Add it back and choose <b>Right-click only</b> in Sites: no button on any page, and right-click and the shortcuts still check what you select.</p>
          </div>
        </li>
        <li class="way">
          <span class="way-num">2</span>
          <div class="flex min-w-0 flex-1 flex-col gap-2">
            <h2>A suggestion was wrong</h2>
            <p><b>Report…</b> on its card tells DuoTyping which check, without your text. For anything else, the feedback page has a public and a private way.</p>
            <a :href="feedback" class="way-link mt-1 self-start">Open the feedback page →</a>
          </div>
        </li>
        <li class="way">
          <span class="way-num">3</span>
          <div class="flex min-w-0 flex-1 flex-col gap-2">
            <h2>You weren’t sure about privacy</h2>
            <p>The privacy page says what’s sent, what’s kept and how to delete it. Removing the extension doesn’t delete your account. To delete it, use <b>Delete Account</b> in Account › Privacy on the web app; checks DuoTyping kept stay, encrypted, no longer linked to you.</p>
            <div class="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a href="/privacy" class="way-link">Read the privacy page →</a>
              <a :href="ACCOUNT_PRIVACY_URL" target="_blank" rel="noopener" class="way-link">Account › Privacy ↗</a>
            </div>
          </div>
        </li>
      </ol>

      <div class="mt-2 flex flex-wrap items-center gap-4">
        <a v-if="CHROME_STORE_URL" :href="CHROME_STORE_URL" target="_blank" rel="noopener" class="btn btn-sm max-sm:w-full">Add DuoTyping back ↗</a>
        <span class="fine">Your account is still there when you sign in again.</span>
      </div>
    </div>
  </article>
</template>
