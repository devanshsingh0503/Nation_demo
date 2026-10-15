'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { NationLogo } from './NationLogo'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mastheadRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  // 1. Initial entrance animation on load
  useGSAP(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Staggered blur-in of SVG paths in the Nation wordmark
    const paths = sectionRef.current?.querySelectorAll('[data-morph-source] svg path')
    if (paths && paths.length > 0) {
      gsap.from(paths, {
        opacity: 0,
        filter: 'blur(14px)',
        duration: 0.65,
        stagger: 0.035,
        ease: 'power2.out',
      })
    }

    // Corner brackets spring in
    const marks = mastheadRef.current?.querySelector('.corner-marks-masthead')
    if (marks) {
      gsap.from(marks, {
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        ease: 'back.out(1.5)',
        delay: 0.25,
      })
    }

    // Entrance animation for copy
    const copyElements = [titleRef.current, descRef.current, ctaRef.current].filter(Boolean)
    gsap.from(copyElements, {
      y: 20,
      opacity: 0,
      filter: 'blur(6px)',
      duration: 0.75,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.35,
    })
  }, { scope: sectionRef })

  // 2. Scroll-driven blur & dimming animation for copy as user scrolls down toward #work
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const work = document.getElementById('work')
    const fadeEls = document.querySelectorAll<HTMLElement>('[data-morph-fade]')
    if (!work || !fadeEls.length) return

    let rafId = 0
    const onScroll = () => {
      rafId = 0
      const scrollY = window.scrollY
      const workTop = work.getBoundingClientRect().top
      const maxScroll = Math.max(1, workTop + scrollY - 64)
      const scrollProgress = Math.min(1, Math.max(0, (scrollY - 30) / Math.max(1, maxScroll - 30)))
      const scrollDelta = scrollY - 30

      fadeEls.forEach((el) => {
        const elTop = el.getBoundingClientRect().top
        const distToWork = workTop - elTop
        const fadeRatio = Math.max(
          scrollProgress,
          distToWork <= 0 ? 1 : scrollDelta > 0 ? scrollDelta / (scrollDelta + distToWork) : 0
        )
        const clamped = Math.min(1, Math.max(0, fadeRatio))
        el.style.opacity = clamped > 0 ? String(1 - 0.5 * clamped) : ''
        el.style.filter = clamped > 0 ? `blur(${(8 * clamped).toFixed(2)}px)` : ''
      })
    }

    const requestTick = () => {
      if (!rafId) rafId = requestAnimationFrame(onScroll)
    }

    window.addEventListener('scroll', requestTick, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', requestTick)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="relative pt-section-md pb-section-md tall:sticky tall:top-nav z-0"
    >
      <div className="relative container-main">
        {/* Giant Masthead */}
        <div ref={mastheadRef} className="masthead text-primary relative">
          <span className="corner-marks corner-marks-masthead" aria-hidden="true" />
          <div data-morph-source className="w-full block">
            <NationLogo
              className="h-auto w-full text-primary block"
              ariaLabel="Nation"
            />
          </div>
        </div>

        {/* Copy with data-morph-fade scroll animation */}
        <h1
          ref={titleRef}
          data-morph-fade
          className="text-h1 text-primary mt-md transition-[filter,opacity]"
        >
          A store that runs and markets itself.
        </h1>

        <div
          data-morph-fade
          className="mt-md gap-lg flex flex-col items-start md:flex-row md:items-end md:justify-between transition-[filter,opacity]"
        >
          <p
            ref={descRef}
            className="text-large text-secondary md:w-5/12"
          >
            The agentic Shopify. One prompt starts your store — AI builds the pages, sources products, and runs your ads. You approve with one click.
          </p>
          <Link
            ref={ctaRef}
            href="/contact"
            className="btn-compact inline-flex items-center justify-center border bg-accent text-on-accent border-accent hover:bg-transparent hover:text-accent gap-xs h-[2.5rem] px-md text-sm font-medium md:h-control-sm md:px-control-x-sm"
          >
            <span>Start a store</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
