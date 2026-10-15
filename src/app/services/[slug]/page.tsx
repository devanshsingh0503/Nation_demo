import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageContent from '@/components/PageContent'
import rawServices from '@/data/services.json'

interface PageProps {
  params: { slug: string }
}

const services: Record<string, { slug: string; title: string; desc: string; html: string }> = rawServices

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = services[params.slug]
  if (!service) return { title: 'Platform | Nation' }

  return {
    title: service.title,
    description: service.desc,
  }
}

export default function ServicePage({ params }: PageProps) {
  const service = services[params.slug]
  if (!service) {
    notFound()
  }

  return (
    <main id="main">
      <PageContent html={service.html} />
    </main>
  )
}
