# Team Meeting Notes - January 16, 2026

**Attendees:** Courtney, Carmen, Evelyn, Dexter (Price)  
**Duration:** ~90 minutes  
**Recording:** Transcribed and processed via Lantern AI

---

## Meeting Overview

Comprehensive review of two platforms: **My Virtual Check-In (MVCI)** and **Supplier Diversity Matchmaker (FedMatch)**. Team aligned on development priorities, technical requirements, and next steps.

---

## Key Decisions Made

### 1. Platform Integration Strategy
- MVCI and FedMatch will be tightly integrated
- Shared user base and cross-promotion
- Events from procurement can use MVCI registration
- Survey functionality will benefit both platforms

### 2. Technical Approach
- **Move away from buggy WordPress plugins** to custom-built solutions
- Leverage Lantern + Hydra AI for rapid development
- Focus on government-grade security and scalability
- Payment integration via Stripe/PayPal/Plaid with direct client payouts

### 3. Tiered Pricing Model Confirmed
Both platforms will offer:
- **Free tier:** Basic features, limited capacity
- **Paid tiers:** Graduated pricing based on usage volume and feature access
- **Revenue sharing:** 1.75% transaction fees on payment processing

### 4. Platform Naming
- "Supplier Diversity Matchmaker" needs rebranding
- Consider removing "minority" for broader appeal
- **"FedMatch"** emerging as strong alternative
- Decision to be finalized soon

---

## My Virtual Check-In (MVCI) - Requirements & Updates

### Immediate Needs (V4.1)
✅ Custom WordPress plugins replacing third-party solutions  
✅ Seamless payment integration (direct to clients, not through Foresight)  
✅ Event registration + Survey functionality  
✅ Attachment uploads with date/time stamps  
✅ Mobile-responsive design  
✅ Government server compatibility  

### Feature Additions Requested
- **Automatic event rolloff:** Past events should archive after closure
- **Multiple addendum support:** Allow organizers to add supplemental documents
- **Date/time stamps:** All uploads need visible timestamps for accountability
- **Security tracking:** Audit trail for government compliance
- **High-traffic handling:** Must support large government events without crashes

### Technical Challenges Noted
- Previous plugin had **payment integration failures**
- **Government firewall issues** causing access problems
- Need for **better quality plugins** or custom solutions

### Use Cases
1. **Event Registration:** Conferences, meetings, procurement events
2. **Market Research:** Community surveys, event feedback
3. **Client Tool:** White-label solution for Foresight clients
4. **Data Collection:** Email capture and analytics

---

## Supplier Diversity Matchmaker (FedMatch) - Requirements & Updates

### Core Functionality Confirmed
- **Contractor Profiles:** NAICS codes, certifications, past performance, service areas
- **Procurement Profiles:** Agency info, logo, contact details
- **Opportunity Posting:** RFPs, teaming requests, event promotions
- **Smart Matching:** Automatic alerts based on NAICS code alignment
- **Messaging:** Internal platform communication (adding video capability)
- **Search & Filter:** By NAICS, location, budget, rating, deadline

### New Features Requested
1. **Preview Function:** See opportunity post before publishing
2. **Star/Bookmark System:** Save opportunities for later review
3. **Activity Tracking:** Log which opportunities contractors view/save
4. **Date Posted Display:** Timestamp on all opportunity listings
5. **Video Messaging:** Enhanced communication beyond text
6. **Attachment Management:** Upload RFPs and addendums with timestamps
7. **Historical Archive:** Keep past opportunities accessible (1-year retention proposed)

### Analytics Requirements
- **Site Traffic:** Heat mapping and user flow analysis
- **Engagement Metrics:** Views, clicks, saves, applications
- **Performance Data:** Success rates by contractor, opportunity type
- **Bounce Rate Tracking:** Identify UX issues causing drop-offs

### Comparison to SAM.gov
- Team reviewed SAM.gov's recent redesign (January 2026)
- Much cleaner interface now - will serve as design reference
- Opportunities stay visible after "inactive" date for historical access
- FedMatch should adopt similar visibility approach

---

## Technical Insights: Lantern + Hydra System

### How It Works
**Lantern (Code Generation):**
- Transcribes meeting recordings into actionable code
- Learns from every module built (never repeats work)
- Auto-debugs and prevents future bugs
- Operates 24/7 once connected

**Hydra (Ecosystem Manager):**
- One fix ripples across entire platform
- Prevents plugin conflicts (JSON/PHP assignment issues)
- Site-wide debugging and updates
- Cross-platform synchronization

### Development Speed
- Built working FedMatch prototype in **2-3 hours** during live call
- Can produce **3 complete websites per week**
- Real-time updates during conversations
- "Break the website" testing approach to find edge cases

