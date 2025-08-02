import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/90 backdrop-blur border-b border-gray-800">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform">
            <span className="text-gray-600">1</span><span className="text-white">ABEL</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/blog" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Blog & Insights
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Services
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 text-sm font-medium">
              Contact
            </Link>
            <a href="mailto:anyro@1abel.com" className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Ready to discuss your music career or business opportunity? We prefer direct communication through email or social media.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Email Contact */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📧</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Email</h3>
              <p className="text-gray-300 mb-6">
                For all business inquiries, partnerships, and consultations.
              </p>
              <a 
                href="mailto:anyro@1abel.com" 
                className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                anyro@1abel.com
              </a>
            </div>

            {/* Social Media Contact */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🐦</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Social Media</h3>
              <p className="text-gray-300 mb-6">
                Quick questions, updates, and industry discussions.
              </p>
              <a 
                href="https://twitter.com/anyrxo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                @anyrxo
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            HOW TO REACH US
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Business Inquiries</h3>
              <p className="text-gray-300 mb-4">
                Partnerships, collaborations, and business development opportunities.
              </p>
              <p className="text-white font-medium">📧 anyro@1abel.com</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Industry Connect</h3>
              <p className="text-gray-300 mb-4">
                Quick questions, industry discussions, and networking.
              </p>
              <p className="text-white font-medium">🐦 @anyrxo</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
              <p className="text-gray-300 mb-4">
                We typically respond within 24-48 hours for all inquiries.
              </p>
              <p className="text-white font-medium">⏰ 24-48 hours</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* What to Include */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            WHEN REACHING OUT
          </h2>
          
          <div className="space-y-8">
            
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">For Artists & Musicians</h3>
              <p className="text-gray-300 mb-4">
                Include a brief introduction about yourself, your music style, current goals, and what you're looking for from 1ABEL.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Your background and musical style</li>
                <li>• Current projects and goals</li>
                <li>• Specific areas where you need guidance</li>
                <li>• Timeline and availability for consultation</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">For Business Partners</h3>
              <p className="text-gray-300 mb-4">
                Describe your organization, the partnership opportunity, and how it aligns with 1ABEL's mission.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Your company/organization overview</li>
                <li>• Specific partnership proposal</li>
                <li>• Expected outcomes and benefits</li>
                <li>• Timeline and next steps</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">For Media & Press</h3>
              <p className="text-gray-300 mb-4">
                Include your publication details, story angle, deadline, and specific information you're seeking.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Publication/media outlet information</li>
                <li>• Story concept and angle</li>
                <li>• Deadline requirements</li>
                <li>• Specific questions or interview needs</li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            FREQUENTLY ASKED
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-3">How do you work with artists?</h3>
              <p className="text-gray-300">We provide strategic consulting and guidance rather than traditional label services. Each relationship is customized based on the artist's specific needs and goals.</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-3">What makes 1ABEL different?</h3>
              <p className="text-gray-300">We focus on modern digital marketing strategies, understanding current algorithms, and building sustainable careers rather than outdated industry practices.</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-3">Do you work internationally?</h3>
              <p className="text-gray-300">Yes, we work with artists and partners globally. Most of our consulting can be done remotely, with in-person meetings available in major cities.</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-3">What's your consultation process?</h3>
              <p className="text-gray-300">We start with a discovery call to understand your situation, then develop a customized strategy with ongoing support and optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            LET'S CONNECT
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to discuss how 1ABEL can help accelerate your music career or business?
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:anyro@1abel.com" 
              className="bg-white text-black hover:bg-gray-200 px-12 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Email Us Now
            </a>
            <a 
              href="https://twitter.com/anyrxo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Message @anyrxo
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}