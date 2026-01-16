# ContractConnect Platform - Project Summary

**Last Updated:** January 16, 2026

## Project Overview

ContractConnect is a dual-platform ecosystem connecting government contractors with procurement opportunities and providing event management capabilities.

---

## Platform 1: My Virtual Check-In (MVCI)

### Vision
A hybrid platform combining **Eventbrite + SurveyMonkey** functionality for event registration and market research surveys.

### Evolution History
1. **COVID Era (2020):** Contact tracing and queue management for in-person gatherings
2. **Iteration 2:** Conference and meeting registration for clients
3. **Iteration 3 (Fall 2025):** Payment integration added (one-stop shop)
4. **Iteration 4 (Current):** Adding comprehensive survey functionality

### Core Features
- **Event Registration:** Full-featured event management and ticketing
- **Survey Platform:** Community-wide surveys and event feedback collection
- **Payment Processing:** Seamless integration with direct client payouts (bypassing Foresight)
- **Mobile-First Design:** Optimized for all devices
- **Government-Ready:** Built to handle high traffic from government servers

### Technical Requirements
- **Payment Integration:** Direct payout to event organizers/clients
- **Security:** Must handle government firewall restrictions
- **Scalability:** Support high-volume traffic without crashes
- **Plugin Architecture:** Moving away from buggy WordPress plugins to custom-built solutions
- **Attachment Support:** Upload and manage multiple documents with date/time stamps

### Tiered Service Model (Proposed)

**Free Tier:**
- Up to 50 event check-ins or survey responses
- Basic features

**Tier 1:**
- Up to 100 participants
- Enhanced features

**Tier 2:**
- Up to 250 participants
- Advanced analytics

**Tier 3:**
- 500-1000+ participants
- Full feature suite
- Priority support

