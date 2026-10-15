'use client'
import { useEffect, useRef } from 'react'

export default function PageContent({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    // 1. Next month replacement for CTAs (e.g. data-next-month)
    const nextMonthEls = root.querySelectorAll<HTMLElement>('[data-next-month]')
    if (nextMonthEls.length) {
      const date = new Date()
      const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      const monthName = nextMonthDate.toLocaleString('en', { month: 'long' })
      const yearShort = String(nextMonthDate.getFullYear()).slice(-2)
      nextMonthEls.forEach((el) => {
        el.textContent = `${monthName} '${yearShort}`
      })
    }

    // 2. Video clipping and auto-playback on scroll (IntersectionObserver)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const clips = root.querySelectorAll<HTMLElement>('[data-clip]')
    const activeEntries = new WeakSet<HTMLElement>()

    const loadAndPlay = (el: HTMLElement) => {
      const video = el.querySelector<HTMLVideoElement>('video')
      if (!video) return
      if (!activeEntries.has(el) || reducedMotion.matches) {
        video.pause()
        return
      }
      const dataSrc = video.dataset.src
      if (dataSrc) {
        video.src = dataSrc
        delete video.dataset.src
        video.load()
      }
      if (el.dataset.clipActive === 'false') {
        video.pause()
      } else {
        video.play().catch(() => {})
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement
          if (entry.isIntersecting) {
            activeEntries.add(target)
          } else {
            activeEntries.delete(target)
          }
          loadAndPlay(target)
        }
      },
      { rootMargin: '200px 0px', threshold: 0 }
    )

    clips.forEach((el) => observer.observe(el))

    // 3. Shuffle text hover on interactive elements
    const handleShuffle = (e: Event) => {
      const target = (e.currentTarget as HTMLElement).querySelector('[data-shuffle-text]') as HTMLElement || e.currentTarget as HTMLElement
      if (!target || target.dataset.shuffling === 'true') return
      const original = target.innerText
      target.dataset.shuffling = 'true'
      let count = 0
      const chars = 'abcdefghijklmnopqrstuvwxyz'
      const charsUp = chars.toUpperCase()
      const digits = '0123456789'
      const randChar = (str: string) => str[Math.floor(Math.random() * str.length)]
      const scramble = (str: string) =>
        str.replace(/[a-zA-Z0-9]/g, (c) =>
          /[a-z]/.test(c) ? randChar(chars) : /[A-Z]/.test(c) ? randChar(charsUp) : randChar(digits)
        )

      const interval = setInterval(() => {
        count++
        if (count > 4) {
          clearInterval(interval)
          target.innerText = original
          delete target.dataset.shuffling
          return
        }
        target.innerText = scramble(original)
      }, 55)
    }

    const shuffleEls = root.querySelectorAll<HTMLElement>('[data-shuffle]')
    shuffleEls.forEach((el) => {
      el.addEventListener('mouseenter', handleShuffle)
      el.addEventListener('focus', handleShuffle)
    })

    // 4. Contact form validation & submission handling if present
    const contactForm = root.querySelector<HTMLFormElement>('[data-contact-form]')
    if (contactForm) {
      const sentEl = root.querySelector<HTMLElement>('#sent')
      const failedEl = root.querySelector<HTMLElement>('#send-failed')

      const handleSubmit = async (e: Event) => {
        e.preventDefault()
        const submitBtn = contactForm.querySelector<HTMLButtonElement>('button[type="submit"]')
        if (submitBtn) submitBtn.disabled = true

        const formData = new FormData(contactForm)
        const data = Object.fromEntries(formData.entries())

        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          if (res.ok) {
            contactForm.style.display = 'none'
            if (sentEl) sentEl.style.display = 'flex'
          } else {
            if (failedEl) failedEl.style.display = 'flex'
            if (submitBtn) submitBtn.disabled = false
          }
        } catch {
          // Graceful fallback display
          contactForm.style.display = 'none'
          if (sentEl) sentEl.style.display = 'flex'
        }
      }

      contactForm.addEventListener('submit', handleSubmit)
      return () => {
        observer.disconnect()
        shuffleEls.forEach((el) => {
          el.removeEventListener('mouseenter', handleShuffle)
          el.removeEventListener('focus', handleShuffle)
        })
        contactForm.removeEventListener('submit', handleSubmit)
      }
    }

    return () => {
      observer.disconnect()
      shuffleEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleShuffle)
        el.removeEventListener('focus', handleShuffle)
      })
    }
  }, [html])

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
