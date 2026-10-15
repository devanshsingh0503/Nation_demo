'use client'
import { useEffect, useRef, useState } from 'react'

interface WorkCase {
  id: string
  title: string
  description: string
  caseStudyHref: string
  videoSrc: string
  posterSrc: string
  posterAlt: string
  cornerClass: string
  index: number
}

const CASES: WorkCase[] = [
  {
    id: 'builds',
    title: '01 / Builds in 60s',
    description: 'Marcus Wears — 12 bespoke apparel products, supplier routing, and checkout generated in 40 seconds from a single prompt.',
    caseStudyHref: '/work/marcus-wears',
    videoSrc: '/media-cdn/Homepage/replit_1.mp4',
    posterSrc: '/_astro/replit-agent-3.DKt6DEt5_Z90wJ2.webp',
    posterAlt: 'Storefront generation demo showing prompt to live store in 40 seconds.',
    cornerClass: 'corner-marks-white',
    index: 1,
  },
  {
    id: 'runs',
    title: '02 / Runs itself',
    description: 'Autonomous Operations — Orders, inventory sync, fulfillment, and customer inquiries managed by AI agents while the seller approves with one click.',
    caseStudyHref: '/work/autonomous-ops',
    videoSrc: '/media-cdn/Homepage/alphapoint_1.mp4',
    posterSrc: '/_astro/alphapoint.DGBiklmP_1XXNYv.webp',
    posterAlt: 'Autonomous operations dashboard managing orders and customer inquiries.',
    cornerClass: 'corner-marks-white',
    index: 2,
  },
  {
    id: 'markets',
    title: '03 / Markets itself',
    description: 'Ryze AI Ad Engine — High-converting campaigns generated and deployed across Meta, Google, TikTok, and ChatGPT with real-time ROAS optimization.',
    caseStudyHref: '/work/ryze-ad-engine',
    videoSrc: '/media-cdn/Homepage/teal_2.mp4',
    posterSrc: '/_astro/teal-health.BhCNrFtl_cCozc.webp',
    posterAlt: 'Autonomous multi-channel ad engine deploying campaigns to Meta and Google.',
    cornerClass: 'corner-marks-ink',
    index: 3,
  },
]

function VideoClip({ videoSrc, posterSrc, alt, active }: {
  videoSrc: string
  posterSrc: string
  alt: string
  active: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (active) {
      if (!loaded) {
        video.src = videoSrc
        video.load()
        setLoaded(true)
      }
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [active, videoSrc, loaded])

  return (
    <video
      ref={videoRef}
      poster={posterSrc}
      width={1000}
      height={563}
      loop
      muted
      playsInline
      preload="none"
      aria-label={alt}
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

export default function WorkShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = mediaRefs.current.indexOf(entry.target as HTMLDivElement)
          if (entry.isIntersecting) {
            setActiveIndex(idx)
          } else if (idx === 0 && entry.boundingClientRect.top > window.innerHeight / 2) {
            // left viewport above
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    mediaRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" data-theme="dark" className="relative z-10 pt-section-md pb-section-md bg-base">
      <div className="relative container-main">
        <div className="work" style={{ '--cases': 3 } as any}>
          {/* Aside with stacked info */}
          <div className="work-aside">
            <h2 className="work-label text-eyebrow bracketed">The Three Pillars</h2>
            <div className="work-stack" style={{ minHeight: '12rem' }}>
              {CASES.map((c, i) => (
                <div
                  key={c.id}
                  className="work-info"
                  data-work-info
                  data-text={i === activeIndex ? 'in' : i < activeIndex ? 'out-above' : 'out'}
                  style={{
                    '--i': c.index,
                    opacity: i === activeIndex ? 1 : 0,
                    position: i === 0 ? 'relative' : 'absolute',
                    top: i === 0 ? undefined : 0,
                    transition: 'opacity 0.4s',
                  } as any}
                >
                  <h3 className="text-h3 text-primary">{c.title}</h3>
                  <p className="text-large text-secondary mt-md measure">{c.description}</p>
                  <div className="mt-md">
                    <a
                      href={c.caseStudyHref}
                      className="text-label text-primary hover:text-tertiary transition-colors duration-spring-soft ease-spring-soft"
                      aria-label={`Read details: ${c.title}`}
                    >
                      <span>Explore pillar</span>{' '}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media panels */}
          {CASES.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => { mediaRefs.current[i] = el }}
              className="work-media"
              style={{ '--i': c.index } as any}
            >
              <div className="media-frame bg-surface relative overflow-hidden clip">
                <VideoClip
                  videoSrc={c.videoSrc}
                  posterSrc={c.posterSrc}
                  alt={c.posterAlt}
                  active={activeIndex === i}
                />
                <span className={`corner-marks corner-marks-inset ${c.cornerClass}`} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
