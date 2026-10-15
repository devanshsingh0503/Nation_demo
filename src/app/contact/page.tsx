import { Metadata } from 'next'
import PageContent from '@/components/PageContent'
import contactData from '@/data/contact.json'

export const metadata: Metadata = {
  title: contactData.title || 'Start a Store | Nation',
  description: contactData.desc || 'Describe your store idea in one prompt, or connect with our founders to see Nation in action.',
}

export default function ContactPage() {
  return (
    <main id="main">
      <PageContent html={contactData.html} />
    </main>
  )
}
