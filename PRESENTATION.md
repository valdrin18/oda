# OEGJK Connect — Demo Presentation Guide

## 1. Project Overview

**App Name:** OEGJK Connect  
**Organization:** Österreichisch-Kosovarische Wirtschaftskammer (German-Kosovar Chamber of Commerce)  
**Type:** Frontend-only mobile app (demo/MVP with static data)  
**Platform:** React Native (Expo Go) — iOS & Android  
**Purpose:** Digital hub for OEGJK members to network, find partners, attend events, access market entry resources, and collaborate in clusters and networks.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native via Expo SDK 54 |
| Navigation | React Navigation v6 (Drawer + Stack) |
| Animations | react-native-reanimated v4 |
| Gestures | react-native-gesture-handler v2 |
| Gradients | expo-linear-gradient |
| Icons | @expo/vector-icons (Ionicons) |
| Data | 100% static / local (no backend) |
| Safe Area | react-native-safe-area-context |

---

## 3. Design System

### Colors
| Token | Hex | Usage |
|---|---|---|
| Navy | `#0A2342` | Primary background, headers |
| Navy Light | `#1E3A5F` | Drawer, card headers |
| Gold | `#C9A84C` | Accents, premium badges, CTAs |
| White | `#FFFFFF` | Text on dark backgrounds |
| Background | `#F4F6FA` | Screen backgrounds |
| Blue | `#1E5FA8` | Secondary accent |

### Layout
- **Header:** Custom top bar with hamburger/back, OEGJK logo, notification bell with badge
- **Navigation:** Sidebar drawer (not bottom tabs)
- **Cards:** Rounded corners, drop shadows, gradient heroes

---

## 4. App Structure — 10 Main Screens + 4 Detail Screens

### Main Screens (accessible via Sidebar)

| # | Screen | Route Name | Description |
|---|---|---|---|
| 1 | Home | `Home` | Dashboard with featured events, member spotlight, quick actions |
| 2 | Members | `Members` | Searchable/filterable directory of 12 member companies |
| 3 | B2B Matchmaking | `B2B` | Request/browse B2B cooperation leads by sector |
| 4 | Members4Members | `M4M` | Exclusive marketplace of offers for members (8 offers) |
| 5 | Events & Fairs | `Events` | List of 8 upcoming events and trade fairs |
| 6 | Market Entry | `MarketEntry` | Step-by-step market entry guide for Austria ↔ Kosovo |
| 7 | SES Experts | `SES` | Request form for Senior Expert Service advisors |
| 8 | Clusters | `Clusters` | 6 industry cluster cards with polls and meetings |
| 9 | Networks | `Networks` | 3 specialized business networks |
| 10 | Profile | `Profile` | User/company profile with stats, saved items, memberships |

### Detail Screens (opened from cards)

| Screen | Route | Opened From |
|---|---|---|
| Business Detail | `BusinessDetail` | Members list, Profile → Saved Companies |
| Event Detail | `EventDetail` | Events list, Profile → Registered Events |
| Cluster Detail | `ClusterDetail` | Clusters list, Profile → Cluster Memberships |
| Network Detail | `NetworkDetail` | Networks list |

---

## 5. Screen-by-Screen Demo Flow

### Screen 1 — Home
- Show branded header with OEGJK logo
- Tap notification bell → notification panel slides in (4 notifications)
- Featured event card, member spotlight, quick action grid
- **Key message:** App hub for all chamber activities

### Screen 2 — Members
- Scroll through 12 company cards
- Use search bar to filter by name
- Tap a card → **Business Detail Screen**
  - Hero with company logo avatar, sector badge, verified/premium badges
  - Services chips, cooperation interests (offering / seeking)
  - Contact info (person, email, phone, website)
  - "Request Introduction" button → modal confirmation
  - Save/bookmark toggle
  - "Find B2B Partners in this sector" CTA
- **Key message:** Full member directory with direct contact capability

### Screen 3 — B2B Matchmaking
- Form to submit a cooperation request (sector, need, description)
- Active B2B listings feed
- Filter by sector/type
- **Key message:** AI-ready matchmaking infrastructure (currently rule-based)

### Screen 4 — Members4Members
- Grid of exclusive member offers (8 offers)
- Categories: Legal, Marketing, Tech, Finance…
- "Claim Offer" interaction
- **Key message:** Tangible member benefits

### Screen 5 — Events & Fairs
- 8 event cards (conferences, trade fairs, networking dinners)
- Tap an event → **Event Detail Screen**
  - Date, location, description, agenda timeline
  - Speaker list
  - "Register" button → ticket modal with QR placeholder + ticket ID
  - "Add to Calendar" interaction
  - **Germany Trade Fair Plan** section (for fair events): city, delegation contact, interactive checklist, recommended contacts
- **Key message:** End-to-end event management from discovery to attendance

### Screen 6 — Market Entry
- Step-by-step guide cards: Legal Setup, Banking, Taxation, Labor Law, Customs
- Progress tracker visual
- Downloadable checklist placeholders
- **Key message:** Practical roadmap for market entry

### Screen 7 — SES Experts
- Request form: organization, sector, problem description, expertise needed, language, company size, preferred dates, budget, contact
- Submit → confirmation screen with reference ID and status tracker (Submitted → Under Review → Expert Assigned → Active → Completed)
- **Key message:** Direct pipeline to senior experts

