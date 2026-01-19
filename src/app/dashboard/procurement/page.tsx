'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Plus, Filter, Briefcase, Users, MessageSquare, Trash2, CheckCircle, Edit, Eye, Star, MapPin, Send, Paperclip, Download, X, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DashboardNavigation from '@/components/DashboardNavigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useOpportunities } from '@/lib/hooks/useOpportunities';
import { useContractors } from '@/lib/hooks/useContractors';
import { createClient } from '@/lib/supabase/client';

interface Bid {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  amount: number;
  submittedDate: string;
  summary: string;
  certifications: string[];
}

interface OpportunityPosted {
  id: string;
  title: string;
  naicsCodes: string[];
  location: string;
  status: 'open' | 'closed';
  submissionDeadline: string;
  bids: Bid[];
  description: string;
  budgetMin?: number;
  budgetMax?: number;
  type: 'procurement' | 'teaming';
}

interface Contractor {
  id: string;
  name: string;
  company: string;
  naicsCodes: string[];
  location: string;
  certifications: string[];
  rating: number;
  email: string;
  description: string;
}

export default function ProcurementDashboard() {
  const router = useRouter();
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'opportunities' | 'post' | 'profile' | 'contractors' | 'messages'>('opportunities');
  const [showPostForm, setShowPostForm] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  
  // User display name
  const userName = profile?.company_name || profile?.full_name || user?.email?.split('@')[0] || 'Procurement Officer';
  
  // Fetch opportunities posted by this user
  const { opportunities: dbOpportunities, loading: oppsLoading, createOpportunity } = useOpportunities({
    postedBy: user?.id,
  });
  
  // Fetch contractors for search
  const { contractors: dbContractors, loading: contractorsLoading } = useContractors();
  
  // Modal states
  const [showBidsModal, setShowBidsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showContractorModal, setShowContractorModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityPosted | null>(null);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  
  // Form states
  const [opportunityPosted, setOpportunityPosted] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [naicsFilter, setNaicsFilter] = useState('');
  
  // Edit form state
  const [editFormData, setEditFormData] = useState({
    title: '',
    naicsCodes: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    description: ''
  });

  // Transform database opportunities to component format
  const postedOpportunities: OpportunityPosted[] = dbOpportunities.map(opp => ({
    id: opp.id,
    title: opp.title,
    naicsCodes: opp.naics_codes || [],
    location: opp.location,
    status: opp.status === 'open' ? 'open' : 'closed',
    submissionDeadline: opp.submission_deadline,
    bids: [], // Bids are fetched separately
    description: opp.description,
    budgetMin: opp.budget_min || undefined,
    budgetMax: opp.budget_max || undefined,
    type: opp.type as 'procurement' | 'teaming',
  }));
  
  // Transform contractors to component format
  const contractors: Contractor[] = dbContractors.map(c => ({
    id: c.id,
    name: c.full_name || 'Unknown',
    company: c.company_name || 'Unknown Company',
    naicsCodes: c.contractor_profile?.naics_codes || [],
    location: c.location || 'Unknown',
    certifications: c.contractor_profile?.certifications || [],
    rating: c.contractor_profile?.rating || 0,
    email: c.email || '',
    description: c.description || '',
  }));

  const filteredContractors = contractors.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNaics = naicsFilter ? c.naicsCodes.some((code: string) => code.includes(naicsFilter)) : true;
    return matchesSearch && matchesNaics;
  });

  const handlePostOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    setOpportunityPosted(true);
    setTimeout(() => {
      setOpportunityPosted(false);
      setShowPostForm(false);
    }, 2000);
  };

  const handleViewBids = (opp: OpportunityPosted) => {
    setSelectedOpportunity(opp);
    setShowBidsModal(true);
  };

  const handleEditOpportunity = (opp: OpportunityPosted) => {
    setSelectedOpportunity(opp);
    setEditFormData({
      title: opp.title,
      naicsCodes: opp.naicsCodes.join(', '),
      location: opp.location,
      budgetMin: opp.budgetMin?.toString() || '',
      budgetMax: opp.budgetMax?.toString() || '',
      deadline: opp.submissionDeadline,
      description: opp.description
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with updateOpportunity hook
    if (selectedOpportunity) {
      // For now just close the modal - actual update will be via Supabase
      setShowEditModal(false);
      setSelectedOpportunity(null);
    }
  };

  const handleDeleteOpportunity = (opp: OpportunityPosted) => {
    setSelectedOpportunity(opp);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    // TODO: Integrate with deleteOpportunity hook
    if (selectedOpportunity) {
      // For now just close the modal - actual delete will be via Supabase
      setShowDeleteConfirm(false);
      setSelectedOpportunity(null);
    }
  };

  const handleViewContractor = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setShowContractorModal(true);
  };

  const handleMessageContractor = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        setShowMessageModal(false);
        setMessageText('');
      }, 2000);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const supabase = createClient();
    const formData = new FormData(e.currentTarget);
    
    try {
      // Update profiles table with form data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.get('fullName') as string,
          company_name: formData.get('agency') as string,
          phone: formData.get('phone') as string,
          location: formData.get('location') as string,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Refresh profile in auth context
      await refreshProfile();
      
      setProfileSaved(true);
      setProfileError(null);
      setTimeout(() => setProfileSaved(false), 3000);
      
      // TODO: Remove localStorage fallback once API is confirmed working
      localStorage.setItem('fedmatch-procurement-profile-draft', JSON.stringify({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        agency: formData.get('agency'),
        phone: formData.get('phone'),
        location: formData.get('location'),
      }));
    } catch (error) {
      console.error('Profile save error:', error);
      setProfileError('Failed to save profile. Please try again.');
      setTimeout(() => setProfileError(null), 5000);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'opportunities' | 'profile' | 'contractors');
    setShowPostForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation 
        userName={userName}
        dashboardType="procurement"
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome, {userName}</h1>
          <p className="text-gray-600">Post opportunities, find contractors, and manage your procurement needs</p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-blue-600 font-semibold">{postedOpportunities.length}</span>
              <span className="text-gray-600 ml-1">Active Listings</span>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg">
              <span className="text-green-600 font-semibold">{postedOpportunities.reduce((sum, o) => sum + o.bids.length, 0)}</span>
              <span className="text-gray-600 ml-1">Total Bids</span>
            </div>
          </div>
        </div>

        {/* Post Opportunity Form */}
        {showPostForm && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Post New Opportunity</h2>
              <button onClick={() => setShowPostForm(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {opportunityPosted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Opportunity Posted!</h3>
                <p className="text-gray-600">Your opportunity is now live and visible to contractors.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handlePostOpportunity}>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Opportunity Title</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., IT Infrastructure Modernization" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">NAICS Codes (comma-separated)</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., 61110, 54140" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Opportunity Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                      <option>Procurement</option>
                      <option>Teaming Opportunity</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Washington, DC" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Budget Min ($)</label>
                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="100000" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Budget Max ($)</label>
                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="500000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Submission Deadline</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={5} placeholder="Describe the opportunity..." required />
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="btn btn-primary btn-lg flex-1">
                    Post Opportunity
                  </button>
                  <button type="button" onClick={() => setShowPostForm(false)} className="btn btn-gray btn-lg flex-1">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* My Opportunities Tab */}
        {activeTab === 'opportunities' && !showPostForm && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Posted Opportunities</h2>
                <button onClick={() => setShowPostForm(true)} className="btn btn-primary">
                  <Plus size={18} />
                  Post Opportunity
                </button>
              </div>

              {postedOpportunities.length > 0 ? (
                <div className="space-y-4">
                  {postedOpportunities.map(opp => (
                    <div key={opp.id} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{opp.title}</h3>
                          <div className="flex flex-col gap-2 mt-2">
                            <div className="flex gap-2 flex-wrap">
                              {opp.naicsCodes.map((code, idx) => (
                                <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                  {code}
                                </span>
                              ))}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin size={14} />
                              {opp.location}
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${opp.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {opp.status === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded p-3 mb-4 text-sm">
                        <p className="text-gray-700">
                          <span className="font-semibold">Deadline:</span> {new Date(opp.submissionDeadline).toLocaleDateString()}
                          <span className="mx-4 text-gray-400">|</span>
                          <span className="font-semibold text-blue-600">{opp.bids.length} bids received</span>
                        </p>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <button 
                          onClick={() => handleViewBids(opp)}
                          className="btn btn-primary btn-sm flex-1"
                        >
                          <Eye size={16} />
                          View Bids ({opp.bids.length})
                        </button>
                        <button 
                          onClick={() => handleEditOpportunity(opp)}
                          className="btn btn-gray btn-sm flex-1"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteOpportunity(opp)}
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No opportunities posted yet</p>
                  <button onClick={() => setShowPostForm(true)} className="btn btn-primary btn-lg mt-4">
                    Post Your First Opportunity
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Find Contractors Tab */}
        {activeTab === 'contractors' && !showPostForm && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Find Contractors</h2>
            <div className="space-y-4 mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by company name, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1 relative">
                  <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Filter by NAICS code..."
                    value={naicsFilter}
                    onChange={(e) => setNaicsFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredContractors.map(contractor => (
                <div key={contractor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{contractor.company}</h3>
                      <p className="text-gray-600 text-sm">{contractor.name}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="font-semibold">{contractor.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                    <MapPin size={14} />
                    {contractor.location}
                  </div>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {contractor.certifications.map((cert, idx) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                        {cert}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {contractor.naicsCodes.map((code, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                        {code}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewContractor(contractor)}
                      className="btn btn-primary btn-sm flex-1"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleMessageContractor(contractor)}
                      className="btn btn-gray btn-sm flex-1"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && !showPostForm && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            {profileSaved && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                <CheckCircle size={20} />
                Profile saved successfully!
              </div>
            )}
            {profileError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle size={20} />
                {profileError}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input type="text" name="fullName" defaultValue={profile?.full_name || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input type="email" name="email" defaultValue={user?.email || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Agency/Organization</label>
                  <input type="text" name="agency" defaultValue={profile?.company_name || ''} placeholder="Enter your agency" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                  <input type="tel" name="phone" defaultValue={profile?.phone || ''} placeholder="Enter your phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Office Location</label>
                <input type="text" name="location" defaultValue={profile?.location || ''} placeholder="Enter your location" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-full">
                Save Profile
              </button>
            </form>
          </div>
        )}
      </div>

      {/* View Bids Modal */}
      {showBidsModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Bids for: {selectedOpportunity.title}</h2>
                  <p className="text-gray-600 text-sm">{selectedOpportunity.bids.length} bids received</p>
                </div>
                <button 
                  onClick={() => {setShowBidsModal(false); setSelectedOpportunity(null); setSelectedBid(null);}}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {selectedOpportunity.bids.map(bid => (
                <div key={bid.id} className={`border rounded-lg p-4 transition ${selectedBid?.id === bid.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{bid.companyName}</h3>
                      <p className="text-gray-600 text-sm">{bid.contactName} • {bid.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">${bid.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Submitted {new Date(bid.submittedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {bid.certifications.map((cert, idx) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                        {cert}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{bid.summary}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedBid(bid)}
                      className="btn btn-primary btn-sm"
                    >
                      Select Bid
                    </button>
                    <button className="btn btn-gray btn-sm">
                      <Paperclip size={14} />
                      View Attachments
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedContractor({ id: bid.id, name: bid.contactName, company: bid.companyName, naicsCodes: [], location: '', certifications: bid.certifications, rating: 0, email: bid.email, description: '' });
                        setShowMessageModal(true);
                      }}
                      className="btn btn-gray btn-sm"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedBid && (
              <div className="p-6 border-t border-gray-200 bg-green-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-green-700">Selected: {selectedBid.companyName}</p>
                    <p className="text-sm text-green-600">Bid Amount: ${selectedBid.amount.toLocaleString()}</p>
                  </div>
                  <button className="btn btn-success">
                    Award Contract
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Opportunity Modal */}
      {showEditModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Edit Opportunity</h2>
                <button 
                  onClick={() => {setShowEditModal(false); setSelectedOpportunity(null);}}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">NAICS Codes</label>
                <input
                  type="text"
                  value={editFormData.naicsCodes}
                  onChange={(e) => setEditFormData({...editFormData, naicsCodes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                <input
                  type="text"
                  value={editFormData.location}
                  onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Budget Min</label>
                  <input
                    type="number"
                    value={editFormData.budgetMin}
                    onChange={(e) => setEditFormData({...editFormData, budgetMin: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Budget Max</label>
                  <input
                    type="number"
                    value={editFormData.budgetMax}
                    onChange={(e) => setEditFormData({...editFormData, budgetMax: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Deadline</label>
                <input
                  type="date"
                  value={editFormData.deadline}
                  onChange={(e) => setEditFormData({...editFormData, deadline: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => {setShowEditModal(false); setSelectedOpportunity(null);}} className="btn btn-gray flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Opportunity?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedOpportunity.title}"? This action cannot be undone and all {selectedOpportunity.bids.length} bids will be lost.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => {setShowDeleteConfirm(false); setSelectedOpportunity(null);}}
                className="btn btn-gray flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="btn btn-danger flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contractor Profile Modal */}
      {showContractorModal && selectedContractor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedContractor.company}</h2>
                  <p className="text-gray-600">{selectedContractor.name}</p>
                </div>
                <button 
                  onClick={() => {setShowContractorModal(false); setSelectedContractor(null);}}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin size={16} />
                {selectedContractor.location}
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="font-semibold">{selectedContractor.rating}</span>
                <span className="text-gray-500 text-sm">(23 reviews)</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedContractor.certifications.map((cert, idx) => (
                    <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">NAICS Codes</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedContractor.naicsCodes.map((code, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">{selectedContractor.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                <p className="text-blue-600">{selectedContractor.email}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => {
                  setShowContractorModal(false);
                  setShowMessageModal(true);
                }}
                className="btn btn-primary flex-1"
              >
                Send Message
              </button>
              <button className="btn btn-gray">
                <Download size={16} />
                Capability Statement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedContractor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            {messageSent ? (
              <div className="p-8 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Your message has been sent to {selectedContractor.name}.</p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Send Message</h2>
                    <button 
                      onClick={() => {setShowMessageModal(false); setMessageText(''); setSelectedContractor(null);}}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">To: {selectedContractor.name} ({selectedContractor.company})</p>
                </div>
                <div className="p-6">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message here..."
                  />
                </div>
                <div className="p-6 border-t border-gray-200 flex gap-3">
                  <button 
                    onClick={() => {setShowMessageModal(false); setMessageText(''); setSelectedContractor(null);}}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
