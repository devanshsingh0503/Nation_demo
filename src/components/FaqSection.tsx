'use client'
import { useState } from 'react'

const FAQ_ITEMS = [
  {
    num: '01',
    question: 'How does one-prompt store creation work?',
    answer: 'You describe what you want to sell in natural language (e.g., "minimalist japanese home decor" or "high-performance running apparel"). Nation immediately provisions your store, designs the brand identity, generates high-res product listings with vetted suppliers, sets up secure checkout, and preconfigures automated marketing campaigns — in under 60 seconds.',
  },
  {
    num: '02',
    question: 'Do I need any coding or design skills?',
    answer: 'None whatsoever. Nation is designed from the ground up for everyday entrepreneurs. The AI handles visual design, mobile responsiveness, typography, product descriptions, pricing algorithms, and payment integrations. You have full creative control to adjust anything with simple prompts or direct edits.',
  },
  {
    num: '03',
    question: 'How do the autonomous marketing agents work?',
    answer: 'Powered by Ryze AI technology, Nation continuously creates high-converting ad visuals, copy variations, and video hooks. It tests and scales campaigns across Meta (Instagram & Facebook), Google Ads, TikTok, and ChatGPT. As campaigns run, the AI reallocates budget to top-performing ads in real time to maximize your return on ad spend (ROAS).',
  },
  {
    num: '04',
    question: 'How do I approve orders and fulfillment?',
    answer: 'You receive instant push or SMS notifications on your phone when an order arrives or a campaign needs review. You review the details and tap "Approve" with one click. AI agents handle supplier routing, inventory deduction, tracking number generation, and customer notifications automatically.',
  },
  {
    num: '05',
    question: 'Can I connect my own custom products or suppliers?',
    answer: 'Yes. While Nation can automatically source on-demand products and vetted manufacturers for you, you can also import custom inventory, private-label goods, digital products, or connect your existing warehouse via API or CSV.',
  },
  {
    num: '06',
    question: 'How is Nation different from Shopify or Whop?',
    answer: 'Shopify gives you an empty storefront and expects you to spend 40 hours a week finding products, fixing CSS, hiring agencies, and manually managing Facebook ads. Whop is tailored to digital communities. Nation is the agentic Shopify: one prompt starts your store, and autonomous agents do the heavy lifting of running operations and marketing while you approve.',
  },
  {
    num: '07',
    question: 'How much does Nation cost?',
    answer: 'You can start a store for free with one prompt. Nation charges a simple software subscription with low transaction fees that scale only when you make sales. There are no hidden plugin fees or developer retainers needed.',
  },
  {
    num: '08',
    question: 'Can I migrate an existing store from Shopify?',
    answer: 'Yes. With our 1-click Shopify import, Nation seamlessly imports your existing catalog, customer records, order history, and domains. Once imported, Nation takes over autonomous operations and marketing.',
  },
  {
    num: '09',
    question: 'Which ad platforms does Nation run campaigns on?',
    answer: 'Nation deploys and manages campaigns across Meta (Instagram, Facebook), Google Search and Shopping, TikTok, YouTube Shorts, and conversational ad formats within ChatGPT and AI assistants.',
  },
  {
    num: '10',
    question: 'How do payouts work?',
    answer: 'All payments are processed securely via Stripe. Revenues from completed orders are deposited directly and automatically into your linked bank account on a rolling schedule.',
  },
  {
    num: '11',
    question: 'Who is behind Nation?',
    answer: 'Nation was founded by Ira and an engineering team with deep heritage in AI ad automation (Ryze AI). Backed by Speedrun and prominent tech leaders, our mission is to empower independent entrepreneurs to own autonomous, profitable businesses.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" data-theme="light" className="relative pt-section-md pb-section-md bg-subtle">
      <div className="relative container-main">
        <div className="gap-x-lg gap-y-2xl grid lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <div>
              <p className="text-eyebrow bracketed">Frequently asked</p>
              <h2 className="text-h2 text-primary mt-md">Questions, answered.</h2>
              <p className="text-sm text-secondary mt-md">
                Have questions about launching your store?<br />Talk directly to our founding team.
              </p>
              <div className="mt-md">
                <a
                  href="/contact"
                  className="text-label text-primary hover:text-tertiary transition-colors duration-spring-soft ease-spring-soft inline-block"
                >
                  <span>Talk to founders</span> <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (Accordion) */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-line border-t">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                  <details
                    key={item.num}
                    className="faq-item border-line border-b"
                    open={isOpen}
                    onClick={(e) => {
                      e.preventDefault()
                      toggle(idx)
                    }}
                  >
                    <summary className="gap-md py-md flex cursor-pointer list-none items-center">
                      <span className="text-meta text-tertiary min-w-sm shrink-0 whitespace-nowrap" aria-hidden="true">
                        {item.num}
                      </span>
                      <h3 className="faq-question text-large flex-1 font-medium">{item.question}</h3>
                      <span className="faq-sign text-sm shrink-0 font-mono" aria-hidden="true">
                        [{isOpen ? '-' : '+'}]
                      </span>
                    </summary>
                    {isOpen && (
                      <div className="faq-answer gap-sm pb-md pl-faq flex flex-col">
                        <p className="text-sm text-secondary measure">{item.answer}</p>
                      </div>
                    )}
                  </details>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
