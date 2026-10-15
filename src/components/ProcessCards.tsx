'use client'
import { useEffect, useRef } from 'react'

export default function ProcessCards() {
  const containerRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = containerRef.current
    if (!list) return
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const cards = list.querySelectorAll<HTMLElement>('[data-process-card]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.35 }
    )

    cards.forEach((c) => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" data-theme="light" className="relative pt-section-md pb-section-md bg-subtle">
      <div className="relative container-main">
        <div>
          <p className="text-eyebrow bracketed">How it works</p>
          <h2 className="text-h2 text-primary mt-md">From prompt to profit.</h2>
        </div>

        <div className="mt-xl">
          <ol ref={containerRef} className="list-bare gap-x-lg gap-y-xl grid md:grid-cols-2 lg:grid-cols-4">
            {/* Card 01: Prompt */}
            <li className="gap-sm flex flex-col">
              <div className="process-card-frame bg-base relative" aria-hidden="true" data-process-card>
                <span className="corner-marks corner-marks-card text-primary" />
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="300" height="240" className="ofig" aria-hidden="true" focusable="false">
                    <rect x="52" y="112" width="6" height="12" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="66" y="104.5" width="6" height="27" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="80" y="96" width="6" height="44" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="94" y="85" width="6" height="66" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="108" y="99.5" width="6" height="37" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="122" y="90.5" width="6" height="55" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="136" y="106.5" width="6" height="23" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="150" y="82" width="6" height="72" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="164" y="102.5" width="6" height="31" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="178" y="94" width="6" height="48" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="192" y="108.5" width="6" height="19" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="206" y="87.5" width="6" height="61" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="220" y="101" width="6" height="34" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="234" y="111" width="6" height="14" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="150" y="176" width="66" height="1" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="216" y="172" width="1" height="9" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <text x="223" y="172" dominantBaseline="hanging" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: '9px', fill: 'var(--ofig-muted, #646B74)', letterSpacing: '.04em' }}>
                      60 SEC
                    </text>
                  </svg>
                </div>
              </div>
              <p className="text-label text-tertiary mt-2xs" aria-hidden="true">[ 01 ]</p>
              <h3 className="text-h6 text-primary">Prompt</h3>
              <p className="text-caption text-secondary">Describe what you want to sell. 60 seconds to a complete storefront with curated products.</p>
            </li>

            {/* Card 02: Generate */}
            <li className="gap-sm flex flex-col">
              <div className="process-card-frame bg-base relative" aria-hidden="true" data-process-card>
                <span className="corner-marks corner-marks-card text-primary" />
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="300" height="240" className="ofig" aria-hidden="true" focusable="false">
                    <rect x="56.5" y="50.5" width="187" height="121" style={{ fill: 'none', stroke: 'var(--ofig-ink, #101114)', strokeWidth: 1 }} />
                    <rect x="56.5" y="50.5" width="187" height="19" style={{ fill: 'none', stroke: 'var(--ofig-ink, #101114)', strokeWidth: 1 }} />
                    <rect x="64" y="57" width="5" height="5" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="74" y="57" width="5" height="5" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <text x="72" y="93" xmlSpace="preserve" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
                      <tspan style={{ fill: 'rgba(100,107,116,.9)', fontSize: '13px' }}>&lt;</tspan>
                      <tspan style={{ fill: 'var(--ofig-ink, #101114)' }}>Catalog</tspan>
                      <tspan style={{ fill: 'rgba(100,107,116,.9)', fontSize: '13px' }}>&nbsp;/&gt;</tspan>
                    </text>
                    <rect x="66" y="101" width="81" height="20" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <text x="72" y="116" xmlSpace="preserve" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
                      <tspan style={{ fill: 'rgba(255,255,255,.75)', fontSize: '13px' }}>&lt;</tspan>
                      <tspan style={{ fill: 'var(--ofig-on-ink, #FFFFFF)' }}>Suppliers</tspan>
                      <tspan style={{ fill: 'rgba(255,255,255,.75)', fontSize: '13px' }}>&nbsp;/&gt;</tspan>
                    </text>
                    <text x="72" y="141" xmlSpace="preserve" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
                      <tspan style={{ fill: 'rgba(100,107,116,.9)', fontSize: '13px' }}>&lt;</tspan>
                      <tspan style={{ fill: 'var(--ofig-ink, #101114)' }}>Checkout</tspan>
                      <tspan style={{ fill: 'rgba(100,107,116,.9)', fontSize: '13px' }}>&nbsp;/&gt;</tspan>
                    </text>
                    <rect x="161" y="131" width="7" height="14" style={{ fill: 'var(--ofig-ink, #101114)' }} className="animate-pulse" />
                    <rect x="244" y="90" width="6" height="1" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="250" y="86" width="1" height="9" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <text x="257" y="86" dominantBaseline="hanging" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fill: 'var(--ofig-muted, #646B74)', letterSpacing: '.04em' }}>
                      AUTO
                    </text>
                  </svg>
                </div>
              </div>
              <p className="text-label text-tertiary mt-2xs" aria-hidden="true">[ 02 ]</p>
              <h3 className="text-h6 text-primary">Generate</h3>
              <p className="text-caption text-secondary">AI sets up product catalog, payment processing, supplier routing, and checkout flows.</p>
            </li>

            {/* Card 03: Approve */}
            <li className="gap-sm flex flex-col">
              <div className="process-card-frame bg-base relative" aria-hidden="true" data-process-card>
                <span className="corner-marks corner-marks-card text-primary" />
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="300" height="240" className="ofig" aria-hidden="true" focusable="false">
                    <rect x="66.5" y="50.5" width="167" height="99" style={{ fill: 'none', stroke: 'var(--ofig-ink, #101114)', strokeWidth: 1 }} />
                    <rect x="66.5" y="50.5" width="167" height="15" style={{ fill: 'none', stroke: 'var(--ofig-ink, #101114)', strokeWidth: 1 }} />
                    <rect x="72" y="55" width="4" height="4" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="80" y="55" width="4" height="4" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="80" y="82" width="90" height="2" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="80" y="94" width="66" height="2" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="66" y="150" width="168" height="28" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <text x="80" y="159" dominantBaseline="hanging" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fill: 'var(--ofig-on-ink, #FFFFFF)' }}>
                      1-CLICK APPROVAL
                    </text>
                    <text x="220" y="157" dominantBaseline="hanging" textAnchor="end" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', fill: 'var(--ofig-on-ink, #FFFFFF)' }}>
                      ✓
                    </text>
                    <text x="284" y="25" dominantBaseline="hanging" textAnchor="end" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fill: 'var(--ofig-muted, #646B74)', letterSpacing: '.04em' }}>
                      MOBILE
                    </text>
                  </svg>
                </div>
              </div>
              <p className="text-label text-tertiary mt-2xs" aria-hidden="true">[ 03 ]</p>
              <h3 className="text-h6 text-primary">Approve</h3>
              <p className="text-caption text-secondary">Review daily orders, supplier fulfillment, and high-converting marketing campaigns with one click.</p>
            </li>

            {/* Card 04: Scale */}
            <li className="gap-sm flex flex-col">
              <div className="process-card-frame bg-base relative" aria-hidden="true" data-process-card>
                <span className="corner-marks corner-marks-card text-primary" />
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="300" height="240" className="ofig" aria-hidden="true" focusable="false">
                    <rect x="44.5" y="104.5" width="17" height="17" style={{ fill: 'none', stroke: 'var(--ofig-ink, #101114)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <rect x="70.5" y="104.5" width="17" height="17" style={{ fill: 'none', stroke: 'var(--ofig-ink, #101114)', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <rect x="96.5" y="104.5" width="17" height="17" style={{ fill: 'none', stroke: 'var(--ofig-ink, #101114)', strokeWidth: 1 }} />
                    <rect x="122.5" y="104.5" width="17" height="17" style={{ fill: 'none', stroke: 'var(--ofig-ink, #101114)', strokeWidth: 1 }} />
                    <rect x="148" y="104" width="18" height="18" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <g>
                      <rect x="153.5" y="112.35" width="7" height="1.3" style={{ fill: 'var(--ofig-on-ink, #FFFFFF)' }} />
                      <rect x="156.35" y="109.5" width="1.3" height="7" style={{ fill: 'var(--ofig-on-ink, #FFFFFF)' }} />
                    </g>
                    <rect x="174" y="104" width="18" height="18" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <g>
                      <rect x="179.5" y="112.35" width="7" height="1.3" style={{ fill: 'var(--ofig-on-ink, #FFFFFF)' }} />
                      <rect x="182.35" y="109.5" width="1.3" height="7" style={{ fill: 'var(--ofig-on-ink, #FFFFFF)' }} />
                    </g>
                    <rect x="200" y="104" width="18" height="18" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <g>
                      <rect x="205.5" y="112.35" width="7" height="1.3" style={{ fill: 'var(--ofig-on-ink, #FFFFFF)' }} />
                      <rect x="208.35" y="109.5" width="1.3" height="7" style={{ fill: 'var(--ofig-on-ink, #FFFFFF)' }} />
                    </g>
                    <text x="232" y="97" dominantBaseline="hanging" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '28px', fill: 'var(--ofig-ink, #101114)' }}>
                      →
                    </text>
                    <rect x="44" y="148" width="106" height="1" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <rect x="150" y="144" width="1" height="9" style={{ fill: 'var(--ofig-ink, #101114)' }} />
                    <text x="157" y="144" dominantBaseline="hanging" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fill: 'var(--ofig-muted, #646B74)', letterSpacing: '.04em' }}>
                      PAYOUTS
                    </text>
                  </svg>
                </div>
              </div>
              <p className="text-label text-tertiary mt-2xs" aria-hidden="true">[ 04 ]</p>
              <h3 className="text-h6 text-primary">Scale</h3>
              <p className="text-caption text-secondary">Autonomous ads run across Meta, Google, and ChatGPT with automatic revenue payouts to your bank.</p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
