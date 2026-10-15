// Change this once and every canonical, og:url and sitemap-bound link follows.
export const SITE_URL = 'https://duotyping.com'

// The app's source repo is private, and a private repo's release assets have no public URL,
// so `make release` in the app repo publishes the disk image on THIS repo's releases and
// commits the feed to public/appcast.xml. This repo has to be public for either to download.
export const REPO = 'duotyping/duotyping.com'
export const RELEASES_URL = `https://github.com/${REPO}/releases/latest`

// "Send feedback" everywhere on the site: the page every client's Send Feedback… opens too
// (duotyping-specs specs/user-feedback.md §5), which links on to the GitHub form.
export const FEEDBACK_URL = '/feedback'

// Where Delete Account lives, in the web app.
export const ACCOUNT_PRIVACY_URL = 'https://app.duotyping.com/privacy'

// The appcast Sparkle updates from is also the only place the shipped build is named, so the
// page reads its version and its disk image off that one feed instead of keeping copies that
// go stale. Regex, not DOMParser: it runs at build time in node, over a file our own release
// pipeline writes. ponytail: first <item> wins — fine while generate_appcast gets one image.
export function parseAppcast(xml?: string) {
  const item = String(xml ?? '').split('<item>')[1] ?? ''
  const tag = (name: string) => item.match(new RegExp(`<${name}>\\s*([^<]*?)\\s*</${name}>`))?.[1] ?? ''
  return {
    version: tag('sparkle:shortVersionString'),
    url: item.match(/<enclosure[^>]*\surl="([^"]*)"/)?.[1] ?? '',
  }
}

// __APPCAST__ is public/appcast.xml, inlined by vite.config.ts; the typeof guard lets node
// import this file for the test.
export const release = parseAppcast(typeof __APPCAST__ === 'string' ? __APPCAST__ : '')
export const DOWNLOAD_URL = release.url || RELEASES_URL

// "Send to my computer" on a phone: the share sheet where there is one, else a mail to yourself.
export const SHARE = {
  title: 'DuoTyping',
  text: 'DuoTyping checks grammar and tone in any app, on Mac, Windows, Chrome and the web:',
  url: `${SITE_URL}/`,
}
export const MAIL_SELF = `mailto:?subject=${encodeURIComponent(SHARE.title)}&body=${encodeURIComponent(`${SHARE.text} ${SHARE.url}`)}`
