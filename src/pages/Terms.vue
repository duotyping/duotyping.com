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
  <LegalPage title="Terms of Use" updated="6 October 2026">
    <p class="lede">
      These terms cover the DuoTyping app, the DuoTyping provider, its optional account and paid plan, and this website, and by using any of them you agree to them. “We” means the people who make DuoTyping.
    </p>

    <h2>Using DuoTyping</h2>
    <p>You can download DuoTyping and use it on your own Macs, for personal or professional writing. Every feature works without an account.</p>

    <h2>Your account</h2>
    <p>An account is optional. It gives you more free checks with the DuoTyping provider, holds the paid plan if you buy it, and syncs your writing profiles and settings between your devices. Keep its sign-in to yourself: what happens through it is yours. You can export its data or delete it at any time in Settings › Account, and deleting it never touches the settings on your devices. We may close an account that’s used to abuse the service.</p>

    <h2>Your writing is yours</h2>
    <p>You keep every right to what you write, and to the suggestions you accept. We claim none of it. When you check with the DuoTyping provider, you let us keep the text you check and the suggestions it gets, encrypted, and use them to run and improve DuoTyping, as the <a href="/privacy">Privacy Policy</a> explains. We don’t sell them, share them, or train AI models on them. What you check on your own key never reaches us.</p>

    <h2>Suggestions can be wrong</h2>
    <p>Suggestions come from a language model, and a language model can be mistaken. Nothing changes until you accept a suggestion, so read it first: you’re responsible for the text you send.</p>

    <h2>The DuoTyping provider</h2>
    <p>
      Once you choose it, DuoTyping checks your writing with its own provider, so you don’t need a key. Without an account, each Mac gets 20 free checks in all; with a free account, you get 20 a day. A check is one review, translation or rewrite. We may change these limits, and may stop free checks for a device, network or account that’s used to get around them or to use the service for anything other than checking writing in DuoTyping.
    </p>

    <h2>Your own cloud provider</h2>
    <p>
      You can instead connect a cloud provider on your own key: OpenAI, Anthropic or another provider. You use it under that provider’s terms, it bills you directly, and DuoTyping’s limits don’t apply.
    </p>

    <h2>The paid plan</h2>
    <p>
      The paid plan is a subscription that raises your daily checks with the DuoTyping provider, up to the allowance shown when you buy it. It’s sold by Paddle, our merchant of record, and Paddle’s terms of sale apply to the purchase, its taxes and refunds. It renews until you cancel. You can cancel any time in Settings › Account › Manage Subscription, and the plan stays until the end of the period you paid for. If we change the price, we’ll tell you before your next renewal, and the new price applies only from then.
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
