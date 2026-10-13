// The site's one counter (duotyping-specs specs/site-analytics-consent.md): Cloudflare Web
// Analytics sets no cookie, stores nothing on the device and keeps no IP address, so it runs for
// everyone, unasked.
// Public by design (it ships in the page): Cloudflare dashboard › Web Analytics › duotyping.com.
// Empty until the owner adds the site there, and then nothing loads.
const CF_BEACON_TOKEN = ''

/** Once, in the browser: the cookieless counter, if its token is set. */
export function startAnalytics() {
  if (!CF_BEACON_TOKEN) return
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
  script.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_BEACON_TOKEN }))
  document.head.append(script)
}
