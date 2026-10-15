'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CtaSection() {
  const [bookingMonth, setBookingMonth] = useState("November '26")

  useEffect(() => {
    const d = new Date()
    const nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1)
    const monthName = nextMonth.toLocaleString('en', { month: 'long' })
    const yearShort = String(nextMonth.getFullYear()).slice(-2)
    setBookingMonth(`${monthName} '${yearShort}`)
  }, [])

  return (
    <section data-theme="dark" aria-labelledby="cta-heading" className="relative pt-section-lg pb-section-sm z-1">
      <div className="relative container-main">
        <div className="relative">
          <span className="corner-marks corner-marks-cta" aria-hidden="true" />
          <p className="text-eyebrow bracketed">Ready to launch?</p>
          <h2 id="cta-heading" className="text-h2 text-primary mt-lg">
            A store that runs<br /> and markets itself.
          </h2>
        </div>

        <div className="mt-lg gap-lg flex flex-wrap items-center justify-between">
          <div className="gap-md flex flex-wrap">
            <Link
              href="/contact"
              className="btn-compact inline-flex items-center justify-center border bg-accent text-on-accent border-accent hover:bg-transparent hover:text-accent gap-xs h-[2.5rem] px-md text-body font-medium md:h-control-md md:px-control-x-md"
            >
              <span>Start a store</span>
              <svg className="size-icon-inline" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="btn-compact inline-flex items-center justify-center border bg-transparent text-primary border-line-strong hover:bg-subtle hover:border-accent hover:text-accent gap-xs h-[2.5rem] px-md text-body font-medium md:h-control-md md:px-control-x-md"
            >
              <span>Talk to founders</span>
            </Link>
          </div>
          <p className="text-meta text-tertiary">
            Onboarding new citizens · <span>{bookingMonth}</span> · Reply within 1 business day
          </p>
        </div>
      </div>
    </section>
  )
}
