---
goal: Fix QA feedback issues from production site review
version: 1.0
date_created: 2026-01-19
last_updated: 2026-01-19
owner: Development Team
status: 'In progress'
tags: ['bug', 'qa', 'ux', 'auth', 'navigation']
---

# Introduction

![Status: In Progress](https://img.shields.io/badge/status-In%20progress-yellow)

Fix 6 QA issues reported from https://supcourt.netlify.app/ production review. Issues span navigation consistency, auth state management, profile persistence, and broken button actions.

## 1. Requirements & Constraints

- **REQ-001**: All pages must show consistent navigation via shared `<Navigation />` component
- **REQ-002**: Homepage must show "Sign In" / "Login" link when logged out
- **REQ-003**: Logout must work from any page, clear all auth state, and redirect to homepage
- **REQ-004**: Profile form data must persist across page refresh
- **REQ-005**: Broken buttons must either work or show "Coming soon" with disabled state
- **CON-001**: Minimal diffs only - no broad reformatting or refactoring
- **CON-002**: Reuse existing auth/nav patterns in codebase
- **GUD-001**: Add user feedback (success/error) for all actions

## 2. Implementation Steps

### Implementation Phase 1: Navigation & Sign-In Consistency

- GOAL-001: Ensure homepage shows Login/Sign In button and all pages use consistent navigation

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Verify Navigation.tsx shows Login/Sign Up when `!user` | ✅ | 2026-01-19 |
| TASK-002 | Verify homepage imports and uses `<Navigation />` component | ✅ | 2026-01-19 |
| TASK-003 | Confirm all public pages (/, /events, /faq, etc.) use `<Navigation />` | | |

**Issue Analysis - QA#1: No sign in button on homepage**
- **Expected**: Homepage header shows "Login" or "Sign In" link when not authenticated
- **Actual**: Navigation.tsx already has Login/Sign Up links for `!user` state (lines 73-86)
- **Root Cause Hypothesis**: Either auth loading state blocking render, or UI hidden on mobile
- **Files**: `src/components/Navigation.tsx`, `src/app/page.tsx`
- **Fix**: Check loading state handling - nav shows nothing during `loading` state; add visibility check

**Issue Analysis - QA#3: Menu bar changes depending on page**
- **Expected**: Same navigation structure on all pages
- **Actual**: Homepage uses `<Navigation />`, dashboards use `<DashboardNavigation />`
- **Root Cause**: Different nav components by design; confirm this is intentional
- **Files**: `src/components/Navigation.tsx`, `src/components/DashboardNavigation.tsx`
- **Fix**: This is intentional - dashboards show tabs instead of main nav. Document pattern.

### Implementation Phase 2: Logout Reliability

- GOAL-002: Make logout work consistently from every page

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-004 | Review AuthContext signOut function | | |
| TASK-005 | Add router.push('/') redirect after signOut | | |
| TASK-006 | Clear any localStorage/sessionStorage on logout | | |
| TASK-007 | Add error handling with user feedback | | |

**Issue Analysis - QA#2: Logout button doesn't work across site**
- **Expected**: Clicking Logout clears session and redirects to homepage
- **Actual**: signOut() calls `supabase.auth.signOut()` but no redirect occurs
- **Root Cause**: `signOut` in AuthContext clears state but doesn't redirect; components call `await signOut()` then may not redirect
- **Files**: `src/lib/contexts/AuthContext.tsx`, `src/components/Navigation.tsx`, `src/components/DashboardNavigation.tsx`
- **Fix**: Add `router.push('/')` after signOut in each handler, or return redirect instruction from signOut

### Implementation Phase 3: Profile Persistence

- GOAL-003: Ensure profile form saves data that persists across refresh

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-008 | Review contractor profile save handler - currently only shows "saved" message | | |
| TASK-009 | Add Supabase update call in handleSaveProfile | | |
| TASK-010 | Add localStorage fallback with TODO comment if API fails | | |
| TASK-011 | Add success/error toast feedback | | |
| TASK-012 | Repeat for procurement profile form | | |

**Issue Analysis - QA#4: My profile doesn't save user data**
- **Expected**: Profile form saves to database, data loads on refresh
- **Actual**: `handleSaveProfile` only sets `profileSaved` state to true for 3 seconds - no actual save!
- **Root Cause**: Save handler is a stub - no Supabase call to persist data
- **Files**: `src/app/dashboard/contractor/page.tsx` (handleSaveProfile ~line 145), `src/app/dashboard/procurement/page.tsx`
- **Fix**: Call `supabase.from('profiles').update(...)` in handleSaveProfile, use AuthContext.refreshProfile() after

### Implementation Phase 4: Broken Buttons - Request Recording

- GOAL-004: Fix or disable "Request Recording" button

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-013 | Find Request Recording button in events page | | |
| TASK-014 | Determine if backend endpoint exists | | |
| TASK-015 | If no backend: add disabled state + "Coming soon" tooltip | | |

**Issue Analysis - QA#5: Request recording button doesn't work**
- **Expected**: Button submits a recording request or navigates to form
- **Actual**: Button has no onClick handler - just renders text
- **Root Cause**: Button element has no click handler wired
- **Files**: `src/app/events/page.tsx` (line ~236)
- **Fix**: No recording API exists. Add `disabled` state and "Coming soon" tooltip/message.

### Implementation Phase 5: Broken Buttons - Create Survey

- GOAL-005: Fix or disable "Create Survey" button

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-016 | Find Create Survey button in events page | | |
| TASK-017 | Determine if survey feature/API exists | | |
| TASK-018 | If no backend: add disabled state + "Coming soon" tooltip | | |

**Issue Analysis - QA#6: Create survey button doesn't work**
- **Expected**: Button opens survey creation flow
- **Actual**: Button has no onClick handler
- **Root Cause**: Feature not implemented - button is placeholder
- **Files**: `src/app/events/page.tsx` (line ~224)
- **Fix**: No survey API exists. Add `disabled` state and "Coming soon" message.

## 3. Alternatives

- **ALT-001**: Could add full survey/recording backend - rejected as out of scope for bug fixes
- **ALT-002**: Could remove broken buttons entirely - rejected as stakeholders want feature visibility

## 4. Dependencies

- **DEP-001**: Supabase client configured in `src/lib/supabase/client.ts`
- **DEP-002**: AuthContext provides `signOut`, `refreshProfile`, `user`, `profile`
- **DEP-003**: Database tables: `profiles`, `contractor_profiles`

## 5. Files

- **FILE-001**: `src/lib/contexts/AuthContext.tsx` - signOut enhancement
- **FILE-002**: `src/components/Navigation.tsx` - logout redirect
- **FILE-003**: `src/components/DashboardNavigation.tsx` - logout redirect
- **FILE-004**: `src/app/dashboard/contractor/page.tsx` - profile persistence
- **FILE-005**: `src/app/dashboard/procurement/page.tsx` - profile persistence
- **FILE-006**: `src/app/events/page.tsx` - broken buttons

## 6. Testing

- **TEST-001**: Manual test: Open homepage logged out → verify Login/Sign Up visible
- **TEST-002**: Manual test: Login → Navigate to dashboard → Click Logout → Verify redirect to homepage and nav shows Login
- **TEST-003**: Manual test: Go to profile → Enter data → Save → Refresh page → Verify data persists
- **TEST-004**: Manual test: Events page → Click "Request Recording" → See "Coming soon" message
- **TEST-005**: Manual test: Events page → Click "Create Survey" → See "Coming soon" message

## 7. Risks & Assumptions

- **RISK-001**: Profile save may fail if user doesn't have DB permissions - mitigated by localStorage fallback
- **ASSUMPTION-001**: Supabase RLS policies allow users to update their own profile
- **ASSUMPTION-002**: Navigation.tsx `loading` state resolves correctly

## 8. Related Specifications / Further Reading

- Supabase Auth docs: https://supabase.com/docs/guides/auth
- Next.js App Router: https://nextjs.org/docs/app
