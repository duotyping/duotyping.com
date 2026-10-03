import assert from 'node:assert/strict'
import { DOWNLOAD_URL, RELEASES_URL, parseAppcast } from './site.ts'

// The shape Sparkle's generate_appcast writes for the app repo's `make release`.
const feed = parseAppcast(`<?xml version="1.0" standalone="yes"?>
<rss xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle" version="2.0">
  <channel>
    <title>DuoTyping</title>
    <item>
      <title>1.2.0</title>
      <pubDate>Mon, 12 Oct 2026 09:00:00 +0000</pubDate>
      <sparkle:version>412</sparkle:version>
      <sparkle:shortVersionString>1.2.0</sparkle:shortVersionString>
      <sparkle:minimumSystemVersion>14.0</sparkle:minimumSystemVersion>
      <description><![CDATA[<h3>New</h3><ul><li>Faster checks</li></ul>]]></description>
      <enclosure url="https://github.com/duotyping/duotyping.com/releases/download/v1.2.0/DuoTyping-1.2.0.dmg" length="41234567" type="application/octet-stream" sparkle:edSignature="abc=="/>
    </item>
  </channel>
</rss>`)

assert.equal(feed.version, '1.2.0')
assert.equal(feed.url, 'https://github.com/duotyping/duotyping.com/releases/download/v1.2.0/DuoTyping-1.2.0.dmg')

// Before the first release there is no feed at all: no version, and no download to link.
assert.deepEqual(parseAppcast(''), { version: '', url: '' })
assert.deepEqual(parseAppcast(undefined), { version: '', url: '' })

// Outside a Vite build there is no __APPCAST__, so the button falls back to the releases page.
assert.equal(DOWNLOAD_URL, RELEASES_URL)

console.log('site: ok')