### Revenue Model
- Tiered subscription pricing
- Payment processing fees (1.75% per transaction via Stripe/PayPal/Plaid)
- Optional advertising model (like Eventbrite's evolution)

---

## Platform 2: Supplier Diversity Matchmaker / FedMatch

### Vision
A **"Tinder for Government Contracting"** - connecting contractors with procurement opportunities through intelligent matchmaking.

### Core Purpose
- **Matchmaking:** Connect small/diverse contractors with government procurement opportunities
- **Teaming:** Enable contractors to find partners for joint ventures
- **Event Integration:** Promote and manage procurement events (like Power Hours)
- **Market Intelligence:** Data-driven insights for both contractors and procurement officers

### Key Features

#### For Contractors
- **Profile Management:** Company details, NAICS codes, certifications, past performance
- **Opportunity Discovery:** Search by NAICS code, location, budget, deadline
- **Alerts:** Custom notifications for matching opportunities
- **Messaging:** Direct communication with procurement officers
- **Portfolio:** Upload capability statements and documentation

#### For Procurement Officers
- **Opportunity Posting:** RFPs, teaming requests, event announcements
- **Contractor Search:** Filter by NAICS, location, ratings, certifications
- **Vendor Management:** Track engagement and responses
- **Analytics:** View metrics on opportunity views, applications, engagement

#### Advanced Features (In Development)
- **Attachment Management:** Upload RFPs, addendums with date/time stamps
- **Preview Function:** Review posts before publishing
- **Star/Bookmark System:** Save opportunities for later
- **Activity Logs:** Track which opportunities contractors viewed/saved
- **Site Analytics:** Heat mapping and user flow tracking
- **Video Messaging:** Enhanced communication capabilities
- **Past Opportunity Archive:** Historical data retention (proposed 1 year)

### Tiered Service Model

**Basic (Free) - Contractors:**
- Company name, contact info, logo
- 1-2 NAICS codes
- 1-2 service areas
- Basic search
- Limited messaging

**Advanced (Paid) - Contractors:**
- Unlimited NAICS codes
- Unlimited service areas
- Upload capability statements
- Past performance documentation
- Required certifications
- Priority in search results
- Advanced analytics
- Unlimited messaging

**Basic (Free) - Procurement:**
- Company profile
- Limited opportunity postings
- Basic search

**Advanced (Paid) - Procurement:**
- Unlimited opportunity postings
- Multiple document attachments
- Addendum management
- Advanced contractor search
- Analytics dashboard
- Priority support

### Technical Architecture
- **Frontend:** Clean, ADA-compliant interface (simple for broad accessibility)
- **Backend:** WordPress with custom plugins
- **AI Integration:** Lantern (code generation) + Hydra (ecosystem management)
- **Database:** PHP with automated conflict resolution
- **Real-time Updates:** Automatic debugging and site-wide fixes

### Platform Integration
My Virtual Check-In and Supplier Diversity Matchmaker are designed to work together:
- Events posted on MVCI can be promoted on FedMatch
- Procurement matchmaking events use MVCI registration
- Unified user base and cross-promotion opportunities

---

## Technology Stack: Lantern + Hydra AI System

### Lantern (The Spark)
- **AI-Powered Code Generation:** Builds functional code from conversational prompts
- **Learning System:** Never repeats coding patterns - learns from each module
- **Auto-Debugging:** Identifies and fixes bugs automatically
- **24/7 Operation:** Continuous development and improvement
- **Transcription Integration:** Converts meeting recordings into actionable code

### Hydra (The Ecosystem)
- **Ripple Effect Updates:** One fix propagates across all related systems
- **Cross-Platform Synchronization:** Updates affect entire ecosystem
- **Conflict Resolution:** Prevents plugin conflicts and JSON errors
- **Site-Wide Debugging:** When one issue is solved, similar issues are prevented everywhere

### Development Approach
- **Real-Time Development:** Code updates happen during conversations
- **Audio Processing:** Meetings are transcribed and immediately converted to development tasks
- **Automated Testing:** AI attempts to "break" its own code
- **Version Control:** All updates tracked and reversible

### Competitive Advantages
- **Speed:** 3 websites can be built per week (vs. months traditionally)
- **Quality:** Self-debugging code that improves over time
- **Scalability:** Built to handle government-level traffic
- **Accessibility:** ADA-compliant by default
- **Integration:** Seamless connection between multiple platforms

---

## Market Context & Competition

### Similar Platforms
- **Higher Gov:** Government contracting opportunity aggregator
- **SAM.gov:** Official government procurement system (recently redesigned Jan 2026)
- **GlueUp:** Nonprofit CRM/event management (expensive, poor onboarding)
- **SurveyMonkey:** Survey platform (limited event features)
- **Eventbrite:** Event management (rocky transition to paid model)

### Unique Value Proposition
1. **Dual Purpose:** Events + Surveys in one platform
2. **Matchmaking Intelligence:** AI-driven contractor-opportunity pairing
3. **Teaming Focus:** Unique emphasis on partnership formation
4. **Data Analytics:** User behavior tracking and insights
5. **User-Friendly:** Simplified onboarding vs. competitors like GlueUp
6. **Direct Integration:** Seamless payment and document management
7. **Market Edge:** Strategic positioning for diverse supplier communities

---

## Target Markets

### Primary Users
- **Small & Diverse Contractors:** MBE, WBE, DBE, SDVOSB, HUBZone businesses
- **Government Agencies:** Federal, state, and local procurement offices
- **Prime Contractors:** Seeking teaming partners for large contracts
- **Nonprofits:** Event management and surveying needs
- **Corporate Diversity Programs:** Supplier diversity initiatives

### Geographic Focus
- Initial: South Carolina market
- Expansion: Southeast region, then national
- Federal opportunities: Nationwide from day one

---

## Development Roadmap

### Immediate (This Week - Jan 16-20, 2026)
- ✅ Complete My Virtual Check-In V4.1 update
- ✅ Custom WordPress plugins to replace buggy third-party solutions
- ✅ Payment integration (Stripe/PayPal/Plaid)
- ✅ Event registration + survey functionality
- ✅ Attachment upload with timestamps
- ✅ Mobile responsive updates

### Short Term (January 2026)
- Star/bookmark functionality for opportunities
- Preview function for posts
- Video messaging integration
- Enhanced contractor profiles with portfolio uploads
- Analytics dashboard (site traffic, user behavior)
- Past opportunity archive system

### Medium Term (Q1 2026)
- Tiered pricing implementation
- Advanced search and filtering
- Email automation for alerts and notifications
- API integration with SAM.gov for opportunity feeds
- Mobile app consideration (PWA enhancement)

### Long Term (2026)
- Automated Works integration (business automation platform)
- AI-powered matching algorithms
- Predictive analytics for bid success
- Expanded market research capabilities
- White-label opportunities for partners

---

## Team Structure

### Core Team
- **Courtney:** Project lead, strategy, client relations
- **Carmen:** Technical lead, WordPress/backend development, longtime tech resource
- **Evelyn:** Market research, proposals, user experience requirements
- **Dexter (Price):** AI development, Lantern/Hydra systems, rapid prototyping

### External Partners
- **Eric, Christopher, Byron:** Front-end design (landing pages, UI/UX)
- **Caitlin:** Early AI adoption advocate (ChatGPT introduction to team)

---

## Business Model

### Revenue Streams
1. **Subscription Tiers:** Free, Basic, Advanced, Enterprise
2. **Transaction Fees:** 1.75% on event ticket sales and survey payments
3. **White Label Licensing:** Custom deployments for agencies/organizations
4. **Premium Features:** Enhanced analytics, priority support, custom branding
5. **Advertising (Future):** Sponsored opportunities or featured contractors

### Cost Considerations
- Server infrastructure (high-capacity for government traffic)
- Payment processing fees
- Development and maintenance
- Marketing and user acquisition
- Customer support

---

## Success Metrics

### Platform Health
- Uptime and reliability (especially for government servers)
- Page load times
- Mobile responsiveness scores
- Security audit compliance

### User Engagement
- Active users (contractors and procurement officers)
- Opportunity posting frequency
- Application/response rates
- Event registrations
- Survey completion rates

### Business Metrics
- Conversion rates (free to paid tiers)
- Monthly recurring revenue (MRR)
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Churn rate

### Social Impact
- Diverse contractors connected to opportunities
- Contract awards facilitated
- Small business growth supported
- Government procurement efficiency improved

---

## Next Steps

### Friday, January 20, 2026 - 9:00 AM Team Review
**Agenda:**
1. Review MVCI V4.1 updates
2. Test all new functionality
3. "Break the website" exercise - identify all issues
4. Audio record feedback for rapid iteration
5. Prioritize remaining features
6. Set next milestone deadlines

**Team Preparation:**
- Review login credentials sent Thursday
- Test both platforms thoroughly
- Audio record observations and suggestions
- Come prepared with wish-list features

---

## Vision Statement

**ContractConnect is building the infrastructure for equitable government contracting** - where small and diverse businesses can discover opportunities, form strategic partnerships, and compete effectively in the federal marketplace, while procurement officers can efficiently connect with qualified contractors and manage their vendor engagement processes.

By combining intelligent matchmaking, event management, and market research capabilities into one seamless ecosystem, we're creating a platform that serves the entire procurement lifecycle from discovery to delivery.

---

## Notes

- Platform name "Supplier Diversity Matchmaker" is being reconsidered
- Considering removing "minority" from branding for broader market appeal
- "FedMatch" proposed as alternative name
- Integration between MVCI and FedMatch is strategic priority
- AI-powered development enables rapid iteration impossible with traditional methods
