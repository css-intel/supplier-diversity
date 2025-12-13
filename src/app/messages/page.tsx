'use client';

import Link from 'next/link';
import { Send, Clock, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

interface Conversation {
  id: number;
  name: string;
  org: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Array<{ id: number; sender: string; text: string; time: string }>;
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const [messageInput, setMessageInput] = useState('');

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Department of Transportation',
      org: 'DOT',
      lastMessage: 'Thanks for submitting your proposal',
      time: '2 hours ago',
      unread: 2,
      messages: [
        { id: 1, sender: 'DOT', text: 'Thank you for your submission on the IT Infrastructure project', time: '2:15 PM' },
        { id: 2, sender: 'You', text: 'You\'re welcome! I\'m very interested in this opportunity', time: '2:30 PM' },
        { id: 3, sender: 'DOT', text: 'Thanks for submitting your proposal', time: '2:45 PM' }
      ]
    },
    {
      id: 2,
      name: 'John Smith - ABC Contractors',
      org: 'ABC Contractors',
      lastMessage: 'Would you be interested in teaming?',
      time: '5 hours ago',
      unread: 1,
      messages: [
        { id: 1, sender: 'John Smith', text: 'I saw your profile and think we could work together', time: '10:00 AM' },
        { id: 2, sender: 'You', text: 'That sounds great! What did you have in mind?', time: '10:15 AM' },
        { id: 3, sender: 'John Smith', text: 'Would you be interested in teaming?', time: '10:30 AM' }
      ]
    },
    {
      id: 3,
      name: 'GSA Procurement Office',
      org: 'GSA',
      lastMessage: 'We received your proposal',
      time: '1 day ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'GSA', text: 'We received your proposal for building maintenance services', time: '11:00 AM' }
      ]
    }
  ];

  const current = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim() && current) {
      // In a real app, this would send to backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600">Supplier Diversity and Inclusion</Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-white md:bg-transparent flex-col md:flex-row gap-4 p-4 md:p-0 md:gap-8`}>
            <Link href="/contractors" className="text-gray-700 hover:text-blue-600 font-medium">Contractors</Link>
            <Link href="/opportunities" className="text-gray-700 hover:text-blue-600 font-medium">Opportunities</Link>
            <Link href="/messages" className="text-blue-600 hover:text-blue-700 font-medium">Messages</Link>
            <Link href="/events" className="text-gray-700 hover:text-blue-600 font-medium">Events</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-0 md:px-4 py-4 md:py-8 h-[calc(100vh-80px)]">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 px-4 md:px-0">Messages</h1>

        <div className="flex gap-4 md:gap-8 h-[calc(100%-60px)] md:h-auto">
          {/* Conversations List - Mobile Optimized */}
          <div className={`${showConversationList ? 'block' : 'hidden'} md:block w-full md:w-80 bg-white rounded-lg shadow-md overflow-hidden`}>
            <div className="p-3 md:p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-bold text-base md:text-lg mb-3">Conversations</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="divide-y max-h-96 md:max-h-none overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversation(conv.id);
                    setShowConversationList(false);
                  }}
                  className={`w-full text-left p-3 md:p-4 hover:bg-gray-50 transition border-l-4 ${
                    selectedConversation === conv.id 
                      ? 'bg-blue-50 border-blue-600' 
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{conv.name}</p>
                    {conv.unread > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-center leading-none">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={12} /> {conv.time}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat View - Mobile Optimized */}
          {current && (
            <div className={`${showConversationList ? 'hidden' : 'flex'} md:flex md:flex-1 bg-white rounded-lg shadow-md flex-col h-full`}>
              <div className="p-3 md:p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-base md:text-lg">{current.name}</h2>
                  <p className="text-xs md:text-sm text-gray-600">Status: Online</p>
                </div>
                <button
                  onClick={() => setShowConversationList(true)}
                  className="md:hidden text-gray-600 hover:text-gray-900"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                {current.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm px-3 md:px-4 py-2 rounded-lg ${
                        msg.sender === 'You'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm md:text-base">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 md:p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Send size={16} />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600">Supplier Diversity and Inclusion</Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-white md:bg-transparent flex-col md:flex-row gap-4 p-4 md:p-0 md:gap-8`}>
            <Link href="/contractors" className="text-gray-700 hover:text-blue-600 font-medium">Contractors</Link>
            <Link href="/opportunities" className="text-gray-700 hover:text-blue-600 font-medium">Opportunities</Link>
            <Link href="/messages" className="text-blue-600 hover:text-blue-700 font-medium">Messages</Link>
            <Link href="/events" className="text-gray-700 hover:text-blue-600 font-medium">Events</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-0 md:px-4 py-4 md:py-8 h-[calc(100vh-80px)]">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 px-4 md:px-0">Messages</h1>

        <div className="flex gap-4 md:gap-8 h-[calc(100%-60px)] md:h-auto">
          {/* Conversations List - Mobile Optimized */}
          <div className={`${showConversationList ? 'block' : 'hidden'} md:block w-full md:w-80 bg-white rounded-lg shadow-md md:rounded-lg md:overflow-hidden`}>
            <div className="p-3 md:p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-bold text-base md:text-lg">Conversations</h2>
            </div>
            <div className="divide-y max-h-96 md:max-h-none overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversation(conv.id);
                    setShowConversationList(false);
                  }}
                  className={`w-full text-left p-3 md:p-4 hover:bg-gray-50 transition border-l-4 ${
                    selectedConversation === conv.id 
                      ? 'bg-blue-50 border-blue-600' 
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-semibold text-gray-900 text-sm md:text-base">{conv.name}</p>
                    {conv.unread > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 flex-shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={12} /> {conv.time}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat View - Mobile Optimized */}
          {current && (
            <div className={`${showConversationList ? 'hidden' : 'flex'} md:flex md:flex-1 bg-white rounded-lg shadow-md flex-col h-full`}>
              <div className="p-3 md:p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-base md:text-lg">{current.name}</h2>
                  <p className="text-xs md:text-sm text-gray-600">Status: Online</p>
                </div>
                <button
                  onClick={() => setShowConversationList(true)}
                  className="md:hidden text-gray-600 hover:text-gray-900"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                {current.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm px-3 md:px-4 py-2 rounded-lg ${
                        msg.sender === 'You'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm md:text-base">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 md:p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm">
                    <Send size={16} />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
