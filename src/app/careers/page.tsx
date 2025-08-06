import { Header } from '@/components/Header'
import Link from 'next/link'

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            JOIN THE TEAM
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Help us build the future of music. We're looking for passionate individuals who want to revolutionize how artists succeed in the modern music industry.
          </p>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">
            WHY 1ABEL?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Innovation First</h3>
              <p className="text-gray-300 mb-4">
                Work at the cutting edge of music marketing and technology. We're building the future, not following the past.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Latest tools and technologies</li>
                <li>• Experimental marketing campaigns</li>
                <li>• Direct impact on artist success</li>
                <li>• Creative freedom and autonomy</li>
              </ul>
            </div>

            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Competitive Package</h3>
              <p className="text-gray-300 mb-4">
                Top-tier compensation, equity opportunities, and comprehensive benefits for all team members.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Above-market salaries</li>
                <li>• Equity participation</li>
                <li>• Comprehensive health coverage</li>
                <li>• Flexible working arrangements</li>
              </ul>
            </div>

            <div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎵</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Music Culture</h3>
              <p className="text-gray-300 mb-4">
                Immerse yourself in the music industry. Work with incredible artists and help shape the future of RnB, trap, and rap.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Direct artist collaboration</li>
                <li>• Industry events and networking</li>
                <li>• Studio access and sessions</li>
                <li>• Music festival experiences</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">
            OPEN POSITIONS
          </h2>
          
          <div className="space-y-8">
            
            {/* Position 1 */}
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Social Media Marketing Manager</h3>
                  <p className="text-gray-400 mb-4">Full-time • Sydney/Remote • $80K-120K + Equity</p>
                  <p className="text-gray-300 mb-4">
                    Lead TikTok, Instagram, and YouTube campaigns for our artist roster. Create viral content strategies and manage influencer partnerships.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">TikTok Marketing</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Content Strategy</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Influencer Relations</span>
                  </div>
                </div>
                <div>
                  <a href="mailto:anyro@1abel.com?subject=Application" className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>

            {/* Position 2 */}
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Music Producer / Audio Engineer</h3>
                  <p className="text-gray-400 mb-4">Full-time • Sydney • $70K-100K + Royalties</p>
                  <p className="text-gray-300 mb-4">
                    Produce, mix, and master tracks for our RnB, trap, and rap artists. Work in our state-of-the-art studio facility.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Pro Tools</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Urban Music</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Mixing/Mastering</span>
                  </div>
                </div>
                <div>
                  <a href="mailto:anyro@1abel.com?subject=Application" className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>

            {/* Position 3 */}
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Video Director / Content Creator</h3>
                  <p className="text-gray-400 mb-4">Contract/Full-time • Sydney • $60K-90K + Project Bonuses</p>
                  <p className="text-gray-300 mb-4">
                    Create music videos, behind-the-scenes content, and social media visuals. Experience with urban music aesthetics required.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Music Videos</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Adobe Creative Suite</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Social Content</span>
                  </div>
                </div>
                <div>
                  <a href="mailto:anyro@1abel.com?subject=Application" className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>

            {/* Position 4 */}
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Data Analyst / Growth Hacker</h3>
                  <p className="text-gray-400 mb-4">Full-time • Remote • $75K-105K + Equity</p>
                  <p className="text-gray-300 mb-4">
                    Analyze streaming data, social media metrics, and campaign performance. Optimize our marketing strategies using data insights.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Python/SQL</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Spotify Analytics</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Growth Marketing</span>
                  </div>
                </div>
                <div>
                  <a href="mailto:anyro@1abel.com?subject=Application" className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>

            {/* Position 5 */}
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <h3 className="text-2xl font-bold text-white mb-2">Artist Relations Manager</h3>
                  <p className="text-gray-400 mb-4">Full-time • Sydney • $65K-85K + Commission</p>
                  <p className="text-gray-300 mb-4">
                    Manage relationships with our artist roster. Handle day-to-day communications, tour coordination, and career development.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Artist Management</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Music Industry</span>
                    <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Project Management</span>
                  </div>
                </div>
                <div>
                  <a href="mailto:anyro@1abel.com?subject=Application" className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            INTERNSHIP PROGRAM
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Get hands-on experience in the music industry. Our 3-6 month internship program provides real-world training with potential full-time opportunities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">What You'll Get</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Real project responsibility</li>
                <li>• Mentorship from industry veterans</li>
                <li>• Paid internship opportunities</li>
                <li>• Full-time conversion potential</li>
                <li>• Industry networking events</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Areas Available</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Social Media Marketing</li>
                <li>• Music Production</li>
                <li>• Video Production</li>
                <li>• Data Analytics</li>
                <li>• Artist Relations</li>
              </ul>
            </div>
          </div>
          
          <a href="mailto:anyro@1abel.com?subject=Internship Application" className="bg-white text-black hover:bg-gray-200 px-12 py-4 rounded-lg text-lg font-semibold transition-colors inline-block">
            Apply for Internship
          </a>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            APPLICATION PROCESS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Apply</h3>
              <p className="text-gray-300 text-sm">Submit your application with portfolio/samples</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Screen</h3>
              <p className="text-gray-300 text-sm">Initial phone/video call with our team</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Project</h3>
              <p className="text-gray-300 text-sm">Complete a real project challenge</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Offer</h3>
              <p className="text-gray-300 text-sm">Final interview and offer discussion</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            DON'T SEE YOUR ROLE?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            We're always looking for exceptional talent. Send us your resume and tell us how you can help revolutionize the music industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="mailto:anyro@1abel.com?subject=General Application" className="bg-white text-black hover:bg-gray-200 px-12 py-4 rounded-lg text-lg font-semibold transition-colors inline-block">
              Send General Application
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