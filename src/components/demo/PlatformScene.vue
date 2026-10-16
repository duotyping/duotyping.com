<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '../brand/AppIcon.vue'
import BrandMark from '../brand/BrandMark.vue'
import MarkPaths from '../brand/MarkPaths.vue'
import Mascot from '../brand/Mascot.vue'
import MenuBarMark from '../brand/MenuBarMark.vue'
import PhoneWrite from './PhoneWrite.vue'
import Popup from './Popup.vue'
import SceneMessage from './SceneMessage.vue'
import Suggestion from './Suggestion.vue'
import { PC_KEYS, os } from '../../utils/platform'

// The hero's story on Windows, in Chrome or Edge, and on a phone, at the Mac demo's size: the
// email's two mistakes are marked, then reviewed and fixed in place, each the way that client does
// it (the extension's from its own content scripts, the phone's from Write and board L8). CSS plays
// it every 10 s (the phone's Write on its own 8 s clock, in PhoneWrite); v-loop starts it in view,
// and with Reduce Motion it rests on the review.
defineProps<{ platform: 'windows' | 'chrome' | 'phone' }>()
// The extension's Check selection: Alt+Shift+D, or Control+Shift+D on a Mac.
const KEYS = computed(() => ({ windows: ['Win', 'Shift', 'D'], chrome: os.value === 'mac' ? ['⌃', '⇧', 'D'] : ['Alt', 'Shift', 'D'] }))
const PROPOSALS = [
  'I sent the revised contract to legal yesterday. They will review it by Friday.',
  'I sent legal the revised contract yesterday, and they’ll review it by Friday.',
]
</script>

