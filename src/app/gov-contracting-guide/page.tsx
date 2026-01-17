'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Users, Award, Target } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function GovContractingGuidePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const guides = [
    {
      title: 'Understanding Government Contracting',
      icon: BookOpen,
      content: 'Government contracting is the process of winning contracts from federal, state, or local government agencies. Unlike commercial contracting, government contracts have specific requirements including compliance with regulations, documentation standards, and reporting requirements. The primary goal of government contracting is to find and bid on opportunities that match your business capabilities, certifications, and experience.'
    },
    {
      title: 'How to Get Started',
      icon: Target,
      content: 'Step 1: Register and Create a Profile - Sign up on our platform and provide detailed information about your business, including your NACIS codes, service areas, and certifications.\n\nStep 2: Define Your Capabilities - Be specific about what services or products you can provide, your geographic reach, and any special expertise.\n\nStep 3: Search and Identify Opportunities - Use our platform to search for opportunities that match your profile.\n\nStep 4: Prepare Your Bid - Carefully review opportunity requirements, gather necessary documentation, and prepare a strong proposal.\n\nStep 5: Submit Your Bid - Meet all deadlines and submission requirements for opportunities you\'re interested in.'
    },
    {
      title: 'Business Certifications & Programs',
      icon: Award,
      content: 'Several certification programs exist to support diverse businesses:\n\n• DBE (Disadvantaged Business Enterprise) - Federal program requiring demonstration of disadvantage through personal narrative (currently under overhaul with new emphasis on narrative requirements)\n\n• HUBZone (Historically Underutilized Business Zone) - For businesses located in economically distressed areas\n\n• 8(a) Program (Small Disadvantaged Business) - For eligible small businesses owned by socially and economically disadvantaged individuals\n\n• MBE (Minority Business Enterprise) - For businesses owned by minorities\n\n• WBE (Women Business Enterprise) - For women-owned businesses\n\nNote: Requirements are evolving, especially for DBE certifications. Focus on developing strong personal narratives that demonstrate your disadvantage.'
    },
    {
      title: 'Teaming and Joint Ventures',
      icon: Users,
      content: 'Teaming Agreement: An informal arrangement where two or more companies work together on a contract without formal legal merger. This is flexible and commonly used for specific projects.\n\nJoint Venture (JV): A more formal, legally binding arrangement where companies merge their operations for a contract. This requires legal documentation and formal business structure.\n\nAdvantage of Teaming: Allows you to partner with complementary businesses to pursue larger opportunities, provide specialized services, or expand your geographic reach. Teaming agreements are simpler to establish and dissolve than JVs.'
    },
    {
      title: 'NACIS Codes Explained',
      icon: BookOpen,
      content: 'NACIS codes are 5-digit numerical codes that classify business activities and industries. These codes help procurement officers identify contractors with specific expertise. When creating your profile, list all relevant NACIS codes that represent your services and capabilities. When searching for opportunities, procurement officers often filter by NACIS code, so having accurate codes in your profile increases your visibility for matching opportunities. Example: If you provide construction services, you would have different NACIS codes than if you provide IT services.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation activeItem="guide" />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Government Contracting Guide</h1>
          <p className="text-base md:text-lg text-blue-100">Your complete resource for understanding government contracting and growing your business</p>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {guides.map((guide, index) => {
              const IconComponent = guide.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full px-4 md:px-6 py-4 md:py-5 flex justify-between items-center hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <IconComponent className="text-blue-600 flex-shrink-0" size={24} />
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{guide.title}</h3>
                    </div>
                    {expandedIndex === index ? (
                      <ChevronUp className="text-blue-600 flex-shrink-0" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                    )}
                  </button>
                  {expandedIndex === index && (
                    <div className="px-4 md:px-6 py-4 md:py-5 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">{guide.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Key Takeaways */}
          <div className="mt-12 md:mt-16 bg-blue-50 rounded-lg p-6 md:p-8 border border-blue-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Government contracting offers significant business opportunities across federal, state, and local levels</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Certifications like DBE, HUBZone, and 8(a) can help you access set-aside contracts</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Create a strong profile with accurate NACIS codes to increase visibility</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Teaming agreements allow you to partner with other businesses for larger opportunities</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Meet all deadlines and follow submission requirements carefully</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Use our platform to search, network, and bid on opportunities that match your capabilities</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link href="/auth/signup" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 px-4 mt-12">
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
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
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
