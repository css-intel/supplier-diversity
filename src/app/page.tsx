'use client';

import Link from 'next/link';
import { Search, Briefcase, Users, MessageSquare, Bell, ArrowRight, CheckCircle, Star, Award, Handshake, Video, CalendarDays } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 px-4 py-1 rounded-full text-sm mb-4">
            <Star size={14} className="text-yellow-400" />
            <span>Supplier Diversity Matchmaker</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-6">Connect Contractors with Opportunities</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8">Find procurement opportunities, teaming partners, and grow your government contracting business</p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search by NAICS code, location, certification..."
              className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-800 text-sm md:text-base"
            />
            <button className="px-4 md:px-6 py-2 md:py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 flex items-center justify-center gap-2 whitespace-nowrap">
              <Search size={18} />
              <span className="hidden md:inline">Search</span>
            </button>
          </form>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Link href="/opportunities?type=procurement" className="px-4 py-2 bg-white/20 rounded-full text-sm hover:bg-white/30 flex items-center gap-2">
              <Briefcase size={14} /> Procurement Opportunities
            </Link>
            <Link href="/opportunities?type=teaming" className="px-4 py-2 bg-white/20 rounded-full text-sm hover:bg-white/30 flex items-center gap-2">
              <Handshake size={14} /> Find Teaming Partners
            </Link>
            <Link href="/events" className="px-4 py-2 bg-white/20 rounded-full text-sm hover:bg-white/30 flex items-center gap-2">
              <CalendarDays size={14} /> Matchmaking Events
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-4xl font-bold text-blue-600">0</div>
              <p className="text-gray-800 font-semibold mt-1 md:mt-2 text-sm md:text-base">Verified Contractors</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-4xl font-bold text-blue-600">0</div>
              <p className="text-gray-800 font-semibold mt-1 md:mt-2 text-sm md:text-base">Procurement Officers</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-4xl font-bold text-blue-600">0</div>
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
                  <span className="text-sm md:text-base">Build profile with NAICS codes, certifications & service areas</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Get instant alerts for matching opportunities</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Star & save opportunities to review later</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Find teaming partners for larger contracts</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Upload capability statements & past performance</span>
                </li>
              </ul>
              <Link href="/auth/signup?type=contractor" className="btn btn-primary btn-lg btn-full mt-6 md:mt-8">
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
                  <span className="text-sm md:text-base">Post procurement & teaming opportunities</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Search contractors by NAICS, location & certifications</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Review capability statements & past performance</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Preview posts before publishing</span>
                </li>
                <li className="flex gap-2 md:gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-sm md:text-base">Track who views & saves your opportunities</span>
                </li>
              </ul>
              <Link href="/auth/signup?type=procurement" className="btn btn-primary btn-lg btn-full mt-6 md:mt-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <Briefcase className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Smart Opportunity Matching</h3>
              <p className="text-gray-600 text-sm md:text-base">Post opportunities with NAICS codes. Contractors with matching codes get instant notifications.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <Handshake className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Teaming Opportunities</h3>
              <p className="text-gray-600 text-sm md:text-base">Find teaming partners for larger contracts. Post and search teaming opportunities separately from procurement.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <Award className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Certification Showcase</h3>
              <p className="text-gray-600 text-sm md:text-base">Highlight DBE, MBE, WBE, 8(a), HUBZone, and SDVOSB certifications on your profile.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <Star className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Save & Track</h3>
              <p className="text-gray-600 text-sm md:text-base">Star opportunities to save for later. Procurement can see who's viewed and saved their posts.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <Video className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Video Messaging</h3>
              <p className="text-gray-600 text-sm md:text-base">Connect face-to-face with video calls. Coming soon: integrated video messaging.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-8 shadow-md hover:shadow-lg transition">
              <CalendarDays className="text-blue-600 mb-3 md:mb-4" size={28} />
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Matchmaking Events</h3>
              <p className="text-gray-600 text-sm md:text-base">Register for networking events and Power Hours. Powered by My Virtual Check-In.</p>
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
              <h3 className="font-bold text-blue-600 mb-2 md:mb-3 text-sm md:text-base">What are NAICS codes?</h3>
              <p className="text-gray-600 text-sm md:text-base">NAICS codes categorize businesses by industry. Contractors add their codes to their profile, and procurement officers use them to find qualified contractors for specific work.</p>
            </div>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-blue-600 mb-2 md:mb-3 text-sm md:text-base">How do I get alerts for matching opportunities?</h3>
              <p className="text-gray-600 text-sm md:text-base">Add your NAICS codes to your contractor profile and enable alert preferences. You'll automatically get notifications when opportunities matching your codes are posted.</p>
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
            <Link href="/auth/signup?type=contractor" className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100">
              Contractor <ArrowRight size={18} />
            </Link>
            <Link href="/auth/signup?type=procurement" className="btn btn-lg bg-yellow-500 text-gray-900 hover:bg-yellow-400">
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
          <p>© 2026 FedMatch. All rights reserved.</p>
          <p className="text-gray-500 mt-2">Events powered by My Virtual Check-In</p>
        </div>
      </footer>
    </div>
  );
}
