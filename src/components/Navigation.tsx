'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeItem?: 'contractors' | 'opportunities' | 'messages' | 'events' | 'faq' | 'guide';
}

export default function Navigation({ activeItem }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/contractors', label: 'Contractors', key: 'contractors' },
    { href: '/opportunities', label: 'Opportunities', key: 'opportunities' },
    { href: '/messages', label: 'Messages', key: 'messages' },
    { href: '/events', label: 'Events', key: 'events' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600">FedMatch</Link>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-white md:bg-transparent flex-col md:flex-row gap-4 p-4 md:p-0 md:gap-8 shadow-lg md:shadow-none`}>
          {navItems.map((item) => (
            <Link 
              key={item.key}
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-medium py-2 md:py-0 ${
                activeItem === item.key 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="/auth/login" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 font-medium py-2 md:py-0"
          >
            Login
          </Link>
          <Link 
            href="/auth/signup" 
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
