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

// The feedback page: FB4's rows, and nothing raw from the query.
const { setupLine, formUrl, mailUrl, feedbackFromExtension, FORM_URL } = await import('./feedback.ts')
assert.equal(setupLine('?client=windows&v=0.3.0&os=Windows%2011%2024H2&provider=openai'), 'DuoTyping 0.3.0 · Windows 11 24H2 · OpenAI, your key')
assert.equal(setupLine('client=windows&v=0.3.0&os=Windows%2011%2024H2&provider=duotyping&app=Slack'), 'DuoTyping 0.3.0 · Windows 11 24H2 · DuoTyping · in Slack')
assert.equal(setupLine('client=mac&v=0.9.2&os=macOS%2026.1&provider=duotyping'), 'DuoTyping 0.9.2 · macOS 26.1 · DuoTyping')
assert.equal(setupLine('client=chrome&v=0.1.0&os=Chrome%20141&provider=duotyping'), 'DuoTyping 0.1.0 · Chrome 141 · DuoTyping')
assert.equal(setupLine(''), '')
assert.equal(setupLine('utm_source=x'), '')
// Unknown or odd values drop out; the system falls back to the client's name.
assert.equal(setupLine('client=mac&v=<b>1</b>&os=<script>&provider=evil&app=a%26b'), 'DuoTyping · macOS')
assert.equal(setupLine(`v=1.0.0&os=${'x'.repeat(41)}`), 'DuoTyping 1.0.0')
assert.equal(formUrl(''), FORM_URL)
assert.equal(formUrl('DuoTyping 1.0.0 · macOS 26.1'), `${FORM_URL}&setup=DuoTyping%201.0.0%20%C2%B7%20macOS%2026.1`)
assert.equal(mailUrl(''), 'mailto:support@duotyping.com?subject=DuoTyping%20feedback')
assert.ok(mailUrl('DuoTyping 1.0.0').endsWith('&body=DuoTyping%201.0.0%0A%0A'))

// The uninstall page passes the version on, and only a version.
assert.equal(feedbackFromExtension('?v=0.1.0'), '/feedback?client=chrome&v=0.1.0')
assert.equal(setupLine('client=chrome&v=0.1.0'), 'DuoTyping 0.1.0 · Chrome')
assert.equal(feedbackFromExtension('?v=1;x'), '/feedback')
assert.equal(feedbackFromExtension(''), '/feedback')

console.log('feedback: ok')
