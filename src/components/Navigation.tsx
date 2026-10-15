'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { NationLogo } from './NationLogo'
import { useNavMorph } from './useNavMorph'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useNavMorph(pathname)

  const handleShuffle = (e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    const charsUp = chars.toUpperCase()
    const digits = '0123456789'
    const target = (e.currentTarget.querySelector('[data-shuffle-text]') || e.currentTarget) as HTMLElement
    if (target.dataset.shuffling === 'true') return
    const original = target.innerText
    let count = 0
    target.dataset.shuffling = 'true'
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

  return (
    <header
      className="site-nav border-line bg-base sticky top-0 z-40 border-b transition-colors duration-spring-soft ease-spring-soft"
      data-theme="light"
      {...(isHome ? { 'data-nav-morph': '' } : {})}
    >
      <div className="container-main">
        <nav
          aria-label="Main"
          className="nav-bar h-nav gap-md flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]"
        >
          {/* Logo Mark for Morph */}
          <Link
            href="/"
            className="nav-logo w-nav-logo inline-flex items-center justify-self-start"
            aria-label="Nation — home"
            aria-current="page"
            data-nav-logo
            data-bleed
          >
            <span key={pathname} className="nav-logo-mark" data-nav-logo-mark>
              <NationLogo className="h-auto w-full text-primary block" role="presentation" ariaHidden={true} />
              {isHome && (
                <span className="nav-logo-marks corner-marks corner-marks-masthead" aria-hidden="true" data-nav-logo-marks />
              )}
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links list-bare gap-md hidden items-center md:flex">
            {[
              { href: '/work', label: 'Stores' },
              { href: '/#services', label: 'Platform' },
              { href: '/#approach', label: 'Mission' },
              { href: '/#process', label: 'How it works' },
            ].map((item) => (
              <li key={item.href} className="flex" data-nav-item data-intro-nav data-bleed>
                <Link
                  href={item.href}
                  className="text-label text-primary hover:text-primary gap-xs items-center transition-colors duration-spring-soft ease-spring-soft inline-flex"
                  data-shuffle
                  onMouseEnter={handleShuffle}
                  onFocus={handleShuffle}
                >
                  <span data-shuffle-text>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop contact */}
          <Link
            href="/contact"
            data-nav-item
            data-intro-nav
            data-shuffle
            className="text-label text-primary hover:text-primary gap-xs items-center transition-colors duration-spring-soft ease-spring-soft hidden justify-self-end md:inline-flex"
            onMouseEnter={handleShuffle}
            onFocus={handleShuffle}
          >
            <span data-shuffle-text>Start a store</span>
            <span aria-hidden="true">→</span>
          </Link>

          {/* Mobile menu toggle (No Start a store in top bar) */}
          <details
            className="nav-disclosure ml-auto md:hidden"
            open={mobileOpen}
            onToggle={(e) => setMobileOpen((e.target as HTMLDetailsElement).open)}
          >
            <summary className="nav-toggle h-control-sm w-control-sm flex cursor-pointer list-none items-center justify-center">
              <span className="sr-only">Menu</span>
              <span className="nav-burger" aria-hidden="true" />
            </summary>
            <div className="nav-drawer">
              <div className="nav-drawer-panel bg-base" data-theme="dark">
                <div className="container-main pt-[4.5rem] pb-xl">
                  {/* Back button at the top of the mobile dropdown */}
                  <div className="pb-md mb-md border-b border-line flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center gap-xs text-sm font-medium text-secondary hover:text-primary transition-colors py-1 cursor-pointer bg-transparent border-0"
                      aria-label="Back"
                    >
                      <span aria-hidden="true" className="text-base leading-none">←</span>
                      <span>Back</span>
                    </button>
                    <span className="text-meta text-tertiary font-mono text-xs uppercase tracking-wider">Menu</span>
                  </div>

                  <ul className="list-bare gap-lg flex flex-col">
                    {[
                      { href: '/work', label: 'Stores' },
                      { href: '/#services', label: 'Platform' },
                      { href: '/#approach', label: 'Mission' },
                      { href: '/#process', label: 'How it works' },
                    ].map((item, i) => (
                      <li key={item.href} className="nav-drawer-item" style={{ '--i': i } as any}>
                        <Link href={item.href} className="text-h3 text-primary hover:text-accent transition-colors" onClick={() => setMobileOpen(false)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Dedicated CTA Button inside Mobile Menu */}
                  <div className="nav-drawer-item mt-xl pt-lg border-t border-line" style={{ '--i': 4 } as any}>
                    <Link
                      href="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="btn-compact w-full inline-flex items-center justify-center border bg-accent text-on-accent border-accent hover:bg-transparent hover:text-accent gap-xs h-[3rem] px-md text-base font-medium rounded-sm"
                    >
                      <span>Start a store</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </nav>
      </div>
    </header>
  )
}
