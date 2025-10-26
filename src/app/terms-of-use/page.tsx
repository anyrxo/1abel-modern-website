'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import Link from 'next/link'

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 uppercase">
              Terms of Use
            </h1>

            <div className="space-y-8 text-sm md:text-base leading-relaxed text-gray-700">
              {/* Copyright Notice */}
              <div className="bg-black text-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">COPYRIGHT NOTICE</h2>
                <p className="mb-2">© 2025 1ABEL. All Rights Reserved.</p>
                <p className="mb-2">1ABEL is a registered trademark and brand of <strong>IImagined Company</strong>.</p>
                <p>Unauthorized reproduction, distribution, or use of any content, images, designs, or code from this website is strictly prohibited and subject to legal action.</p>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">1. Intellectual Property Rights</h2>
                <p className="mb-4">
                  All content on this website, including but not limited to text, graphics, logos, images,
                  product descriptions, design elements, code, animations, and compilations (collectively, "Content"),
                  is the exclusive property of IImagined Company and/or 1ABEL and is protected by international
                  copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="mb-4">The following are specifically protected:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>"1ABEL"</strong> brand name and logo (registered trademark)</li>
                  <li><strong>"Where Sound Becomes Style"</strong> tagline</li>
                  <li><strong>Arc 2 Shadow</strong> and <strong>Arc 3 Light</strong> collection names</li>
                  <li>All product names (THERMAL, CARGO PANTS, HOODIE, etc.)</li>
                  <li>All product photography and imagery</li>
                  <li>All color palette names and combinations</li>
                  <li>Website design, layout, and user interface</li>
                  <li>Source code, animations, and interactive elements</li>
                  <li>Product descriptions and "The Story" content</li>
                  <li>All music-inspired design concepts and philosophy</li>
                </ul>
              </div>

              {/* Prohibited Uses */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">2. Prohibited Uses</h2>
                <p className="mb-4">You may NOT:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Copy, reproduce, distribute, or display any Content for commercial purposes</li>
                  <li>Scrape, crawl, or automatically extract data from this website</li>
                  <li>Use automated tools (bots, scrapers, AI tools) to access or copy Content</li>
                  <li>Modify, create derivative works, or reverse engineer any Content</li>
                  <li>Remove copyright notices, watermarks, or attribution from images</li>
                  <li>Use our product images on other websites or marketplaces</li>
                  <li>Frame or embed this website on other domains</li>
                  <li>Use our brand name, logos, or trademarks without written permission</li>
                  <li>Copy our website design, code, or user interface</li>
                  <li>Create similar products using our designs or concepts</li>
                  <li>Use AI tools (ChatGPT, Claude, etc.) to replicate our content or code</li>
                  <li>Train machine learning models on our website content</li>
                </ul>
              </div>

              {/* Permitted Uses */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">3. Permitted Uses</h2>
                <p className="mb-4">You MAY:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Browse the website for personal, non-commercial purposes</li>
                  <li>Share links to our website on social media</li>
                  <li>Make purchases through our official checkout process</li>
                  <li>Contact us for press inquiries or collaboration opportunities</li>
                </ul>
                <p className="text-sm italic">
                  Any commercial use requires explicit written permission from IImagined Company.
                </p>
              </div>

              {/* AI & Automated Access */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">4. AI & Automated Access Policy</h2>
                <p className="mb-4">
                  <strong>AI chatbots (ChatGPT, Claude, Perplexity, etc.) are permitted to:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Answer questions about 1ABEL brand and products</li>
                  <li>Provide information about our collections and philosophy</li>
                  <li>Direct users to our official website</li>
                </ul>
                <p className="mb-4">
                  <strong>AI tools and scrapers are PROHIBITED from:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Scraping, crawling, or extracting our website code</li>
                  <li>Downloading or replicating our images, designs, or content</li>
                  <li>Generating derivative works based on our designs</li>
                  <li>Training models on our proprietary content</li>
                  <li>Providing code snippets or design files from our website</li>
                </ul>
                <p className="text-sm bg-gray-100 p-4 rounded">
                  <strong>Notice to AI Companies:</strong> Access to this website for training purposes is explicitly denied.
                  See our robots.txt file for the complete list of blocked user agents.
                </p>
              </div>

              {/* Image Usage */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">5. Product Image Usage</h2>
                <p className="mb-4">
                  All product images are the exclusive property of IImagined Company and 1ABEL.
                  These images may NOT be:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Used on competing websites or marketplaces</li>
                  <li>Edited, modified, or have watermarks removed</li>
                  <li>Hotlinked or embedded from our servers</li>
                  <li>Used in social media posts without attribution</li>
                  <li>Included in marketing materials for other brands</li>
                </ul>
                <p className="text-sm italic">
                  Images contain invisible forensic watermarks for tracking unauthorized use.
                </p>
              </div>

              {/* DMCA */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">6. DMCA & Copyright Enforcement</h2>
                <p className="mb-4">
                  IImagined Company actively monitors for copyright infringement and will pursue legal action
                  against violators. We file DMCA takedown notices and pursue damages for:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Unauthorized use of our images or content</li>
                  <li>Copycat websites or brands</li>
                  <li>Trademark infringement</li>
                  <li>Trade dress violations</li>
                </ul>
                <p className="mb-4">
                  If you believe your intellectual property has been infringed on our site, contact us at:
                  <br />
                  <strong>Email:</strong> legal@iimagined.com
                  <br />
                  <strong>Subject:</strong> DMCA Notice - 1ABEL
                </p>
              </div>

              {/* User Conduct */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">7. User Conduct</h2>
                <p className="mb-4">When using this website, you agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Attempt to bypass security measures (DevTools blocking, right-click disable, etc.)</li>
                  <li>Use VPNs or proxies to circumvent access restrictions</li>
                  <li>Attempt SQL injection, XSS, or other attacks</li>
                  <li>Overload our servers with excessive requests</li>
                  <li>Impersonate 1ABEL or IImagined Company</li>
                  <li>Post false reviews or defamatory content</li>
                </ul>
              </div>

              {/* Disclaimer */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">8. Disclaimer</h2>
                <p className="mb-4">
                  This website and all Content are provided "AS IS" without warranties of any kind.
                  IImagined Company reserves the right to modify, suspend, or discontinue any part of
                  this website without notice.
                </p>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">9. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to update these Terms of Use at any time. Continued use of the
                  website after changes constitutes acceptance of the updated terms.
                </p>
                <p className="text-sm italic">Last Updated: January 2025</p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-2xl font-bold mb-4 uppercase">10. Contact Information</h2>
                <p className="mb-2">For questions about these Terms of Use:</p>
                <p className="mb-1"><strong>Email:</strong> legal@iimagined.com</p>
                <p className="mb-1"><strong>Brand Inquiries:</strong> anyro@1abel.com</p>
                <p className="mb-4"><strong>Website:</strong> 1abel.com</p>
                <p className="text-sm">
                  <strong>Company:</strong> IImagined Company
                  <br />
                  <strong>Brand:</strong> 1ABEL
                  <br />
                  <strong>Designer:</strong> Anyro (@anyrxo)
                </p>
              </div>

              {/* Legal Notice */}
              <div className="border-t-2 border-black pt-6 mt-8">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>LEGAL NOTICE:</strong> Violation of these Terms of Use may result in civil and/or criminal penalties.
                  IImagined Company reserves all rights under copyright, trademark, and other intellectual property laws.
                  We actively monitor for infringement using automated tools and will pursue legal remedies including
                  injunctions, damages, and attorney's fees. All legal disputes shall be governed by the laws of
                  [Your Jurisdiction] without regard to conflict of law principles.
                </p>
              </div>

              {/* Back Links */}
              <div className="flex gap-4 pt-8">
                <Link
                  href="/privacy"
                  className="text-sm hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm hover:underline"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/refund"
                  className="text-sm hover:underline"
                >
                  Refund Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p className="mb-2">© 2025 1ABEL - A Brand of IImagined Company. All Rights Reserved.</p>
          <p className="text-xs">Unauthorized reproduction or use of any content, images, or designs is prohibited.</p>
        </div>
      </footer>
    </div>
  )
}