### Comparison to Traditional Development
- Traditional: Months for MVP, sequential bug fixes
- Lantern/Hydra: Days for MVP, site-wide automatic debugging
- No onboarding friction (vs. GlueUp's painful process)
- Custom plugins eliminate third-party dependency issues

---

## Competitive Landscape Discussion

### GlueUp (Nonprofit CRM/Event Platform)
- **Pros:** Comprehensive feature set, used by U.S. Black Chamber
- **Cons:** Expensive, terrible onboarding, requires manual backend setup
- **Opportunity:** FedMatch + MVCI can offer better UX at lower cost

### Eventbrite
- **History:** Almost tanked when switching to paid model
- **Lesson:** Tiered approach is safer (free + paid tiers)
- **Differentiation:** MVCI adds survey functionality Eventbrite lacks

### SAM.gov
- **Recent Update:** Cleaner design (January 2026)
- **Approach:** Opportunities stay visible after closing for reference
- **Integration Opportunity:** Could build crawler for award data (pending CAPTCHA workaround)

### Higher Gov
- Used as reference for opportunity aggregation
- FedMatch adds **teaming focus** they lack
- Stronger **matchmaking intelligence**

---

## Business Model Refined

### Revenue Streams
1. **Tiered Subscriptions:**
   - Free: 40% features, up to 50 participants/surveys
   - Tier 1: 100 participants, enhanced features
   - Tier 2: 250 participants, advanced analytics
   - Tier 3: 500-1000+, full suite, priority support

2. **Transaction Fees:**
   - 1.75% on event ticket sales
   - 1.75% on survey payments
   - Direct payout to clients (Foresight never touches funds)

3. **Future Opportunities:**
   - White-label licensing for agencies
   - Advertising (sponsored opportunities)
   - Premium features (custom branding, priority listings)

### Cost Considerations
- **Server Infrastructure:** Must handle government traffic loads
- **Payment Processing:** Stripe/PayPal/Plaid fees
- **Development:** Ongoing Lantern/Hydra optimization
- **Support:** User onboarding and troubleshooting

---

## Market Positioning & Value Proposition

### Unique Selling Points
1. **Dual Platform Power:** Events + Surveys + Matchmaking in one ecosystem
2. **Teaming Focus:** Only platform emphasizing contractor partnerships
3. **Smart Matching:** AI-driven NAICS-based opportunity alerts
4. **User-Friendly:** Simplified onboarding vs. competitors (looking at you, GlueUp)
5. **Government-Ready:** Built for high security, high traffic from day one
6. **Data Intelligence:** Analytics for both sides of marketplace

### Target Markets
- **Small & Diverse Contractors:** MBE, WBE, DBE, SDVOSB, HUBZone
- **Government Agencies:** Federal, state, local procurement offices
- **Prime Contractors:** Seeking teaming partners
- **Nonprofits:** Event and survey needs
- **Corporate Diversity Programs:** Supplier diversity initiatives

### Strategic Advantages
- **Market Edge:** Team has deep government contracting expertise
- **Client Base:** Existing Foresight clients provide launch users
- **Speed to Market:** Lantern/Hydra enable rapid iteration
- **Integration:** MVCI + FedMatch create ecosystem lock-in

---

## Action Items & Deliverables

### Dexter - By Thursday, January 19
- ✅ Complete MVCI V4.1 update with custom plugins
- ✅ Implement payment integration (Stripe/PayPal/Plaid)
- ✅ Add attachment upload with timestamps
- ✅ Build star/bookmark functionality for FedMatch
- ✅ Add preview function for opportunity posts
- ✅ Enable video messaging capability
- ✅ Send updated login credentials and links via email + text

### Carmen - Before Friday Meeting
- Review updated MVCI site thoroughly
- Test all payment integration flows
- Check government server accessibility
- Audio record observations and suggestions
- Identify any breaks or bugs

### Evelyn - Before Friday Meeting
- Review both platforms from end-user perspective
- Test contractor and procurement workflows
- Audio record UX feedback and feature requests
- Prepare questions for Friday meeting
- Will be traveling (Panama) - may join via phone if WiFi limited

### Courtney - Before Friday Meeting
- Coordinate team logins and access
- Ensure all team members have updated credentials
- Set up group chat for ongoing communication
- Prepare proposal deadline coordination (Friday also)
- Facilitate Friday review meeting

---

## Friday Meeting - January 20, 2026 @ 9:00 AM

### Agenda
1. **MVCI V4.1 Demo:** Walkthrough of all new features
2. **FedMatch Updates:** Review new functionality
3. **"Break the Website" Exercise:**
   - Team actively tries to find bugs and edge cases
   - Audio record all observations in real-time
4. **Feedback Session:** Prioritize additional features
5. **Next Milestone:** Set deadlines for V5 and beyond

### Preparation
- All team members receive logins Thursday
- Review both platforms independently before meeting
- Come with wish-list features and pain points
- Audio record thoughts while testing (send to Dexter)
- Bring questions and enhancement ideas

---

## Long-Term Vision

### ContractConnect Ecosystem
"Building infrastructure for equitable government contracting where small and diverse businesses can discover opportunities, form strategic partnerships, and compete effectively in the federal marketplace."

### Platform Synergy
- **MVCI:** Events and surveys create touchpoints
- **FedMatch:** Matchmaking drives ongoing engagement
- **Combined:** Full procurement lifecycle from discovery to delivery

### Scaling Strategy
1. **Phase 1:** Launch in South Carolina (home market)
2. **Phase 2:** Expand to Southeast region
3. **Phase 3:** National rollout for federal opportunities
4. **Phase 4:** White-label partnerships with agencies/organizations

### Technology Evolution
- **Automated Works Integration:** Dexter's business automation platform
- **Enhanced AI Matching:** Predictive analytics for bid success
- **Crawler Development:** SAM.gov award data aggregation
- **Mobile App:** Native iOS/Android (beyond current PWA)

---

## Team Dynamics & Collaboration

### Roles Confirmed
- **Courtney:** Strategy, client relations, project management
- **Carmen:** Technical execution, WordPress/backend, longtime tech partner
- **Evelyn:** Market research, proposals, end-user requirements
- **Dexter:** AI development, rapid prototyping, Lantern/Hydra systems

### External Partners
- **Eric, Christopher, Byron:** Front-end design for landing pages
- **Caitlin:** Early ChatGPT advocate, future involvement TBD

### Communication Protocol
- **Reply all on emails** to keep everyone looped in
- **Audio recordings** for detailed feedback (easier than typing)
- **Group chat** for quick updates
- **Weekly check-ins** during active development

---

## Notable Quotes & Moments

**Courtney on Dexter's work:**  
*"Dexter has this amazing... His Diane Cook's name is Lantern. And Lantern can build code in seconds."*

**Carmen on WordPress plugins:**  
*"I want a quality plug-in. I don't want to have to... I just stayed away from them because I keep running into situations where plugins need to be removed or one little thing throws everything off."*

**Evelyn on GlueUp:**  
*"Their onboarding process, you basically have to go in and build your back end. No customer is doing that."*

**Dexter on the Intelligence Age:**  
*"We're entering the intelligence age. We were in the technology age... Now we have intelligence to apply the information, and we can just say what we want to do, here's the information and the knowledge base to do it."*

**Team excitement:**  
*Courtney: "I'm trying to manage my excitement right now. I'm extremely excited."*  
*Carmen: "I am too. I'm excited."*  
*Evelyn: "Listen, this is dope. I love this for you."*

---

## Technical Notes

### Domain & Hosting
- MVCI: Currently live, needs backend overhaul
- FedMatch: Dev environment, preparing for production

### Security Requirements
- Government firewall compatibility
- Secure payment processing (PCI compliance)
- Data encryption for contractor/procurement profiles
- Audit trails for all transactions

### Performance Requirements
- Handle 1000+ concurrent users
- Sub-2-second page loads
- Mobile-first responsive design
- Offline PWA capabilities

---

## Risks & Mitigations

### Identified Risks
1. **Government Server Issues:** Firewalls blocking access
   - *Mitigation:* Custom plugins with proper encryption protocols

2. **Payment Integration Complexity:** Multi-vendor support
   - *Mitigation:* Stripe/PayPal/Plaid integration with Lantern testing

3. **User Adoption:** Getting initial contractor/procurement base
   - *Mitigation:* Launch with existing Foresight client network

4. **Competition:** Established players (Higher Gov, SAM.gov)
   - *Mitigation:* Differentiate with teaming focus and dual-platform approach

5. **Scope Creep:** Too many features too fast
   - *Mitigation:* Tiered release schedule, V4, V5, V6 approach

---

## Next Steps Summary

**Immediate (This Week):**
- Dexter: Complete V4.1 updates for both platforms
- Team: Receive credentials and test independently
- Everyone: Audio record feedback for Friday meeting

**Short-term (Next 30 Days):**
- Launch updated MVCI with event + survey functionality
- Finalize FedMatch branding and naming
- Implement tiered pricing structure
- Begin user acquisition via Foresight client base

**Medium-term (Q1 2026):**
- Scale user base to 500+ contractors and 100+ procurement officers
- Develop mobile app enhancements
- Build analytics dashboards
- Explore SAM.gov integration opportunities

**Long-term (2026+):**
- National expansion beyond South Carolina
- White-label partnerships
- Automated Works integration
- Industry leadership in diverse supplier matchmaking

---

## Closing Thoughts

This meeting marked a significant turning point for both platforms. The introduction of Lantern/Hydra AI capabilities accelerates development timelines from months to weeks, making previously impossible feature requests suddenly feasible.

The team's excitement is palpable and justified. By combining Carmen's deep technical knowledge, Evelyn's market insights, Courtney's strategic vision, and Dexter's AI development prowess, ContractConnect is positioned to disrupt both the event management and government contracting matchmaking spaces.

The Friday meeting will be critical for validating the rapid progress and ensuring all stakeholders align on priorities for the next phase of development.

---

**Recording transcribed and summarized via Lantern AI - January 16, 2026**
