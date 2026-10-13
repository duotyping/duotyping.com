// The feedback page's one piece of logic (duotyping-specs specs/user-feedback.md §5, R10; board
// ui-design/site/01-feedback.html FB4): each client's Send Feedback… opens /feedback with
// ?client=&v=&os=&provider=, and from an inline menu &app=. The page turns that into one line,
// "DuoTyping 0.3.0 · Windows 11 24H2 · OpenAI, your key", and reads nothing else. A value the
// page doesn't know is dropped, never shown raw.
import { REPO } from './site.ts'

export const SUPPORT_EMAIL = 'support@duotyping.com'
export const FORM_URL = `https://github.com/${REPO}/issues/new?template=feedback.yml`
export const IDEAS_URL = `https://github.com/${REPO}/issues?q=is%3Aissue+is%3Aopen+label%3Aidea+sort%3Areactions-%2B1-desc`

// The four words the Mac and Windows send (mac-feedback.md §3), and Google for a client that adds it.
const PROVIDERS: Record<string, string> = {
  duotyping: 'DuoTyping',
  openai: 'OpenAI, your key',
  anthropic: 'Anthropic, your key',
  google: 'Google, your key',
  custom: 'Custom provider',
}
// Named when a client sends no system.
const CLIENTS: Record<string, string> = { mac: 'macOS', windows: 'Windows', chrome: 'Chrome' }

// Letters, digits and a little punctuation, capped: enough for "Windows 11 24H2" or "Microsoft Teams".
const plain = (value: string | null, max: number) => {
  const v = (value ?? '').trim()
  return v.length <= max && /^[\p{L}\p{N} ._()+-]+$/u.test(v) ? v : ''
}

export function setupLine(query: string) {
  const q = new URLSearchParams(query)
  const version = (q.get('v') ?? '').match(/^\d+(\.\d+){0,3}([-+][0-9A-Za-z.]{1,20})?$/)?.[0] ?? ''
  const system = plain(q.get('os'), 40) || CLIENTS[q.get('client') ?? ''] || ''
  const provider = PROVIDERS[q.get('provider') ?? ''] ?? ''
  const app = plain(q.get('app'), 40)
  if (!version && !system && !provider) return ''
  return [`DuoTyping${version ? ` ${version}` : ''}`, system, provider, app && `in ${app}`].filter(Boolean).join(' · ')
}

// GitHub fills an issue form's field from a query key named after its id: feedback.yml's `setup`.
export const formUrl = (setup: string) => (setup ? `${FORM_URL}&setup=${encodeURIComponent(setup)}` : FORM_URL)

export const mailUrl = (setup: string) =>
  `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('DuoTyping feedback')}${setup ? `&body=${encodeURIComponent(`${setup}\n\n`)}` : ''}`
