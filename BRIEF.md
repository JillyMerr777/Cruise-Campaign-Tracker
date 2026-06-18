## Cruise Campaign Tracker

Single source of truth for the project. This file supersedes the old `README.md`, `PLAN.md`, and `DESIGN.md` documents.

## Project Summary

Cruise Campaign Tracker is a responsive internal marketing intelligence application for cruise line teams. It gives stakeholders a fast, executive-level view of campaign performance across channels such as social, email, website, and app placements while still supporting deeper operational workflows like campaign creation, lifecycle tracking, and campaign detail review.

The product is meant to feel like a polished internal SaaS tool rather than a static mock dashboard: useful, data-driven, visually distinctive, accessible, and presentation-ready.

## Current Implementation

- Framework: Vue 3 + TypeScript + Vite
- UI system: shadcn-vue + Tailwind CSS + reka-ui primitives
- Routing: Vue Router
- Data visualization: Chart.js + vue-chartjs
- Icons: Lucide Vue
- Styling: SCSS plus Tailwind utility composition
- Data source: local mock JSON files only

Note: Earlier planning material referenced Vuetify. The current codebase has already been migrated away from Vuetify, so this document reflects the actual implemented stack.

## Product Vision

The app should function as a campaign intelligence hub for internal cruise marketing teams.

It should help users:

- understand active campaign performance at a glance
- compare channel and campaign outcomes quickly
- identify high-performing and underperforming work
- spot pacing, QA, and lifecycle risks early
- take action through campaign creation, optimization, and review workflows
- communicate campaign status clearly to leadership and stakeholders

The experience should balance:

- executive scanability
- practical marketing detail
- operational usefulness
- polished visual design
- strong usability on all screen sizes

## Primary Users

Primary audience:

- internal cruise line marketing team members

Secondary audiences:

- marketing managers
- campaign managers
- content strategists
- creative and design stakeholders
- leadership reviewing executive summaries

## Core App Views

The application is a single-page app with routed views.

Implemented views:

1. Dashboard
2. New Campaign
3. Lifecycle Tracker
4. Campaign Detail

Expected responsibilities:

- Dashboard: high-level campaign intelligence, KPIs, alerts, insights, comparisons, and quick actions
- New Campaign: guided campaign setup with core business fields
- Lifecycle Tracker: stage-based workflow visibility from intake to optimization and completion
- Campaign Detail: deeper drill-down into metrics, trends, creative performance, notes, and recent updates

## Dashboard Requirements

The dashboard is the primary landing experience and command center.

It should prioritize:

- immediate KPI visibility
- rapid health scanning
- clear information hierarchy
- minimal cognitive load
- actionable insight within seconds

Core dashboard sections:

- featured campaign spotlight
- KPI summary row
- top campaign ranking
- performance trend visualization
- audience insights
- channel intelligence
- channel comparison
- creative performance
- alerts panel
- optimization insights
- budget pacing
- campaign comparison table
- past campaign highlights
- quick actions

## Functional Requirements

The product should support:

- summary KPI cards
- cross-channel campaign tracking
- trend and comparison charts
- filtering and segmentation
- benchmark context
- campaign health indicators
- alerts and recommendations
- budget and pacing visibility
- campaign lifecycle tracking
- campaign notes, blockers, and activity history
- quick actions for common operations

Status and health should never rely on color alone.

## Metrics and Data Model

Shared campaign metrics:

- campaign name
- objective
- status
- health
- owner
- start and end dates
- budget and spend
- impressions or reach
- clicks
- CTR
- conversions
- conversion rate
- ROI or ROAS
- audience segment
- destination
- offer type
- channel mix

Channel- and tactic-specific metrics may include:

- social engagement and engagement rate
- email sends, delivery, opens, clicks, unsubscribes, bounce rate
- website or app placement performance
- device split
- budget efficiency metrics such as CPC and CPA
- creative performance indicators
- benchmark deltas and week-over-week movement

## Advanced Marketing Features

Important feature areas:

1. Insights and recommendations
2. Benchmark comparison
3. Filtering and segmentation
4. Campaign health states
5. Alerts and notifications
6. Activity feed and campaign timeline
7. Creative performance insights
8. Notes, blockers, and collaboration surfaces
9. Simplified attribution or channel role context
10. Quick actions

## Cruise-Specific Business Context

The experience should feel specific to cruise marketing rather than generic digital marketing.

Support context such as:

- audience segments like families, couples, loyalty guests, first-time cruisers, and luxury travelers
- destination tracking like Caribbean, Mediterranean, Alaska, and Bahamas itineraries
- offer-led campaigns such as onboard credit, drink packages, suite upgrades, and kids sail free
- booking funnel awareness from awareness to booking and onboard upsell

## Design Direction

