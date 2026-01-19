'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, DollarSign, Clock, X, Star, Bookmark, Calendar, Filter, Eye, FileText, Paperclip, Send, MessageSquare, CheckCircle, Upload } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useOpportunities, useSavedOpportunities } from '@/lib/hooks/useOpportunities';
import { useAuth } from '@/lib/contexts/AuthContext';

interface Opportunity {
  id: string;
  title: string;
  naicsCodes: string[];
  location: string;
  budgetMin?: number;
  budgetMax?: number;
  deadline: string;
  datePosted: string;
  description: string;
  bidsCount: number;
  postedBy: string;
  type: 'procurement' | 'teaming';
  attachments: number;
  requirements?: string[];
  contactEmail?: string;
}

export default function OpportunitiesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('browse');
  const [typeFilter, setTypeFilter] = useState<'all' | 'procurement' | 'teaming'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { opportunities: dbOpportunities, loading, createOpportunity } = useOpportunities({
    type: typeFilter,
    status: 'open',
    searchQuery,
  });
  
  const { savedIds, toggleSave, isSaved } = useSavedOpportunities(user?.id);
  
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [bidSubmitted, setBidSubmitted] = useState(false);

  const [newOpportunity, setNewOpportunity] = useState<{
    type: 'procurement' | 'teaming';
    title: string;
    naicsCodes: string;
    location: string;
    budgetMin: string;
    budgetMax: string;
    description: string;
    deadline: string;
  }>({
    type: 'procurement',
    title: '',
    naicsCodes: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    description: '',
    deadline: ''
  });

  // Transform database opportunities to component format
  const opportunities: Opportunity[] = dbOpportunities.map(opp => ({
    id: opp.id,
    title: opp.title,
    naicsCodes: opp.naics_codes || [],
    location: opp.location,
    budgetMin: opp.budget_min || undefined,
    budgetMax: opp.budget_max || undefined,
    deadline: opp.submission_deadline,
    datePosted: opp.created_at,
    description: opp.description,
    bidsCount: 0, // Would need a separate query or count from DB
    postedBy: opp.poster?.company_name || 'Unknown',
    type: opp.type as 'procurement' | 'teaming',
    attachments: opp.attachments_count || 0,
    requirements: opp.requirements || [],
    contactEmail: opp.contact_email || '',
  }));

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesType = typeFilter === 'all' || opp.type === typeFilter;
    const matchesSearch = searchQuery === '' || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.naicsCodes.some((code: string) => code.includes(searchQuery)) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetails = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
  };

  const handleSubmitBid = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setShowBidModal(true);
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBidSubmitted(true);
    setTimeout(() => {
      setShowBidModal(false);
      setBidSubmitted(false);
      setSelectedOpportunity(null);
    }, 2000);
  };

  const handlePostOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Opportunity posted successfully! It will be visible to contractors matching your NAICS code.');
    setNewOpportunity({
      type: 'procurement' as const,
      title: '',
      naicsCodes: '',
      location: '',
      budgetMin: '',
      budgetMax: '',
      description: '',
      deadline: ''
    });
    setActiveTab('browse');
  };

  const handlePreview = () => {
    if (newOpportunity.title && newOpportunity.naicsCodes) {
      setShowPreviewModal(true);
    } else {
      alert('Please fill in at least Title and NAICS Code to preview');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation activeItem="opportunities" />

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">Contract Opportunities</h1>
            <p className="text-gray-600 mt-1">Find procurement RFPs and teaming partners</p>
          </div>
          {savedIds.size > 0 && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
              <Bookmark size={16} className="fill-blue-600" />
              <span>{savedIds.size} saved</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-3 font-medium text-sm md:text-base border-b-2 transition ${
              activeTab === 'browse' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Browse Opportunities
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-3 font-medium text-sm md:text-base border-b-2 transition ${
              activeTab === 'create' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Post Opportunity
          </button>
        </div>

        {/* Browse Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-4 md:space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <input
                type="text"
                placeholder="Search by title, NAICS code, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
                      typeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({opportunities.length})
                  </button>
                  <button
                    onClick={() => setTypeFilter('procurement')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      typeFilter === 'procurement' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🏛️ Procurement ({opportunities.filter(o => o.type === 'procurement').length})
                  </button>
                  <button
                    onClick={() => setTypeFilter('teaming')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      typeFilter === 'teaming' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                            isSaved(opp.id) ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'
                          }`}
                          title={isSaved(opp.id) ? 'Remove from saved' : 'Save opportunity'}
                        >
                          <Star size={20} className={isSaved(opp.id) ? 'fill-yellow-500' : ''} />
                        </button>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">{opp.postedBy}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs md:text-sm font-semibold px-3 py-1 rounded-full ${
                        opp.type === 'teaming' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {opp.type === 'teaming' ? '🤝 Teaming' : '🏛️ Procurement'}
                      </span>
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {opp.bidsCount} bids
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-4">
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600">NAICS Code</p>
                    <p className="font-semibold text-gray-900">{opp.naicsCodes}</p>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600 flex items-center gap-1"><MapPin size={14} /> Location</p>
                    <p className="font-semibold text-gray-900">{opp.location}</p>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-gray-600 flex items-center gap-1"><DollarSign size={14} /> Est. Budget</p>
                    <p className="font-semibold text-gray-900">
                      {opp.budgetMin && opp.budgetMax 
                        ? `$${(opp.budgetMin/1000).toFixed(0)}k - $${(opp.budgetMax/1000).toFixed(0)}k`
                        : 'Contact for quote'}
                    </p>
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
                  <button 
                    onClick={() => handleViewDetails(opp)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium text-sm md:text-base transition flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                  <button 
                    onClick={() => handleSubmitBid(opp)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 font-medium text-sm md:text-base transition"
                  >
                    {opp.type === 'teaming' ? 'Express Interest' : 'Submit Bid'}
                  </button>
                </div>
              </div>
            ))}

            {filteredOpportunities.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">No opportunities found matching your criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* Post Opportunity Tab */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8 max-w-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Post New Opportunity</h2>
              <p className="text-sm text-gray-600">Create a procurement opportunity or find teaming partners</p>
            </div>
            <form onSubmit={handlePostOpportunity} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opportunity Type *</label>
                <select 
                  value={newOpportunity.type}
                  onChange={(e) => setNewOpportunity({...newOpportunity, type: e.target.value as 'procurement' | 'teaming'})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="procurement">🏛️ Procurement - Direct RFP/Contract</option>
                  <option value="teaming">🤝 Teaming - Looking for Partners</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opportunity Title *</label>
                <input
                  type="text"
                  required
                  value={newOpportunity.title}
                  onChange={(e) => setNewOpportunity({...newOpportunity, title: e.target.value})}
                  placeholder="e.g., Electrical Work for Commercial Building"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NAICS Code *</label>
                  <input
                    type="text"
                    required
                    value={newOpportunity.naicsCodes}
                    onChange={(e) => setNewOpportunity({...newOpportunity, naicsCodes: e.target.value})}
                    placeholder="e.g., 27110"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={newOpportunity.location}
                    onChange={(e) => setNewOpportunity({...newOpportunity, location: e.target.value})}
                    placeholder="City, State"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Min ($)</label>
                  <input
                    type="number"
                    value={newOpportunity.budgetMin}
                    onChange={(e) => setNewOpportunity({...newOpportunity, budgetMin: e.target.value})}
                    placeholder="50000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Max ($)</label>
                  <input
                    type="number"
                    value={newOpportunity.budgetMax}
                    onChange={(e) => setNewOpportunity({...newOpportunity, budgetMax: e.target.value})}
                    placeholder="75000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={newOpportunity.description}
                  onChange={(e) => setNewOpportunity({...newOpportunity, description: e.target.value})}
                  placeholder="Describe the opportunity, requirements, timeline, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline *</label>
                <input
                  type="date"
                  required
                  value={newOpportunity.deadline}
                  onChange={(e) => setNewOpportunity({...newOpportunity, deadline: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Paperclip size={14} className="inline mr-1" />
                  Attachments
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer">
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC up to 10MB</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-medium flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Preview
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Post Opportunity
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedOpportunity && !showBidModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    selectedOpportunity.type === 'teaming' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedOpportunity.type === 'teaming' ? '🤝 Teaming Opportunity' : '🏛️ Procurement'}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedOpportunity.title}</h2>
                  <p className="text-gray-600 mt-1">{selectedOpportunity.postedBy}</p>
                </div>
                <button onClick={() => setSelectedOpportunity(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">NAICS Code</p>
                  <p className="font-semibold">{selectedOpportunity.naicsCodes}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{selectedOpportunity.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget Range</p>
                  <p className="font-semibold">
                    {selectedOpportunity.budgetMin && selectedOpportunity.budgetMax 
                      ? `$${selectedOpportunity.budgetMin.toLocaleString()} - $${selectedOpportunity.budgetMax.toLocaleString()}`
                      : 'Contact for quote'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="font-semibold text-red-600">{new Date(selectedOpportunity.deadline).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedOpportunity.description}</p>
              </div>

              {selectedOpportunity.requirements && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {selectedOpportunity.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedOpportunity.attachments > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Attachments</h3>
                  <div className="space-y-2">
                    {Array.from({length: selectedOpportunity.attachments}).map((_, i) => (
                      <button key={i} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <FileText size={16} />
                        <span>Document_{i+1}.pdf</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button 
                  onClick={() => setShowBidModal(true)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {selectedOpportunity.type === 'teaming' ? 'Express Interest' : 'Submit Bid'}
                </button>
                <button 
                  onClick={() => toggleSave(selectedOpportunity.id)}
                  className={`px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                    isSaved(selectedOpportunity.id)
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star size={18} className={isSaved(selectedOpportunity.id) ? 'fill-yellow-500' : ''} />
                </button>
                <Link href="/messages" className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bid Submission Modal */}
      {showBidModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6">
              {bidSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedOpportunity.type === 'teaming' ? 'Interest Submitted!' : 'Bid Submitted!'}
                  </h2>
                  <p className="text-gray-600">The poster will be notified.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedOpportunity.type === 'teaming' ? 'Express Interest' : 'Submit Your Bid'}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">{selectedOpportunity.title}</p>
                    </div>
                    <button onClick={() => { setShowBidModal(false); setSelectedOpportunity(null); }} className="text-gray-400 hover:text-gray-600">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleBidSubmit} className="space-y-4">
                    {selectedOpportunity.type === 'procurement' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bid Amount ($) *</label>
                        <input
                          type="number"
                          required
                          placeholder="Enter your bid"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {selectedOpportunity.type === 'teaming' ? 'Why are you a good partner?' : 'Proposal Summary'} *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder={selectedOpportunity.type === 'teaming' 
                          ? "Describe your experience and certifications..."
                          : "Summarize your approach..."
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                      <input
                        type="text"
                        placeholder="e.g., 4-6 weeks"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Attach Documents</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 cursor-pointer">
                        <Upload size={24} className="mx-auto text-gray-400 mb-1" />
                        <p className="text-sm text-gray-600">Upload capability statement</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => { setShowBidModal(false); setSelectedOpportunity(null); }}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
                      >
                        <Send size={18} />
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs text-gray-500">Preview</span>
                  <h2 className="text-xl font-bold text-gray-900">{newOpportunity.title || 'Untitled'}</h2>
                </div>
                <button onClick={() => setShowPreviewModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  newOpportunity.type === 'teaming' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {newOpportunity.type === 'teaming' ? '🤝 Teaming' : '🏛️ Procurement'}
                </span>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">NAICS</p>
                    <p className="font-semibold">{newOpportunity.naicsCodes || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{newOpportunity.location || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-semibold">
                      {newOpportunity.budgetMin && newOpportunity.budgetMax 
                        ? `$${Number(newOpportunity.budgetMin).toLocaleString()} - $${Number(newOpportunity.budgetMax).toLocaleString()}`
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-semibold">{newOpportunity.deadline ? new Date(newOpportunity.deadline).toLocaleDateString() : '-'}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{newOpportunity.description || 'No description'}</p>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button onClick={() => setShowPreviewModal(false)} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold">
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    handlePostOpportunity(new Event('submit') as unknown as React.FormEvent);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

