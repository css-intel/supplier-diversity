'use client';

import NextLink from 'next/link';
import { useState } from 'react';
import { Search, MapPin, Star, Briefcase, Menu, X, FileText, Award, CheckCircle, MessageSquare, Phone, Mail, Building, Calendar, Download } from 'lucide-react';

interface Contractor {
  id: number;
  name: string;
  naces: string[];
  location: string;
  rating: number;
  reviews: number;
  yearsInBusiness: number;
  serviceAreas: string[];
  pastPerformance: string;
  certifications: string[];
  hasCapabilityStatement: boolean;
  openToTeaming: boolean;
  description?: string;
  email?: string;
  phone?: string;
  projects?: number;
}

export default function ContractorsPage() {
  const [naceCode, setNaceCode] = useState('');
  const [location, setLocation] = useState('');
  const [minRating, setMinRating] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [certFilter, setCertFilter] = useState('all');
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const contractors: Contractor[] = [
    {
      id: 1,
      name: 'BuildRight Construction',
      naces: ['4120', '4210'],
      location: 'Atlanta, GA',
      rating: 4.9,
      reviews: 127,
      yearsInBusiness: 15,
      serviceAreas: ['Georgia', 'Florida', 'South Carolina'],
      pastPerformance: 'Completed 45+ projects, 0 disputes',
      certifications: ['DBE', 'MBE'],
      hasCapabilityStatement: true,
      openToTeaming: true,
      description: 'BuildRight Construction specializes in commercial and government construction projects. We have extensive experience with federal contracts and are committed to delivering quality work on time and within budget.',
      email: 'contact@buildright.com',
      phone: '(404) 555-0123',
      projects: 45
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
      pastPerformance: 'Specialized in commercial electrical, 38 projects',
      certifications: ['8(a)', 'HUBZone'],
      hasCapabilityStatement: true,
      openToTeaming: true,
      description: 'ElectroTech Solutions provides comprehensive electrical services for commercial and industrial clients. Our team is certified and experienced in all aspects of electrical installation and maintenance.',
      email: 'info@electrotech.com',
      phone: '(512) 555-0456',
      projects: 38
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
      pastPerformance: 'Management consulting, 52 completed engagements',
      certifications: ['WBE'],
      hasCapabilityStatement: true,
      openToTeaming: false,
      description: 'ConsultPro Advisors offers strategic management consulting services to government agencies and private enterprises. We specialize in process improvement and organizational transformation.',
      email: 'hello@consultpro.com',
      phone: '(303) 555-0789',
      projects: 52
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
      pastPerformance: 'Residential & commercial plumbing, 156 projects',
      certifications: ['MBE', 'DBE', 'SDVOSB'],
      hasCapabilityStatement: true,
      openToTeaming: true,
      description: 'Plumbing Professionals LLC provides expert plumbing services for residential and commercial properties. Veteran-owned and operated with a commitment to excellence.',
      email: 'service@plumbingpros.com',
      phone: '(312) 555-0234',
      projects: 156
    }
  ];

  // Filter contractors based on search criteria
  const filteredContractors = contractors.filter(contractor => {
    const matchesNace = naceCode === '' || contractor.naces.some(n => n.includes(naceCode));
    const matchesLocation = location === '' || contractor.location.toLowerCase().includes(location.toLowerCase()) || 
      contractor.serviceAreas.some(a => a.toLowerCase().includes(location.toLowerCase()));
    const matchesRating = minRating === 'all' || contractor.rating >= parseFloat(minRating);
    const matchesCert = certFilter === 'all' || contractor.certifications.includes(certFilter);
    return matchesNace && matchesLocation && matchesRating && matchesCert;
  });

  const handleViewProfile = (contractor: Contractor) => {
    setSelectedContractor(contractor);
  };

  const handleMessage = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setShowMessageModal(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setShowMessageModal(false);
      setMessageSent(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <NextLink href="/" className="text-xl md:text-2xl font-bold text-blue-600">FedMatch</NextLink>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
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
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">Find Contractors</h1>
          <p className="text-gray-600 mt-1">Search verified contractors by NAICS, location, and certifications</p>
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold mb-4">Filter Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NAICS Code</label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
              <select
                value={certFilter}
                onChange={(e) => setCertFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Certifications</option>
                <option value="DBE">DBE</option>
                <option value="MBE">MBE</option>
                <option value="WBE">WBE</option>
                <option value="8(a)">8(a)</option>
                <option value="HUBZone">HUBZone</option>
                <option value="SDVOSB">SDVOSB</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Showing {filteredContractors.length} of {contractors.length} contractors</p>
        </div>

        {/* Contractor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredContractors.map((contractor) => (
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

              {/* Certifications */}
              <div className="flex flex-wrap gap-1 mb-3">
                {contractor.certifications.map((cert) => (
                  <span key={cert} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                    <Award size={10} /> {cert}
                  </span>
                ))}
                {contractor.openToTeaming && (
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    🤝 Open to Teaming
                  </span>
                )}
              </div>

              <div className="mb-3 space-y-2">
                <p className="text-xs md:text-sm text-gray-700">
                  <strong>NAICS Codes:</strong> {contractor.naces.join(', ')}
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

              {contractor.hasCapabilityStatement && (
                <div className="flex items-center gap-2 text-xs text-green-600 mb-4">
                  <FileText size={14} />
                  <span>Capability Statement Available</span>
                  <CheckCircle size={12} />
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewProfile(contractor)}
                  className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => handleMessage(contractor)}
                  className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 font-medium text-sm"
                >
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredContractors.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No contractors found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {selectedContractor && !showMessageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedContractor.name}</h2>
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin size={16} /> {selectedContractor.location}
                  </p>
                </div>
                <button onClick={() => setSelectedContractor(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={20} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-xl font-bold">{selectedContractor.rating}</span>
                </div>
                <span className="text-gray-600">({selectedContractor.reviews} reviews)</span>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedContractor.certifications.map((cert) => (
                  <span key={cert} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                    <Award size={14} /> {cert}
                  </span>
                ))}
                {selectedContractor.openToTeaming && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    🤝 Open to Teaming
                  </span>
                )}
              </div>

              {/* About */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700">{selectedContractor.description}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <Building size={24} className="mx-auto text-blue-600 mb-1" />
                  <p className="text-2xl font-bold text-gray-900">{selectedContractor.yearsInBusiness}</p>
                  <p className="text-xs text-gray-600">Years in Business</p>
                </div>
                <div className="text-center">
                  <Briefcase size={24} className="mx-auto text-blue-600 mb-1" />
                  <p className="text-2xl font-bold text-gray-900">{selectedContractor.projects}</p>
                  <p className="text-xs text-gray-600">Projects Completed</p>
                </div>
                <div className="text-center">
                  <Star size={24} className="mx-auto text-blue-600 mb-1" />
                  <p className="text-2xl font-bold text-gray-900">{selectedContractor.rating}</p>
                  <p className="text-xs text-gray-600">Avg Rating</p>
                </div>
              </div>

              {/* NAICS Codes */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">NAICS Codes</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContractor.naces.map((code) => (
                    <span key={code} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {code}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Areas */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedContractor.serviceAreas.map((area) => (
                    <span key={area} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-700">
                    <Mail size={16} className="text-blue-600" />
                    {selectedContractor.email}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Phone size={16} className="text-blue-600" />
                    {selectedContractor.phone}
                  </p>
                </div>
              </div>

              {/* Capability Statement */}
              {selectedContractor.hasCapabilityStatement && (
                <div className="mb-6">
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <Download size={18} />
                    Download Capability Statement (PDF)
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button 
                  onClick={() => setShowMessageModal(true)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} />
                  Send Message
                </button>
                <NextLink 
                  href="/opportunities?type=teaming"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold flex items-center justify-center gap-2"
                >
                  🤝 View Teaming Opportunities
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedContractor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6">
              {messageSent ? (
                <div className="text-center py-8">
                  <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                  <p className="text-gray-600">{selectedContractor.name} will be notified.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Message {selectedContractor.name}</h2>
                      <p className="text-sm text-gray-600 mt-1">Start a conversation</p>
                    </div>
                    <button 
                      onClick={() => { setShowMessageModal(false); setSelectedContractor(null); }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Teaming opportunity for federal contract"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Introduce yourself and explain what you're looking for..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => { setShowMessageModal(false); setSelectedContractor(null); }}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={18} />
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
