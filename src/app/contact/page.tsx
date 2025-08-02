import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-red-600 hover:scale-105 transition-transform">
            1ABEL
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/blog" className="text-white hover:text-red-400 transition-colors text-sm font-medium">
              Blog & Insights
            </Link>
            <Link href="/artists" className="text-white hover:text-red-400 transition-colors text-sm font-medium">
              Artists
            </Link>
            <Link href="/services" className="text-white hover:text-red-400 transition-colors text-sm font-medium">
              Services
            </Link>
            <Link href="/contact" className="text-red-400 text-sm font-medium">
              Contact
            </Link>
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
            GET IN TOUCH
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Ready to take your music career to the next level? Let's discuss how 1ABEL can transform your artistry into global success.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Demo Submissions */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎵</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Submit Your Demo</h3>
              <p className="text-gray-300 mb-6">
                Ready to join the roster? Send us your best tracks and let's build your empire together.
              </p>
              <ul className="text-sm text-gray-400 space-y-2 mb-6">
                <li>• High-quality MP3 or WAV files</li>
                <li>• Include artist bio and social links</li>
                <li>• 2-5 of your strongest tracks</li>
                <li>• Response within 48 hours</li>
              </ul>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Submit Demo
              </button>
            </div>

            {/* Business Inquiries */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Business & Partnerships</h3>
              <p className="text-gray-300 mb-6">
                Brand partnerships, sync licensing, distribution deals, and other business opportunities.
              </p>
              <div className="space-y-3 text-gray-300">
                <p>📧 business@1abel.com</p>
                <p>📱 +61 4XX XXX XXX</p>
                <p>📍 Sydney, Australia</p>
                <p>⏰ Response within 24 hours</p>
              </div>
            </div>

            {/* Press & Media */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-red-500/50 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Press & Media</h3>
              <p className="text-gray-300 mb-6">
                Interview requests, press releases, and media kit downloads for journalists and bloggers.
              </p>
              <div className="space-y-3 text-gray-300">
                <p>📧 press@1abel.com</p>
                <p>📱 Media Kit Available</p>
                <p>🎤 Interview Requests Welcome</p>
                <p>📸 High-res Images Available</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-red-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              SEND US A MESSAGE
            </h2>
            <p className="text-xl text-gray-300">
              Have a specific question? Fill out the form below and we'll get back to you.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Name *</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Email *</label>
                <input 
                  type="email" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Artist/Stage Name</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                  placeholder="Your artist name"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Inquiry Type</label>
                <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none">
                  <option>Demo Submission</option>
                  <option>Business Partnership</option>
                  <option>Press/Media</option>
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-white font-semibold mb-2">Message *</label>
              <textarea 
                rows={6}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                placeholder="Tell us about your project, goals, or question..."
              ></textarea>
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-3">How long does demo review take?</h3>
              <p className="text-gray-300">We review all demos within 48 hours. If your music fits our roster, we'll schedule a call within a week to discuss next steps.</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-3">What genres do you work with?</h3>
              <p className="text-gray-300">We specialize in RnB, trap, rap, and hip-hop. We're looking for artists who blend these genres with modern production and viral potential.</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-3">Do you offer development deals?</h3>
              <p className="text-gray-300">Yes! We offer artist development, distribution deals, and full label partnerships depending on where you are in your career.</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-3">What makes 1ABEL different?</h3>
              <p className="text-gray-300">We focus on digital-first marketing, TikTok/social media growth, and modern streaming strategies. No radio pitching or outdated promotion methods.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}