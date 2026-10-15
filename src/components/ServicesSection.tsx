'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface Service {
  idx: number
  condition: string
  title: string
  description: string
  outcome: string
  deliverables: string
  price: string
  href: string
  caseHref: string
  caseLabel: string
  caseThumbnail: string
  caseThumbnailSrcset: string
  caseBgClass: string
  cardTheme: 'dark' | 'light'
}

const SERVICES: Service[] = [
  {
    idx: 0,
    condition: 'One prompt starts a store',
    title: 'Builds in 60s',
    description: 'Store, product catalog, custom branding, and checkout built in 60 seconds from one prompt. Suppliers sourced and connected instantly.',
    outcome: 'A complete, custom store ready to take customer orders in under a minute.',
    deliverables: 'Instant storefront · catalog generation · checkout · supplier routing',
    price: '1-Click Prompt',
    href: '/work/marcus-wears',
    caseHref: '/work/marcus-wears',
    caseLabel: 'Builds · Marcus Wears: 12 products generated in 40s',
    caseThumbnail: '/_astro/flight-science-thumbnail.BTMowO4V_24rd1A.webp',
    caseThumbnailSrcset: '/_astro/flight-science-thumbnail.BTMowO4V_2wYYLV.webp 480w, /_astro/flight-science-thumbnail.BTMowO4V_24rd1A.webp 732w',
    caseBgClass: 'bg-base',
    cardTheme: 'dark',
  },
  {
    idx: 1,
    condition: 'Autonomous daily operations',
    title: 'Runs itself',
    description: 'Orders, inventory sync, fulfillment, and customer support. AI agents handle the manual labor behind the scenes while you approve on mobile with one click.',
    outcome: 'Zero operational headcount. High reliability and 24/7 store management.',
    deliverables: 'Autonomous fulfillment · stock sync · dispute handling · 1-click approvals',
    price: 'Zero Headcount',
    href: '/work/autonomous-ops',
    caseHref: '/work/autonomous-ops',
    caseLabel: 'Runs · Autonomous Operations: order fulfillment & CRM',
    caseThumbnail: '/_astro/navy-yard-dc-thumbnail.BsWi77PS_Z17yjTg.webp',
    caseThumbnailSrcset: '/_astro/navy-yard-dc-thumbnail.BsWi77PS_1eT65W.webp 480w, /_astro/navy-yard-dc-thumbnail.BsWi77PS_Z17yjTg.webp 732w',
    caseBgClass: 'bg-surface',
    cardTheme: 'light',
  },
  {
    idx: 2,
    condition: 'Self-driving customer acquisition',
    title: 'Markets itself',
    description: 'AI automated ads generated and deployed across Google, Meta, TikTok, and ChatGPT. Viral social content and dynamic retargeting powered by Ryze AI.',
    outcome: 'Self-driving campaigns that acquire buyers 24/7 with profitable ROAS.',
    deliverables: 'Ryze AI ad engine · creative generation · cross-platform optimization',
    price: 'Scales with Sales',
    href: '/work/ryze-ad-engine',
    caseHref: '/work/ryze-ad-engine',
    caseLabel: 'Markets · Ryze Ad Engine: automated multi-channel growth',
    caseThumbnail: '/_astro/spherepay-thumbnail.BRX-olL3_Z13gH1m.webp',
    caseThumbnailSrcset: '/_astro/spherepay-thumbnail.BRX-olL3_ZPnOSn.webp 480w, /_astro/spherepay-thumbnail.BRX-olL3_Z13gH1m.webp 732w',
    caseBgClass: 'bg-base',
    cardTheme: 'light',
  },
]

