import { Header } from '@/components/Header'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            OUR SERVICES
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Comprehensive music industry consulting and development services that transform raw talent into sustainable businesses.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎵</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Music Production Consulting</h3>
              <p className="text-gray-300 mb-6">
                Strategic guidance on production workflows, studio setup optimization, and industry-standard mixing/mastering processes.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Production workflow optimization</li>
                <li>• Industry-standard quality assessment</li>
                <li>• Studio setup consulting</li>
                <li>• Technical standards guidance</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Digital Marketing Strategy</h3>
              <p className="text-gray-300 mb-6">
                Complete digital presence optimization across TikTok, Instagram, YouTube, and emerging platforms.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Social media strategy development</li>
                <li>• Algorithm optimization techniques</li>
                <li>• Content creation frameworks</li>
                <li>• Platform-specific best practices</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Business Development</h3>
              <p className="text-gray-300 mb-6">
                Strategic business planning, revenue optimization, and industry relationship building for sustainable growth.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Revenue stream diversification</li>
                <li>• Industry partnership facilitation</li>
                <li>• Business model optimization</li>
                <li>• Financial planning guidance</li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎬</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Content Strategy</h3>
              <p className="text-gray-300 mb-6">
                Visual content development strategy, including video production planning and brand aesthetic development.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Visual brand development</li>
                <li>• Video content strategy</li>
                <li>• Production workflow planning</li>
                <li>• Brand consistency frameworks</li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Industry Consulting</h3>
              <p className="text-gray-300 mb-6">
                Navigate complex industry relationships, contract negotiations, and strategic partnership opportunities.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Industry relationship building</li>
                <li>• Contract review and guidance</li>
                <li>• Partnership opportunity assessment</li>
                <li>• Strategic planning consultation</li>
              </ul>
            </div>

            {/* Service 6 */}
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Analytics & Optimization</h3>
              <p className="text-gray-300 mb-6">
                Data-driven performance analysis, streaming optimization, and growth metric tracking for informed decision-making.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Performance analytics review</li>
                <li>• Growth metric optimization</li>
                <li>• Data-driven strategy development</li>
                <li>• ROI analysis and reporting</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Consultation Process */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              HOW WE WORK
            </h2>
            <p className="text-xl text-gray-300">
              Our collaborative approach to music industry consulting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Discovery</h3>
              <p className="text-gray-300 text-sm">Initial consultation to understand your goals, current situation, and challenges</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Strategy</h3>
              <p className="text-gray-300 text-sm">Develop customized roadmap and action plan based on your specific needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Implementation</h3>
              <p className="text-gray-300 text-sm">Execute strategy with ongoing guidance and support throughout the process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Optimization</h3>
              <p className="text-gray-300 text-sm">Continuous refinement and optimization based on results and changing industry dynamics</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            READY TO ELEVATE?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Let's discuss your vision and create a custom strategy that fits your goals and situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:anyro@1abel.com" 
              className="bg-white text-black hover:bg-gray-200 px-12 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Email Us
            </a>
            <a 
              href="https://twitter.com/anyrxo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              @anyrxo
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}