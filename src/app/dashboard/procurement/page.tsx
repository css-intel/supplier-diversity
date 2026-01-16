'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Plus, Menu, X, Filter, Briefcase, Users, MessageSquare, Trash2, LogOut, CheckCircle, Edit, Eye, Star, MapPin, Send, Paperclip, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  nacisCodes: string[];
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
  nacisCodes: string[];
  location: string;
  certifications: string[];
  rating: number;
  email: string;
  description: string;
}

export default function ProcurementDashboard() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'opportunities' | 'post' | 'profile' | 'contractors' | 'messages'>('opportunities');
  const [showPostForm, setShowPostForm] = useState(false);
  const [userName, setUserName] = useState('John Smith');
  
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
  const [nacisFilter, setNacisFilter] = useState('');
  
  // Edit form state
  const [editFormData, setEditFormData] = useState({
    title: '',
    nacisCodes: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    description: ''
  });

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    router.push('/');
  };

  const [postedOpportunities, setPostedOpportunities] = useState<OpportunityPosted[]>([
    {
      id: '1',
      title: 'IT Infrastructure Modernization',
      nacisCodes: ['61110', '54140'],
      location: 'Washington, DC',
      status: 'open',
      submissionDeadline: '2026-02-15',
      type: 'procurement',
      description: 'Modernize IT infrastructure across regional offices.',
      budgetMin: 250000,
      budgetMax: 500000,
      bids: [
        { id: 'b1', companyName: 'TechSolutions LLC', contactName: 'Maria Garcia', email: 'maria@techsolutions.com', amount: 375000, submittedDate: '2026-01-12', summary: 'Comprehensive IT modernization plan with cloud migration...', certifications: ['8(a)', 'WBE'] },
        { id: 'b2', companyName: 'Digital First Inc', contactName: 'James Wilson', email: 'james@digitalfirst.com', amount: 425000, submittedDate: '2026-01-13', summary: 'End-to-end infrastructure upgrade with security focus...', certifications: ['HUBZone', 'MBE'] },
        { id: 'b3', companyName: 'CloudServe Corp', contactName: 'Emily Chen', email: 'emily@cloudserve.com', amount: 290000, submittedDate: '2026-01-14', summary: 'Cost-effective modernization leveraging existing systems...', certifications: ['DBE'] }
      ]
    },
    {
      id: '2',
      title: 'Building Maintenance Services',
      nacisCodes: ['56210', '56201'],
      location: 'New York, NY',
      status: 'open',
      submissionDeadline: '2026-02-20',
      type: 'procurement',
      description: 'Comprehensive building maintenance for federal facilities.',
      budgetMin: 100000,
      budgetMax: 300000,
      bids: [
        { id: 'b4', companyName: 'FacilityCare Services', contactName: 'Robert Brown', email: 'robert@facilitycare.com', amount: 185000, submittedDate: '2026-01-10', summary: 'Full-service maintenance with 24/7 emergency response...', certifications: ['MBE', 'DBE'] },
        { id: 'b5', companyName: 'BuildRight Maintenance', contactName: 'Sarah Johnson', email: 'sarah@buildright.com', amount: 210000, submittedDate: '2026-01-11', summary: 'Experienced team with federal facility expertise...', certifications: ['WBE'] }
      ]
    }
  ]);

  const contractors: Contractor[] = [
    { id: 'c1', name: 'Maria Garcia', company: 'TechSolutions LLC', nacisCodes: ['61110', '54140'], location: 'Washington, DC', certifications: ['8(a)', 'WBE'], rating: 4.8, email: 'maria@techsolutions.com', description: 'Full-service IT consulting firm specializing in federal contracts.' },
    { id: 'c2', name: 'James Wilson', company: 'Digital First Inc', nacisCodes: ['61110', '54151'], location: 'Chicago, IL', certifications: ['HUBZone', 'MBE'], rating: 4.6, email: 'james@digitalfirst.com', description: 'Digital transformation and software development services.' },
    { id: 'c3', name: 'Emily Chen', company: 'CloudServe Corp', nacisCodes: ['54140', '51821'], location: 'San Francisco, CA', certifications: ['DBE'], rating: 4.9, email: 'emily@cloudserve.com', description: 'Cloud infrastructure and managed services provider.' },
    { id: 'c4', name: 'Robert Brown', company: 'FacilityCare Services', nacisCodes: ['56210', '56201'], location: 'New York, NY', certifications: ['MBE', 'DBE'], rating: 4.5, email: 'robert@facilitycare.com', description: 'Commercial and federal facility maintenance services.' }
  ];

  const filteredContractors = contractors.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNacis = nacisFilter ? c.nacisCodes.some(code => code.includes(nacisFilter)) : true;
    return matchesSearch && matchesNacis;
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
      nacisCodes: opp.nacisCodes.join(', '),
      location: opp.location,
      budgetMin: opp.budgetMin?.toString() || '',
      budgetMax: opp.budgetMax?.toString() || '',
      deadline: opp.submissionDeadline,
      description: opp.description
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOpportunity) {
      setPostedOpportunities(prev => prev.map(opp => 
        opp.id === selectedOpportunity.id 
          ? { ...opp, 
              title: editFormData.title,
              nacisCodes: editFormData.nacisCodes.split(',').map(c => c.trim()),
              location: editFormData.location,
              budgetMin: editFormData.budgetMin ? parseInt(editFormData.budgetMin) : undefined,
              budgetMax: editFormData.budgetMax ? parseInt(editFormData.budgetMax) : undefined,
              submissionDeadline: editFormData.deadline,
              description: editFormData.description
            }
          : opp
      ));
      setShowEditModal(false);
      setSelectedOpportunity(null);
    }
  };

  const handleDeleteOpportunity = (opp: OpportunityPosted) => {
    setSelectedOpportunity(opp);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedOpportunity) {
      setPostedOpportunities(prev => prev.filter(opp => opp.id !== selectedOpportunity.id));
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

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            <button onClick={() => { setActiveTab('opportunities'); setShowPostForm(false); setMobileMenuOpen(false); }} className={`font-medium text-left ${activeTab === 'opportunities' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>My Opportunities</button>
            <button onClick={() => { setActiveTab('profile'); setShowPostForm(false); setMobileMenuOpen(false); }} className={`font-medium text-left ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>My Profile</button>
            <button onClick={() => { setActiveTab('contractors'); setShowPostForm(false); setMobileMenuOpen(false); }} className={`font-medium text-left ${activeTab === 'contractors' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Find Contractors</button>
            <Link href="/messages" className="text-gray-700 hover:text-blue-600 font-medium text-left">Messages</Link>
            <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2 text-left">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>

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
                  <button type="submit" className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    Post Opportunity
                  </button>
                  <button type="button" onClick={() => setShowPostForm(false)} className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
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
                <button onClick={() => setShowPostForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2">
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
                              {opp.nacisCodes.map((code, idx) => (
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
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm flex items-center justify-center gap-2"
                        >
                          <Eye size={16} />
                          View Bids ({opp.bids.length})
                        </button>
                        <button 
                          onClick={() => handleEditOpportunity(opp)}
                          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 text-sm flex items-center justify-center gap-2"
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
                  <button onClick={() => setShowPostForm(true)} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
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
                    value={nacisFilter}
                    onChange={(e) => setNacisFilter(e.target.value)}
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
                    {contractor.nacisCodes.map((code, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                        {code}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewContractor(contractor)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleMessageContractor(contractor)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 text-sm"
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
            <form className="space-y-6" onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input type="text" defaultValue={userName} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input type="email" defaultValue="john.smith@agency.gov" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Agency/Organization</label>
                  <input type="text" defaultValue="Department of Transportation" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                  <input type="tel" defaultValue="(202) 555-0142" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Office Location</label>
                <input type="text" defaultValue="Washington, DC" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
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
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
                    >
                      Select Bid
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 flex items-center gap-1">
                      <Paperclip size={14} />
                      View Attachments
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedContractor({ id: bid.id, name: bid.contactName, company: bid.companyName, nacisCodes: [], location: '', certifications: bid.certifications, rating: 0, email: bid.email, description: '' });
                        setShowMessageModal(true);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300"
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
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
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
                  value={editFormData.nacisCodes}
                  onChange={(e) => setEditFormData({...editFormData, nacisCodes: e.target.value})}
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
                <button type="button" onClick={() => {setShowEditModal(false); setSelectedOpportunity(null);}} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
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
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
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
                  {selectedContractor.nacisCodes.map((code, idx) => (
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
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Send Message
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 flex items-center gap-2">
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
