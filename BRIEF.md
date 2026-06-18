# Cruise Line Marketing Campaign Dashboard — Project Brief

## Project Overview

Design and build a **single-page internal marketing dashboard application** for a cruise line’s internal marketing team. The dashboard should provide a **bird’s-eye view of campaign performance** across major guest touchpoints so users can quickly understand what is performing well, what needs attention, and what actions to take next.

This experience should feel like a polished internal product used by a real enterprise marketing team. It should be **responsive, mobile-first, highly visual, accessible, and presentation-ready**, with realistic campaign data and clean information hierarchy.

---

## Goal

Create an internal dashboard tool that enables the cruise line marketing team to:

- Quickly understand active campaign performance
- Compare performance across key channels and touchpoints
- Identify high-performing and underperforming campaigns
- View highlights from current and past campaigns
- Start a new campaign
- Track campaigns through their lifecycle from planning to launch and optimization
- Surface actionable insights, alerts, and benchmarks to support decision-making

The final experience should support internal stakeholders who need to monitor campaigns across channels such as:

- Social media (Instagram, X/Twitter)
- Email marketing
- Website campaign modules / promotional placements
- Mobile app campaign placements

---

## Primary Users

### Primary Audience
- Internal cruise line marketing team members

### Secondary Audiences
- Marketing managers
- Campaign managers
- Content strategists
- Creative/design stakeholders
- Leadership reviewing executive-level campaign summaries

---

## Product Vision

This site should function as an **internal campaign intelligence hub** for the marketing team. The home dashboard is the landing experience and should surface the most important campaign information at a glance, while additional routed views support campaign creation and campaign lifecycle tracking.

The dashboard should not feel like passive reporting only. It should support:
- monitoring
- optimization
- prioritization
- campaign planning
- performance storytelling
- collaboration

The experience should balance:
- **Executive scanability**
- **Practical marketing detail**
- **Design polish**
- **Clear interaction patterns**
- **Strong usability on all screen sizes**

---

## Core Experience Requirements

### Home / Dashboard
The dashboard landing page should provide a high-level summary of campaign performance, including:

- Current / active campaign spotlight
- Performance summary cards
- Cross-channel campaign comparison
- Channel breakdowns
- Trends over time
- Top-performing past campaigns
- Alerts / flags for campaigns needing attention
- Quick links to create or manage campaigns
- Benchmark context so performance is not shown in isolation
- Recommended next actions or optimization insights

### Additional Views / Pages
Although this is a **single-page application**, it should include multiple routed views or app states, such as:

1. **Dashboard (Home)**
   - Bird’s-eye overview of active and historical campaign performance

2. **Create New Campaign**
   - A form or guided workflow for starting a new campaign
   - Includes fields like campaign name, objective, target audience, channels, dates, budget, and owner

3. **Campaign Lifecycle Tracker**
   - A workflow/status view showing campaign progress through major stages
   - Example stages:
     - Briefing / intake
     - Strategy / planning
     - Copywriting
     - Design
     - Review / approval
     - Deployment / launch
     - QA / testing
     - Monitoring
     - Optimization / iteration
     - Completed / archived

4. **Campaign Detail View**
   - A deeper drill-down for a specific campaign
   - Shows channel-level metrics, timeline, campaign health, creative references, performance trends, and recent updates

---

## Functional Requirements

### Dashboard Must Include
- Summary KPI cards
- Cross-channel campaign tracking
- Visual charts for performance trends
- Filtering or sorting options
- Keyboard-accessible interactions
- Clear status indicators that use more than color alone
- Meaningful labels and hierarchy for fast comprehension
- Alerts panel
- Benchmark comparison indicators
- Budget visibility
- Campaign health indicators
- Quick actions for common tasks

### KPIs / Metrics to Represent
The dashboard should reflect realistic campaign tracking metrics across different channel types.

#### Shared Campaign Metrics
- Campaign name
- Campaign objective
- Campaign status
- Campaign owner
- Start date / end date
- Budget
- Spend
- Reach / impressions
- Clicks
- Click-through rate (CTR)
- Conversions
- Conversion rate
- ROI / performance summary
- Audience segment
- Destination or route
- Offer type
- Channel mix

#### Social Campaign Metrics
- Platform
- Impressions
- Engagements
- Engagement rate
- Clicks
- CTR
- Conversions
- Spend
- Top creative / top post
- Follower interaction or save/share behavior (optional)

#### Email Campaign Metrics
- Sends
- Delivery rate
- Open rate
- Click rate
- Click-through rate (if represented distinctly)
- Unsubscribes
- Bounce rate
- Revenue / downstream conversion impact
- A/B variant performance (optional)

#### Website / Mobile App Metrics
- Module or placement name
- Views
- Clicks / taps
- CTR
- Conversion rate
- Device split (mobile / desktop)
- Placement performance by page or app surface
- Funnel progression impact

#### Budget & Efficiency Metrics
- Budget vs spend
- Cost per click (CPC)
- Cost per acquisition (CPA)
- Return on ad spend or ROI
- Budget pacing status

---

## Advanced Marketing Features