<template>
  <!-- Decoration: the copy beside it says everything this shows. -->
  <div v-loop class="stage-desk loop" aria-hidden="true" inert>
    <div class="canvas">
      <svg width="1400" height="778" viewBox="0 0 1400 778" fill="none" class="absolute top-0 left-0">
        <g transform="translate(282 34) scale(55.6)"><MarkPaths tone="desk" /></g>
      </svg>

      <!-- ── Windows: a mail window, the review beside it, the tray ───────────────────── -->
      <template v-if="platform === 'windows'">
        <div class="font-win absolute top-[56px] left-[64px] w-[600px] overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_30px_70px_rgba(24,33,63,0.22),0_4px_12px_rgba(24,33,63,0.10)]">
          <div class="flex h-10 items-center border-b border-black/6 bg-[#F3F3F3] pl-3.5">
            <span class="size-4 rounded-[4px] bg-ink/25" />
            <span class="ml-2.5 text-[12.5px] text-mac-ink">New message</span>
            <span class="grow" />
            <span class="flex h-10 w-[46px] items-center justify-center"><svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 5h10" stroke="#1D1D1F" stroke-width="1" /></svg></span>
            <span class="flex h-10 w-[46px] items-center justify-center"><svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" rx="1.5" fill="none" stroke="#1D1D1F" stroke-width="1" /></svg></span>
            <span class="flex h-10 w-[46px] items-center justify-center"><svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 0l10 10M10 0 0 10" stroke="#1D1D1F" stroke-width="1" /></svg></span>
          </div>
          <div class="px-6 pt-3 pb-6">
            <div class="flex items-center gap-3 border-b border-line py-2.5 text-[13px] text-ink-3">To <span class="skel [--w:7em]" /></div>
            <div class="flex items-center gap-3 border-b border-line py-2.5 text-[13px] text-ink-3">Subject <span class="text-mac-ink">Revised contract</span></div>
            <SceneMessage class="pt-4" />
          </div>
        </div>
        <Popup scope="Sentence by sentence" count="2 suggestions" class="ps-pop absolute top-[318px] left-[404px] w-[400px]">
          <div class="ps-acc">
            <Suggestion label="Sentence 1 of 2" focused actions="accept-skip" cloud="DuoTyping" :keys="PC_KEYS" original="I have send the revised contract to legal yesterday.">
              I <span class="font-semibold text-cyan-deep">sent</span> the revised contract to legal yesterday.
            </Suggestion>
          </div>
          <Suggestion label="Sentence 2 of 2" cloud="DuoTyping" original="they will be review it by Friday.">
            <span class="font-semibold text-cyan-deep">They will review</span> it by Friday.
          </Suggestion>
          <template #note>Nothing changes until you accept.</template>
        </Popup>
        <div class="absolute top-[586px] left-[84px] flex flex-col gap-3">
          <span class="stage-label">Select, then press</span>
          <div class="flex gap-2">
            <span
              v-for="(k, i) in KEYS.windows"
              :key="k"
              class="keycap ps-key h-[52px] min-w-[52px] rounded-[11px] px-3 text-[17px]"
              :class="k === 'D' && 'border-[#0A0F22] !bg-ink font-semibold text-cyan'"
              :style="{ '--i': i }"
            >{{ k }}</span>
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 flex h-12 items-center justify-center gap-2 border-t border-black/8 bg-[#F3F4F8]/95 pr-[150px]">
          <span v-for="n in 6" :key="n" class="size-7 rounded-md bg-ink/10" />
        </div>
        <div class="absolute bottom-0 left-[640px] flex h-12 items-center gap-2.5">
          <span class="flex rounded-md bg-ink/12 p-1.5"><MenuBarMark class="size-4" /></span>
          <span class="font-win text-xs text-mac-ink">9:41</span>
        </div>
        <div class="absolute bottom-[60px] left-[560px] flex items-end gap-1.5">
          <span class="stage-label">Lives in your tray</span>
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
            <path d="M3 3C9 4 14 8 15.5 17" stroke="#0A6F84" stroke-width="1.8" stroke-linecap="round" />
            <path d="M11.8 13.8 15.6 17.5l3-4.3" stroke="#0A6F84" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </template>

      <!-- ── Chrome or Edge: marks and the field button in the box, the pencil, the check card, the edge tab ── -->
      <template v-else-if="platform === 'chrome'">
        <div class="absolute top-[44px] left-[44px] w-[720px] overflow-hidden rounded-[10px] border border-black/10 bg-white shadow-[0_30px_70px_rgba(24,33,63,0.22),0_4px_12px_rgba(24,33,63,0.10)]">
          <div class="flex h-[38px] items-end gap-1 bg-[#E3E7EE] px-2.5">
            <span class="flex h-[30px] w-[210px] items-center gap-2 rounded-t-[9px] bg-white px-3 text-xs text-mac-ink">
              <span class="size-3.5 rounded-full bg-ink/15" />Inbox<span class="grow" /><span class="text-ink-3">×</span>
            </span>
            <span class="mb-[7px] ml-1.5 text-base leading-none text-ink-3">+</span>
          </div>
          <div class="flex h-11 items-center gap-3 border-b border-line px-3.5">
            <svg width="54" height="14" viewBox="0 0 54 14" fill="none" stroke="#5F6680" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2 3 7l5 5M3 7h9" /><path d="M28 2l5 5-5 5M33 7h-9" opacity="0.45" /><path d="M51 7a5 5 0 1 1-1.5-3.6M51 2v3h-3" />
            </svg>
            <span class="flex h-[30px] grow items-center rounded-full bg-[#F1F3F7] px-4 text-[12.5px] text-ink-2">mail.example.com</span>
            <span class="flex size-[26px] items-center justify-center rounded-md bg-tag"><BrandMark class="size-4" /></span>
          </div>
          <div class="h-[470px] bg-[#F7F8FA] px-8 pt-6">
            <div class="w-[540px] rounded-xl border border-edge bg-white shadow-[0_10px_30px_rgba(24,33,63,0.08)]">
              <div class="flex h-10 items-center border-b border-line px-4 text-[13px] font-semibold text-mac-ink">New message</div>
              <div class="px-4 pt-1">
                <div class="flex items-center gap-3 border-b border-line py-2 text-[12.5px] text-ink-3">To <span class="skel [--w:7em]" /></div>
                <div class="flex items-center gap-3 border-b border-line py-2 text-[12.5px] text-ink-3">Subject <span class="text-mac-ink">Revised contract</span></div>
              </div>
              <!-- The text box: the field button 6 px in from its corner, the pencil just left of it -->
              <div class="relative px-4 pt-3 pb-11">
                <SceneMessage class="font-mac" size="text-[14px] leading-[1.65]" />
                <span class="ps-badge absolute right-1.5 bottom-1.5 flex h-[26px] items-center gap-1 rounded-lg border border-[#C6CCD8] bg-white pr-1 pl-1.5 shadow-[0_2px_6px_rgba(24,33,63,0.10)]">
                  <MenuBarMark color="#5F6680" class="size-3.5" />
                  <span class="rounded-full bg-[#B04E25] px-1.5 text-[11px] leading-4 font-bold text-white">2</span>
                </span>
                <span class="ps-pill absolute right-[58px] bottom-1.5 flex size-[26px] items-center justify-center rounded-full border border-[#C6CCD8] bg-white shadow-[0_2px_6px_rgba(24,33,63,0.10)]">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.8 11.2l.55-2.6 6.1-6.1a1.2 1.2 0 0 1 1.7 0l.35.35a1.2 1.2 0 0 1 0 1.7l-6.1 6.1-2.6.55Z" stroke="#0A6F84" stroke-width="1.3" stroke-linejoin="round" />
                    <path d="M8.6 3.4l2 2" stroke="#0A6F84" stroke-width="1.3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <!-- The edge tab: the mascot, 40 % down the window's right edge -->
          <span class="absolute top-[40%] right-0 flex h-14 w-11 items-center justify-center rounded-l-2xl border border-r-0 border-[#C6CCD8] bg-white shadow-[0_6px_18px_rgba(24,33,63,0.12)]">
            <Mascot mood="idle" style="--dtm-size: 30px" />
          </span>
        </div>
        <!-- The check card for a selection: up to three proposals for all of it (two fit here), and
             Replace selection. It opens under the selection, over the box's corner. -->
        <div class="ps-xpop font-mac absolute top-[376px] left-[352px] w-[440px] overflow-hidden rounded-xl border border-edge bg-white text-left text-ink shadow-[0_26px_60px_rgba(24,33,63,0.22),0_3px_10px_rgba(24,33,63,0.10)]">
          <div class="flex items-center gap-2.5 px-3.5 pt-3 pb-2">
            <span class="shrink-0 rounded-[5px] border border-[#9ED7E3] bg-[#E6F7FB] px-2 py-0.5 text-[10.5px] font-semibold text-ink">Whole selection</span>
            <span class="grow text-xs text-ink-2">2 proposals · <b class="font-semibold text-ink">Work email ⌄</b></span>
            <span class="text-sm text-ink-3">×</span>
          </div>
          <div class="flex items-center gap-1.5 px-3.5 pb-2.5 text-[11.5px] text-ink-3">
            Source
            <svg width="12" height="11" viewBox="0 0 13 12" fill="none" aria-hidden="true"><path d="M3.6 9.2a2.6 2.6 0 0 1 .3-5.18 3.4 3.4 0 0 1 6.5.9 2.3 2.3 0 0 1-.5 4.28H3.6Z" stroke="#3D4E59" stroke-width="1.2" stroke-linejoin="round" /></svg>
            <b class="font-semibold text-ink-2">DuoTyping</b> Your account · 6 of 20 used today
          </div>
          <div class="mx-2.5 rounded-lg border border-[#E5DFCE] bg-[#F1F3F7] px-3 py-2">
            <div class="mb-1 font-mono text-[9px] tracking-[0.1em] text-ink-3 uppercase">Your text</div>
            <p class="text-xs leading-[1.45] text-ink-3">I have send the revised contract to legal yesterday. they will be review it by Friday.</p>
          </div>
          <div class="flex flex-col gap-2 p-2.5">
            <div v-for="(text, i) in PROPOSALS" :key="i" class="rounded-lg border px-[13px] py-[9px]" :class="i === 0 ? 'ps-acc border-accent bg-tint' : 'border-edge bg-card'">
              <div class="mb-1.5 flex items-center gap-2">
                <span class="text-[11px] text-ink-2">Proposal {{ i + 1 }} of {{ PROPOSALS.length }}</span>
                <span class="mk-tag border border-[#A9B7C0] bg-transparent px-[7px] py-px text-slate">DuoTyping · your account</span>
              </div>
              <p class="text-[13px] leading-[1.4]" :class="i === 0 && 'mb-2'">{{ text }}</p>
              <div v-if="i === 0" class="flex items-center gap-2">
                <span class="mk-btn">Replace selection</span>
                <span class="mk-kbd">return</span>
                <span class="grow" />
                <span class="text-[11.5px] text-ink-3">Report…</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 border-t border-edge px-3.5 py-[9px] text-[11.5px]">
            <span class="grow text-ink-3">Close to decline — nothing is written.</span>
            <span class="text-cyan-deep">Return to text</span>
          </div>
        </div>
        <div class="absolute top-[636px] left-[84px] flex flex-col gap-3">
          <span class="stage-label">Select, then press</span>
          <div class="flex gap-2">
            <span
              v-for="(k, i) in KEYS.chrome"
              :key="k"
              class="keycap ps-key h-[52px] min-w-[52px] rounded-[11px] px-3 text-[17px]"
              :class="k === 'D' && 'border-[#0A0F22] !bg-ink font-semibold text-cyan'"
              :style="{ '--i': i }"
            >{{ k }}</span>
          </div>
        </div>
      </template>

      <!-- ── A phone: Write in the browser, a mark tapped, its fix docked below ──────── -->
      <template v-else>
        <div class="absolute top-[30px] left-[110px] h-[660px] w-[322px] overflow-hidden rounded-[46px] border-[11px] border-[#0F1530] bg-white shadow-[0_30px_70px_rgba(24,33,63,0.28)]">
          <div class="flex h-10 items-center justify-between px-6 text-[12.5px] font-semibold text-mac-ink">
            9:41<span class="flex gap-[3px]"><span v-for="n in 3" :key="n" class="size-1.5 rounded-full bg-mac-ink" /></span>
          </div>
          <PhoneWrite class="h-[598px]" />
        </div>
        <div class="absolute top-[150px] left-[488px] flex w-[300px] flex-col gap-4">
          <span class="stage-label">Write, on your phone</span>
          <div class="font-mac flex items-center gap-3 rounded-2xl border border-edge bg-white p-4 shadow-[0_14px_34px_rgba(24,33,63,0.10)]">
            <AppIcon style="--icon: 44px" />
            <div class="flex flex-col gap-0.5">
              <span class="text-[13.5px] font-semibold text-mac-ink">Add to Home Screen</span>
              <span class="text-xs text-ink-3">DuoTyping · app.duotyping.com</span>
            </div>
          </div>
          <div class="font-mac rounded-2xl border border-edge bg-white p-4 shadow-[0_14px_34px_rgba(24,33,63,0.10)]">
            <div class="mb-3 text-[13.5px] font-semibold text-mac-ink">Share to, on Android</div>
            <div class="flex items-end gap-3.5">
              <span v-for="n in 3" :key="n" class="flex flex-col items-center gap-1.5"><span class="size-11 rounded-xl bg-ink/10" /><span class="skel [--w:2.6em]" /></span>
              <span class="flex flex-col items-center gap-1.5">
                <span class="rounded-[10px] ring-2 ring-cyan-deep ring-offset-2"><AppIcon style="--icon: 44px" /></span>
                <span class="text-[10.5px] text-mac-ink">DuoTyping</span>
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
/* The scenes' story, on one 10 s clock. Without motion (or before CSS runs) each piece sits in
   its last frame, the review open, so the still picture still says it all. */
.font-win { font-family: "Segoe UI Variable Text", "Segoe UI", system-ui, sans-serif; }
/* Every client draws its marks straight (mac-prd.md, owner 2026-10-11); Write's, with their tint,
   are PhoneWrite's .pw-mark. */
.ps-mark {
  text-decoration: underline solid var(--color-clay);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  text-decoration-skip-ink: none;
}
.ps-sel { background: linear-gradient(var(--color-select), var(--color-select)) no-repeat 0 0 / 100% 100%; }
.ps-new { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .ps-mark { animation: ps-mark 10s infinite; }
  .ps-sel { animation: ps-sel 10s infinite; }
  .ps-key { animation: ps-key 10s calc(var(--i) * 140ms) infinite; }
  .ps-pill { animation: ps-pill 10s infinite; }
  .ps-badge { animation: ps-badge 10s infinite; }
  .ps-pop { animation: ps-pop 10s infinite; }
  .ps-xpop { animation: ps-xpop 10s infinite; }
  .ps-acc .mk-btn { animation: ps-acc 10s infinite; }
  .ps-old { animation: ps-old 10s infinite; }
  .ps-new { animation: ps-new 10s infinite; }
}

@keyframes ps-mark { 0%, 8%, 95%, 100% { text-decoration-color: transparent; } 11%, 92% { text-decoration-color: var(--color-clay); } }
@keyframes ps-sel { 0%, 20%, 95%, 100% { background-size: 0% 100%; } 25%, 92% { background-size: 100% 100%; } }
@keyframes ps-key {
  0%, 31%, 37.5%, 100% { translate: 0 0; background: var(--color-panel); }
  32.5%, 36% { translate: 0 2px; background: var(--color-tag); }
}
@keyframes ps-pill { 0%, 25%, 43%, 100% { opacity: 0; transform: translateY(4px); } 28%, 40% { opacity: 1; transform: none; } }
@keyframes ps-badge { 0%, 10%, 65%, 100% { opacity: 0; transform: scale(0.9); } 13%, 62% { opacity: 1; transform: none; } }
@keyframes ps-pop { 0%, 40%, 77%, 100% { opacity: 0; transform: translateY(10px); } 43%, 74% { opacity: 1; transform: none; } }
/* The extension's card closes the moment the text is written. */
@keyframes ps-xpop { 0%, 40%, 64%, 100% { opacity: 0; transform: translateY(10px); } 43%, 62% { opacity: 1; transform: none; } }
@keyframes ps-acc { 0%, 58%, 63%, 100% { transform: none; } 59.5%, 61.5% { transform: scale(0.94); background: var(--color-accent-press); } }
@keyframes ps-old { 0%, 62%, 97%, 100% { opacity: 1; } 64.5%, 94% { opacity: 0; } }
@keyframes ps-new { 0%, 62%, 97%, 100% { opacity: 0; } 64.5%, 94% { opacity: 1; } }
</style>
