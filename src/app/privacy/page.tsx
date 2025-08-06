import { Header } from '@/components/Header'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
            PRIVACY POLICY
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Last updated: January 30, 2025
          </p>
          <p className="text-lg text-gray-300">
            At 1ABEL, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert max-w-none">
          
          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
            <p className="text-gray-300 mb-4">
              When you interact with 1ABEL, we may collect:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Contact information (name, email, phone number)</li>
              <li>Artist information (stage name, bio, social media profiles)</li>
              <li>Demo submissions (music files, lyrics, production credits)</li>
              <li>Communication preferences and marketing consents</li>
              <li>Payment information for contracted artists</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Website usage data (pages visited, time spent, referral sources)</li>
              <li>Device information (browser type, operating system, IP address)</li>
              <li>Cookie data for website functionality and analytics</li>
              <li>Social media interactions and engagement metrics</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">How We Use Your Information</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Business Operations</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Processing demo submissions and artist applications</li>
              <li>Managing artist contracts and business relationships</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Processing payments and royalty distributions</li>
              <li>Legal compliance and dispute resolution</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Marketing and Promotion</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Sending newsletters and industry updates (with consent)</li>
              <li>Promoting artist releases and label news</li>
              <li>Targeting relevant advertisements and content</li>
              <li>Analyzing marketing campaign effectiveness</li>
              <li>Building and maintaining artist and fan communities</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Information Sharing</h2>
            
            <p className="text-gray-300 mb-4">
              We do not sell your personal information. We may share information in these circumstances:
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4">Business Partners</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Streaming platforms (Spotify, Apple Music, etc.) for distribution</li>
              <li>Social media platforms for promotional campaigns</li>
              <li>Brand partners for sponsored content and collaborations</li>
              <li>Music industry professionals (producers, managers, etc.)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Service Providers</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Payment processors for financial transactions</li>
              <li>Cloud storage providers for data hosting</li>
              <li>Analytics services for website and campaign performance</li>
              <li>Email marketing platforms for communications</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Legal Requirements</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Court orders and legal proceedings</li>
              <li>Government investigations and regulatory compliance</li>
              <li>Protecting rights, property, and safety</li>
              <li>Preventing fraud and illegal activities</li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-white mb-4">Access and Control</h3>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Request access to your personal information</li>
              <li>Update or correct inaccurate information</li>
              <li>Delete your personal information (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-4">Cookie Management</h3>
            <p className="text-gray-300 mb-4">
              You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
            </p>

            <h3 className="text-xl font-semibold text-white mb-4">Marketing Opt-Out</h3>
            <p className="text-gray-300 mb-4">
              Unsubscribe from marketing emails using the link in any email, or contact us directly. We'll process opt-out requests within 48 hours.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Data Security</h2>
            
            <p className="text-gray-300 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Encryption for data transmission and storage</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and employee training</li>
              <li>Secure cloud infrastructure with backup systems</li>
              <li>Incident response procedures for data breaches</li>
            </ul>

            <p className="text-gray-300 mb-4">
              While we take security seriously, no system is 100% secure. We cannot guarantee absolute security but continuously work to improve our protection measures.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">International Data Transfers</h2>
            
            <p className="text-gray-300 mb-4">
              1ABEL operates globally. Your information may be transferred to and processed in countries other than your residence, including:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>United States (cloud storage and analytics)</li>
              <li>European Union (streaming platform partners)</li>
              <li>Other countries where our business partners operate</li>
            </ul>

            <p className="text-gray-300 mb-4">
              We ensure appropriate safeguards are in place for international transfers, including contractual protections and adequacy decisions.
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Changes to This Policy</h2>
            
            <p className="text-gray-300 mb-4">
              We may update this privacy policy periodically. Changes will be posted on this page with an updated "last modified" date. 
            </p>
            <p className="text-gray-300 mb-4">
              For significant changes, we'll notify you via email or prominent website notice. Continued use of our services constitutes acceptance of the updated policy.
            </p>
          </div>

          <div className="bg-gray-900/20 rounded-xl p-8 border border-gray-500">
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            
            <p className="text-gray-300 mb-4">
              Questions about this privacy policy or your personal information? Contact us:
            </p>
            
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> privacy@1abel.com</p>
              <p><strong>Phone:</strong> +61 4XX XXX XXX</p>
              <p><strong>Address:</strong> 1ABEL Records, Sydney, Australia</p>
              <p><strong>Response Time:</strong> Within 48 hours for privacy inquiries</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}