# duotyping.com: Analytics Consent

**Status:** partly built — both A and B, as the owner chose on 2026-10-07: built in duotyping.com `src/utils/consent.ts`, not deployed; Cloudflare Web Analytics waits for its token (`CF_BEACON_TOKEN`).
**Kind:** proposal and technical design.
**Baseline:** duotyping.com `660d138`: `index.html` loads Google Analytics (`G-4T27V43Q6F`) on every page, before anything is asked.
**Decision needed:** none. Owner (2026-10-07): run both, with Cloudflare Web Analytics for everyone and Google Analytics behind the banner.

## Summary

The site loads Google Analytics on first paint. GA sets cookies and sends the visitor's IP address
and device details to Google.

In the EU and UK, the ePrivacy rules (Art. 5(3)) and GDPR (Art. 6, 7) require **opt-in consent
before** a non-essential cookie is set or read. Vietnam's personal-data rules ask for consent too.
Today the site sets GA's cookies with no consent at all.

There are two ways to fix it:

- **A. Replace GA with Cloudflare Web Analytics (recommended).** The site is already on
  Cloudflare. Its analytics sets no cookies, stores nothing on the device and keeps no IP address,
  so no banner is needed. It still counts visits, pages, referrers, countries, devices and page
  speed.
- **B. Keep GA behind a consent banner.** GA loads only after **Accept**, with Google Consent Mode
  v2 signalling the choice. This gives more detail (events, journeys, Google Ads later), at the
  cost of a banner on a page that sells privacy. Most EU visitors decline, so the counts drop
  anyway.

This is the website only. A website banner is not consent for anything the app does: kept checks
are covered by the app's own notice (`duotyping-api`'s `hosted-check-storage.md`).

## Current state and problem

- **As built:** `index.html` runs `gtag('config', 'G-4T27V43Q6F')` on every page.
- **The privacy page:** it says GA "sets cookies… A content blocker or blocking cookies turns it
  off". That discloses it, but disclosure isn't consent.
- **The site's own promise:** it "loads nothing from anyone else" apart from that script.
- **Gap:** every EU or UK visitor gets analytics cookies without being asked.

## Goals and scope

- **Goals:**
  - No non-essential cookie or device storage before a visitor agrees.
  - The owner still sees how the site is doing.
  - The site keeps loading nothing from third parties beyond what's needed.
- **In scope:** the analytics tag, a banner if B, the privacy page's "This website" section, and a
  footer link.
