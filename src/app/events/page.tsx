'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, ClipboardList, Sparkles, X, CheckCircle, Search } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useEvents, useEventRegistration } from '@/lib/hooks/useEvents';
import { useAuth } from '@/lib/contexts/AuthContext';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  maxAttendees?: number;
  description: string;
  image?: string;
  hasSurvey?: boolean;
  agenda?: string[];
  speakers?: string[];
}

export default function EventsPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { events: dbEvents, loading } = useEvents({ type: activeFilter, searchQuery });
  const { register: registerForEvent, isRegistered } = useEventRegistration(user?.id);
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registered, setRegistered] = useState(false);

  // Transform database events to component format
  const events: Event[] = dbEvents.map(e => ({
    id: e.id,
    title: e.title,
    date: e.date,
    time: e.time,
    location: e.location,
    type: e.type,
    attendees: e.attendees_count || 0,
    maxAttendees: e.max_attendees || undefined,
    description: e.description,
    hasSurvey: e.has_survey || false,
    agenda: e.agenda || [],
    speakers: e.speakers || [],
  }));

  const filterOptions = ['All Events', 'Conference', 'Networking', 'Matchmaking', 'Webinar', 'Roundtable'];

  const filteredEvents = events.filter(event => {
    const matchesFilter = activeFilter === 'All Events' || event.type === activeFilter;
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      setShowRegistrationModal(false);
      setRegistered(false);
      setSelectedEvent(null);
    }, 2500);
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeItem="events" />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Events & Networking</h1>
          <p className="text-xl text-blue-100 mb-4">Connect, learn, and grow with industry leaders</p>
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-8">
            <Sparkles size={16} />
            <span>Powered by My Virtual Check-In • Event Registration & Surveys</span>
          </div>
          
          <div className="flex gap-4 max-w-xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 px-4 py-3 rounded-lg text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 border-b border-gray-200">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 whitespace-nowrap font-semibold transition ${
                activeFilter === filter 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-gray-600">{filteredEvents.length} events found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-600 transition h-full flex flex-col">
              {/* Event Image Placeholder */}
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-40 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-white opacity-50" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{event.title}</h3>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                    event.type === 'Matchmaking' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {event.type}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200 mt-auto">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} />
                    <span>{event.attendees.toLocaleString()} attending</span>
                  </div>
                  {event.hasSurvey && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <ClipboardList size={16} />
                      <span>Post-event survey included</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewDetails(event)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 font-semibold text-sm"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleRegister(event)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 group text-sm"
                  >
                    Register
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">No events found matching your criteria.</p>
          </div>
        )}

        {/* Survey Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">📊 Market Research Surveys</h2>
              <p className="text-gray-600 mb-4">
                Need feedback from your event attendees or conducting market research? 
                Our survey platform integrates seamlessly with event registration.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>✓ Event feedback and satisfaction surveys</li>
                <li>✓ Community-wide market research</li>
                <li>✓ Custom survey templates</li>
                <li>✓ Real-time analytics dashboard</li>
              </ul>
            </div>
            <div>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2">
                <ClipboardList size={18} />
                Create Survey
              </button>
            </div>
          </div>
        </div>

        {/* Past Events */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Past Events</h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Check back soon for past event recordings and materials</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
              Request Recording
            </button>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && !showRegistrationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedEvent.type === 'Matchmaking' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedEvent.type}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedEvent.title}</h2>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <p className="font-semibold">{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-sm text-gray-600">{selectedEvent.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold">{selectedEvent.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Attendees</p>
                    <p className="font-semibold">{selectedEvent.attendees.toLocaleString()} registered</p>
                  </div>
                </div>
                {selectedEvent.hasSurvey && (
                  <div className="flex items-center gap-2">
                    <ClipboardList size={18} className="text-green-600" />
                    <div>
                      <p className="text-xs text-gray-500">Survey</p>
                      <p className="font-semibold text-green-600">Post-event survey included</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">About This Event</h3>
                <p className="text-gray-700">{selectedEvent.description}</p>
              </div>

              {selectedEvent.agenda && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Agenda</h3>
                  <ul className="space-y-2">
                    {selectedEvent.agenda.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEvent.speakers && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Featured Speakers</h3>
                  <ul className="space-y-2">
                    {selectedEvent.speakers.map((speaker, i) => (
                      <li key={i} className="text-gray-700">{speaker}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowRegistrationModal(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
                >
                  Register Now
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6">
              {registered ? (
                <div className="text-center py-8">
                  <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h2>
                  <p className="text-gray-600 mb-2">You're registered for {selectedEvent.title}</p>
                  <p className="text-sm text-gray-500">A confirmation email has been sent to your inbox.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Register for Event</h2>
                      <p className="text-sm text-gray-600 mt-1">{selectedEvent.title}</p>
                    </div>
                    <button onClick={() => { setShowRegistrationModal(false); setSelectedEvent(null); }} className="text-gray-400 hover:text-gray-600">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {selectedEvent.type === 'Matchmaking' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">What are you looking for? *</label>
                        <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select...</option>
                          <option value="procurement">Procurement Opportunities</option>
                          <option value="teaming">Teaming Partners</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => { setShowRegistrationModal(false); setSelectedEvent(null); }}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                      >
                        Complete Registration
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
