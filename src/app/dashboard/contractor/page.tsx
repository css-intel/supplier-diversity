'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Briefcase, Users, MessageSquare, Calendar, Bell, Menu, X, Plus, Filter, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Opportunity {
  id: string;
  title: string;
  agency: string;
  nacisCode: string;
  budget?: { min: number; max: number };
  estimatedBudget?: { min: number; max: number };
  location: string;
  submissionDeadline: string;
  type: 'procurement' | 'teaming';
}

export default function ContractorDashboard() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'opportunities' | 'profile' | 'alerts' | 'messages'>('opportunities');
  const [searchQuery, setSearchQuery] = useState('');
  const [nacisFilter, setNacisFilter] = useState('');

  const handleLogout = () => {
    // Clear any auth data
    localStorage.removeItem('userAuth');
    // Redirect to home
    router.push('/');

  // Mock opportunities data
  const opportunities: Opportunity[] = [
    {
      id: '1',
      title: 'IT Infrastructure Modernization',
      agency: 'Department of Transportation',
      nacisCode: '61110',
      budget: { min: 250000, max: 500000 },
      estimatedBudget: { min: 250000, max: 500000 },
      location: 'Washington, DC',
      submissionDeadline: '2025-01-15',
      type: 'procurement'
    },
    {
      id: '2',
      title: 'Building Maintenance Services',
      agency: 'GSA',
      nacisCode: '56210',
      budget: { min: 100000, max: 300000 },
      estimatedBudget: { min: 100000, max: 300000 },
      location: 'New York, NY',
      submissionDeadline: '2025-01-20',
      type: 'procurement'
    },
    {
      id: '3',
      title: 'Construction Partner Needed',
      agency: 'Local Construction Firm',
      nacisCode: '23600',
      estimatedBudget: { min: 150000, max: 400000 },
      location: 'Chicago, IL',
      submissionDeadline: '2025-02-01',
      type: 'teaming'
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.agency.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNacis = nacisFilter ? opp.nacisCode.includes(nacisFilter) : true;
    return matchesSearch && matchesNacis;
  });

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
            <button onClick={() => {setActiveTab('opportunities'); setMobileMenuOpen(false);}} className="text-gray-700 hover:text-blue-600 font-medium text-left">Opportunities</button>
            <button onClick={() => {setActiveTab('profile'); setMobileMenuOpen(false);}} className="text-gray-700 hover:text-blue-600 font-medium text-left">My Profile</button>
            <button onClick={() => {setActiveTab('alerts'); setMobileMenuOpen(false);}} className="text-gray-700 hover:text-blue-600 font-medium text-left">Alerts</button>
            <button onClick={() => {setActiveTab('messages'); setMobileMenuOpen(false);}} className="text-gray-700 hover:text-blue-600 font-medium text-left">Messages</button>
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome, Contractor</h1>
          <p className="text-gray-600">Manage your profile, find opportunities, and grow your business</p>
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
                      placeholder="Filter by NACIS code..."
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
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${opp.type === 'teaming' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {opp.type === 'teaming' ? 'Teaming' : 'Procurement'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">NACIS Code: </span>
                        <span className="font-semibold">{opp.nacisCode}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Location: </span>
                        <span className="font-semibold">{opp.location}</span>
                      </div>
                      {opp.budget && (
                        <div>
                          <span className="text-gray-600">Budget: </span>
                          <span className="font-semibold">${opp.budget.min.toLocaleString()} - ${opp.budget.max.toLocaleString()}</span>
                        </div>
                      )}
                      {!opp.budget && opp.estimatedBudget && (
                        <div>
                          <span className="text-gray-600">Estimated Budget: </span>
                          <span className="font-semibold text-blue-600">${opp.estimatedBudget.min.toLocaleString()} - ${opp.estimatedBudget.max.toLocaleString()}</span>
                          <span className="text-xs text-gray-500 block">*AI Estimated</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-600">Submission Deadline: </span>
                        <span className="font-semibold">{new Date(opp.submissionDeadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm">
                        View Details
                      </button>
                      <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 text-sm">
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
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Company Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Your Company" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">NACIS Codes (comma-separated, 5-digit)</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., 61110, 54140, 23600" />
                <p className="text-xs text-gray-600 mt-1">Enter all NACIS codes that represent your services</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Service Areas</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g., City, State" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Open To</label>
                <p className="text-xs text-gray-600 mb-3">Select the types of opportunities you're interested in:</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span className="ml-2 text-gray-700">Teaming Agreements</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="ml-2 text-gray-700">Joint Ventures (JV)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="ml-2 text-gray-700">Subcontracting</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Business Description</label>
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={4} placeholder="Describe your business..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Certifications</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="ml-2 text-gray-700">DBE (Disadvantaged Business Enterprise)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="ml-2 text-gray-700">HUBZone</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="ml-2 text-gray-700">8(a) Program</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="ml-2 text-gray-700">MBE (Minority Business Enterprise)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="ml-2 text-gray-700">WBE (Women Business Enterprise)</span>
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
                  <p className="text-sm text-gray-600">Get notified when new opportunities match your NACIS codes</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">New Messages</h3>
                  <p className="text-sm text-gray-600">Get notified when you receive messages</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Events & Training</h3>
                  <p className="text-sm text-gray-600">Get notified about new events and training sessions</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Messages</h2>
            <div className="text-center py-12">
              <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No messages yet. Start communicating with procurement officers!</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                Start Conversation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
