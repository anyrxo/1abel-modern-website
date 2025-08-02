import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/90 backdrop-blur border-b border-gray-800">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform">
            <span className="text-red-600">1</span><span className="text-white">ABEL</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/blog" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Blog & Insights
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
              Services
            </Link>
            <Link href="/about" className="text-gray-300 text-sm font-medium">
              About
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
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            ABOUT 1ABEL
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            The world's most advanced music label for RnB, trap, and rap artists. We don't just release music - we build superstars.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
                OUR MISSION
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Traditional labels are stuck in 2015, pitching radio DJs while kids discover music on TikTok. We're building the future of music marketing.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Every decision we make is focused on one thing: turning talented artists into global superstars using modern marketing, real social media strategy, and algorithms that actually work.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Algorithm Mastery</h3>
                    <p className="text-gray-300 text-sm">TikTok, Instagram, YouTube - we speak fluent algorithm</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Artist First</h3>
                    <p className="text-gray-300 text-sm">Fair deals, no 360 contracts, you keep your masters</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Real Results</h3>
                    <p className="text-gray-300 text-sm">50M+ streams, viral TikToks, actual career growth</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl p-8">
                <div className="bg-black/50 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">The 1ABEL Difference</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-white">50M+</div>
                      <div className="text-sm text-gray-300">Total Streams</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">24</div>
                      <div className="text-sm text-gray-300">Active Artists</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">500M+</div>
                      <div className="text-sm text-gray-300">TikTok Views</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">2</div>
                      <div className="text-sm text-gray-300">Week Releases</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">
            OUR STORY
          </h2>
          
          <div className="space-y-12">
            
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">The Problem We Saw</h3>
              <p className="text-gray-300 mb-4">
                In 2023, we watched talented RnB and trap artists struggle with traditional labels that didn't understand modern music marketing. Labels were still focused on radio play while Gen Z discovered music on TikTok.
              </p>
              <p className="text-gray-300">
                Artists were signing 360 deals, giving up their masters, and waiting 18+ months for releases while independent artists were going viral in weeks.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">The Solution We Built</h3>
              <p className="text-gray-300 mb-4">
                1ABEL was founded on a simple principle: use modern marketing to build sustainable music careers. We studied viral hits, analyzed algorithm patterns, and built systems that actually work.
              </p>
              <p className="text-gray-300">
                Instead of pitching radio DJs, we create TikTok campaigns. Instead of 360 deals, we offer fair partnerships. Instead of 18-month release cycles, we deliver in 2 weeks.
              </p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">The Results We Deliver</h3>
              <p className="text-gray-300 mb-4">
                Our artists consistently outperform traditional label artists in streaming numbers, social media growth, and brand partnership deals. We've cracked the code on modern music marketing.
              </p>
              <p className="text-gray-300">
                From bedroom producers to Billboard charts, from local artists to global streaming success - we've proven that the right strategy can transform any talented artist into a superstar.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">
            WHAT WE BELIEVE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center p-8 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🎵</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Art First</h3>
              <p className="text-gray-300">
                Great music is the foundation of everything. We only work with artists who have genuine talent and unique voices that deserve to be heard globally.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Innovation Always</h3>
              <p className="text-gray-300">
                The music industry changes daily. We stay ahead of trends, test new platforms, and adapt our strategies faster than traditional labels ever could.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Partnership</h3>
              <p className="text-gray-300">
                We're partners, not owners. Artists keep their masters, get fair deals, and maintain creative control while we handle the business and marketing.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">
            THE TEAM
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Strategy Team</h3>
              <p className="text-gray-300 mb-4">Marketing experts, social media strategists, and data analysts who understand viral content and algorithm optimization.</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl">🎧</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Creative Team</h3>
              <p className="text-gray-300 mb-4">Producers, engineers, video directors, and graphic designers who bring artistic visions to life with professional quality.</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Business Team</h3>
              <p className="text-gray-300 mb-4">Industry veterans, brand partnership specialists, and legal experts who protect artists and maximize revenue opportunities.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            READY TO JOIN US?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            If you're a talented RnB, trap, or rap artist ready to take your career to the next level, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="mailto:contact@1abel.com" className="bg-white text-black hover:bg-gray-200 px-12 py-4 rounded-lg text-lg font-semibold transition-colors inline-block">
              Email Us
            </a>
            <Link href="/contact">
              <a href="https://twitter.com/anyrxo" target="_blank" rel="noopener noreferrer" className="border border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-lg text-lg font-semibold transition-colors inline-block">
                @anyrxo
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}