- **Out of scope:** the app (it has no analytics), and consent for kept checks (the app's notice).

## Requirements

| ID | Requirement | Priority | State |
| --- | --- | --- | --- |
| C1 | No analytics cookie, local-storage entry or tracking request happens before consent, unless the tool stores nothing on the device and identifies no one | must | proposed |
| C2 | If a banner exists: Accept and Reject are equally easy (same size, same level, one click each), nothing is pre-ticked, and the page is usable without choosing | must | proposed |
| C3 | If a banner exists: the choice can be changed at any time from a footer link, and declining is remembered without a cookie of ours beyond the choice itself | must | proposed |
| C4 | The privacy page describes exactly what runs | must | proposed |

## Behavior and approach

### Option A: Cloudflare Web Analytics, no banner (recommended)

- **Turn it on:** Cloudflare dashboard → Web Analytics → add `duotyping.com`. The site is proxied
  by Cloudflare, so the automatic setup injects the beacon at the edge with no code change. Or add
  the one `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"…"}'>`
  line to `index.html`.
- **Remove** the gtag block from `index.html`. Delete the GA property, or let it lapse.
- **No banner.** Nothing is stored on the device and no IP address is kept, so the ePrivacy consent
  rule doesn't apply.
- **Privacy page, "This website":** replace the Google Analytics item with:
  > It counts visits with Cloudflare Web Analytics, which sets no cookies, stores nothing on your
  > device and keeps no IP address: we see how many people read which page, from which country and
  > kind of device, and nothing that identifies you.
- **Lost against GA:** per-visitor journeys, custom events (Download clicks, unless counted at
  `download.duotyping.com`'s own Cloudflare analytics), and Google Ads attribution. None of these
  are used today.

### Option B: Google Analytics behind a banner

- **Load order** (Consent Mode v2, "basic": no Google request at all before consent):
  ```html
  <script>
    window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)}
    gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied',
                                 ad_user_data: 'denied', ad_personalization: 'denied' })
  </script>
  <!-- gtag.js is added to the page only after Accept, by the banner -->
  ```
- **On Accept:** `gtag('consent', 'update', { analytics_storage: 'granted' })`, then inject gtag.js.
  Ad signals stay denied, since there are no ads.
- **The banner:**
  - **Look:** a small card at the bottom, built in the site's own components (`src/components/ConsentBanner.vue`), with no third-party consent platform, so the
    site still loads nothing from anyone else before consent.
  - **Copy:** "We'd like to count visits with Google Analytics, which sets cookies. Nothing
    is counted unless you agree." · **Accept** · **Reject**, both the same button style ·
    "Privacy Policy" link.
  - **Where it shows:** to every visitor. A static site can't tell EU visitors apart without an
    edge worker, and showing it everywhere is simpler and honest.
- **Remembering:** `localStorage['consent'] = { analytics: true|false, at: <date> }`. Storing
  the choice itself is strictly necessary and needs no consent. Ask again after 6 months for a
  refusal (CNIL's guidance), and after 13 months for an accept.
- **Footer:** a "Cookie settings" link that reopens the banner. Changing to Reject deletes GA's
  `_ga*` cookies.
- **Privacy page:** GA runs only if you accept; how to change it; what GA receives.

## Options and decisions

| Option | Benefit | Cost or risk | Decision |
| --- | --- | --- | --- |
| **A. Cloudflare Web Analytics, no banner** | No banner, no cookies, fits "keep it yours"; zero code; already on Cloudflare | Less detail than GA; no event funnels | proposed |
| B. GA with own banner and Consent Mode v2 basic | Full GA detail once accepted | A banner on a privacy-first page; most EU visitors decline, so the counts drop anyway; GA's EU legality still contested | alternative |
| B′. GA with Consent Mode "advanced" (cookieless pings before consent) | More modelled data | Still sends data to Google before consent; the most contested setup | rejected |
| A third-party consent platform (Cookiebot, iubenda…) | Ready-made | Loads a third party before consent, against the site's own promise, and adds a monthly fee | rejected |

## Delivery and compatibility

| Step | Scope | Exit |
| --- | --- | --- |
| **A1** | Web Analytics on in the dashboard; gtag removed from `index.html`; privacy page's website section rewritten | A visit shows in Cloudflare's dashboard; DevTools shows no cookie on duotyping.com |
| **B1** (if B) | The consent default and lazy gtag; `ConsentBanner.vue`; the footer link; privacy page | Before Accept: no request to `googletagmanager.com` and no `_ga` cookie; after Accept, both; after switching to Reject, `_ga*` cookies gone |

The site deploy is the owner's.

## Verification

| Scenario | Expected result | Check | State |
| --- | --- | --- | --- |
| First visit, fresh browser (A) | No cookies; one request to `cloudflareinsights.com`, or none if injected at the edge as same-origin | DevTools → Application, Network | planned |
| First visit (B) | Banner shown; no `googletagmanager.com` request; no `_ga` cookie | DevTools | planned |
| Reject (B) | Nothing loads; banner gone; returns after 6 months | DevTools, `localStorage` | planned |
| Accept, then Reject from the footer (B) | `_ga*` cookies deleted; no further GA requests | DevTools | planned |
| Banner keyboard and screen reader (B) | Reachable, both buttons focusable, announced as a dialog without trapping the page | VoiceOver | planned |

## References

- ePrivacy Directive Art. 5(3); GDPR Art. 6, 7: https://gdpr-info.eu/
- CNIL on cookies and audience measurement (refusal remembered for 6 months; consent up to 13): https://www.cnil.fr/en/cookies-and-other-tracking-devices
- [Google Consent Mode v2 setup (Elementor help)](https://elementor.com/help/how-to-set-up-google-consent-mode-v2-gcm-v2/)
- [GA cookies and consent (CookieScript)](https://cookie-script.com/blog/google-analytics-cookies/amp)
- [Is Google Analytics GDPR compliant in 2026? (Sleek)](https://getsleek.io/blog/is-google-analytics-gdpr-compliant-2026)
- [Cloudflare Web Analytics and GDPR (Simple Analytics)](https://www.simpleanalytics.com/is-gdpr-compliant/cloudflare)
- [Cloudflare Web Analytics: no consent needed (ConsentStack)](https://www.consentstack.io/vendors/cloudflare-web-analytics)
- duotyping.com `index.html`, `src/pages/Privacy.vue`
