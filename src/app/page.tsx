'use client';

import Link from 'next/link';
import { Search, Briefcase, Users, MessageSquare, Bell, ArrowRight, CheckCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Mobile Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-lg md:text-2xl font-bold text-blue-600 flex-shrink-0">FedMatch</Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 flex-shrink-0 ml-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 md:top-0 w-full md:w-auto bg-white md:bg-transparent flex-col md:flex-row gap-2 md:gap-8 p-4 md:p-0 border-t md:border-t-0 border-gray-200 md:border-0`}>
            <Link href="/contractors" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2 md:py-0 text-sm md:text-base">Contractors</Link>
            <Link href="/opportunities" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2 md:py-0 text-sm md:text-base">Opportunities</Link>
            <Link href="/messages" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2 md:py-0 text-sm md:text-base">Messages</Link>
            <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2 md:py-0 text-sm md:text-base">Events</Link>
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2 md:py-0 text-sm md:text-base">Login</Link>
            <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 md:py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-center w-full md:w-auto text-sm md:text-base active:bg-blue-800">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-6">Connect Contractors with Opportunities</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8">A unified platform for procurement officers to post opportunities and contractors to find work</p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search by NACIS code, location..."
              className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-800 text-sm md:text-base"
            />
            <button className="px-4 md:px-6 py-2 md:py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 flex items-center justify-center gap-2 whitespace-nowrap">
              <Search size={18} />
              <span className="hidden md:inline">Search</span>
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-4xl font-bold text-blue-600">5,000+</div>
              <p className="text-gray-800 font-semibold mt-1 md:mt-2 text-sm md:text-base">Verified Contractors</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-4xl font-bold text-blue-600">1,200+</div>
              <p className="text-gray-800 font-semibold mt-1 md:mt-2 text-sm md:text-base">Procurement Officers</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-4xl font-bold text-blue-600">3,500+</div>
              <p className="text-gray-800 font-semibold mt-1 md:mt-2 text-sm md:text-base">Active Opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Mobile Optimized */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* For Contractors */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Briefcase className="text-blue-600 flex-shrink-0" size={28} />
                <h3 className="text-xl md:text-2xl font-bold">For Contractors</h3>
              </div>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Build profile with NACIS codes & service areas</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Get instant alerts for matching opportunities</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Browse and bid on contract opportunities</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Communicate directly with procurement officers</span>
                </li>
              </ul>
              <Link href="/auth/signup?type=contractor" className="mt-6 md:mt-8 block w-full text-center bg-blue-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-700 text-sm md:text-base">
                I'm a Contractor
              </Link>
            </div>

            {/* For Procurement Officers */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Users className="text-blue-600 flex-shrink-0" size={28} />
                <h3 className="text-xl md:text-2xl font-bold">For Procurement</h3>
              </div>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Post opportunities with NACIS codes</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Search contractors by NACIS & location</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Review past performance & qualifications</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Communicate directly with contractors</span>
                </li>
              </ul>
              <Link href="/auth/signup?type=procurement" className="mt-6 md:mt-8 block w-full text-center bg-blue-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-700 text-sm md:text-base">
                I'm Procurement Officer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features - Mobile Optimized */}
      <section className="bg-gray-50 py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <Briefcase className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Smart Opportunity Matching</h3>
              <p className="text-gray-600 text-sm md:text-base">Post opportunities with NACIS codes. Contractors with matching codes get instant notifications.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <Users className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Contractor Directory</h3>
              <p className="text-gray-600 text-sm md:text-base">Search verified contractors by NACIS codes, service areas, and past performance.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <MessageSquare className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Secure Messaging</h3>
              <p className="text-gray-600 text-sm md:text-base">Communicate directly with contractors or procurement officers within the platform.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <Bell className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Real-Time Alerts</h3>
              <p className="text-gray-600 text-sm md:text-base">Get notifications for new opportunities, messages, and events in your area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-blue-600 mb-2 md:mb-3 text-sm md:text-base">What are NACIS codes?</h3>
              <p className="text-gray-600 text-sm md:text-base">NACIS codes categorize businesses by industry. Contractors add their codes to their profile, and procurement officers use them to find qualified contractors for specific work.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-blue-600 mb-2 md:mb-3 text-sm md:text-base">How do I get alerts for matching opportunities?</h3>
              <p className="text-gray-600 text-sm md:text-base">Add your NACIS codes to your contractor profile and enable alert preferences. You'll automatically get notifications when opportunities matching your codes are posted.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-blue-600 mb-2 md:mb-3 text-sm md:text-base">What business certifications do you support?</h3>
              <p className="text-gray-600 text-sm md:text-base">We support DBE, HUBZone, 8(a), MBE, WBE, and other federal certifications. Add yours to your profile to stand out to procurement officers.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-blue-600 mb-2 md:mb-3 text-sm md:text-base">Can I team with other contractors?</h3>
              <p className="text-gray-600 text-sm md:text-base">Yes! You can form teaming agreements with other contractors to bid on larger opportunities. Use our messaging system to coordinate with potential partners.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-blue-600 mb-2 md:mb-3 text-sm md:text-base">How do I post opportunities?</h3>
              <p className="text-gray-600 text-sm md:text-base">After signing up as a procurement officer, go to your dashboard. Click "Post New Opportunity" and fill in the details including NACIS codes and submission deadline.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-blue-600 mb-2 md:mb-3 text-sm md:text-base">Is my information confidential?</h3>
              <p className="text-gray-600 text-sm md:text-base">Yes, your profile and bid information are secure. We only share information with procurement officers when bidding on their opportunities or after you've established contact.</p>
            </div>
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Link href="/faq" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
              View All FAQs <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-6">Ready to Get Started?</h2>
          <p className="text-base md:text-lg mb-6 md:mb-8">Join thousands of contractors and procurement officers using FedMatch</p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/auth/signup?type=contractor" className="px-6 md:px-8 py-2 md:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center gap-2 text-sm md:text-base">
              Contractor <ArrowRight size={18} />
            </Link>
            <Link href="/auth/signup?type=procurement" className="px-6 md:px-8 py-2 md:py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 flex items-center justify-center gap-2 text-sm md:text-base">
              Procurement <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8">
          <div>
            <h4 className="font-bold text-white mb-2 md:mb-4 text-sm md:text-base">Platform</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li><Link href="/contractors" className="hover:text-white">Find Contractors</Link></li>
              <li><Link href="/opportunities" className="hover:text-white">Browse Opportunities</Link></li>
              <li><Link href="/events" className="hover:text-white">Events & Training</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2 md:mb-4 text-sm md:text-base">Company</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2 md:mb-4 text-sm md:text-base">Legal</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2 md:mb-4 text-sm md:text-base">Support</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li><a href="/faq" className="hover:text-white">FAQ & Guides</a></li>
              <li><a href="/gov-contracting-guide" className="hover:text-white">Gov Contracting Guide</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 md:pt-8 border-t border-gray-700 text-center text-xs md:text-sm">
          <p>© 2024 FedMatch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
