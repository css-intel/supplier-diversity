'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, DollarSign, Clock, Users, Menu, X, Star, Bookmark, Calendar, Filter, Eye, FileText, Paperclip } from 'lucide-react';

export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState('browse');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'all' | 'procurement' | 'teaming'>('all');
  const [savedOpportunities, setSavedOpportunities] = useState<number[]>([]);

  const opportunities = [
    {
      id: 1,
      title: 'Commercial Building Electrical Work',
      nacis: '2711',
      location: 'Chicago, IL',
      budgetMin: 50000,
      budgetMax: 75000,
      deadline: '2026-02-15',
      datePosted: '2026-01-10',
      description: 'Need experienced electrical contractor for new commercial building. Must have 10+ years experience and valid licenses.',
      bids: 12,
      postedBy: 'John Smith - City of Chicago',
      type: 'procurement' as const,
      attachments: 2
    },
    {
      id: 2,
      title: 'HVAC System Installation',
      nacis: '4329',
      location: 'Denver, CO',
      budgetMin: 30000,
      budgetMax: 45000,
      deadline: '2026-02-20',
      datePosted: '2026-01-12',
      description: 'Large-scale HVAC installation for new office complex. Looking for certified HVAC contractors with commercial experience.',
      bids: 8,
      postedBy: 'Sarah Johnson - Denver County',
      type: 'procurement' as const,
      attachments: 1
    },
    {
      id: 3,
      title: 'Looking for Construction Partner - Federal Contract',
      nacis: '4120',
      location: 'Atlanta, GA',
      budgetMin: 100000,
      budgetMax: 150000,
      deadline: '2026-03-01',
      datePosted: '2026-01-14',
      description: 'Prime contractor seeking MBE/WBE partner for federal construction project. Joint venture or subcontracting arrangement available.',
      bids: 15,
      postedBy: 'Mike Davis - Atlas Construction LLC',
      type: 'teaming' as const,
      attachments: 3
    },
    {
      id: 4,
      title: 'IT Infrastructure Teaming Opportunity',
      nacis: '54151',
      location: 'Washington, DC',
      budgetMin: 200000,
      budgetMax: 500000,
      deadline: '2026-02-28',
      datePosted: '2026-01-15',
      description: 'Seeking 8(a) or HUBZone certified IT firm for teaming on federal IT modernization contract. Strong past performance required.',
      bids: 6,
      postedBy: 'TechPro Solutions Inc.',
      type: 'teaming' as const,
      attachments: 4
    },
    {
      id: 5,
      title: 'Plumbing Maintenance Contract',
      nacis: '4222',
      location: 'Miami, FL',
      budgetMin: 20000,
      budgetMax: 30000,
      deadline: '2026-02-25',
      datePosted: '2026-01-08',
      description: 'Annual maintenance and emergency plumbing services for office building. Must be available for 24/7 emergency calls.',
      bids: 6,
      postedBy: 'Lisa Chen - Miami Office Management',
      type: 'procurement' as const,
      attachments: 1
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => 
    typeFilter === 'all' || opp.type === typeFilter
  );

  const toggleSave = (id: number) => {
    setSavedOpportunities(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">Contract Opportunities</h1>
            <p className="text-gray-600 mt-1">Find procurement RFPs and teaming partners</p>
          </div>
          {savedOpportunities.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
              <Bookmark size={16} className="fill-blue-600" />
              <span>{savedOpportunities.length} saved</span>
            </div>
          )}
        </div>

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
            {/* Type Filter */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter by Type:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setTypeFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      typeFilter === 'all' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({opportunities.length})
                  </button>
                  <button
                    onClick={() => setTypeFilter('procurement')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      typeFilter === 'procurement' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🏛️ Procurement ({opportunities.filter(o => o.type === 'procurement').length})
                  </button>
                  <button
                    onClick={() => setTypeFilter('teaming')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      typeFilter === 'teaming' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🤝 Teaming ({opportunities.filter(o => o.type === 'teaming').length})
                  </button>
                </div>
              </div>
            </div>

            {/* Opportunities List */}
            {filteredOpportunities.map((opp) => (
              <div key={opp.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 md:p-6">
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900">{opp.title}</h3>
                        <button 
                          onClick={() => toggleSave(opp.id)}
                          className={`p-1 rounded transition flex-shrink-0 ${
                            savedOpportunities.includes(opp.id) 
                              ? 'text-yellow-500' 
                              : 'text-gray-300 hover:text-yellow-500'
                          }`}
                          title={savedOpportunities.includes(opp.id) ? 'Remove from saved' : 'Save opportunity'}
                        >
                          <Star size={20} className={savedOpportunities.includes(opp.id) ? 'fill-yellow-500' : ''} />
                        </button>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">{opp.postedBy}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs md:text-sm font-semibold px-3 py-1 rounded-full ${
                        opp.type === 'teaming' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {opp.type === 'teaming' ? '🤝 Teaming' : '🏛️ Procurement'}
                      </span>
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {opp.bids} bids
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-4">
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600">NACIS Code</p>
                    <p className="font-semibold text-gray-900">{opp.nacis}</p>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600 flex items-center gap-1"><MapPin size={14} /> Location</p>
                    <p className="font-semibold text-gray-900">{opp.location}</p>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600 flex items-center gap-1"><DollarSign size={14} /> Est. Budget</p>
                    <p className="font-semibold text-gray-900">${(opp.budgetMin/1000).toFixed(0)}k - ${(opp.budgetMax/1000).toFixed(0)}k</p>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600 flex items-center gap-1"><Clock size={14} /> Deadline</p>
                    <p className={`font-semibold ${getDaysUntilDeadline(opp.deadline) <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                      {new Date(opp.deadline).toLocaleDateString()}
                    </p>
                    {getDaysUntilDeadline(opp.deadline) <= 7 && (
                      <p className="text-xs text-red-500">{getDaysUntilDeadline(opp.deadline)} days left</p>
                    )}
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600 flex items-center gap-1"><Calendar size={14} /> Posted</p>
                    <p className="font-semibold text-gray-900">{new Date(opp.datePosted).toLocaleDateString()}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{opp.description}</p>

                {opp.attachments > 0 && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Paperclip size={14} />
                    <span>{opp.attachments} attachment{opp.attachments > 1 ? 's' : ''} (RFP documents)</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium text-sm md:text-base transition flex items-center justify-center gap-2">
                    <Eye size={16} />
                    View Details
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 font-medium text-sm md:text-base transition">
                    {opp.type === 'teaming' ? 'Express Interest' : 'Submit Bid'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post Opportunity Tab */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8 max-w-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Post New Opportunity</h2>
              <p className="text-sm text-gray-600">Create a procurement opportunity or find teaming partners</p>
            </div>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opportunity Type *
                </label>
                <select className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="procurement">🏛️ Procurement - Direct RFP/Contract</option>
                  <option value="teaming">🤝 Teaming - Looking for Partners</option>
                </select>
              </div>

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
                    placeholder="e.g., 27110"
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
                    Estimated Budget Min ($)
                  </label>
                  <input
                    type="number"
                    placeholder="50000"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Budget Max ($)
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Paperclip size={14} className="inline mr-1" />
                  Attachments (RFP documents, addendums)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                  <FileText size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop files or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB each</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-800 py-2 md:py-3 rounded-lg hover:bg-gray-300 font-medium text-sm md:text-base transition flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Preview
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 font-medium text-sm md:text-base transition"
                >
                  Post Opportunity
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
