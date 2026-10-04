<script setup lang="ts">
import LegalPage from '../components/LegalPage.vue'
import { usePageHead } from '../utils/head'
import { FEEDBACK_URL } from '../utils/site'

usePageHead({
  title: 'Privacy Policy — DuoTyping',
  description: 'What DuoTyping does with your writing, your keys and your settings, what the optional account holds, and what this website measures.',
  path: '/privacy',
})
</script>

<template>
  <!-- Every line here is something the code does (docs/PRD.md §2, §4.6 and §5 in the app repo), and
       the account section is what docs/specs/writing-profiles-and-sync.md §4 commits it to. -->
  <LegalPage title="Privacy Policy" updated="4 October 2026">
    <p class="lede">
      DuoTyping is built so that this page can be short. Neither the app nor its engine sends analytics, telemetry or crash reports. An account is optional, and it carries settings, never writing. This website uses Google Analytics to count visits.
    </p>

    <h2>Your writing</h2>
    <ul>
      <li>DuoTyping reads text only when you ask it to: the text you select when you press the shortcut, what you type or paste into New Note and, where marks as you type are on, the text in the box you’re typing in.</li>
      <li>The text being checked, with your writing profile and any custom instructions, goes from your Mac straight to the cloud provider you connected, on your own key. No DuoTyping server sits in between, and the provider handles it under its own terms and privacy policy.</li>
      <li>Neither the app nor its engine keeps what you write: not after the check, not in a log, not in a history.</li>
    </ul>

    <h2>What stays on your Mac</h2>
    <ul>
      <li>Your settings (writing profiles, custom instructions, shortcut and chosen model) are saved in DuoTyping’s preferences on your Mac. They leave it only if you sign in and turn sync on.</li>
      <li>Cloud API keys are stored in the macOS Keychain, and never read back into the app.</li>
      <li>To remove everything, disconnect any cloud provider in Settings › Models, then delete DuoTyping and <code>~/Library/Application Support/DuoTyping</code>.</li>
    </ul>

    <h2>When DuoTyping goes online</h2>
    <ul>
      <li>If you sign in, the engine talks to DuoTyping’s account server to sync your settings. The app itself still doesn’t go online for it.</li>
      <li>The app checks duotyping.com for updates, and downloads an update from GitHub when you install one. You can turn automatic checks off in Settings › General.</li>
      <li>The cloud provider you connect is contacted only to check your text.</li>
      <li>Like any server you connect to, each of these sees your Mac’s IP address. DuoTyping doesn’t collect it.</li>
    </ul>

    <h2>The optional account</h2>
    <ul>
      <li>Everything in DuoTyping works signed out. If you sign in, the account holds your email address and the settings you choose to sync, and nothing else: no name, and no details about your devices.</li>
      <li>What can sync, each with its own switch in Settings › Account: writing profiles and their custom instructions, which profile is the default, appearance, your language, your cloud model choice (never its key), custom providers (never a key), shortcuts and which apps have marks as you type.</li>
      <li>What never syncs: anything you check, any suggestion, API keys, and your Mac’s own permissions and setup.</li>
      <li>The account and its synced settings are stored with Cloudflare, in the EU. They’re encrypted in transit and at rest, but not end to end, so our server can read the settings it stores.</li>
      <li>Synced settings are kept until you delete them. Deleting the account erases them at once; restorable backups expire within 30 days. Sign-in records (time, a shortened IP address, platform and app version) are kept for 6 months, to keep accounts secure.</li>
      <li>You can export everything the account holds as one file, or delete the account, in Settings › Account. Your devices keep their own settings either way.</li>
      <li>We don’t sell or share any of it, and we use it only to run the account and keep it secure.</li>
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
