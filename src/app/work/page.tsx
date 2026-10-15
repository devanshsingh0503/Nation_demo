import { Metadata } from 'next'
import PageContent from '@/components/PageContent'
import workData from '@/data/work.json'

export const metadata: Metadata = {
  title: workData.title || 'Citizen Stores | Nation',
  description: workData.desc || 'Stores that build, run, and market themselves with autonomous AI agents.',
}

export default function WorkPage() {
  return (
    <main id="main">
      <PageContent html={workData.html} />
    </main>
  )
}
