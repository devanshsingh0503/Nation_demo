'use client'
import { useEffect, useRef } from 'react'

const CLIENT_LOGOS = [
  {
    label: 'Meta',
    viewBox: '0 0 100 24',
    aspectRatio: '100 / 24',
    height: '1.4rem',
    path: `<path fill="currentColor" d="M12.4 12c-1.3-3.2-3.4-5.3-5.6-5.3C3.5 6.7 1 9.4 1 12.8c0 3.8 3.1 6.6 6.8 6.6 2.3 0 4.2-1.2 5.5-3.3l4.3 6.1c-2.4 2.3-5.9 3.8-9.8 3.8C3.5 26 0 20.3 0 13 0 6.2 4.1 1 9.5 1c3.8 0 7.1 2.5 8.9 6.3L12.4 12zm25.2 0c1.3-3.2 3.4-5.3 5.6-5.3 3.3 0 5.8 2.7 5.8 6.1 0 3.8-3.1 6.6-6.8 6.6-2.3 0-4.2-1.2-5.5-3.3l-4.3 6.1c2.4 2.3 5.9 3.8 9.8 3.8 4.3 0 7.8-5.7 7.8-13 0-6.8-4.1-12-9.5-12-3.8 0-7.1 2.5-8.9 6.3l6 4.7zm-14.8-1.5c-1.5-2.6-3.4-4.8-5.2-6.1L14 1.3C16.8 3 19.3 5.7 21 8.8l-3.2 1.7zm4.4 3c1.5 2.6 3.4 4.8 5.2 6.1l3.6 3.1c-2.8-1.7-5.3-4.4-7-7.5l3.2-1.7z" transform="scale(0.8) translate(0, 2)"/><text x="48" y="17" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.05em">META ADS</text>`,
  },
  {
    label: 'Google Ads',
    viewBox: '0 0 130 24',
    aspectRatio: '130 / 24',
    height: '1.4rem',
    path: `<text x="2" y="17" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">GOOGLE ADS</text>`,
  },
  {
    label: 'Stripe',
    viewBox: '0 0 80 24',
    aspectRatio: '80 / 24',
    height: '1.4rem',
    path: `<text x="2" y="17" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="700" fill="currentColor" letter-spacing="0.06em">STRIPE</text>`,
  },
  {
    label: 'ChatGPT / OpenAI',
    viewBox: '0 0 120 24',
    aspectRatio: '120 / 24',
    height: '1.4rem',
    path: `<text x="2" y="17" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.06em">OPENAI</text>`,
  },
  {
    label: 'Speedrun',
    viewBox: '0 0 110 24',
    aspectRatio: '110 / 24',
    height: '1.4rem',
    path: `<text x="2" y="17" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.06em">SPEEDRUN</text>`,
  },
  {
    label: 'Ryze AI',
    viewBox: '0 0 100 24',
    aspectRatio: '100 / 24',
    height: '1.4rem',
    path: `<text x="2" y="17" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="currentColor" letter-spacing="0.08em">RYZE AI</text>`,
  },
  {
    label: 'Shopify Ecosystem',
    viewBox: '0 0 110 24',
    aspectRatio: '110 / 24',
    height: '1.4rem',
    path: `<text x="2" y="17" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.06em">SHOPIFY API</text>`,
  },
]

export default function ClientMarquee() {
  const railRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<{ raf: number; speed: number }>({ raf: 0, speed: 0 })

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const BASE_SPEED = 30 // px/s
    const DAMP = 0.35
    const TAU = 350
    let x = 0
    let extraVel = 0
    let dir = -1
    let lastTime = performance.now()
    let lastScrollY = window.scrollY
    let setWidth = 0

    const firstSet = rail.querySelector('.marquee-set')
    if (firstSet) {
      setWidth = firstSet.getBoundingClientRect().width || 0
    }

    // clone sets to fill viewport
    const cloneCount = Math.ceil(window.innerWidth / (setWidth || 1)) + 1
    for (let i = 0; i < cloneCount; i++) {
      const clone = firstSet?.cloneNode(true) as HTMLElement
      clone.setAttribute('aria-hidden', 'true')
      clone.removeAttribute('aria-label')
      clone.removeAttribute('aria-labelledby')
      rail.append(clone)
    }

    const frame = (now: number) => {
      const dt = Math.min(64, now - lastTime)
      lastTime = now
      const scrollY = window.scrollY
      const scrollV = (scrollY - lastScrollY) / dt * 1000
      lastScrollY = scrollY
      if (scrollV !== 0) dir = scrollV > 0 ? -1 : 1
      extraVel += (-scrollV * DAMP - extraVel) * (1 - Math.exp(-dt / TAU))
      x += (dir * BASE_SPEED + extraVel) * dt / 1000
      if (setWidth) x = ((x % setWidth) - setWidth) % setWidth
      rail.style.transform = `translate3d(${x}px, 0, 0)`
      animRef.current.raf = requestAnimationFrame(frame)
    }

    animRef.current.raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(animRef.current.raf)
  }, [])

  return (
    <section data-theme="dark" className="relative pt-section-none pb-section-md">
      <div className="relative container-main">
        <div className="mb-lg gap-md flex flex-wrap items-center justify-between">
          <p id="clients-label" className="text-eyebrow bracketed">Ecosystem & Infrastructure</p>
          <div className="hidden md:block">
            <a
              href="/work"
              className="text-label text-primary hover:text-tertiary transition-colors duration-spring-soft ease-spring-soft"
            >
              <span>See citizen stores</span>{' '}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="marquee" style={{ overflow: 'hidden' }}>
          <div className="marquee-viewport" style={{ overflow: 'hidden' }}>
            <div ref={railRef} className="marquee-rail" style={{ display: 'flex', willChange: 'transform' }}>
              <ul
                className="marquee-set list-bare"
                aria-labelledby="clients-label"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2xl)', paddingRight: 'var(--spacing-2xl)', flexShrink: 0 }}
              >
                {CLIENT_LOGOS.map((logo) => (
                  <li key={logo.label}>
                    <svg
                      fill="none"
                      viewBox={logo.viewBox}
                      style={{ aspectRatio: logo.aspectRatio, ['--logo-height' as string]: logo.height }}
                      role="img"
                      aria-label={logo.label}
                      className="client-logo text-secondary opacity-100"
                      dangerouslySetInnerHTML={{ __html: logo.path }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
