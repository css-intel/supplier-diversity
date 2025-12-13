'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Plus, Menu, X, Filter, Briefcase, Users, MessageSquare, Trash2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OpportunityPosted {
  id: string;
  title: string;
  nacisCode: string;
  location: string;
  status: 'open' | 'closed';
  submissionDeadline: string;
  bids: number;
}

export default function ProcurementDashboard() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'opportunities' | 'post' | 'contractors' | 'messages'>('opportunities');
  const [showPostForm, setShowPostForm] = useState(false);

  const handleLogout = () => {
    // Clear any auth data
    localStorage.removeItem('userAuth');
    // Redirect to home
    router.push('/');

  // Mock posted opportunities
  const postedOpportunities: OpportunityPosted[] = [
    {
      id: '1',
      title: 'IT Infrastructure Modernization',
      nacisCode: '61110',
      location: 'Washington, DC',
      status: 'open',
      submissionDeadline: '2025-01-15',
      bids: 5
    },
    {
      id: '2',
      title: 'Building Maintenance Services',
      nacisCode: '56210',
      location: 'New York, NY',
      status: 'open',
      submissionDeadline: '2025-01-20',
      bids: 3
    }
  ];

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
            <button onClick={() => { setActiveTab('opportunities'); setShowPostForm(false); }} className="text-gray-700 hover:text-blue-600 font-medium text-left">My Opportunities</button>
            <button onClick={() => { setActiveTab('contractors'); setShowPostForm(false); }} className="text-gray-700 hover:text-blue-600 font-medium text-left">Find Contractors</button>
            <button onClick={() => { setActiveTab('messages'); setShowPostForm(false); }} className="text-gray-700 hover:text-blue-600 font-medium text-left">Messages</button>
            <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2 text-left">
              <LogOut size={16} /> Logout
            </button>
          </div>
            <button onClick={() => { setShowPostForm(!showPostForm); }} className="text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded-lg text-left">+ Post Opportunity</button>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Logout</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome, Procurement Officer</h1>
          <p className="text-gray-600">Post opportunities, find contractors, and manage your procurement needs</p>
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

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Opportunity Title</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., IT Infrastructure Modernization" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">NACIS Code (5-digit)</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., 61110" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Opportunity Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Procurement</option>
                    <option>Teaming Opportunity</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Location (City, State)</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., Washington, DC" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Service Area(s)</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Geographic reach" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Budget Minimum (Optional)</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., 100000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Budget Maximum (Optional)</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., 500000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Submission Deadline</label>
                <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Opportunity Description</label>
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={6} placeholder="Describe the opportunity, requirements, and what you're looking for..." />
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
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span>NACIS: {opp.nacisCode}</span>
                            <span>•</span>
                            <span>{opp.location}</span>
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
                          <span className="font-semibold">{opp.bids} bids received</span>
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-200 text-sm">
                          View Bids
                        </button>
                        <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 text-sm">
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1 relative">
                  <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Filter by NACIS code..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="text-center py-12">
              <Users size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Contractor search results will appear here</p>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && !showPostForm && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Messages</h2>
            <div className="text-center py-12">
              <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No messages yet. Start communicating with contractors!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
