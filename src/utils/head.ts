import { useHead } from '@unhead/vue'
import { SITE_URL } from './site'

// Title, description, canonical and social card for one page. Every page goes through here,
// so none ships without the full set.
type PageHead = {
  title: string
  description: string
  path: string // from the site root: '/privacy'
  noindex?: boolean
  jsonLd?: object // schema.org, written into the page as JSON-LD
}

export function usePageHead({ title, description, path, noindex = false, jsonLd }: PageHead) {
  const url = SITE_URL + path
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'DuoTyping' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      // 1200 × 630 PNG: every unfurler renders it, where WebP still shows blank in some.
      { property: 'og:image', content: `${SITE_URL}/og.png` },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'DuoTyping — Say it well. Keep it yours. A suggestion popup over an email on a Mac.' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: noindex ? [] : [{ rel: 'canonical', href: url }],
    script: jsonLd ? [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }] : [],
  })
}
