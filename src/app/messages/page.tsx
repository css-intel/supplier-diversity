'use client';

import Link from 'next/link';
import { Send, Clock, Menu, X, Search, Video, Paperclip, MoreVertical, Phone, CheckCircle, Image, FileText, Download, Mic, MicOff, VideoOff, PhoneOff } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  attachment?: {
    name: string;
    type: 'image' | 'document';
    url: string;
  };
}

interface Conversation {
  id: number;
  name: string;
  org: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
  messages: Message[];
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [messageSent, setMessageSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const current = conversations.find(c => c.id === selectedConversation);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [current?.messages]);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showVideoCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [showVideoCall]);

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && current) {
      const newMessage: Message = {
        id: current.messages.length + 1,
        sender: 'You',
        text: messageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: messageInput,
            time: 'Just now'
          };
        }
        return conv;
      }));

      setMessageInput('');
      setMessageSent(true);
      setTimeout(() => setMessageSent(false), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && current) {
      const isImage = file.type.startsWith('image/');
      const newMessage: Message = {
        id: current.messages.length + 1,
        sender: 'You',
        text: `Sent ${isImage ? 'an image' : 'a file'}: ${file.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachment: {
          name: file.name,
          type: isImage ? 'image' : 'document',
          url: URL.createObjectURL(file)
        }
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: `Sent ${file.name}`,
            time: 'Just now'
          };
        }
        return conv;
      }));

      setShowAttachmentMenu(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startVideoCall = () => {
    setShowVideoCall(true);
    setShowOptionsMenu(false);
  };

  const endVideoCall = () => {
    setShowVideoCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
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
          {/* Conversations List */}
          <div className={`${showConversationList ? 'block' : 'hidden'} md:block w-full md:w-80 bg-white rounded-lg shadow-md overflow-hidden`}>
            <div className="p-3 md:p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-bold text-base md:text-lg mb-3">Conversations</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="divide-y max-h-96 md:max-h-[500px] overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversation(conv.id);
                    setShowConversationList(false);
                    // Clear unread count
                    setConversations(prev => prev.map(c => 
                      c.id === conv.id ? { ...c, unread: 0 } : c
                    ));
                  }}
                  className={`w-full text-left p-3 md:p-4 hover:bg-gray-50 transition border-l-4 ${
                    selectedConversation === conv.id 
                      ? 'bg-blue-50 border-blue-600' 
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                        {conv.avatar}
                      </div>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-semibold text-gray-900 text-sm md:text-base truncate">{conv.name}</p>
                        {conv.unread > 0 && (
                          <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock size={12} /> {conv.time}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat View */}
          {current && (
            <div className={`${showConversationList ? 'hidden' : 'flex'} md:flex md:flex-1 bg-white rounded-lg shadow-md flex-col h-full md:h-[600px]`}>
              <div className="p-3 md:p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                        {current.avatar}
                      </div>
                      {current.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-bold text-base md:text-lg">{current.name}</h2>
                      <p className="text-xs md:text-sm text-gray-600">
                        {current.online ? <span className="text-green-600">● Online</span> : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={startVideoCall}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" 
                      title="Start video call"
                    >
                      <Video size={20} />
                    </button>
                    <button 
                      onClick={startVideoCall}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" 
                      title="Start voice call"
                    >
                      <Phone size={20} />
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                      >
                        <MoreVertical size={20} />
                      </button>
                      {showOptionsMenu && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                          <button 
                            onClick={() => { setShowOptionsMenu(false); }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            View Profile
                          </button>
                          <button 
                            onClick={() => { setShowOptionsMenu(false); }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            Search in Conversation
                          </button>
                          <button 
                            onClick={() => { setShowOptionsMenu(false); }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                          >
                            Block User
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowConversationList(true)}
                  className="md:hidden text-blue-600 hover:text-blue-700 mt-2 text-sm font-medium"
                >
                  ← Back to conversations
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                {current.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-3 md:px-4 py-2 rounded-lg ${
                        msg.sender === 'You'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm md:text-base">{msg.text}</p>
                      {msg.attachment && (
                        <div className={`mt-2 p-2 rounded ${msg.sender === 'You' ? 'bg-blue-700' : 'bg-gray-200'}`}>
                          <div className="flex items-center gap-2">
                            {msg.attachment.type === 'image' ? <Image size={16} /> : <FileText size={16} />}
                            <span className="text-sm truncate">{msg.attachment.name}</span>
                            <button className="ml-auto hover:opacity-80">
                              <Download size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                      <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Area */}
              <div className="p-3 md:p-4 border-t border-gray-200 bg-gray-50">
                {messageSent && (
                  <div className="flex items-center gap-2 text-green-600 text-sm mb-2">
                    <CheckCircle size={16} />
                    Message sent successfully!
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <button 
                      onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition" 
                      title="Attach file"
                    >
                      <Paperclip size={20} />
                    </button>
                    {showAttachmentMenu && (
                      <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Image size={16} className="text-blue-600" />
                          Photo or Image
                        </button>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <FileText size={16} className="text-orange-600" />
                          Document
                        </button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium transition"
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

      {/* Video Call Modal */}
      {showVideoCall && current && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
          {/* Call Header */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {current.avatar}
              </div>
              <div className="text-white">
                <p className="font-semibold">{current.name}</p>
                <p className="text-sm text-gray-300">{formatCallDuration(callDuration)}</p>
              </div>
            </div>
          </div>

          {/* Video Area */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Remote Video (simulated) */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                  {current.avatar}
                </div>
                <p className="text-white text-xl">{current.name}</p>
                <p className="text-gray-400 mt-2">
                  {callDuration < 3 ? 'Connecting...' : 'Connected'}
                </p>
              </div>
            </div>

            {/* Local Video (self view - simulated) */}
            <div className="absolute bottom-4 right-4 w-32 h-24 md:w-48 md:h-36 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
              {isVideoOff ? (
                <VideoOff size={32} className="text-gray-400" />
              ) : (
                <div className="text-center text-gray-400">
                  <p className="text-xs">Your camera</p>
                </div>
              )}
            </div>
          </div>

          {/* Call Controls */}
          <div className="p-6 flex justify-center gap-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
                isMuted ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
                isVideoOff ? 'bg-red-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
            >
              {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
            </button>
            <button
              onClick={endVideoCall}
              className="w-14 h-14 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center transition"
              title="End call"
            >
              <PhoneOff size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
