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
       the account section is what docs/specs/writing-profiles-and-sync.md §4 commits it to. The DuoTyping
       provider's lines are what docs/specs/hosted-api.md §7 commits it to: deploy them with that phase (H1),
       not before. -->
  <LegalPage title="Privacy Policy" updated="4 October 2026">
    <p class="lede">
      DuoTyping is built so that this page can be short. Neither the app nor its engine sends analytics, telemetry or crash reports. Your writing is checked and then forgotten: neither DuoTyping nor the AI that checks it keeps it. An account is optional, and it carries settings, never writing. This website uses Google Analytics to count visits.
    </p>

    <h2>Your writing</h2>
    <ul>
      <li>DuoTyping reads text only when you ask it to: the text you select when you press the shortcut, what you type or paste into New Note and, where marks as you type are on, the text in the box you’re typing in.</li>
      <li>The text being checked goes, with your writing profile and any custom instructions, to the provider selected in Settings › Models.</li>
      <li>With the DuoTyping provider, which is selected by default, it passes through DuoTyping’s server to the AI model that checks it. The server holds it in memory for that one request and never stores or logs it. The model provider runs under zero data retention, so it doesn’t keep it either (see “The DuoTyping provider” below).</li>
      <li>With a provider you connect on your own key, such as OpenAI or Anthropic, it goes from your Mac straight to that provider. No DuoTyping server sits in between, and the provider handles it under its own terms and privacy policy.</li>
      <li>Neither the app, its engine nor DuoTyping’s server keeps what you write: not after the check, not in a log, not in a history.</li>
    </ul>

    <h2>What stays on your Mac</h2>
    <ul>
      <li>Your settings (writing profiles, custom instructions, shortcut and chosen model) are saved in DuoTyping’s preferences on your Mac. They leave it only if you sign in and turn sync on.</li>
      <li>Cloud API keys are stored in the macOS Keychain, and never read back into the app.</li>
      <li>A random device key, used only to count this Mac’s free checks with the DuoTyping provider, is stored in the macOS Keychain. It isn’t derived from your hardware and says nothing about you.</li>
      <li>To remove everything, disconnect any cloud provider in Settings › Models, then delete DuoTyping, <code>~/Library/Application Support/DuoTyping</code>, and the DuoTyping items in Keychain Access.</li>
    </ul>

    <h2>When DuoTyping goes online</h2>
    <ul>
      <li>With the DuoTyping provider, the engine sends each check to DuoTyping’s server. The app itself still doesn’t go online for it.</li>
      <li>If you sign in, the engine talks to DuoTyping’s account server to sync your settings.</li>
      <li>The app checks duotyping.com for updates, and downloads an update from GitHub when you install one. You can turn automatic checks off in Settings › General.</li>
      <li>A cloud provider you connect yourself is contacted only to check your text.</li>
      <li>Like any server you connect to, each of these sees your Mac’s IP address. DuoTyping’s server uses it for one thing: limiting free checks without an account. It keeps only a scrambled form that changes every day, and deletes it after two days.</li>
    </ul>

    <h2>The DuoTyping provider</h2>
    <ul>
      <li>It lets you check without a key of your own: a limited number of free checks without an account, more with a free account, and more again with the paid plan.</li>
      <li>Each check reaches the AI model through Cloudflare (AI Gateway), and through OpenRouter if Cloudflare can’t answer. They pass it to the model’s maker, such as OpenAI, only on terms where nothing is retained. Those services may run outside the EU.</li>
      <li>Request bodies are never logged by DuoTyping or by the gateway. What DuoTyping keeps is counts: how many checks and how many tokens, for your account or for your Mac’s device key.</li>
      <li>Daily counts for an account are kept for 90 days. A device key’s lifetime count is kept so the free checks can’t simply start over.</li>
    </ul>

    <h2>The optional account</h2>
    <ul>
      <li>Everything in DuoTyping works signed out. If you sign in, the account holds your email address, the settings you choose to sync, your plan and your check counts, and nothing else: no name, and no details about your devices.</li>
      <li>If you buy the paid plan, Paddle sells it to you as the merchant of record and handles your payment details under its own privacy policy. We receive only whether your subscription is active and when it renews.</li>
      <li>What can sync, each with its own switch in Settings › Account: writing profiles and their custom instructions, which profile is the default, appearance, your language, your cloud model choice (never its key), custom providers (never a key), shortcuts and which apps have marks as you type.</li>
      <li>What never syncs: anything you check, any suggestion, API keys, and your Mac’s own permissions and setup.</li>
      <li>The account and its synced settings are stored with Cloudflare, in the EU. They’re encrypted in transit and at rest, but not end to end, so our server can read the settings it stores.</li>
      <li>Synced settings are kept until you delete them. Deleting the account erases them at once; restorable backups expire within 30 days. Sign-in records (time, a shortened IP address, platform and app version) are kept for 6 months, to keep accounts secure.</li>
      <li>You can export everything the account holds as one file, or delete the account, in Settings › Account. Your devices keep their own settings either way.</li>
      <li>We don’t sell or share any of it, and we use it only to run the account, the DuoTyping provider and the paid plan, and to keep them secure.</li>
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