The intended aesthetic is modern, premium, light, and energetic.

Core principles:

1. Data first
2. High clarity
3. Spacious light-mode presentation
4. Strong but controlled accent color use
5. Polished enterprise-grade interaction design

### Visual Language

- light, layered backgrounds
- card-based layout throughout
- rounded corners and soft geometry
- restrained glass or frosted treatments where readability remains strong
- vivid accent colors used intentionally rather than as heavy full-surface fills
- subtle motion and fade-in behavior
- clean typography with strong hierarchy

### Brand and Color Direction

The project should draw from the SunWave cruise brand assets in the repository.

Priority accent families:

- electric cyan and aqua
- bright pink and fuchsia
- warm orange and sunburst yellow
- deep ocean blue and violet

Accent colors should be used primarily for:

- active navigation states
- KPI and delta indicators
- progress rings and charts
- badges and status accents
- primary action buttons
- decorative background glows and shell accents

Large saturated blocks should be avoided unless they are deliberate CTAs.

### Typography

Preferred type direction:

- Manrope, Inter, or Plus Jakarta Sans

Hierarchy targets:

- display: 32px to 40px
- section titles: 24px to 28px
- card titles: 16px to 18px
- body: 14px to 16px
- metadata: 12px to 13px

## Layout Architecture

Global layout expectations:

- persistent left navigation on desktop
- collapsible or compact behavior for smaller widths
- main content area centered within consistent gutters
- smooth transitions around navigation state changes

Navigation targets:

- collapsed width: about 72px to 84px
- expanded width: about 280px
- transition timing: about 200ms to 250ms

Sidebar content should include:

- icon-based navigation
- title and short description in expanded mode
- user profile area anchored near the bottom
- clear active and hover states

## Responsive Requirements

- mobile-first implementation
- clean stacking behavior on smaller screens
- readable charts and controls at mobile widths
- no horizontal scrolling in core content areas
- consistent gutters and spacing across breakpoints
- navigation remains usable on both desktop and mobile

The large decorative shell logo may become partially obscured at smaller breakpoints. That is acceptable and intentional.

## Accessibility Requirements

Accessibility is a core requirement.

Minimum expectations:

- semantic HTML structure
- keyboard-accessible interactions
- visible focus states
- descriptive ARIA labels where needed
- chart context communicated beyond color alone
- sufficient contrast for text and status indicators
- touch targets of at least 44x44 where practical
- support for reduced motion preferences
- screen-reader-friendly naming and labels

WCAG 2.1 AA is the minimum target. Stronger contrast and clarity should be preferred when possible.

## Technical Architecture

Recommended and current top-level structure:

```txt
src/
   assets/
      INSPO/
      styles/
   components/
      campaign/
      charts/
      dashboard/
      layout/
      lifecycle/
      shared/
      ui/
   composables/
   data/
   plugins/
   router/
   services/
   types/
   utils/
   views/
   App.vue
   main.ts
```

Important implementation notes:

- local JSON under `src/data` is the source of truth for mocked product behavior
- routing lives under `src/router`
- chart registration is centralized in `src/plugins/chart.ts`
- shell, nav, and app chrome live under `src/components/layout`
- reusable primitive UI components live under `src/components/ui`

## Implementation Priorities

If building or extending the app, recommended priority order is:

1. shell, routing, theme, and layout primitives
2. dashboard information architecture
3. reusable cards, badges, filters, and status patterns
4. chart wiring and mock data integration
5. campaign comparison, insights, and alerts
6. new campaign workflow
7. lifecycle tracker workflow
8. campaign detail drill-down
9. accessibility and responsive QA
10. final visual polish and micro-interaction refinement

## Deliverables

The project reference assumes the app should include:

- a working Vue 3 + TypeScript application
- routed campaign dashboard views
- local mock JSON data
- responsive layout behavior
- accessible interactions and readable visual hierarchy
- polished internal-tool presentation

## Success Criteria

The project is successful if it:

- communicates campaign performance clearly at a glance
- supports realistic internal marketing workflows
- feels premium, modern, and useful
- remains readable and stable across screen sizes
- uses color expressively without harming clarity
- integrates accessibility from the start
- reflects cruise-specific campaign realities rather than generic dashboard content

## Non-Goals

Out of scope unless intentionally added later:

- backend integration
- authentication
- real analytics APIs
- live data refresh
- CMS integration
- user account management
- advanced export or reporting pipelines

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Reference Assets

The repository contains visual inspiration and brand assets that should continue to guide polish decisions:

- `src/assets/INSPO/`
- `src/assets/Cruise_Logo.png`
- `public/Cruise_Favicon.png`

## Document Ownership

This file is the canonical project reference.

Removed and replaced by this file:

- `README.md`
- `PLAN.md`
- `DESIGN.md`
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