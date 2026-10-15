import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import IntroAnimation from '@/components/IntroAnimation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Nation | The Agentic Shopify — A Store That Runs & Markets Itself',
  description: 'One prompt starts your store. Nation builds the storefront, manages orders, and runs high-converting ads across Meta, Google, and ChatGPT.',
  metadataBase: new URL('https://withnation.ai'),
  alternates: { canonical: 'https://withnation.ai/' },
  openGraph: {
    type: 'website',
    siteName: 'Nation',
    title: 'Nation | The Agentic Shopify — A Store That Runs & Markets Itself',
    description: 'One prompt starts your store. Nation builds the storefront, manages orders, and runs high-converting ads across Meta, Google, and ChatGPT.',
    url: 'https://withnation.ai/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nation — A store that runs and markets itself.' }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://withnation.ai/#organization",
                  "name": "Nation",
                  "url": "https://withnation.ai",
                  "description": "The agentic Shopify: one prompt, and a store builds itself, runs itself and markets itself.",
                  "logo": { "@type": "ImageObject", "url": "https://withnation.ai/apple-touch-icon.png", "width": 180, "height": 180 },
                  "founder": {
                    "@type": "Person",
                    "name": "Ira",
                    "jobTitle": "Founder"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "founders@withnation.ai",
                    "telephone": "+1 631 480 55 98",
                    "contactType": "customer service"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://withnation.ai/#website",
                  "url": "https://withnation.ai",
                  "name": "Nation",
                  "description": "A store that runs and markets itself. One prompt starts a store.",
                  "publisher": { "@id": "https://withnation.ai/#organization" },
                  "inLanguage": "en"
                },
                {
                  "@type": "WebPage",
                  "@id": "https://withnation.ai/#webpage",
                  "url": "https://withnation.ai/",
                  "name": "Nation | The Agentic Shopify",
                  "description": "A store that runs and markets itself. One prompt starts a store.",
                  "isPartOf": { "@id": "https://withnation.ai/#website" },
                  "inLanguage": "en"
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <IntroAnimation />
        <SmoothScroll>
          <a href="#main" className="skip-link text-sm">Skip to main content</a>
          <Navigation />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
