'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';

interface NavigationProps {
  activeItem?: 'contractors' | 'opportunities' | 'messages' | 'events' | 'faq' | 'guide';
}

export default function Navigation({ activeItem }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();

  const navItems = [
    { href: '/contractors', label: 'Contractors', key: 'contractors' },
    { href: '/opportunities', label: 'Opportunities', key: 'opportunities' },
    { href: '/events', label: 'Events', key: 'events' },
    { href: '/faq', label: 'FAQ', key: 'faq' },
  ];

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

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
          
          {!loading && (
            <>
              {user ? (
                <>
                  <Link 
                    href={profile?.account_type === 'contractor' ? '/dashboard/contractor' : '/dashboard/procurement'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-blue-600 font-medium py-2 md:py-0 flex items-center gap-2"
                  >
                    <User size={16} />
                    {profile?.full_name || 'Dashboard'}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 font-medium py-2 md:py-0 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
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
                    className="btn btn-primary"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
