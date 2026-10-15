'use client'
import { useState, useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    id: 'marcus-wears',
    name: 'Marcus Reyes',
    company: 'Marcus Wears',
    quote: '"I typed one prompt and had 12 custom apparel products, clean mockups, and a working checkout live in under a minute. The AI ads started converting on Meta the same afternoon."',
    logoPath: `<text x="2" y="16" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="currentColor" letter-spacing="0.08em">MARCUS WEARS</text>`,
    logoViewBox: '0 0 120 24',
    logoAspect: '120 / 24',
    logoHeight: '1.4rem',
  },
  {
    id: 'aura-home',
    name: 'Elena Rostova',
    company: 'Aura Home',
    quote: '"Shopify was overwhelming with 50 plugins to maintain. Nation runs everything in the background — inventory sync, customer inquiries, and ad creatives. I just check my phone to approve orders."',
    logoPath: `<text x="2" y="16" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="currentColor" letter-spacing="0.08em">AURA HOME</text>`,
    logoViewBox: '0 0 110 24',
    logoAspect: '110 / 24',
    logoHeight: '1.4rem',
  },
  {
    id: 'kinetik-gear',
    name: 'David Chen',
    company: 'Kinetik Gear',
    quote: '"The agentic ad engine is insane. It tests creative angles across Meta and Google autonomously, doubling our return on ad spend without hiring a marketing agency."',
    logoPath: `<text x="2" y="16" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="currentColor" letter-spacing="0.08em">KINETIK GEAR</text>`,
    logoViewBox: '0 0 120 24',
    logoAspect: '120 / 24',
    logoHeight: '1.4rem',
  },
]

export default function TestimonialSlider() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px 0px -50% 0px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.currentTarget.classList.contains('slider-progress')) {
      setActiveIdx((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1))
    }
  }

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      aria-labelledby="testimonials-heading"
      className="relative pt-section-lg pb-section-lg bg-subtle"
      data-inview={inView ? '' : undefined}
    >
      <div className="relative container-main">
        <h2 id="testimonials-heading" className="sr-only">What citizen store owners say</h2>

        <div className="slider">
          {/* Tab bar */}
          <div className="slider-bar gap-lg flex items-center justify-between">
            <div role="tablist" aria-label="Store Owners" className="gap-x-2xl gap-y-sm flex flex-wrap">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`testimonial-${t.id}-tab`}
                  aria-selected={i === activeIdx}
                  aria-controls={`testimonial-${t.id}-panel`}
                  tabIndex={i === activeIdx ? 0 : -1}
                  className="slider-tab text-label"
                  onClick={() => setActiveIdx(i)}
                  onKeyDown={(e) => {
                    const len = TESTIMONIALS.length
                    const map: Record<string, number> = {
                      ArrowRight: i === len - 1 ? 0 : i + 1,
                      ArrowLeft: i === 0 ? len - 1 : i - 1,
                      Home: 0, End: len - 1
                    }
                    if (e.key in map) { e.preventDefault(); setActiveIdx(map[e.key]) }
                  }}
                >
                  <span>{t.company}</span>
                  <span
                    className="slider-progress"
                    aria-hidden="true"
                    onAnimationEnd={i === activeIdx ? handleAnimationEnd : undefined}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Panels */}
          <div className="slider-panels mt-2xl">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.id}
                role="tabpanel"
                id={`testimonial-${t.id}-panel`}
                aria-labelledby={`testimonial-${t.id}-tab`}
                tabIndex={0}
                style={{ display: i === activeIdx ? 'block' : 'none' }}
              >
                <figure className="gap-xl grid lg:grid-cols-12">
                  <figcaption className="gap-xl flex flex-col justify-between lg:col-span-3">
                    <div className="gap-2xs flex flex-col">
                      <h3 className="text-h5 text-primary font-medium">{t.name}</h3>
                      <p className="text-caption text-secondary">Store Owner & Citizen</p>
                    </div>
                    <svg
                      fill="none"
                      viewBox={t.logoViewBox}
                      style={{ aspectRatio: t.logoAspect, ['--logo-height' as string]: t.logoHeight }}
                      role="img"
                      aria-label={t.company}
                      className="client-logo text-primary self-start"
                      dangerouslySetInnerHTML={{ __html: t.logoPath }}
                    />
                  </figcaption>
                  <blockquote className="lg:col-span-9 lg:col-start-4">
                    <p className="text-quote text-primary hanging-quote">{t.quote}</p>
                  </blockquote>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
