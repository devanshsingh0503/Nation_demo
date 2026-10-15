'use client'
import { useEffect } from 'react'

export function useNavMorph() {
  useEffect(() => {
    let cleanFn: (() => void) | undefined
    let retries = 0

    const setup = () => {
      const nav = document.querySelector<HTMLElement>('[data-nav-morph]')
      const morphSource = document.querySelector<HTMLElement>('[data-morph-source]')
      const work = document.getElementById('work')
      if (!nav || !morphSource || !work) {
        if (retries < 30) {
          retries++
          requestAnimationFrame(setup)
        }
        return
      }

      const navLogoMark = nav.querySelector<HTMLElement>('[data-nav-logo-mark]')
      const navLogo = nav.querySelector<HTMLElement>('[data-nav-logo]')
      const navItems = Array.from(nav.querySelectorAll<HTMLElement>('[data-nav-item]'))
      const morphMarks = document.querySelector<HTMLElement>('[data-morph-marks]')
      const morphFades = Array.from(document.querySelectorAll<HTMLElement>('[data-morph-fade]'))
      const navLogoMarks = nav.querySelector<HTMLElement>('[data-nav-logo-marks]')

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
      const isMobileOrReduced = () => reducedMotion.matches

      let initialLefts: number[] = []
      let finalLefts: number[] = []
      let logoRect: DOMRect | null = null
      let maxScroll = 1
      let rafId = 0

      const resetStyles = () => {
        if (navLogoMark) navLogoMark.style.cssText = ''
        if (navLogoMarks) navLogoMarks.style.opacity = ''
        for (const el of morphFades) {
          el.style.opacity = ''
          el.style.filter = ''
        }
        for (const el of navItems) el.style.transform = ''
      }

      const measure = () => {
        resetStyles()
        nav.removeAttribute('data-morph-ready')
        initialLefts = navItems.map((el) => el.getBoundingClientRect().left)
        nav.setAttribute('data-morph-ready', '')
        finalLefts = navItems.map((el) => el.getBoundingClientRect().left)
        logoRect = navLogo?.getBoundingClientRect() ?? null
        maxScroll = Math.max(1, work.getBoundingClientRect().top + window.scrollY - nav.offsetHeight)
      }

      const updateTheme = () => {
        const navH = nav.offsetHeight
        let lastDarkSection: HTMLElement = work
        for (let next = work.nextElementSibling; next; next = next.nextElementSibling) {
          if (next.tagName === 'SECTION') {
            if (next.getAttribute('data-theme') !== 'dark') break
            lastDarkSection = next as HTMLElement
          }
        }
        const isDark =
          work.getBoundingClientRect().top <= navH &&
          lastDarkSection.getBoundingClientRect().bottom > navH
        nav.dataset.theme = isDark ? 'dark' : 'light'
      }

      const onFrame = () => {
        rafId = 0
        updateTheme()
        if (isMobileOrReduced()) return

        const progress = Math.min(1, Math.max(0, (window.scrollY - 50) / Math.max(1, maxScroll - 50)))
        const invProgress = 1 - progress

        if (navLogoMark && logoRect && logoRect.width > 0) {
          const sourceRect = morphSource.getBoundingClientRect()
          if (sourceRect.width > 0) {
            const scaleRatio = logoRect.width / sourceRect.width
            const scale = scaleRatio + (1 - scaleRatio) * invProgress
            navLogoMark.style.width = `${sourceRect.width}px`
            navLogoMark.style.transform = `translate(${(sourceRect.left - logoRect.left) * invProgress}px, ${(sourceRect.top - logoRect.top) * invProgress}px) scale(${scale})`
          }
        }

        if (navLogoMarks) {
          navLogoMarks.style.opacity = String(Math.min(1, (1 - progress) / 0.2))
        }

        const scrollDelta = window.scrollY - 50
        const workTop = work.getBoundingClientRect().top
        for (const el of morphFades) {
          const dist = workTop - el.getBoundingClientRect().top
          const fadeRatio = Math.max(progress, dist <= 0 ? 1 : scrollDelta > 0 ? scrollDelta / (scrollDelta + dist) : 0)
          const clamped = Math.min(1, fadeRatio)
          el.style.opacity = clamped > 0 ? String(1 - 0.5 * clamped) : ''
          el.style.filter = clamped > 0 ? `blur(${(8 * clamped).toFixed(2)}px)` : ''
        }

        navItems.forEach((item, idx) => {
          item.style.transform = `translateX(${(initialLefts[idx] - finalLefts[idx]) * invProgress}px)`
        })
      }

      const requestFrame = () => {
        if (!rafId) rafId = requestAnimationFrame(onFrame)
      }

      const init = () => {
        if (isMobileOrReduced()) {
          resetStyles()
          updateTheme()
          morphSource.style.visibility = ''
          if (morphMarks) morphMarks.style.visibility = ''
          nav.setAttribute('data-morph-ready', '')
          return
        }
        measure()
        onFrame()
        morphSource.style.visibility = 'hidden'
        if (morphMarks) morphMarks.style.visibility = 'hidden'
      }

      init()
      window.addEventListener('scroll', requestFrame, { passive: true })
      window.addEventListener('resize', init)
      reducedMotion.addEventListener('change', init)
      document.fonts?.ready?.then(init)

      cleanFn = () => {
        window.removeEventListener('scroll', requestFrame)
        window.removeEventListener('resize', init)
        reducedMotion.removeEventListener('change', init)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }

    setup()
    return () => {
      if (cleanFn) cleanFn()
    }
  }, [])
}
