<script setup>
import LegalPage from '../components/LegalPage.vue'
import { usePageHead } from '../head'
import { FEEDBACK_URL } from '../site'

usePageHead({
  title: 'Privacy Policy — DuoTyping',
  description: 'The DuoTyping app has no account, no analytics and no telemetry. What happens to your writing, your keys and your settings, and what this website measures.',
  path: '/privacy',
})
</script>

<template>
  <!-- Every line here is something the code does; see docs/PRD.md §2, §4.6 and §5 in the app repo. -->
  <LegalPage title="Privacy Policy" updated="3 October 2026">
    <p class="lede">
      DuoTyping is built so that this page can be short. It has no account, no analytics, no telemetry and no crash reporter, not in the app and not in its engine. This website is the one exception: it uses Google Analytics to count visits.
    </p>

    <h2>Your writing</h2>
    <ul>
      <li>DuoTyping reads text only when you ask it to: the text you select when you press the shortcut, what you type or paste into New Note and, where marks as you type are on, the text in the box you’re typing in.</li>
      <li>With a local model, the check runs entirely on your Mac. Nothing you write is sent anywhere.</li>
      <li>If you connect a cloud provider, the text being checked, with your writing profile and any custom instructions, goes from your Mac straight to that provider on your own key. No DuoTyping server sits in between, and the provider handles it under its own terms and privacy policy.</li>
      <li>Neither the app nor its engine keeps what you write: not after the check, not in a log, not in a history.</li>
    </ul>

    <h2>What stays on your Mac</h2>
    <ul>
      <li>Your settings (writing profile, custom instructions, shortcut and chosen model) are saved in DuoTyping’s preferences on your Mac.</li>
      <li>Cloud API keys are stored in the macOS Keychain, and never read back into the app.</li>
      <li>Installed models and the last verified model catalog are kept in DuoTyping’s folder in Application Support.</li>
      <li>To remove everything, disconnect any cloud provider in Settings › Models, then delete DuoTyping and <code>~/Library/Application Support/DuoTyping</code>.</li>
    </ul>

    <h2>When DuoTyping goes online</h2>
    <ul>
      <li>The engine fetches the signed model catalog from duotyping.com, and a model’s files when you install one. These requests carry no account, no key and nothing you write.</li>
      <li>The app checks duotyping.com for updates, and downloads an update from GitHub when you install one. You can turn automatic checks off in Settings › General.</li>
      <li>A cloud provider is contacted only if you connect one, and only to check your text.</li>
      <li>Like any server you connect to, each of these sees your Mac’s IP address. DuoTyping doesn’t collect it.</li>
    </ul>

    <h2>This website</h2>
    <ul>
      <li>It uses Google Analytics to count visits and see which pages are read. Google Analytics sets cookies and receives your IP address, your browser and device details, and the pages you visit, under <a href="https://policies.google.com/privacy">Google’s privacy policy</a>. A content blocker or blocking cookies turns it off, and the site works the same without it.</li>
      <li>Apart from that script, it loads nothing from anyone else. Even its fonts come from duotyping.com.</li>
      <li>It’s hosted on Cloudflare, which, like any host, sees your IP address in order to deliver the page.</li>
      <li>The Download button takes you to GitHub, which hosts the app’s releases; GitHub’s privacy statement applies there.</li>
      <li>Send feedback opens a form on GitHub. What you post there is public.</li>
    </ul>

    <h2>Changes</h2>
    <p>If any of this changes, this page changes first, with a new date at the top.</p>

    <h2>Questions</h2>
    <p>Ask us through <a :href="FEEDBACK_URL">Send feedback</a>.</p>
  </LegalPage>
</template>