### 1. Campaign Insights & Recommendations
Include a dedicated insights section that surfaces useful observations such as:
- top performing channel this week
- below-benchmark campaign performance
- strong email engagement
- underperforming creative
- campaign worth extending
- campaign at risk and needing optimization

### 2. Benchmarking & Performance Context
Marketing teams rarely evaluate campaigns in isolation. The product should support:
- current campaign vs past campaign comparison
- current campaign vs average benchmark
- channel vs channel comparison
- week-over-week or month-over-month change indicators

### 3. Filtering & Segmentation
Enable users to filter campaign data by:
- channel
- campaign status
- date range
- audience segment
- destination / itinerary region
- campaign objective
- offer type

### 4. Campaign Health Status
Introduce a clear health system with labels and icons:
- Performing Well
- Needs Attention
- Underperforming

Status should never rely on color alone.

### 5. Alerts & Notifications Panel
Add a lightweight alerts module showing:
- drop in engagement
- budget nearly depleted
- campaign launch delayed
- QA issue flagged
- low delivery or low impressions
- below-threshold conversion performance

### 6. Campaign Timeline / Activity Feed
Support a timeline showing:
- campaign created
- brief approved
- copy finalized
- design approved
- launched
- optimized
- completed

### 7. Creative Performance Insights
Marketing teams need to evaluate asset effectiveness. Include:
- top-performing creative
- message / CTA comparison
- A/B performance highlights
- placeholder thumbnail or visual asset reference

### 8. Collaboration Features
Even if mocked visually only, include:
- campaign notes
- stakeholder comments
- recent updates
- blockers / risks
- next steps

### 9. Attribution / Channel Role View
Provide a simplified view of how channels contribute to campaign success, for example:
- social drives awareness
- email drives conversion
- website and app support mid-funnel engagement

### 10. Quick Actions
Include practical actions such as:
- create new campaign
- duplicate campaign
- pause campaign
- open campaign details
- review lifecycle status

---

## Cruise-Specific Context Enhancements

To make this feel specific to cruise marketing rather than a generic dashboard, include data and UI patterns reflecting cruise business realities.

### Guest Segmentation
Support campaign audiences such as:
- Families with kids
- Couples / honeymoon travelers
- Loyalty / returning guests
- First-time cruisers
- Luxury travelers

### Destination-Based Tracking
Allow campaigns to be tied to destinations such as:
- Caribbean
- Mediterranean
- Alaska
- Bahamas weekend sailings

### Booking Funnel Awareness
Represent a simplified booking journey:
- Awareness
- Consideration
- Click
- Booking
- Upgrade / onboard purchase

### Offer-Based Campaign Tracking
Cruise campaigns are often offer-led. Include campaign types such as:
- % off fares
- onboard credit
- drink packages
- balcony or suite upgrades
- kids sail free
- limited-time booking window offers

---

## Design Direction

### Overall Visual Style
The design should feel:
- Modern
- Clean-line
- Minimal but expressive
- Internal enterprise-grade
- Highly polished and presentation-ready

### Specific Design Guidance
- Mobile-first layout and thinking
- Clean, minimal, uncluttered UI
- Strong visual hierarchy for executive scanning
- Consistent left/right page gutters aligned beneath the app bar across breakpoints
- Use an **8px grid system**
- Rounded, soft **sans-serif typography**
- Modern dashboard styling with strong card layouts
- Bright rainbow / neon-inspired accent colors
- Bright, blown-out drop shadows used intentionally
- Visual inspiration should reference the designs in the **INSPO folder**
- Content should animate in subtly on scroll, with **quick fade-in behavior** instead of all content feeling instantly dumped onto the page on load

### Visual Tone
The UI should balance:
- professionalism for internal business users
- visual personality and energy
- high readability
- clean dashboard organization

---

## UI / UX Best Practices

The site design must follow **UI/UX industry best practices** for responsive dashboard experiences.

### Required Principles
- Strong hierarchy with clear page sections
- Consistent spacing and alignment
- Predictable navigation patterns
- Components that scale cleanly across device sizes
- Easy scanning of high-priority metrics first
- Progressive disclosure for deeper campaign detail
- Minimal clutter
- Clear chart labeling
- Meaningful card grouping
- Consistency across components, spacing, and visual language
- Empty states for no data / filtered states
- Useful hover, focus, and feedback states
- Skeleton loading patterns or placeholder states if appropriate

---

## Responsive Requirements

- Must be designed **mobile-first**
- Must scale cleanly upward to tablet and desktop
- Cards should stack vertically on small screens
- Maintain readability at all sizes
- Maintain consistent gutters and spacing at all breakpoints
- Charts must remain readable on smaller screens
- Layout should adapt without feeling broken or cramped
- Navigation should remain usable on mobile and desktop
- No horizontal scrolling for core content areas

---

## Accessibility Requirements

Accessibility must be treated as a core requirement, not an afterthought.

### Required Accessibility Expectations
- Include **AAA accessibility requirements in the design approach**
- Ensure sufficient contrast, especially in dark mode
- Do **not rely on color alone**
- Use **icons + labels** together where meaning is important
- Ensure readable typography and comfortable spacing
- Maintain clear focus states
- Ensure all filters and interactive controls are keyboard accessible
- Use semantic structure and accessible labeling
- Ensure charts and status indicators have readable context
- Support screen-reader-friendly naming where relevant

