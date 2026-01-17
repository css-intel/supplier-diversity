'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Briefcase, Users, MessageSquare, Calendar, Bell, Plus, Filter, Star, Bookmark, Paperclip, CheckCircle, Download, Send, MapPin, DollarSign, Clock, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DashboardNavigation from '@/components/DashboardNavigation';

interface Opportunity {
  id: string;
  title: string;
  agency: string;
  nacisCodes: string[];
  budget?: { min: number; max: number };
  estimatedBudget?: { min: number; max: number };
  location: string;
  submissionDeadline: string;
  datePosted: string;
  type: 'procurement' | 'teaming';
  attachments?: number;
  description: string;
  requirements: string[];
  contactEmail: string;
  contactName: string;
}

export default function ContractorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'opportunities' | 'profile' | 'alerts' | 'messages'>('opportunities');
  const [searchQuery, setSearchQuery] = useState('');
  const [nacisFilter, setNacisFilter] = useState('');
  const [userName, setUserName] = useState('');
  const [savedOpportunities, setSavedOpportunities] = useState<Set<string>>(new Set());
  
  // Modal states
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    companyName: '',
    email: '',
    nacisCodes: '',
    serviceAreas: '',
    description: '',
    openTo: { teaming: false, jv: false, subcontracting: false },
    certifications: { dbe: false, hubzone: false, eighta: false, mbe: false, wbe: false }
  });

  const toggleSaved = (id: string) => {
    setSavedOpportunities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const opportunities: Opportunity[] = [];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.agency.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNacis = nacisFilter ? opp.nacisCodes.some(code => code.includes(nacisFilter)) : true;
    return matchesSearch && matchesNacis;
  });

  const handleViewDetails = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
  };

  const handleMessage = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setMessageSubject(`Inquiry about: ${opp.title}`);
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        setShowMessageModal(false);
        setMessageText('');
        setMessageSubject('');
      }, 2000);
    }
  };

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    setBidSubmitted(true);
    setTimeout(() => {
      setBidSubmitted(false);
      setShowBidModal(false);
      setSelectedOpportunity(null);
    }, 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation 
        userName={userName}
        dashboardType="contractor"
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as 'opportunities' | 'profile' | 'alerts' | 'messages')}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome, {userName}</h1>
          <p className="text-gray-600">Manage your profile, find opportunities, and grow your business</p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-blue-600 font-semibold">{savedOpportunities.size}</span>
              <span className="text-gray-600 ml-1">Saved</span>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg">
              <span className="text-green-600 font-semibold">0</span>
              <span className="text-gray-600 ml-1">Active Bids</span>
            </div>
            <div className="bg-purple-50 px-4 py-2 rounded-lg">
              <span className="text-purple-600 font-semibold">0</span>
              <span className="text-gray-600 ml-1">New Messages</span>
            </div>
          </div>
        </div>

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-xl font-bold mb-4">Browse Opportunities</h2>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search by title, agency..."
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
            </div>

            {/* Opportunities List */}
            <div className="space-y-4">
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map(opp => (
                  <div key={opp.id} className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{opp.title}</h3>
                        <p className="text-gray-600 text-sm">{opp.agency}</p>
                        <p className="text-gray-400 text-xs mt-1">Posted: {new Date(opp.datePosted).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleSaved(opp.id)}
                          className={`p-2 rounded-full ${savedOpportunities.has(opp.id) ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                          title={savedOpportunities.has(opp.id) ? 'Saved' : 'Save for later'}
                        >
                          <Star size={18} fill={savedOpportunities.has(opp.id) ? 'currentColor' : 'none'} />
                        </button>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${opp.type === 'teaming' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {opp.type === 'teaming' ? 'Teaming' : 'Procurement'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">NAICS Codes: </span>
                        <div className="flex gap-2 flex-wrap mt-1">
                          {opp.nacisCodes.map((code, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                              {code}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="font-semibold">{opp.location}</span>
                      </div>
                      {opp.budget && (
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className="text-gray-400" />
                          <span className="font-semibold">${opp.budget.min.toLocaleString()} - ${opp.budget.max.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        <span className="font-semibold">Due: {new Date(opp.submissionDeadline).toLocaleDateString()}</span>
                      </div>
                      {opp.attachments && opp.attachments > 0 && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Paperclip size={14} />
                          <span>{opp.attachments} attachment{opp.attachments > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(opp)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleMessage(opp)}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 text-sm"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg p-8 text-center">
                  <p className="text-gray-600">No opportunities found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
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
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    value={profileData.companyName}
                    onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">NAICS Codes (comma-separated)</label>
                <input 
                  type="text" 
                  value={profileData.nacisCodes}
                  onChange={(e) => setProfileData({...profileData, nacisCodes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Service Areas</label>
                <input 
                  type="text" 
                  value={profileData.serviceAreas}
                  onChange={(e) => setProfileData({...profileData, serviceAreas: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Open To</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={profileData.openTo.teaming}
                      onChange={(e) => setProfileData({...profileData, openTo: {...profileData.openTo, teaming: e.target.checked}})}
                      className="w-4 h-4" 
                    />
                    <span className="ml-2 text-gray-700">Teaming Agreements</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={profileData.openTo.jv}
                      onChange={(e) => setProfileData({...profileData, openTo: {...profileData.openTo, jv: e.target.checked}})}
                      className="w-4 h-4" 
                    />
                    <span className="ml-2 text-gray-700">Joint Ventures (JV)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={profileData.openTo.subcontracting}
                      onChange={(e) => setProfileData({...profileData, openTo: {...profileData.openTo, subcontracting: e.target.checked}})}
                      className="w-4 h-4" 
                    />
                    <span className="ml-2 text-gray-700">Subcontracting</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Business Description</label>
                <textarea 
                  value={profileData.description}
                  onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  rows={4} 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Certifications</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={profileData.certifications.dbe}
                      onChange={(e) => setProfileData({...profileData, certifications: {...profileData.certifications, dbe: e.target.checked}})}
                      className="w-4 h-4" 
                    />
                    <span className="ml-2 text-gray-700">DBE</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={profileData.certifications.hubzone}
                      onChange={(e) => setProfileData({...profileData, certifications: {...profileData.certifications, hubzone: e.target.checked}})}
                      className="w-4 h-4" 
                    />
                    <span className="ml-2 text-gray-700">HUBZone</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={profileData.certifications.eighta}
                      onChange={(e) => setProfileData({...profileData, certifications: {...profileData.certifications, eighta: e.target.checked}})}
                      className="w-4 h-4" 
                    />
                    <span className="ml-2 text-gray-700">8(a) Program</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={profileData.certifications.mbe}
                      onChange={(e) => setProfileData({...profileData, certifications: {...profileData.certifications, mbe: e.target.checked}})}
                      className="w-4 h-4" 
                    />
                    <span className="ml-2 text-gray-700">MBE</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={profileData.certifications.wbe}
                      onChange={(e) => setProfileData({...profileData, certifications: {...profileData.certifications, wbe: e.target.checked}})}
                      className="w-4 h-4" 
                    />
                    <span className="ml-2 text-gray-700">WBE</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                Save Profile
              </button>
            </form>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Alert Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">New Matching Opportunities</h3>
                  <p className="text-sm text-gray-600">Get notified when new opportunities match your NAICS codes</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">New Messages</h3>
                  <p className="text-sm text-gray-600">Get notified when you receive messages</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Events & Training</h3>
                  <p className="text-sm text-gray-600">Get notified about new events and training sessions</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Deadline Reminders</h3>
                  <p className="text-sm text-gray-600">Remind me 3 days before submission deadlines</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Opportunity Details Modal */}
      {selectedOpportunity && !showMessageModal && !showBidModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedOpportunity.type === 'teaming' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {selectedOpportunity.type === 'teaming' ? 'Teaming Opportunity' : 'Procurement'}
                  </span>
                  <h2 className="text-2xl font-bold mt-2">{selectedOpportunity.title}</h2>
                  <p className="text-gray-600">{selectedOpportunity.agency}</p>
                </div>
                <button 
                  onClick={() => setSelectedOpportunity(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedOpportunity.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Location</span>
                  <p className="font-semibold">{selectedOpportunity.location}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Budget</span>
                  <p className="font-semibold">
                    ${(selectedOpportunity.budget || selectedOpportunity.estimatedBudget)?.min.toLocaleString()} - 
                    ${(selectedOpportunity.budget || selectedOpportunity.estimatedBudget)?.max.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Submission Deadline</span>
                  <p className="font-semibold">{new Date(selectedOpportunity.submissionDeadline).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Contact</span>
                  <p className="font-semibold">{selectedOpportunity.contactName}</p>
                  <p className="text-sm text-blue-600">{selectedOpportunity.contactEmail}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">NAICS Codes</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedOpportunity.nacisCodes.map((code, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {code}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {selectedOpportunity.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {selectedOpportunity.attachments && selectedOpportunity.attachments > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Attachments</h3>
                  <div className="space-y-2">
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      <Paperclip size={16} />
                      <span>RFQ_Document.pdf</span>
                      <Download size={16} />
                    </button>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      <Paperclip size={16} />
                      <span>Scope_of_Work.docx</span>
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => {
                  toggleSaved(selectedOpportunity.id);
                }}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${savedOpportunities.has(selectedOpportunity.id) ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <Star size={18} fill={savedOpportunities.has(selectedOpportunity.id) ? 'currentColor' : 'none'} />
                {savedOpportunities.has(selectedOpportunity.id) ? 'Saved' : 'Save'}
              </button>
              <button 
                onClick={() => {
                  setShowMessageModal(true);
                  setMessageSubject(`Inquiry about: ${selectedOpportunity.title}`);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 flex items-center gap-2"
              >
                <MessageSquare size={18} />
                Message
              </button>
              <button 
                onClick={() => setShowBidModal(true)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                {selectedOpportunity.type === 'teaming' ? 'Express Interest' : 'Submit Bid'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            {messageSent ? (
              <div className="p-8 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Your message has been sent to {selectedOpportunity.contactName}.</p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Send Message</h2>
                    <button 
                      onClick={() => {setShowMessageModal(false); setMessageText('');}}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">To: {selectedOpportunity.contactName} ({selectedOpportunity.agency})</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
                    <input
                      type="text"
                      value={messageSubject}
                      onChange={(e) => setMessageSubject(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Type your message here..."
                    />
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex gap-3">
                  <button 
                    onClick={() => {setShowMessageModal(false); setMessageText('');}}
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
                    Send Message
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bid Submission Modal */}
      {showBidModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {bidSubmitted ? (
              <div className="p-8 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedOpportunity.type === 'teaming' ? 'Interest Submitted!' : 'Bid Submitted!'}
                </h3>
                <p className="text-gray-600">
                  {selectedOpportunity.type === 'teaming' 
                    ? 'Your interest has been submitted. The contractor will contact you shortly.'
                    : 'Your bid has been submitted successfully. You will receive a confirmation email.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitBid}>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                      {selectedOpportunity.type === 'teaming' ? 'Express Interest' : 'Submit Bid'}
                    </h2>
                    <button 
                      type="button"
                      onClick={() => setShowBidModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{selectedOpportunity.title}</p>
                </div>
                <div className="p-6 space-y-4">
                  {selectedOpportunity.type === 'procurement' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Bid Amount ($)</label>
                      <input
                        type="number"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your bid amount"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {selectedOpportunity.type === 'teaming' ? 'Why are you a good fit?' : 'Executive Summary'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder={selectedOpportunity.type === 'teaming' 
                        ? 'Describe your relevant experience and why you would be a good teaming partner...'
                        : 'Provide a brief summary of your proposal...'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Attach Documents</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Paperclip className="mx-auto text-gray-400 mb-2" size={24} />
                      <p className="text-sm text-gray-600">Drag and drop files here, or click to browse</p>
                      <input type="file" className="hidden" id="fileUpload" />
                      <label htmlFor="fileUpload" className="mt-2 inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 text-sm">
                        Choose Files
                      </label>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowBidModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    {selectedOpportunity.type === 'teaming' ? 'Submit Interest' : 'Submit Bid'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
