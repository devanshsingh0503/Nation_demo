'use client'
import Image from 'next/image'

export default function ApproachSection() {
  return (
    <section id="approach" data-theme="dark" className="relative pt-section-md pb-section-md">
      <div className="relative container-main">
        <div className="gap-x-lg gap-y-2xl grid lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <p className="text-eyebrow bracketed">The Nation Mission</p>
            <h2 className="text-h2 text-primary mt-lg">
              A nation of<br /> independent owners.
            </h2>
            <div className="text-sm text-secondary mt-lg gap-md measure flex flex-col">
              <p>
                Shopify solved the storefront. Nobody solved running the store. Everyday entrepreneurs spend dozens of hours sourcing inventory, managing fulfillment, and losing money on complex ad dashboards.
              </p>
              <p>
                Nation is the agentic Shopify: one prompt, and a store builds itself, runs itself, and markets itself. Our autonomous agents do the heavy lifting in the background — you approve with one click. Our sellers are not users; they are our citizens.
              </p>
            </div>
            <dl className="mt-md gap-md flex flex-col">
              <div className="gap-xs flex flex-col">
                <dt className="text-eyebrow bracketed">Vision</dt>
                <dd className="text-sm text-secondary">The agentic e-commerce platform for the next 100M owners</dd>
              </div>
              <div className="gap-xs flex flex-col">
                <dt className="text-eyebrow bracketed">Technology</dt>
                <dd className="text-sm text-secondary">Ryze AI ad engine · Autonomous multi-agent coordination</dd>
              </div>
              <div className="gap-xs flex flex-col">
                <dt className="text-eyebrow bracketed">Backing & Base</dt>
                <dd className="text-sm text-secondary">Speedrun / a16z scout backed · San Francisco & worldwide</dd>
              </div>
            </dl>
          </div>

          {/* Right Column / Photo */}
          <figure className="lg:col-span-4 lg:col-start-9">
            <div className="bg-subtle relative aspect-[440/540] overflow-hidden" data-theme="light">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ira.avif"
                alt="Ira, founder of Nation"
                loading="lazy"
                decoding="async"
                width={1000}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <span className="corner-marks corner-marks-inset text-primary" aria-hidden="true" />
            </div>
            <figcaption className="text-meta text-tertiary mt-sm">Ira · Founder, Nation</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
