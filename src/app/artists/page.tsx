export default function ArtistsPage() {
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
            <a href="/artists" className="text-red-400 text-sm font-medium">
              Artists
            </a>
            <a href="/services" className="text-white hover:text-red-400 transition-colors text-sm font-medium">
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
            OUR ARTISTS
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Meet the superstars defining the future of RnB, trap, and rap music globally. Every artist on our roster is hand-picked for their unique sound and viral potential.
          </p>
        </div>
      </section>

      {/* Featured Artists Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Artist 1 */}
            <div className="relative overflow-hidden rounded-xl h-96 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110"
                style={{
                  backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(220,38,38);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(147,51,234);stop-opacity:1" /></linearGradient></defs><rect width="400" height="400" fill="url(%23grad1)"/><circle cx="200" cy="150" r="60" fill="rgba(255,255,255,0.1)"/><path d="M160 220 L240 220 L200 280 Z" fill="rgba(255,255,255,0.1)"/></svg>')`
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold mb-2 text-white">KOFI</h3>
                <p className="text-red-200 mb-2">RnB Sensation</p>
                <p className="text-gray-300 text-sm mb-4">45M+ Streams • Featured on Spotify's RnB Central</p>
                <div className="flex space-x-4">
                  <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
                    <span className="text-white text-xs">♪</span>
                  </button>
                  <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <span className="text-white text-xs">▶</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Artist 2 */}
            <div className="relative overflow-hidden rounded-xl h-96 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110"
                style={{
                  backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(147,51,234);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(59,130,246);stop-opacity:1" /></linearGradient></defs><rect width="400" height="400" fill="url(%23grad2)"/><polygon points="200,80 320,200 200,320 80,200" fill="rgba(255,255,255,0.1)"/><circle cx="200" cy="200" r="30" fill="rgba(255,255,255,0.2)"/></svg>')`
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold mb-2 text-white">LUNA TRAP</h3>
                <p className="text-purple-200 mb-2">Trap Queen</p>
                <p className="text-gray-300 text-sm mb-4">32M+ Streams • TikTok viral sensation</p>
                <div className="flex space-x-4">
                  <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
                    <span className="text-white text-xs">♪</span>
                  </button>
                  <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <span className="text-white text-xs">▶</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Artist 3 */}
            <div className="relative overflow-hidden rounded-xl h-96 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110"
                style={{
                  backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(249,115,22);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(220,38,38);stop-opacity:1" /></linearGradient></defs><rect width="400" height="400" fill="url(%23grad3)"/><path d="M200 50 L350 200 L200 350 L50 200 Z" fill="rgba(255,255,255,0.1)"/><rect x="150" y="150" width="100" height="100" fill="rgba(255,255,255,0.2)"/></svg>')`
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold mb-2 text-white">PHOENIX</h3>
                <p className="text-orange-200 mb-2">Hip-Hop Artist</p>
                <p className="text-gray-300 text-sm mb-4">28M+ Streams • Billboard chart success</p>
                <div className="flex space-x-4">
                  <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
                    <span className="text-white text-xs">♪</span>
                  </button>
                  <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <span className="text-white text-xs">▶</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent">
            READY TO JOIN THE ROSTER?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Think you have what it takes? Submit your demo and let's build your empire together.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors">
            Submit Your Demo
          </button>
        </div>
      </section>
    </div>
  )
}