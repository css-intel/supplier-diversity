'use client';

import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  description: string;
  image?: string;
}

export default function EventsPage() {
  const events: Event[] = [
    {
      id: '1',
      title: 'Supplier Diversity Summit 2025',
      date: '2025-12-15',
      time: '9:00 AM - 5:00 PM',
      location: 'New York, NY',
      type: 'Conference',
      attendees: 500,
      description: 'Industry-leading conference for supplier diversity professionals with keynotes, panels, and networking'
    },
    {
      id: '2',
      title: 'Speed Networking: Connect with Fortune 500 Buyers',
      date: '2025-12-18',
      time: '6:00 PM - 8:00 PM',
      location: 'Virtual',
      type: 'Networking',
      attendees: 200,
      description: 'Fast-paced networking event connecting diverse suppliers with procurement executives'
    },
    {
      id: '3',
      title: 'Negotiation Skills Masterclass',
      date: '2025-12-22',
      time: '2:00 PM - 4:00 PM',
      location: 'Chicago, IL',
      type: 'Workshop',
      attendees: 75,
      description: 'Interactive workshop on advanced negotiation tactics for supplier success'
    },
    {
      id: '4',
      title: 'Women Business Owners Roundtable',
      date: '2026-01-08',
      time: '10:00 AM - 12:00 PM',
      location: 'Virtual',
      type: 'Roundtable',
      attendees: 120,
      description: 'Intimate discussion on challenges and opportunities for women-owned businesses'
    },
    {
      id: '5',
      title: 'Tech Solutions for Procurement: 2025 Trends',
      date: '2026-01-15',
      time: '1:00 PM - 3:00 PM',
      location: 'San Francisco, CA',
      type: 'Webinar',
      attendees: 300,
      description: 'Explore latest technology trends reshaping procurement and supplier management'
    },
    {
      id: '6',
      title: 'Manufacturing Excellence Summit',
      date: '2026-01-22',
      time: '9:00 AM - 4:00 PM',
      location: 'Detroit, MI',
      type: 'Conference',
      attendees: 400,
      description: 'Deep dive into manufacturing quality, efficiency, and innovation'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FedMatch</span>
            </Link>
            <div className="flex gap-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Events & Networking</h1>
          <p className="text-xl text-blue-100 mb-8">Connect, learn, and grow with industry leaders</p>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search events..."
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 max-w-md"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50">
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 border-b border-gray-200">
          {['All Events', 'Conferences', 'Workshops', 'Networking', 'Webinars', 'Roundtables'].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 whitespace-nowrap font-semibold text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Upcoming Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-600 transition cursor-pointer h-full">
                {/* Event Image Placeholder */}
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-40 flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-white opacity-50" />
                </div>

                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 flex-1">{event.title}</h3>
                    <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                      {event.type}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-200 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={16} />
                      <span>{event.attendees.toLocaleString()} attending</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 group">
                    Register Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
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
    </div>
  );
}