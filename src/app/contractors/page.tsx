'use client';

import NextLink from 'next/link';
import { useState } from 'react';
import { Search, MapPin, Star, Briefcase, Menu, X } from 'lucide-react';

export default function ContractorsPage() {
  const [naceCode, setNaceCode] = useState('');
  const [location, setLocation] = useState('');
  const [minRating, setMinRating] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const contractors = [
    {
      id: 1,
      name: 'BuildRight Construction',
      naces: ['4120', '4210'],
      location: 'Atlanta, GA',
      rating: 4.9,
      reviews: 127,
      yearsInBusiness: 15,
      serviceAreas: ['Georgia', 'Florida', 'South Carolina'],
      pastPerformance: 'Completed 45+ projects, 0 disputes'
    },
    {
      id: 2,
      name: 'ElectroTech Solutions',
      naces: ['2711', '2712'],
      location: 'Austin, TX',
      rating: 4.8,
      reviews: 94,
      yearsInBusiness: 12,
      serviceAreas: ['Texas', 'Oklahoma', 'Louisiana'],
      pastPerformance: 'Specialized in commercial electrical, 38 projects'
    },
    {
      id: 3,
      name: 'ConsultPro Advisors',
      naces: ['6199', '7490'],
      location: 'Denver, CO',
      rating: 4.7,
      reviews: 83,
      yearsInBusiness: 18,
      serviceAreas: ['Colorado', 'Wyoming', 'Utah', 'New Mexico'],
      pastPerformance: 'Management consulting, 52 completed engagements'
    },
    {
      id: 4,
      name: 'Plumbing Professionals LLC',
      naces: ['4222', '4329'],
      location: 'Chicago, IL',
      rating: 4.6,
      reviews: 76,
      yearsInBusiness: 10,
      serviceAreas: ['Illinois', 'Indiana', 'Wisconsin', 'Michigan'],
      pastPerformance: 'Residential & commercial plumbing, 156 projects'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <NextLink href="/" className="text-xl md:text-2xl font-bold text-blue-600">ContractConnect</NextLink>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-white md:bg-transparent flex-col md:flex-row gap-4 p-4 md:p-0 md:gap-8`}>
            <NextLink href="/contractors" className="text-blue-600 hover:text-blue-700 font-medium">Contractors</NextLink>
            <NextLink href="/opportunities" className="text-gray-700 hover:text-blue-600 font-medium">Opportunities</NextLink>
            <NextLink href="/messages" className="text-gray-700 hover:text-blue-600 font-medium">Messages</NextLink>
            <NextLink href="/events" className="text-gray-700 hover:text-blue-600 font-medium">Events</NextLink>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">Find Contractors</h1>

        {/* Filter Panel - Mobile Optimized */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold mb-4">Filter Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NACIS Code</label>
              <input
                type="text"
                value={naceCode}
                onChange={(e) => setNaceCode(e.target.value)}
                placeholder="e.g., 4120, 2711"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contractor Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {contractors.map((contractor) => (
            <div key={contractor.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 md:p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">{contractor.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin size={14} /> {contractor.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-sm md:text-base">{contractor.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">{contractor.reviews} reviews</p>
                </div>
              </div>

              <div className="mb-3 space-y-2">
                <p className="text-xs md:text-sm text-gray-700">
                  <strong>NACIS Codes:</strong> {contractor.naces.join(', ')}
                </p>
                <p className="text-xs md:text-sm text-gray-700">
                  <strong>Years in Business:</strong> {contractor.yearsInBusiness}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-xs font-medium text-gray-600 mb-2">Service Areas:</p>
                <div className="flex flex-wrap gap-1">
                  {contractor.serviceAreas.map((area) => (
                    <span key={area} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-3 mb-4 rounded">
                <p className="text-xs md:text-sm text-gray-700">
                  <strong>Past Performance:</strong> {contractor.pastPerformance}
                </p>
              </div>

              <NextLink
                href="#"
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                View Profile
              </NextLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
