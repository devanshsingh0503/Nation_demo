'use client'
import { useEffect } from 'react'

export default function IntroAnimation() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    document.documentElement.classList.add('js')
  }, [])

  return null
}
