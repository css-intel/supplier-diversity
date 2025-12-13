'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, DollarSign, Clock, Users, Menu, X } from 'lucide-react';

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState('browse');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const opportunities = [
    {
      id: 1,
      title: 'Commercial Building Electrical Work',
      nacis: '2711',
      location: 'Chicago, IL',
      budgetMin: 50000,
      budgetMax: 75000,
      deadline: '2025-01-15',
      description: 'Need experienced electrical contractor for new commercial building. Must have 10+ years experience and valid licenses.',
      bids: 12,
      postedBy: 'John Smith - City of Chicago'
    },
    {
      id: 2,
      title: 'HVAC System Installation',
      nacis: '4329',
      location: 'Denver, CO',
      budgetMin: 30000,
      budgetMax: 45000,
      deadline: '2025-01-20',
      description: 'Large-scale HVAC installation for new office complex. Looking for certified HVAC contractors with commercial experience.',
      bids: 8,
      postedBy: 'Sarah Johnson - Denver County'
    },
    {
      id: 3,
      title: 'Construction and Renovation',
      nacis: '4120',
      location: 'Atlanta, GA',
      budgetMin: 100000,
      budgetMax: 150000,
      deadline: '2025-02-01',
      description: 'Complete renovation of historical building. Requires experience with heritage preservation and modern building codes.',
      bids: 15,
      postedBy: 'Mike Davis - Atlanta Development Corp'
    },
    {
      id: 4,
      title: 'Plumbing Maintenance Contract',
      nacis: '4222',
      location: 'Miami, FL',
      budgetMin: 20000,
      budgetMax: 30000,
      deadline: '2025-01-25',
      description: 'Annual maintenance and emergency plumbing services for office building. Must be available for 24/7 emergency calls.',
      bids: 6,
      postedBy: 'Lisa Chen - Miami Office Management'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600">FedMatch</Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-white md:bg-transparent flex-col md:flex-row gap-4 p-4 md:p-0 md:gap-8`}>
            <Link href="/contractors" className="text-gray-700 hover:text-blue-600 font-medium">Contractors</Link>
            <Link href="/opportunities" className="text-blue-600 hover:text-blue-700 font-medium">Opportunities</Link>
            <Link href="/messages" className="text-gray-700 hover:text-blue-600 font-medium">Messages</Link>
            <Link href="/events" className="text-gray-700 hover:text-blue-600 font-medium">Events</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">Contract Opportunities</h1>

        {/* Tab Navigation - Mobile Optimized */}
        <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-3 font-medium text-sm md:text-base border-b-2 transition ${
              activeTab === 'browse'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Browse Opportunities
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-3 font-medium text-sm md:text-base border-b-2 transition ${
              activeTab === 'create'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Post Opportunity
          </button>
        </div>

        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-4 md:space-y-6">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 md:p-6">
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{opp.title}</h3>
                    <span className="text-sm md:text-base font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                      {opp.bids} bids
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">{opp.postedBy}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600">NACIS Code</p>
                    <p className="font-semibold text-gray-900">{opp.nacis}</p>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600 flex items-center gap-1"><MapPin size={14} /> Location</p>
                    <p className="font-semibold text-gray-900">{opp.location}</p>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600 flex items-center gap-1"><DollarSign size={14} /> Budget</p>
                    <p className="font-semibold text-gray-900">${(opp.budgetMin/1000).toFixed(0)}k - ${(opp.budgetMax/1000).toFixed(0)}k</p>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600 flex items-center gap-1"><Clock size={14} /> Deadline</p>
                    <p className="font-semibold text-gray-900">{new Date(opp.deadline).toLocaleDateString()}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{opp.description}</p>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium text-sm md:text-base transition">
                  Submit Bid
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Post Opportunity Tab */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8 max-w-2xl">
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opportunity Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Electrical Work for Commercial Building"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NACIS Code *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2711"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location/Service Area *
                  </label>
                  <input
                    type="text"
                    placeholder="City, State"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Min ($) *
                  </label>
                  <input
                    type="number"
                    placeholder="50000"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Max ($) *
                  </label>
                  <input
                    type="number"
                    placeholder="75000"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the opportunity, requirements, timeline, etc."
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 font-medium text-sm md:text-base transition"
                >
                  Post Opportunity
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('browse')}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 md:py-3 rounded-lg hover:bg-gray-300 font-medium text-sm md:text-base transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
