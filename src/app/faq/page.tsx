'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I get started in government contracting?',
      answer: 'Government contracting is an excellent opportunity for businesses to grow. Start by registering on our platform, creating a detailed profile with your NACIS codes and service areas, and exploring available opportunities. You can also take advantage of our Government Contracting Guide to understand the basics.'
    },
    {
      question: 'What are NACIS codes?',
      answer: 'NACIS (North American Classification of Industries System) codes are 5-digit numerical codes used to classify business activities. They help procurement officers find contractors with specific expertise and service areas. Make sure to add all relevant NACIS codes to your contractor profile.'
    },
    {
      question: 'What is a teaming agreement?',
      answer: 'A teaming agreement is an informal arrangement where two or more companies agree to work together on a contract without being formally merged. It\'s like a temporary partnership. This is different from a Joint Venture (JV), which is a legally binding relationship. Teaming is more flexible and doesn\'t require legal formalization.'
    },
    {
      question: 'How do I post opportunities?',
      answer: 'If you\'re a procurement officer, you can post opportunities by logging into your account and navigating to the Opportunities section. Include relevant NACIS codes, location, service areas, and submission deadline. Budget minimums and maximums are optional.'
    },
    {
      question: 'What certifications should I pursue?',
      answer: 'Common certifications in government contracting include DBE (Disadvantaged Business Enterprise), MBE (Minority Business Enterprise), HUBZone, 8(a), and Women-Owned Business. The DBE program is currently undergoing updates with new emphasis on personal narratives of disadvantage. Consult our Government Contracting Guide for detailed information on each certification.'
    },
    {
      question: 'How does smart opportunity matching work?',
      answer: 'Smart opportunity matching uses your NACIS codes and service areas to automatically notify you of new opportunities that match your expertise. When procurement officers post opportunities, contractors with matching codes receive instant alerts, making it easier to find relevant work.'
    },
    {
      question: 'Can I communicate with other users?',
      answer: 'Yes! Our secure messaging system allows contractors to communicate directly with procurement officers and vice versa. You can ask questions about opportunities, discuss terms, or explore potential teaming arrangements.'
    },
    {
      question: 'What is the submission deadline?',
      answer: 'The submission deadline is the date by which you must submit your proposal or bid for an opportunity. Make sure to note this date carefully and submit before the deadline to be considered.'
    },
    {
      question: 'Are budget requirements mandatory?',
      answer: 'No, budget minimums and maximums are optional fields when posting opportunities. Not all contracts have defined budgets, and leaving these fields blank is perfectly acceptable.'
    },
    {
      question: 'How do I search for contractors?',
      answer: 'If you\'re a procurement officer, you can search for contractors by NACIS codes, location, service areas, and past performance. Use the search filters to find contractors that match your project requirements.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation activeItem="faq" />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-base md:text-lg text-blue-100">Get answers to common questions about government contracting and our platform</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-4 md:px-6 py-4 md:py-5 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <h3 className="text-left font-semibold text-gray-900 text-sm md:text-base">{faq.question}</h3>
                  {expandedIndex === index ? (
                    <ChevronUp className="text-blue-600 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                </button>
                {expandedIndex === index && (
                  <div className="px-4 md:px-6 py-4 md:py-5 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="mt-12 md:mt-16 bg-blue-50 rounded-lg p-6 md:p-8 border border-blue-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
            <p className="text-gray-700 mb-6">Check out our other resources to get started:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/gov-contracting-guide" className="block p-4 bg-white rounded-lg hover:shadow-md transition text-blue-600 font-semibold">
                → Government Contracting Guide
              </Link>
              <Link href="/blog" className="block p-4 bg-white rounded-lg hover:shadow-md transition text-blue-600 font-semibold">
                → Read Our Blog
              </Link>
            </div>
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
            <h4 className="font-bold text-white mb-2 md:mb-4 text-sm md:text-base\">Support</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
              <li><a href="/faq" className="hover:text-white">FAQ & Guides</a></li>
              <li><a href="/gov-contracting-guide" className="hover:text-white\">Gov Contracting Guide</a></li>
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
