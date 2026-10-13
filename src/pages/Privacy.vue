<script setup lang="ts">
import LegalPage from '../components/LegalPage.vue'
import { usePageHead } from '../utils/head'
import { CONSENT_BANNER } from '../utils/consent'
import { FEEDBACK_URL } from '../utils/site'

usePageHead({
  title: 'Privacy Policy — DuoTyping',
  description: 'What DuoTyping does with your writing, your keys and your settings, what it keeps from checks with the DuoTyping provider, what the optional account holds, and what this website measures.',
  path: '/privacy',
})
</script>

<template>
  <!-- Every line here is something the code does (duotyping-specs product/mac-prd.md §2, §4.6 and §5), and
       the account section is what duotyping-specs specs/user-accounts.md (A1, A2, A4, R8b, R8d, R10a) and web-portal.md (§6.6, §6.7) keep, with sync as writing-profiles-and-sync.md §4 commits it to. The DuoTyping
       provider's lines are hosted-api.md §7 in the app repo, and what it keeps is hosted-check-storage.md, and how it's unlinked data-deletion.md, in duotyping-specs: this page
       deploys before the server keeps anything (KEEP_ENABLED), as "Changes" below promises. -->
  <LegalPage title="Privacy Policy" updated="13 October 2026">
    <p class="lede">
      DuoTyping sends no analytics, telemetry or crash reports. When you check with your own key, your writing goes straight to your provider and never reaches us. When you check with the DuoTyping provider, DuoTyping keeps what you check and the suggestions it got back, encrypted, to improve DuoTyping. An account is optional: it carries settings and, if you use Write in the web app, your drafts. This website counts visits without cookies{{ CONSENT_BANNER ? ', and with Google Analytics only if you agree' : '' }}.
    </p>

    <h2>Your writing</h2>
    <ul>
      <li>DuoTyping reads text only when you ask it to: the text you select when you press the shortcut, what you type or paste into Write and, where marks as you type are on, the text in the box you’re typing in.</li>
      <li>The text being checked goes, with your writing profile and any custom instructions, to the provider you chose in Settings › Models or when you set DuoTyping up.</li>
      <li>With a provider you connect on your own key, such as OpenAI or Anthropic, it goes from your Mac straight to that provider. No DuoTyping server sits in between, DuoTyping keeps nothing of it, and the provider handles it under its own terms and privacy policy.</li>
      <li>With the DuoTyping provider, it passes through DuoTyping’s server to the AI model that checks it, and DuoTyping keeps a copy of the check (see “What DuoTyping keeps” below).</li>
      <li>The app keeps no history of what you check. Drafts you keep in Write on the Mac are saved on your Mac only.</li>
      <li>Write, in the web app, saves each draft to your account as you write, so it’s there in any browser you sign in to. Until DuoTyping’s server has a change, that browser keeps it too. “The optional account” below says how drafts are kept.</li>
    </ul>

    <h2>What DuoTyping keeps</h2>
    <ul>
      <li><strong>What:</strong> every check made with the DuoTyping provider, marks as you type included: the text and instructions sent, the suggestions or the error that came back, when, which AI model answered and how long it took. It’s linked to your account, or, signed out, to your Mac’s random device key.</li>
      <li><strong>Why:</strong> to improve DuoTyping: to compare and choose AI models, to find and fix bad suggestions, and to tune how checks are asked. It isn’t used to train AI models, and it isn’t sold or shared.</li>
      <li><strong>How it’s protected:</strong> each check is encrypted on DuoTyping’s server before it’s stored, with a key that server can use only to lock, never to unlock. Only the people who make DuoTyping can read kept checks, on their own computers. Kept checks are stored with Cloudflare.</li>
      <li><strong>How long:</strong> until we delete them. Asking us to delete yours, or deleting your account, doesn’t delete them: it unlinks them from you (see “Deleting it”).</li>
      <li><strong>Other people in your text:</strong> what you check may mention others, such as a reply to a colleague. It’s kept the same way, so check with your own key if you’d rather nothing you write reach us.</li>
      <li><strong>Deleting it:</strong> we don’t delete kept checks when you ask; we unlink them from you. Write to <a href="mailto:support@duotyping.com">support@duotyping.com</a>. With an account, we unlink every check linked to it. Signed out, your checks are linked only to a random key on your Mac that we can’t trace to you, so tell us roughly when you checked and we’ll do what we can. An unlinked check stays, encrypted, with nothing that links it to you or your Mac, so we can’t find it for you again, and what you wrote in it stays as you wrote it, including anything it says about you or others. Restorable backups, and logs that could link it to you again, expire within 30 days.</li>
    </ul>

    <h2>What stays on your Mac</h2>
    <ul>
      <li>Your settings (writing profiles, custom instructions, shortcut and chosen model) are saved in DuoTyping’s preferences on your Mac. They leave it only if you sign in and turn sync on.</li>
      <li>Cloud API keys are stored in the macOS Keychain, are used only to make a check, and are never shown again or sent to DuoTyping.</li>
      <li>A random device key, used to count this Mac’s free checks with the DuoTyping provider and to link the checks it keeps, is stored in the macOS Keychain. It isn’t derived from your hardware and says nothing about you.</li>
      <li>To remove everything on your Mac, disconnect any cloud provider in Settings › Models, then delete DuoTyping, the folders <code>~/Library/Application Support/DuoTyping</code> and <code>~/Library/Application Support/com.redevify.duotyping</code> (your drafts), and the DuoTyping items in Keychain Access. That doesn’t unlink checks already kept on DuoTyping’s server from you: for those, write to us.</li>
    </ul>

    <h2>When DuoTyping goes online</h2>
    <ul>
      <li>With the DuoTyping provider, the app sends each check to DuoTyping’s server.</li>
      <li>If you sign in, you do it in your browser, and the app then talks to DuoTyping’s account server to stay signed in and to sync your settings.</li>
      <li>The app checks download.duotyping.com for updates, and downloads an update from there when you install one. You can turn automatic checks off in Settings › General.</li>
      <li>A cloud provider you connect yourself is contacted only to check your text.</li>
      <li>Like any server you connect to, each of these sees your Mac’s IP address. For checks, DuoTyping’s server uses it for one thing: limiting free checks without an account. It keeps only a scrambled form that changes every day, and deletes it after two days. Signing in keeps more, as “The optional account” below says.</li>
    </ul>

    <h2>The DuoTyping provider</h2>
    <ul>
      <li>It lets you check without a key of your own: 20 free checks on each Mac without an account, more with a free account, and more again with the paid plan. DuoTyping uses it only once you choose it, when you set DuoTyping up or in Settings › Models.</li>
      <li>Each check reaches the AI model through Cloudflare (AI Gateway), and through OpenRouter if Cloudflare can’t answer. The model is run by Cloudflare itself or by its maker, such as OpenAI, on terms where it neither keeps your text nor trains on it. These services may run outside your country.</li>
      <li>Request bodies are never written to a log, by DuoTyping or by the gateway. Besides the kept checks above, DuoTyping keeps counts: how many checks and how many tokens, for your account or for your Mac’s device key.</li>
      <li>Daily counts for an account are kept for 90 days. A device key’s lifetime count is kept so the free checks can’t simply start over.</li>
    </ul>

    <h2>The optional account</h2>
    <ul>
      <li>Everything in DuoTyping works signed out. If you sign in, the account holds your email address, how you sign in, your time zone, the settings you choose to sync, the writing profiles and drafts you save in the web app, your plan and your check counts. Checks you make with the DuoTyping provider while signed in are linked to it (see “What DuoTyping keeps”). It holds no name.</li>
      <li>You sign in on account.duotyping.com with a 6-digit code we email you, sent through Cloudflare, or with Google, Apple or a passkey. The code works for 10 minutes, and we store it only in a scrambled form. The sign-in page uses Cloudflare Turnstile to tell people from bots, which checks your browser; it’s the only thing that page loads from anyone else.</li>
      <li>If you use Google or Apple, we ask it only for your email address, and keep the ID it uses for you and the address it gives us. From Apple we also keep a token, encrypted, so we can end the link at Apple when the account is deleted. If you hide your email from Apple, we only ever see the address Apple makes for you, and our emails reach you through Apple. Each handles your sign-in under its own privacy policy.</li>
      <li>A passkey stays on your device or in your password manager. We keep its public key, which can’t sign you in by itself, the kind of passkey it is, such as iCloud Keychain, when you added it and when you last used it, until you remove it or delete the account.</li>
      <li>To keep the account secure, each sign-in in a browser keeps when it happened, your IP address and your browser’s user agent, which names the browser and its system. They’re deleted when that sign-in ends: when you sign out, or about a week after you last use it. For each DuoTyping app you sign in, we keep which app it is (Mac, Windows, Chrome or the web) and when you allowed it, until the account is deleted, and when it was last used, until 30 days after that. Devices, in the web app, lists them and can sign any of them out.</li>
      <li>We also keep a list of every sign-in, in a browser or an app: when it happened, which app it was, if any, and the IP address of the browser you signed in with. It’s kept until the account is deleted, isn’t shown on any page, and comes with your export.</li>
      <li>Each time an app or the web app signs in to your account, we email you which one it was and when, so you can spot a sign-in that wasn’t you. The email gives the time in your account’s time zone, which we take from your browser when you make the account and you can change on Devices. It has no IP address or location.</li>
      <li>account.duotyping.com and the web app at app.duotyping.com each keep you signed in with a cookie of their own, used for nothing else.</li>
      <li>To stop anyone guessing codes or flooding an inbox, the sign-in server also counts requests from each IP address, and to each email address in a scrambled form, for a few minutes.</li>
      <li>If you buy the paid plan, Paddle sells it to you as the merchant of record and handles your payment details under its own privacy policy. We receive only whether your subscription is active and when it renews.</li>
      <li>What can sync, each with its own switch in Settings › Account: writing profiles and their custom instructions, which profile is the default, appearance, your language, your cloud model choice (never its key), custom providers (never a key), shortcuts and which apps have marks as you type.</li>
      <li>What never syncs: anything you check, any suggestion, API keys, and your Mac’s own permissions and setup.</li>
      <li>The account, its synced settings and its drafts are stored with Cloudflare. They’re encrypted in transit and at rest, but not end to end, so our server can read what it stores. Drafts are encrypted once more before they’re stored, with a key kept apart from the database, so a copy of the database alone can’t read them.</li>
      <li>Synced settings, writing profiles and drafts are kept until you delete them or the account is deleted. Delete All Drafts, on Privacy in the web app, deletes every draft at once.</li>
      <li>Export My Data, on Privacy in the web app, downloads everything the account holds as one file.</li>
      <li>Delete Account, on the same page, signs every device and browser out at once and emails you the date the account will be deleted, 90 days later. Until then nothing in it is deleted, and signing in before that date lets you keep it. On that date we erase the account and everything in it, and end the link at Apple if you used it. Checks DuoTyping kept while you were signed in aren’t erased: they stay, encrypted, no longer linked to you (see “Deleting it” above). Restorable backups, and logs that could link those checks to you again, expire within 30 days. Your devices keep their own settings either way.</li>
      <li>We don’t sell or share any of it, and we use it only to run and improve the account, the DuoTyping provider and the paid plan, and to keep them secure.</li>
    </ul>

    <h2>This website</h2>
    <ul>
      <li>It counts visits with Cloudflare Web Analytics, which sets no cookies, stores nothing on your device and keeps no IP address: we see how many people read which page, from which country and kind of device, and nothing that identifies you.</li>
      <li v-if="!CONSENT_BANNER">It doesn’t use Google Analytics or any other cookie.</li>
      <li v-if="CONSENT_BANNER">Google Analytics runs only if you choose Accept when the site asks. It then sets cookies and receives your IP address, your browser and device details, and the pages you visit, under <a href="https://policies.google.com/privacy">Google’s privacy policy</a>. Choose Reject and it never loads. Change your mind any time with Cookie settings at the bottom of every page: choosing Reject there also deletes its cookies.</li>
      <li v-if="CONSENT_BANNER">Your choice is remembered on your device, without a cookie, and the site asks again after 6 months if you rejected, or 13 if you accepted.</li>
      <li>Apart from {{ CONSENT_BANNER ? 'those two' : 'that counter' }}, it loads nothing from anyone else. Even its fonts come from duotyping.com.</li>
      <li>It’s hosted on Cloudflare, which, like any host, sees your IP address in order to deliver the page.</li>
      <li>The Download button downloads the app from download.duotyping.com, also on Cloudflare.</li>
      <li>Send feedback opens a page on this site that reads only what your app adds to its address (its version, your system, your provider and, from a menu over another app, that app’s name) and stores nothing. Its form is on GitHub: what you post there is public, so don’t use it for privacy requests.</li>
    </ul>

    <h2>Changes</h2>
    <p>If any of this changes, this page changes first, with a new date at the top.</p>

    <h2>Questions</h2>
    <p>Write to <a href="mailto:support@duotyping.com">support@duotyping.com</a> about your data, or ask anything else through <a :href="FEEDBACK_URL">Send feedback</a>.</p>
  </LegalPage>
</template>
