'use client'
import Link from 'next/link'
import { NationLogo } from './NationLogo'

export default function Footer() {
  return (
    <footer data-theme="dark" className="relative pt-section-sm pb-section-sm">
      <div className="relative container-main">
        <div className="border-line pt-lg gap-lg flex flex-col border-t md:flex-row md:items-center md:justify-between">
          <Link href="/" className="w-footer-logo inline-flex shrink-0 items-center" aria-label="Nation — home">
            <NationLogo className="h-auto w-full text-primary" />
          </Link>
          <nav aria-label="Footer">
            <ul className="list-bare gap-x-xl gap-y-sm flex flex-wrap">
              {[
                { href: '/work', label: 'Stores' },
                { href: '/#services', label: 'Platform' },
                { href: '/#approach', label: 'Mission' },
                { href: '/#process', label: 'How it works' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-meta text-tertiary hover:text-primary transition-colors duration-spring-soft ease-spring-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-meta text-tertiary">San Francisco · Citizens Worldwide</p>
        </div>
      </div>
    </footer>
  )
}
