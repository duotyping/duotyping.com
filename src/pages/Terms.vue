<script setup lang="ts">
import LegalPage from '../components/LegalPage.vue'
import { usePageHead } from '../utils/head'
import { FEEDBACK_URL } from '../utils/site'

usePageHead({
  title: 'Terms of Use — DuoTyping',
  description: 'The terms for using DuoTyping and duotyping.com: your writing stays yours, suggestions are yours to accept or skip, and an account is optional.',
  path: '/terms',
})
</script>

<template>
  <LegalPage title="Terms of Use" updated="3 October 2026">
    <p class="lede">
      These terms cover the DuoTyping app, its optional account and this website, and by using any of them you agree to them. “We” means the people who make DuoTyping.
    </p>

    <h2>Using DuoTyping</h2>
    <p>You can download DuoTyping and use it on your own Macs, for personal or professional writing. Every feature works without an account.</p>

    <h2>Your account</h2>
    <p>An account is optional, and it only syncs your writing profiles and settings between your devices. Keep its sign-in to yourself: what happens through it is yours. You can export its data or delete it at any time in Settings › Account, and deleting it never touches the settings on your devices. We may close an account that’s used to abuse the service.</p>

    <h2>Your writing is yours</h2>
    <p>You keep every right to what you write, and to the suggestions you accept. We claim none of it. As the <a href="/privacy">Privacy Policy</a> explains, DuoTyping never stores it.</p>

    <h2>Suggestions can be wrong</h2>
    <p>Suggestions come from a language model, and a language model can be mistaken. Nothing changes until you accept a suggestion, so read it first: you’re responsible for the text you send.</p>

    <h2>Models and cloud providers</h2>
    <p>
      Local models are made by others and come with their own licenses: the Qwen models under Apache 2.0, and Llama 3.2 under the Llama 3.2 Community License. Installing one means accepting its license. If you connect OpenAI, Anthropic or another provider, you use it under that provider’s terms, on your own key, and it bills you directly.
    </p>

    <h2>No warranty</h2>
    <p>
      DuoTyping and this website are provided “as is”, without warranty of any kind. To the fullest extent the law allows, we aren’t liable for any loss that comes from using them, including text changed by a suggestion you accepted.
    </p>

    <h2>Changes</h2>
    <p>We may update these terms. The date at the top says when they last changed.</p>

    <h2>Questions</h2>
    <p>Ask us through <a :href="FEEDBACK_URL">Send feedback</a>.</p>
  </LegalPage>
</template>
