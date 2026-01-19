'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';

interface NavigationProps {
  activeItem?: 'contractors' | 'opportunities' | 'messages' | 'events' | 'faq' | 'guide';
}

export default function Navigation({ activeItem }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState(false);
  const router = useRouter();
  const { user, profile, signOut, loading } = useAuth();

  const navItems = [
    { href: '/contractors', label: 'Contractors', key: 'contractors' },
    { href: '/opportunities', label: 'Opportunities', key: 'opportunities' },
    { href: '/events', label: 'Events', key: 'events' },
    { href: '/faq', label: 'FAQ', key: 'faq' },
  ];

  const handleLogout = async () => {
    try {
      setLogoutError(false);
      await signOut();
      setMobileMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      setLogoutError(true);
      setTimeout(() => setLogoutError(false), 3000);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600">FedMatch</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.key}
              href={item.href} 
              className={`font-medium ${
                activeItem === item.key 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons - Always visible */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
          ) : user ? (
            <>
              <Link 
                href={profile?.account_type === 'contractor' ? '/dashboard/contractor' : '/dashboard/procurement'}
                className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-2"
              >
                <User size={16} />
                {profile?.full_name || 'Dashboard'}
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium">
                Login
              </Link>
              <Link href="/auth/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.key}
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium py-2 ${
                  activeItem === item.key 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-gray-200" />
            {loading ? (
              <Link 
                href="/auth/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Login
              </Link>
            ) : user ? (
              <>
                <Link 
                  href={profile?.account_type === 'contractor' ? '/dashboard/contractor' : '/dashboard/procurement'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 flex items-center gap-2"
                >
                  <User size={16} />
                  {profile?.full_name || 'Dashboard'}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium py-2 flex items-center gap-2"
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
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/signup" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
