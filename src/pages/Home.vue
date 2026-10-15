<script setup lang="ts">
import { usePageHead } from '../utils/head'
import ChooseAi from '../sections/ChooseAi.vue'
import Download from '../sections/Download.vue'
import Faq, { FAQ } from '../sections/Faq.vue'
import Features from '../sections/Features.vue'
import Hero from '../sections/Hero.vue'
import Platforms from '../sections/Platforms.vue'
import Pricing from '../sections/Pricing.vue'
import Sponsors from '../sections/Sponsors.vue'
import TryIt from '../sections/TryIt.vue'
import { SITE_URL, release } from '../utils/site'

// The page shows every feature working and keeps its words to headlines (duotyping-specs, the
// landing proposal of 2026-10-15): nine sections, nearly all of them demos.
const TITLE = 'DuoTyping | Grammar and tone in any app, on Mac, Windows and the web'
const DESCRIPTION =
  'DuoTyping checks grammar and tone in the apps you already write in, on Mac, Windows, Chrome and the web, and changes nothing until you say yes.'

usePageHead({
  title: TITLE,
  description: DESCRIPTION,
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'DuoTyping', inLanguage: 'en' },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#app`,
        name: 'DuoTyping',
        url: `${SITE_URL}/`,
        description: DESCRIPTION,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'macOS 14 or later, Windows 10 22H2 or Windows 11, Chrome, Edge, web',
        ...(release.version && { softwareVersion: release.version }),
        image: `${SITE_URL}/og.png`,
        featureList: [
          'Grammar, spelling and tone suggestions in the apps you already use',
          'Nothing changes until you accept',
          'Marks as you type in the apps and sites you switch on',
          'Rewrite, Translate and Pronounce',
          'Up to 10 writing profiles, each with one of 17 writing contexts',
          'DuoTyping’s own free checks, or OpenAI, Anthropic or any OpenAI-compatible model on your own key (Mac and Windows)',
          'Write, in the browser and on your phone',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
      },
    ],
  },
})
</script>

<template>
  <Hero />
  <Sponsors />
  <TryIt />
  <Features />
  <ChooseAi />
  <Platforms />
  <Pricing />
  <Faq />
  <Download />
</template>
