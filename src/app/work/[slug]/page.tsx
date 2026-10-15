import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageContent from '@/components/PageContent'
import rawCaseStudies from '@/data/caseStudies.json'

interface PageProps {
  params: { slug: string }
}

const caseStudies: Record<string, { slug: string; title: string; desc: string; html: string }> = rawCaseStudies

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const caseStudy = caseStudies[params.slug]
  if (!caseStudy) return { title: 'Citizen Store | Nation' }

  return {
    title: caseStudy.title,
    description: caseStudy.desc,
  }
}

export default function CaseStudyPage({ params }: PageProps) {
  const caseStudy = caseStudies[params.slug]
  if (!caseStudy) {
    notFound()
  }

  return (
    <main id="main">
      <PageContent html={caseStudy.html} />
    </main>
  )
}
