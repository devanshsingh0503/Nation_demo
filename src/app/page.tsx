import Hero from '@/components/Hero'
import WorkShowcase from '@/components/WorkShowcase'
import ClientMarquee from '@/components/ClientMarquee'
import TestimonialSlider from '@/components/TestimonialSlider'
import ServicesSection from '@/components/ServicesSection'
import ProcessCards from '@/components/ProcessCards'
import ApproachSection from '@/components/ApproachSection'
import FaqSection from '@/components/FaqSection'
import CtaSection from '@/components/CtaSection'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <WorkShowcase />
      <ClientMarquee />
      <TestimonialSlider />
      <ServicesSection />
      <ProcessCards />
      <ApproachSection />
      <FaqSection />
      <CtaSection />
    </main>
  )
}
