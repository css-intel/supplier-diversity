'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';

interface DashboardNavigationProps {
  userName: string;
  dashboardType: 'contractor' | 'procurement';
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DashboardNavigation({ userName, dashboardType, activeTab, onTabChange }: DashboardNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      setLogoutError(false);
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      setLogoutError(true);
      setTimeout(() => setLogoutError(false), 3000);
    }
  };

  const contractorTabs = [
    { key: 'opportunities', label: 'Opportunities' },
    { key: 'profile', label: 'My Profile' },
    { key: 'alerts', label: 'Alerts' },
  ];

  const procurementTabs = [
    { key: 'opportunities', label: 'My Opportunities' },
    { key: 'profile', label: 'My Profile' },
    { key: 'contractors', label: 'Find Contractors' },
  ];

  const tabs = dashboardType === 'contractor' ? contractorTabs : procurementTabs;

  return (
    <>
      {/* Logout error banner */}
      {logoutError && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-[60]">
          Logout failed. Please try again.
        </div>
      )}
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
            {tabs.map((tab) => (
              <button 
                key={tab.key}
                onClick={() => { onTabChange(tab.key); setMobileMenuOpen(false); }}
                className={`font-medium text-left py-2 md:py-0 ${
                  activeTab === tab.key 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <Link 
              href="/messages" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium text-left py-2 md:py-0"
            >
              Messages
            </Link>
            <button 
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2 text-left py-2 md:py-0"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
