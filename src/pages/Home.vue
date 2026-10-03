<script setup lang="ts">
import { usePageHead } from '../head'
import Download from '../sections/Download.vue'
import Faq, { FAQ } from '../sections/Faq.vue'
import Hero from '../sections/Hero.vue'
import HowItWorks from '../sections/HowItWorks.vue'
import Models from '../sections/Models.vue'
import Privacy from '../sections/Privacy.vue'
import Promises from '../sections/Promises.vue'
import Review from '../sections/Review.vue'
import { SITE_URL, release } from '../site'

const TITLE = 'DuoTyping — the private writing assistant for Mac'
const DESCRIPTION =
  'DuoTyping checks grammar and tone in the apps you already write in, and changes nothing until you accept. It runs on your Mac by default. Free, no account.'

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
        operatingSystem: 'macOS 14 Sonoma or later',
        processorRequirements: 'Apple silicon',
        ...(release.version && { softwareVersion: release.version }),
        image: `${SITE_URL}/og.png`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: [
          'Grammar, spelling and tone suggestions in the apps you already use',
          'Nothing changes until you accept',
          'Local models that run on your Mac',
          'Optional cloud models with your own API key',
          'Marks as you type in Mail, Messages, Slack, Teams and WhatsApp',
          '17 writing profiles',
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
  <Promises />
  <HowItWorks />
  <Review />
  <Privacy />
  <Models />
  <Faq />
  <Download />
</template>