export default function ServicesSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const platesRef = useRef<HTMLElement[]>([])
  const rafRef = useRef(0)

  useEffect(() => {
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const mediaQuery = matchMedia('(prefers-reduced-motion: no-preference)')

    const update = () => {
      rafRef.current = 0
      if (!mediaQuery.matches) {
        platesRef.current.forEach((p) => { if (p) { p.style.transform = ''; p.style.filter = '' } })
        return
      }
      const track = trackRef.current
      const section = sectionRef.current
      const stack = stackRef.current
      if (!track || !section || !stack) return

      const plates = platesRef.current
      const lastPlate = plates[plates.length - 1]
      const parentEl = stack.parentElement
      const step = window.innerWidth < 768 ? 16 : 24

      section.style.setProperty(
        '--plate-spare',
        `${(parentEl?.clientHeight ?? 0) - stack.offsetTop - (plates.length - 1) * step - (lastPlate?.offsetHeight ?? 0)}px`
      )

      const trackH = track.offsetHeight
      const u = Math.max(1, trackH - window.innerHeight)
      const marginBottom = Math.max(0, -parseFloat(getComputedStyle(section).marginBottom))
      const scrollProgress = Math.min(1, Math.max(0, ((-track.getBoundingClientRect().top) / u) / Math.max(0.5, Math.min(0.9, 1 - marginBottom / u))))

      const ease = (t: number) => 1 - (1 - t) * (1 - t)
      const clamp = (v: number) => Math.min(1, Math.max(0, v))
      const m = Math.max(1, plates.length - 1)

      const rowGap = parseFloat(getComputedStyle(stack).rowGap) || 0
      const h = plates.map((_, idx) => idx ? ease(clamp(scrollProgress * m - (idx - 1))) : 1)
      const offsets = plates.map(() => 0)
      const scales = plates.map(() => 1)

      for (let i = 1; i < plates.length; i++) {
        const target = i * step
        offsets[i] = target + (offsets[i - 1] + (plates[i - 1]?.offsetHeight ?? 0) + rowGap - target) * (1 - h[i])
      }

      for (let i = 0; i < plates.length; i++) {
        let t = 0
        for (let j = i + 1; j < plates.length; j++) t += h[j]
        scales[i] = 1 - 0.06 * t
      }

      plates.forEach((plate, idx) => {
        if (!plate) return
        plate.style.transform = `translateY(${offsets[idx]}px) scale(${scales[idx]})`
        const blur = idx < plates.length - 1 ? 6 * clamp((h[idx + 1] - 0.9) / 0.1) : 0
        plate.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : ''
      })
    }

    const onScroll = () => { rafRef.current = rafRef.current || requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    mediaQuery.addEventListener('change', update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      mediaQuery.removeEventListener('change', update)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      data-theme="light"
      style={{ '--plate-changes': 2 } as any}
      className="relative pt-section-none pb-section-none services-section"
    >
      <div ref={trackRef} className="relative container-main services-track">
        <div className="services-frame">
          <div>
            <p className="text-eyebrow bracketed">The Autonomous Stack</p>
            <div className="mt-lg gap-lg flex flex-col md:flex-row md:items-end md:justify-between">
              <h2 className="text-h2 text-primary">
                A store that builds,<br /> runs, and markets itself.
              </h2>
              <p className="text-sm text-secondary">
                Shopify solved the storefront. Nobody solved running the store.<br />Nation is the agentic Shopify.
              </p>
            </div>
          </div>

          <div ref={stackRef} className="plate-stack mt-xl">
            {SERVICES.map((svc, i) => (
              <article
                key={svc.idx}
                ref={(el) => { if (el) platesRef.current[i] = el }}
                data-plate
                style={{ '--i': svc.idx } as any}
                className="plate border-line bg-base grid border lg:grid-cols-2"
              >
                <div className={`p-lg gap-md flex flex-col ${svc.caseBgClass}`} data-theme={svc.cardTheme}>
                  <p className="text-meta text-tertiary">{svc.condition}</p>
                  <h3 className="text-h4 text-primary">{svc.title}</h3>
                  <p className="text-sm text-secondary">{svc.description}</p>

                  <dl className="border-line mt-auto pt-md gap-lg grid border-t sm:grid-cols-2">
                    <div className="gap-xs flex flex-col">
                      <dt className="text-micro text-tertiary">Outcome</dt>
                      <dd className="text-caption text-secondary">{svc.outcome}</dd>
                    </div>
                    <div className="gap-xs flex flex-col">
                      <dt className="text-micro text-tertiary">Capabilities</dt>
                      <dd className="text-caption text-secondary">{svc.deliverables}</dd>
                    </div>
                  </dl>

                  <div className="pt-md gap-sm flex flex-wrap items-center justify-between">
                    <p className="text-h5 text-primary">{svc.price}</p>
                    <a
                      href={svc.href}
                      aria-label={`Learn more about ${svc.title}`}
                      className="btn-compact inline-flex items-center border bg-accent text-on-accent border-accent hover:bg-transparent hover:text-accent gap-xs h-[2.5rem] px-md text-sm font-medium md:h-control-sm md:px-control-x-sm"
                    >
                      <span>Learn more</span>
                      <svg className="size-icon-inline" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.25" />
                      </svg>
                    </a>
                  </div>
                </div>

                <a
                  href={svc.caseHref}
                  aria-label={svc.caseLabel}
                  className="plate-case block"
                >
                  <div className={`p-sm border-line h-full lg:border-l ${svc.caseBgClass}`} data-theme={svc.cardTheme}>
                    <div className="relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={svc.caseThumbnail}
                        srcSet={svc.caseThumbnailSrcset}
                        sizes="(min-width: 62rem) 47vw, 100vw"
                        width={732}
                        height={488}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="plate-case-image block h-auto w-full"
                      />
                      <p className="plate-chip text-meta px-sm py-xs absolute bottom-[0.5rem] left-[0.5rem] md:bottom-md md:left-md">
                        {svc.caseLabel.split(':')[0]}
                      </p>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
