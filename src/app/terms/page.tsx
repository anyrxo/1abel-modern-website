import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/90 backdrop-blur border-b border-gray-800">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform">
            <span className="text-red-600">1</span><span className="text-white">ABEL</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/blog" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Blog & Insights
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Services
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Contact
            </Link>
            <a href="mailto:contact@1abel.com" className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            TERMS OF SERVICE
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Last updated: January 30, 2025
          </p>
          <p className="text-lg text-gray-300">
            These terms govern your use of 1ABEL's services. By using our platform, you agree to these terms.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert max-w-none">
          
          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Agreement to Terms</h2>
            
            <p className="text-gray-300 mb-4">
              By accessing or using 1ABEL's website, services, or platforms, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of these terms, you may not access our services.
            </p>
            
            <p className="text-gray-300 mb-4">
              These terms apply to all visitors, users, artists, and others who access or use our services. 1ABEL reserves the right to update these terms at any time without prior notice.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Services Description</h2>
            
            <p className="text-gray-300 mb-4">
              1ABEL provides music industry services including but not limited to:
            </p>
            
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Artist development and career management</li>
              <li>Music production, recording, and mixing services</li>
              <li>Digital marketing and social media promotion</li>
              <li>Streaming platform distribution and playlist placement</li>
              <li>Brand partnership facilitation and negotiations</li>
              <li>Sync licensing and publishing administration</li>
              <li>Live performance booking and tour management</li>
            </ul>

            <p className="text-gray-300 mb-4">
              Services are provided "as is" and 1ABEL reserves the right to modify, suspend, or discontinue any service at any time.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">User Responsibilities</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Account Security</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Provide accurate and complete information</li>
              <li>Update your information as necessary</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Content Standards</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Submit only original content or content you have rights to use</li>
              <li>Ensure all submissions are free from copyright infringement</li>
              <li>Avoid content that is defamatory, obscene, or illegal</li>
              <li>Respect intellectual property rights of others</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Prohibited Activities</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Disrupting or interfering with our services</li>
              <li>Using our services for illegal or unauthorized purposes</li>
              <li>Impersonating another person or entity</li>
              <li>Spamming or sending unsolicited communications</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Your Content</h3>
            <p className="text-gray-300 mb-4">
              You retain ownership of any intellectual property rights in content you submit to 1ABEL. By submitting content, you grant 1ABEL a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content for the purposes of providing our services.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Our Content</h3>
            <p className="text-gray-300 mb-4">
              The 1ABEL website, services, and all related content, features, and functionality are owned by 1ABEL and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Third-Party Content</h3>
            <p className="text-gray-300 mb-4">
              Our services may contain content from third parties. We do not control or endorse third-party content and are not responsible for its accuracy or legality.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Artist Agreements</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Demo Submissions</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Demo submissions are evaluated at 1ABEL's sole discretion</li>
              <li>No guarantee of acceptance or response to submissions</li>
              <li>Submitted materials may be kept for evaluation purposes</li>
              <li>Artists remain responsible for their own content rights</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Artist Contracts</h3>
            <p className="text-gray-300 mb-4">
              Formal artist agreements are separate from these general terms. Artist contracts will specify:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Revenue sharing and royalty arrangements</li>
              <li>Rights and responsibilities of both parties</li>
              <li>Term length and termination conditions</li>
              <li>Marketing and promotion commitments</li>
              <li>Exclusive or non-exclusive arrangements</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Payment Terms</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Service Fees</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Fees for services are as agreed in individual contracts</li>
              <li>Payment terms are specified in service agreements</li>
              <li>Late payment may result in service suspension</li>
              <li>All fees are non-refundable unless otherwise stated</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Artist Royalties</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Royalty payments are made according to artist agreements</li>
              <li>Payment schedules are typically monthly or quarterly</li>
              <li>Minimum payout thresholds may apply</li>
              <li>Artists are responsible for their own tax obligations</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Disclaimers and Limitations</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Service Availability</h3>
            <p className="text-gray-300 mb-4">
              While we strive for consistent service availability, 1ABEL does not guarantee uninterrupted access to our services. We may experience downtime for maintenance, updates, or unforeseen issues.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Results Disclaimer</h3>
            <p className="text-gray-300 mb-4">
              Success in the music industry depends on many factors beyond our control. 1ABEL makes no guarantees regarding chart positions, streaming numbers, revenue generation, or career outcomes.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Limitation of Liability</h3>
            <p className="text-gray-300 mb-4">
              In no event shall 1ABEL be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Termination</h2>
            
            <p className="text-gray-300 mb-4">
              Either party may terminate their use of our services at any time. 1ABEL reserves the right to suspend or terminate accounts that violate these terms.
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">Effect of Termination</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Access to services will be immediately suspended</li>
              <li>Outstanding obligations remain in effect</li>
              <li>Intellectual property rights revert to respective owners</li>
              <li>Confidentiality obligations survive termination</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Governing Law</h2>
            
            <p className="text-gray-300 mb-4">
              These terms are governed by and construed in accordance with the laws of New South Wales, Australia. Any disputes arising from these terms or our services will be subject to the exclusive jurisdiction of the courts of New South Wales.
            </p>
            
            <p className="text-gray-300 mb-4">
              For international users, local laws may apply to certain aspects of your relationship with 1ABEL, but these terms shall govern to the extent permitted by law.
            </p>
          </div>

          <div className="bg-gray-900/20 rounded-xl p-8 border border-gray-500">
            <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
            
            <p className="text-gray-300 mb-4">
              Questions about these terms of service? Contact us:
            </p>
            
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> legal@1abel.com</p>
              <p><strong>Phone:</strong> +61 4XX XXX XXX</p>
              <p><strong>Address:</strong> 1ABEL Records, Sydney, Australia</p>
              <p><strong>Business Hours:</strong> Monday-Friday, 9AM-6PM AEST</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}