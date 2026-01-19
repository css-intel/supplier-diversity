-- FedMatch Database Schema
-- Run this in Supabase SQL Editor or via `supabase db push`

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends Supabase auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('contractor', 'procurement')),
  phone TEXT,
  location TEXT,
  description TEXT,
  avatar_url TEXT
);

-- ============================================
-- CONTRACTOR PROFILES (additional contractor info)
-- ============================================
CREATE TABLE public.contractor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  naics_codes TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  service_areas TEXT[] DEFAULT '{}',
  years_in_business INTEGER,
  open_to_teaming BOOLEAN DEFAULT false,
  open_to_jv BOOLEAN DEFAULT false,
  open_to_subcontracting BOOLEAN DEFAULT false,
  capability_statement_url TEXT,
  past_performance TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0
);

-- ============================================
-- OPPORTUNITIES TABLE
-- ============================================
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  naics_codes TEXT[] DEFAULT '{}',
  location TEXT NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  submission_deadline TIMESTAMPTZ NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('procurement', 'teaming')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  posted_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  requirements TEXT[] DEFAULT '{}',
  attachments_count INTEGER DEFAULT 0,
  contact_email TEXT,
  contact_name TEXT
);

-- ============================================
-- BIDS TABLE
-- ============================================
CREATE TABLE public.bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  contractor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(12,2) NOT NULL,
  summary TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  attachments_url TEXT,
  UNIQUE(opportunity_id, contractor_id)
);

-- ============================================
-- SAVED OPPORTUNITIES TABLE
-- ============================================
CREATE TABLE public.saved_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  UNIQUE(user_id, opportunity_id)
);

-- ============================================
-- MESSAGES TABLE
-- ============================================
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  conversation_id TEXT NOT NULL
);

-- ============================================
-- EVENTS TABLE
-- ============================================
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  attendees_count INTEGER DEFAULT 0,
  max_attendees INTEGER,
  agenda TEXT[] DEFAULT '{}',
  speakers TEXT[] DEFAULT '{}',
  has_survey BOOLEAN DEFAULT false
);

-- ============================================
-- EVENT REGISTRATIONS TABLE
-- ============================================
CREATE TABLE public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  UNIQUE(event_id, user_id)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_profiles_account_type ON public.profiles(account_type);
CREATE INDEX idx_opportunities_status ON public.opportunities(status);
CREATE INDEX idx_opportunities_type ON public.opportunities(type);
CREATE INDEX idx_opportunities_posted_by ON public.opportunities(posted_by);
CREATE INDEX idx_bids_opportunity ON public.bids(opportunity_id);
CREATE INDEX idx_bids_contractor ON public.bids(contractor_id);
CREATE INDEX idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX idx_events_date ON public.events(date);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contractor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read all profiles, update their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- CONTRACTOR_PROFILES: Viewable by all, editable by owner
CREATE POLICY "Contractor profiles are viewable by everyone" ON public.contractor_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own contractor profile" ON public.contractor_profiles
  FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own contractor profile" ON public.contractor_profiles
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- OPPORTUNITIES: Viewable by all, editable by poster
CREATE POLICY "Opportunities are viewable by everyone" ON public.opportunities
  FOR SELECT USING (true);

CREATE POLICY "Users can create opportunities" ON public.opportunities
  FOR INSERT WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Users can update their own opportunities" ON public.opportunities
  FOR UPDATE USING (auth.uid() = posted_by);

CREATE POLICY "Users can delete their own opportunities" ON public.opportunities
  FOR DELETE USING (auth.uid() = posted_by);

-- BIDS: Viewable by opportunity poster and bid owner
CREATE POLICY "Users can view bids on their opportunities or their own bids" ON public.bids
  FOR SELECT USING (
    auth.uid() = contractor_id OR 
    auth.uid() IN (SELECT posted_by FROM public.opportunities WHERE id = opportunity_id)
  );

CREATE POLICY "Contractors can create bids" ON public.bids
  FOR INSERT WITH CHECK (auth.uid() = contractor_id);

CREATE POLICY "Opportunity posters can update bid status" ON public.bids
  FOR UPDATE USING (
    auth.uid() IN (SELECT posted_by FROM public.opportunities WHERE id = opportunity_id)
  );

-- SAVED_OPPORTUNITIES: Users can manage their own saves
CREATE POLICY "Users can view their saved opportunities" ON public.saved_opportunities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save opportunities" ON public.saved_opportunities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave opportunities" ON public.saved_opportunities
  FOR DELETE USING (auth.uid() = user_id);

-- MESSAGES: Users can see messages they sent or received
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can mark their received messages as read" ON public.messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- EVENTS: Viewable by all
CREATE POLICY "Events are viewable by everyone" ON public.events
  FOR SELECT USING (true);

-- EVENT_REGISTRATIONS: Users can manage their own registrations
CREATE POLICY "Users can view their event registrations" ON public.event_registrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" ON public.event_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their registrations" ON public.event_registrations
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment event attendees
CREATE OR REPLACE FUNCTION increment_attendees(event_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.events 
  SET attendees_count = attendees_count + 1 
  WHERE id = event_id;
END;
$$ language 'plpgsql';

-- Auto-create profile after signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, company_name, account_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'account_type', 'contractor')
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
