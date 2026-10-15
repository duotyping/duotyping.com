<script setup lang="ts">
import LegalPage from '../components/LegalPage.vue'
import { usePageHead } from '../utils/head'
import { FEEDBACK_URL } from '../utils/site'

usePageHead({
  title: 'Privacy Policy — DuoTyping',
  description: 'What DuoTyping does with your writing, your keys and your settings, what it keeps from checks with the DuoTyping provider, what the optional account holds, and what this website measures.',
  path: '/privacy',
})
</script>

<template>
  <!-- Every line here is something the code does (duotyping-specs product/mac-prd.md §2, §4.6 and §5; windows-prd.md and extension-prd.md for their own lines), and
       the account section is what duotyping-specs specs/user-accounts.md (A1, A2, A4, R8b, R8d, R10a) and web-portal.md (§6.6, §6.7) keep, and nothing here promises sync, which writing-profiles-and-sync.md plans but isn’t built. The DuoTyping
       provider's lines are hosted-api.md §7 in the app repo, and what it keeps is hosted-check-storage.md, and how it's unlinked data-deletion.md, in duotyping-specs: this page
       deploys before the server, which keeps every check from its first deploy with no switch (owner, 2026-10-13), as "Changes" below promises. -->
  <LegalPage title="Privacy Policy" updated="15 October 2026">
    <p class="lede">
      DuoTyping sends no analytics, telemetry or crash reports. When you check with your own key, your writing goes straight to your provider and never reaches us. When you check with the DuoTyping provider, DuoTyping keeps what you check and the suggestions it got back, encrypted, to improve DuoTyping. An account is optional in the Mac and Windows apps and needed for the browser extension and the web app; it holds the writing profiles and drafts you make in the web app. This website counts visits without cookies.
    </p>

    <h2>Your writing</h2>
    <ul>
      <li>DuoTyping reads text only when you ask it to: the text you select when you press the shortcut or choose Check or Rewrite, what you type or paste into Write and, in the apps and sites where you switch marks as you type on, the text in the box you’re typing in.</li>
      <li>The text being checked goes, with your writing profile and any custom instructions, to the provider you chose in Settings › Models or when you set DuoTyping up; the browser extension and the web app send it to the DuoTyping provider.</li>
      <li>With a provider you connect on your own key in the Mac or Windows app, such as OpenAI or Anthropic, it goes from your computer straight to that provider. No DuoTyping server sits in between, DuoTyping keeps nothing of it, and the provider handles it under its own terms and privacy policy.</li>
      <li>With the DuoTyping provider, it passes through DuoTyping’s server to the AI model that checks it, and DuoTyping keeps a copy of the check (see “What DuoTyping keeps” below).</li>
      <li>The apps keep no history of what you check. Drafts you keep in Write on a Mac or PC are saved on that computer only, and on Windows they’re encrypted.</li>
      <li>Write, in the web app, saves each draft to your account as you write, so it’s there in any browser you sign in to. Until DuoTyping’s server has a change, that browser keeps it too. “Your account” below says how drafts are kept.</li>
    </ul>

    <h2>What DuoTyping keeps</h2>
    <ul>
      <li><strong>What:</strong> every check made with the DuoTyping provider, marks as you type included: the text and instructions sent, the suggestions or the error that came back, when, which AI model answered and how long it took. It’s linked to your account, or, signed out, to your computer’s random device key.</li>
      <li><strong>Why:</strong> to improve DuoTyping: to compare and choose AI models, to find and fix bad suggestions, and to tune how checks are asked. It isn’t used to train AI models, and it isn’t sold or shared.</li>
      <li><strong>How it’s protected:</strong> each check is encrypted on DuoTyping’s server before it’s stored, with a key that server can use only to lock, never to unlock. Only the people who make DuoTyping can read kept checks, on their own computers. Kept checks are stored with Cloudflare.</li>
      <li><strong>How long:</strong> until we delete them. Asking us to delete yours, or deleting your account, doesn’t delete them: it unlinks them from you (see “Deleting it”).</li>
      <li><strong>Other people in your text:</strong> what you check may mention others, such as a reply to a colleague. It’s kept the same way, so check with your own key if you’d rather nothing you write reach us.</li>
      <li><strong>Deleting it:</strong> we don’t delete kept checks when you ask; we unlink them from you. Write to <a href="mailto:support@duotyping.com">support@duotyping.com</a>. With an account, we unlink every check linked to it. Signed out, your checks are linked only to a random key on your computer that we can’t trace to you, so tell us roughly when you checked and we’ll do what we can. An unlinked check stays, encrypted, with nothing that links it to you or your computer, so we can’t find it for you again, and what you wrote in it stays as you wrote it, including anything it says about you or others. Restorable backups, and logs that could link it to you again, expire within 30 days.</li>
    </ul>

    <h2>What stays on your computer</h2>
    <ul>
      <li>Your settings (writing profiles, custom instructions, shortcuts and chosen model) are saved on your computer: in DuoTyping’s preferences on a Mac or PC, and in the browser’s own storage for the extension. They stay there, signed in or out.</li>
      <li>Cloud API keys are stored in the macOS Keychain or, on Windows, encrypted for your user account; they’re used only to make a check, and are never shown again or sent to DuoTyping.</li>
      <li>A random device key, used to count the computer’s free checks with the DuoTyping provider and to link the checks it keeps, is stored in the macOS Keychain or Windows Credential Manager. It isn’t derived from your hardware and says nothing about you.</li>
      <li>To remove everything on a Mac, disconnect any cloud provider in Settings › Models, then delete DuoTyping, the folders <code>~/Library/Application Support/DuoTyping</code> and <code>~/Library/Application Support/com.redevify.duotyping</code> (your drafts), and the DuoTyping items in Keychain Access. On Windows, uninstalling DuoTyping removes its settings, keys and drafts; its device key stays in Credential Manager until you delete it there. Removing the browser extension removes what it kept in the browser. None of this unlinks checks already kept on DuoTyping’s server from you: for those, write to us.</li>
    </ul>

    <h2>When DuoTyping goes online</h2>
    <ul>
      <li>With the DuoTyping provider, which the browser extension and the web app always use, each check goes to DuoTyping’s server.</li>
      <li>If you sign in, you do it in your browser, and the app then talks to DuoTyping’s account server to stay signed in.</li>
      <li>The Mac app checks download.duotyping.com for updates, and downloads an update from there when you install one; you can turn automatic checks off in Settings › General. The Windows app and the browser extension update through the Microsoft Store and the browser’s extension store.</li>
      <li>A cloud provider you connect yourself is contacted only to check your text.</li>
      <li>Like any server you connect to, each of these sees your device’s IP address. For checks, DuoTyping’s server uses it for one thing: limiting free checks without an account. It keeps only a scrambled form that changes every day, and deletes it after two days. Signing in keeps more, as “Your account” below says.</li>
    </ul>

    <h2>The DuoTyping provider</h2>
    <ul>
      <li>It lets you check without a key of your own: 20 free checks on each Mac or PC without an account, more with a free account, and more again with the paid plan. The Mac and Windows apps use it only once you choose it, when you set DuoTyping up or in Settings › Models; the browser extension and the web app always use it, with an account.</li>
      <li>Each check goes from DuoTyping’s server to the AI provider that runs the model, which doesn’t train its models on it. These services may run outside your country.</li>
      <li>DuoTyping never writes what you check to a log. Besides the kept checks above, DuoTyping keeps counts: how many checks and how many tokens, for your account or for your computer’s device key.</li>
      <li>Daily counts for an account are kept for 90 days. A device key’s lifetime count is kept so the free checks can’t simply start over.</li>
    </ul>

    <h2>The browser extension</h2>
    <ul>
      <li>It reads a page only on sites you switch on, and on any other site only when you right-click or press its shortcut.</li>
      <li>It never reads password, card-number or one-time-code fields, private windows, password managers’ web vaults or DuoTyping’s own account pages.</li>
      <li>It talks only to api.duotyping.com and account.duotyping.com, sends no analytics, and keeps its settings in your browser.</li>
    </ul>

    <h2>Your account</h2>
    <ul>
      <li>The Mac and Windows apps work signed out; the browser extension and the web app need an account. If you sign in, the account holds your email address, how you sign in, your time zone, the writing profiles and drafts you save in the web app, your plan and your check counts. Checks you make with the DuoTyping provider while signed in are linked to it (see “What DuoTyping keeps”). It asks for no name, though a computer’s name, which Sign-in &amp; devices shows, often includes one.</li>
      <li>You sign in on account.duotyping.com with a 6-digit code we email you, sent through Cloudflare, or with Google, Apple or a passkey. The code works for 10 minutes, and we store it only in a scrambled form. The sign-in page uses Cloudflare Turnstile to tell people from bots, which checks your browser; it’s the only thing that page loads from anyone else.</li>
      <li>If you use Google or Apple, we ask it only for your email address, and keep the ID it uses for you and the address it gives us. From Apple we also keep a token, encrypted, so we can end the link at Apple when the account is deleted. If you hide your email from Apple, we only ever see the address Apple makes for you, and our emails reach you through Apple. Each handles your sign-in under its own privacy policy.</li>
      <li>What we receive from Google, your email address and the ID Google uses for you, is used only to sign you in and to show, on Security in the web app, which Google account is connected. We don’t sell it, share it, use it for advertising or use it to train AI models. It’s deleted when you disconnect Google or the account is deleted. DuoTyping’s use of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including the Limited Use requirements.</li>
      <li>A passkey stays on your device or in your password manager. We keep its public key, which can’t sign you in by itself, the kind of passkey it is, such as iCloud Keychain, when you added it and when you last used it, until you remove it or delete the account.</li>
      <li>To keep the account secure, each sign-in in a browser keeps when it happened, your IP address, the city and country Cloudflare places that address in, and your browser’s user agent, which names the browser and its system. They’re deleted when that sign-in ends: when you sign out, or about a week after you last use it. For each DuoTyping app you sign in, we keep which app it is (Mac, Windows, Chrome or the web); the device’s name, which is the computer’s name the Mac or Windows app reports, or the browser and system its user agent names; the IP address of the browser you signed in with, and the city and country Cloudflare places that address in; and when you allowed it, until the account is deleted, and when it was last used, until 30 days after that. Sign-in &amp; devices, in the web app, lists them and can sign any of them out.</li>
      <li>We also keep a list of every sign-in, in a browser or an app: when it happened, which app it was, if any, and the IP address of the browser you signed in with. It’s kept until the account is deleted, isn’t shown on any page, and comes with your export.</li>
      <li>Each time an app or the web app signs in to your account, we email you which one it was, the device’s name, its city and country and when, so you can spot a sign-in that wasn’t you. The email gives the time in your account’s time zone, which we take from your browser when you make the account and you can change on Sign-in &amp; devices. It doesn’t give the IP address.</li>
      <li>account.duotyping.com and the web app at app.duotyping.com each keep you signed in with a cookie of their own, used for nothing else. While you sign in, account.duotyping.com also uses short-lived cookies that only finish that sign-in, such as the five-minute one that lets your browser offer a saved passkey as the page opens. Your browser also remembers, for that page alone, whether you last signed in with a passkey, Google or Apple, to mark it Last used; that isn’t sent to us. The web app likewise remembers which draft you last had open and whether you hid its side panels, and doesn’t send that to us either.</li>
      <li>To stop anyone guessing codes or flooding an inbox, the sign-in server also counts requests from each IP address, and to each email address in a scrambled form, for a few minutes.</li>
      <li>If you buy the paid plan, Creem sells it to you as the merchant of record and handles your payment details under its own privacy policy. We receive only whether your subscription is active and when it renews.</li>
      <li>The account, its writing profiles and its drafts are stored with Cloudflare. They’re encrypted in transit and at rest, but not end to end, so our server can read what it stores. Drafts are encrypted once more before they’re stored, with a key kept apart from the database, so a copy of the database alone can’t read them.</li>
      <li>Writing profiles and drafts are kept until you delete them or the account is deleted. Delete All Drafts, on Privacy in the web app, deletes every draft at once.</li>
      <li>Export My Data, on Privacy in the web app, downloads everything the account holds as one file.</li>
      <li>Delete Account, on the same page, signs every device and browser out at once and emails you the date the account will be deleted, 90 days later. Until then nothing in it is deleted, and signing in before that date lets you keep it. On that date we erase the account and everything in it, and end the link at Apple if you used it. Checks DuoTyping kept while you were signed in aren’t erased: they stay, encrypted, no longer linked to you (see “Deleting it” above). Restorable backups, and logs that could link those checks to you again, expire within 30 days. Your devices keep their own settings either way.</li>
      <li>We don’t sell or share any of it, and we use it only to run and improve the account, the DuoTyping provider and the paid plan, and to keep them secure.</li>
    </ul>

    <h2>This website</h2>
    <ul>
      <li>It counts visits with Cloudflare Web Analytics, which sets no cookies, stores nothing on your device and keeps no IP address: we see how many people read which page, from which country and kind of device, and nothing that identifies you.</li>
      <li>It doesn’t use cookies.</li>
      <li>Apart from that counter, it loads nothing from anyone else. Even its fonts come from duotyping.com.</li>
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