### Practical Accessibility Note
Given the neon/brighter visual direction, accessibility should be preserved through:
- carefully chosen contrast-safe accent colors
- strong text contrast
- clear states and labels
- restrained use of decorative effects where they reduce readability

---

## Layout Structure

Use **Vuetify 3 components** as the primary layout and UI foundation.

### Suggested Layout Pattern
- Global app shell
- App bar / top navigation
- Main content container with consistent gutters
- Responsive grid-based card layout
- Reusable cards, data blocks, chart panels, and status components

### Suggested Component Types
- App bar
- Navigation drawer or responsive nav pattern
- Cards
- Chips / status pills
- Data tables
- Forms
- Tabs or segmented controls
- Charts
- Expansion panels or accordions
- Dialogs / modals if needed
- Steppers or progress views for lifecycle tracking
- Alert banners
- Notes / activity feed panels

---

## Suggested Information Architecture

### Navigation
- Dashboard
- New Campaign
- Lifecycle Tracker
- Campaign Detail

### Dashboard Sections
1. Page header / overview
2. Active campaign spotlight
3. KPI summary cards
4. Insights and alerts
5. Performance over time
6. Channel breakdown
7. Campaign comparison table or cards
8. Past campaign wins / highlights
9. Budget and pacing
10. Quick actions

---

## Feature Expectations by View

### 1. Dashboard (Home)
Should include:
- Campaign spotlight card
- Top-level KPIs
- Active campaigns list
- Historical campaign highlights
- Chart.js visualizations
- Channel summaries for:
  - Social
  - Email
  - Website
  - Mobile app
- Quick action to start a new campaign
- Quick action to view campaign lifecycle
- Alerts panel
- Benchmark comparison
- Budget and efficiency snapshot
- Insights / recommendations module

### 2. Create New Campaign
Should include a form for:
- Campaign name
- Campaign objective
- Target audience
- Destination / itinerary
- Offer type
- Channels selected
- Launch date
- End date
- Budget
- Campaign owner
- Summary / notes
- Initial status
- Key KPI goal

### 3. Campaign Lifecycle Tracker
Should support:
- Stage-based campaign progress
- Status by deliverable
- Ownership / assignee
- Due dates / milestone timing
- Notes / blockers
- QA/test status
- Launch readiness
- Post-launch monitoring state
- Optimization recommendations
- Completion / archive state

### 4. Campaign Detail View
Should include:
- Campaign summary header
- Channel-specific metrics
- Timeline
- Status history
- Performance trend chart
- Budget and pacing
- Health status
- Creative placeholders or references
- Alerts and notes
- Recommended next actions

---

## Data Requirements

Use **local JSON data only**. No backend or API integration is required.

### Data Expectations
Create a **separate fake data file** (or files) that contain realistic mock data for cruise line marketing campaigns. This data should feel plausible for an internal enterprise dashboard.

### Recommended Data Files
- `src/data/campaigns.json`
- `src/data/channel-metrics.json`
- `src/data/benchmarks.json`
- `src/data/alerts.json`
- `src/data/lifecycle.json`
- `src/data/activity-feed.json`

### Example Campaign Types
Use realistic cruise-line marketing campaign themes such as:
- Summer Caribbean Getaway
- Holiday at Sea
- Weekend Flash Fare
- Family Cruise Promotion
- Loyalty Upgrade Push
- Mobile App Booking Incentive
- Last-Minute Balcony Upgrade Offer
- Onboard Credit Campaign

### Example Touchpoints
- Instagram
- X / Twitter
- Email
- Website hero banner
- Website promo tile
- Mobile app homepage banner
- Push notification (optional)
- Loyalty/member messaging (optional)

### Data Realism Expectations
Mock data should include:
- varying campaign durations
- active, paused, completed, and archived campaigns
- realistic performance spread between channels
- realistic date ranges
- varied budgets and spend levels
- seasonal campaign patterns
- clear winners and underperformers
- destination-specific trends
- audience-specific variations

---

## Technical Requirements

- Vue 3 + TypeScript
- Vuetify 3 for UI components
- Material Design Icons
- Chart.js + vue-chartjs
- Local JSON data (no backend)
- Single-page application

---

## Technical Approach

Build the project as a **Vue 3 + TypeScript SPA** using the existing scaffold in the repository.

### Important Notes
- This should remain a **front-end only implementation**
- No backend services
- Data should come from local JSON files
- The experience should be cleanly componentized
- Routing may be used for internal views while keeping the application a single-page app

### Recommended Engineering Direction
- Reusable components for cards, charts, tables, forms, and status elements
- Centralized local mock data
- Shared theme and spacing tokens
- Modular file organization for clarity and scalability
- Route-based navigation for dashboard, creation, lifecycle, and detail views
- Keep logic simple, readable, and well-structured

---

## Implementation Plan

Create project using Vite:

```sh
npm create vue@latest
``