'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      virtualScroll: () => !document.documentElement.classList.contains('intro'),
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
