export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <a href="/" className="text-2xl font-bold text-red-600 hover:scale-105 transition-transform">
            1ABEL
          </a>
          
          <div className="flex items-center space-x-6">
            <a href="/blog" className="text-white hover:text-red-400 transition-colors text-sm font-medium">
              Blog & Insights
            </a>
            <a href="/artists" className="text-white hover:text-red-400 transition-colors text-sm font-medium">
              Artists
            </a>
            <a href="/services" className="text-red-400 text-sm font-medium">
              Services
            </a>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Submit Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            OUR SERVICES
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Full-service artist development that transforms raw talent into global superstars. We handle everything so you can focus on creating music.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎵</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Music Production</h3>
              <p className="text-gray-300 mb-6">
                Professional recording, mixing, and mastering with industry-leading producers. Radio-ready sound guaranteed.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Professional studio recording</li>
                <li>• Industry-standard mixing & mastering</li>
                <li>• Beat production & composition</li>
                <li>• Vocal coaching & direction</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Social Media Management</h3>
              <p className="text-gray-300 mb-6">
                Complete social media domination across TikTok, Instagram, YouTube, and Twitter. We create viral moments.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Daily content creation</li>
                <li>• Viral campaign strategies</li>
                <li>• Influencer collaborations</li>
                <li>• Analytics & optimization</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Marketing & Promotion</h3>
              <p className="text-gray-300 mb-6">
                Strategic marketing campaigns that get your music heard by millions. Playlist placement and PR included.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Spotify playlist placement</li>
                <li>• Press & media coverage</li>
                <li>• Radio promotion campaigns</li>
                <li>• Influencer partnerships</li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎬</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Video Production</h3>
              <p className="text-gray-300 mb-6">
                High-budget music videos, lyric videos, and behind-the-scenes content. Cinematic quality every time.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Music video production</li>
                <li>• Lyric & visualizer videos</li>
                <li>• Behind-the-scenes content</li>
                <li>• Live performance videos</li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Brand Partnerships</h3>
              <p className="text-gray-300 mb-6">
                Connect with major brands for lucrative sponsorship deals. We negotiate the best rates and terms.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Brand deal negotiations</li>
                <li>• Sponsorship opportunities</li>
                <li>• Product placement deals</li>
                <li>• Long-term partnerships</li>
              </ul>
            </div>

            {/* Service 6 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎤</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Live Performance</h3>
              <p className="text-gray-300 mb-6">
                Book high-paying gigs, festivals, and tours. We handle everything from booking to production.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Festival bookings</li>
                <li>• Tour planning & management</li>
                <li>• Venue negotiations</li>
                <li>• Production coordination</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-red-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              INVESTMENT PLANS
            </h2>
            <p className="text-xl text-gray-300">
              Choose the package that fits your career goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Starter Plan */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-2 text-white">STARTER</h3>
              <p className="text-4xl font-bold text-red-400 mb-6">$5,000<span className="text-lg text-gray-400">/project</span></p>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-300">✓ Professional recording session</li>
                <li className="text-gray-300">✓ Mixing & mastering</li>
                <li className="text-gray-300">✓ Basic social media content</li>
                <li className="text-gray-300">✓ Streaming platform distribution</li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors">
                Get Started
              </button>
            </div>

            {/* Professional Plan */}
            <div className="p-8 bg-red-900/20 rounded-xl border-2 border-red-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">PROFESSIONAL</h3>
              <p className="text-4xl font-bold text-red-400 mb-6">$15,000<span className="text-lg text-gray-400">/project</span></p>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-300">✓ Everything in Starter</li>
                <li className="text-gray-300">✓ Music video production</li>
                <li className="text-gray-300">✓ Full marketing campaign</li>
                <li className="text-gray-300">✓ Playlist placement</li>
                <li className="text-gray-300">✓ Press & media coverage</li>
              </ul>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Choose Professional
              </button>
            </div>

            {/* Superstar Plan */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-2 text-white">SUPERSTAR</h3>
              <p className="text-4xl font-bold text-red-400 mb-6">$50,000<span className="text-lg text-gray-400">/project</span></p>
              <ul className="space-y-3 mb-8">
                <li className="text-gray-300">✓ Everything in Professional</li>
                <li className="text-gray-300">✓ Brand partnership deals</li>
                <li className="text-gray-300">✓ Tour booking & management</li>
                <li className="text-gray-300">✓ Celebrity collaborations</li>
                <li className="text-gray-300">✓ 1-year career management</li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors">
                Go Superstar
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            READY TO DOMINATE?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Let's discuss your vision and create a custom plan that fits your goals and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors">
              Submit Your Demo
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-lg text-lg font-semibold transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}