### Screen 8 — Clusters
- 6 cluster cards with color-coded icons:
  - 🟣 Digital Economy (c1)
  - 🔵 Manufacturing & Engineering (c2)
  - 🟡 Tourism & Hospitality (c3)
  - 🟢 Agriculture & Food (c4)
  - 🟠 Energy & Sustainability (c5)
  - 🔴 Healthcare & Life Sciences (c6)
- Each card: member count, description, topic chips, next meeting date, poll vote count
- Tap → **Cluster Detail Screen**
  - About, current topics, active poll with live voting UI and percentage bars
  - Documents list, issue tracker, policy recommendations, meeting summaries
- **Key message:** Industry-specific collaboration hubs with governance tools

### Screen 9 — Networks
- 3 specialized networks:
  - **Clean Call Alliance** — certified business ethics providers
  - **N4CEB** — Network for Central/Eastern Business (companies + opportunities)
  - **FI-KS** — Finance-Investment Kosovo (companies + regulatory updates, urgent alerts)
- Gradient card headers, feature lists, "Open Network" button
- Tap → **Network Detail Screen**
  - Purpose card, features, member companies, opportunities, regulatory updates (with urgent badge), get involved actions
- **Key message:** Niche networks with real-time regulatory intelligence

### Screen 10 — Profile
- LinearGradient hero: avatar, Premium + Verified badges, company name, contact person, role, location
- Stats row: Saved (4) / Events (2) / B2B requests / Clusters (1) / Offers (3)
- Quick action grid: Edit Profile, My Documents, Settings, Support
- Sections:
  - **Company Overview** — description, services chips
  - **Membership Status** — Premium tier, member since March 2024, benefits
  - **Saved Companies** → taps into Business Detail
  - **Registered Events** → taps into Event Detail
  - **B2B Requests** — status badges
  - **Cluster Memberships** → taps into Cluster Detail
  - **Claimed Offers** — list
- **Key message:** Personalized dashboard and activity history

---

## 6. Static Data Summary

| File | Contents |
|---|---|
| `src/data/members.js` | 12 companies with sector, services, offering, seeking, contact |
| `src/data/events.js` | 8 events with agenda, speakers, fair checklist, ticket IDs |
| `src/data/offers.js` | 8 Members4Members offers with provider, category, discount |
| `src/data/clusters.js` | 6 clusters with polls, documents, issues, meeting summaries |
| `src/data/networks.js` | 3 networks with features, providers/companies, updates, opportunities |
| `src/data/notifications.js` | 4 unread notifications |
| `src/data/profile.js` | Current user: Valdrin Smakaj / Pixellent Solutions (Premium member) |

---

## 7. Key Features to Highlight

1. **Drawer Navigation** — professional sidebar UX, not bottom tabs
2. **Notification System** — bell icon with unread badge, modal panel
3. **Interactive Polls** — vote inside cluster detail, see live percentage bars
4. **Germany Fair Plan** — specialized checklist for trade fair delegation
5. **SES Expert Status Tracker** — visual multi-step progress component
6. **Ticket QR Modal** — event registration with ticket ID
7. **Bookmarking & Saved Items** — save companies, claim offers, register for events
8. **Urgent Regulatory Alerts** — highlighted update cards in Network detail
9. **B2B CTA Integration** — from Business Detail → B2B screen with sector pre-filled
10. **Premium Design** — navy/gold palette, LinearGradient heroes, card shadows

---

## 8. Demo Script (10-minute version)

| Time | Action |
|---|---|
| 0:00–1:00 | Open app, show Home screen, open notification panel |
| 1:00–2:30 | Members → search → tap company → Business Detail → Request Introduction |
| 2:30–3:30 | Events → tap event → Event Detail → Register → show ticket modal |
| 3:30–4:30 | Events → tap a fair event → show Germany Fair Plan checklist |
| 4:30–5:30 | Clusters → tap Manufacturing cluster → vote in poll, browse documents |
| 5:30–6:30 | Networks → tap FI-KS → show regulatory updates with urgent badge |
| 6:30–7:30 | SES Experts → fill form → submit → show reference ID + status tracker |
| 7:30–8:30 | Members4Members → browse offers → claim one |
| 8:30–9:30 | Profile → show stats → tap Saved Companies → back to Profile |
| 9:30–10:00 | Market Entry → walk through guide steps |

---

## 9. Running the App

```bash
# Prerequisites: Node.js, Expo Go app on iPhone/Android

cd /Users/valdrin/Desktop/oda
npx expo start --clear

# Scan QR code with:
# - iPhone: Camera app
# - Android: Expo Go app
```

**Requirements:**
- Phone and Mac on the same Wi-Fi network
- Expo Go installed (App Store / Google Play)
- Node.js 18+

---

## 10. Future Development Roadmap (for presentation Q&A)

- **Backend integration** — Supabase or Firebase for real member data
- **Push notifications** — Expo Notifications for event reminders
- **AI Matchmaking** — GPT-based B2B partner suggestions
- **Multi-language** — German, English, Albanian
- **Document upload** — real file handling for SES requests
- **Calendar sync** — native calendar integration for events
- **Payment gateway** — membership fee collection
- **Admin panel** — web dashboard for chamber staff
