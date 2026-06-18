Use the existing project scaffold in this repository and implement the dashboard as a single-page Vue 3 + TypeScript app with Vuetify and Chart.js.
Recommended Implementation Steps

Set up or confirm project scaffold
Install/configure Vuetify 3
Install/configure Material Design Icons
Install/configure Chart.js + vue-chartjs
Establish app layout and routing structure
Create theme tokens, spacing rules, and responsive container behavior
Create reusable dashboard UI components
Create local JSON data files with realistic mock data
Implement dashboard homepage
Implement create-new-campaign page
Implement campaign lifecycle tracker page
Implement campaign detail route
Add filtering and benchmark context
Add alerts, activity feed, and health logic
Apply responsive behavior across breakpoints
Add accessibility improvements and keyboard support
Refine visual polish, spacing, animation, and hierarchy
QA for responsiveness, accessibility, and design consistency


Motion / Interaction Guidance
Motion should be subtle and purposeful.
Required Motion Direction

Page content should fade in quickly on scroll
Hover and focus states should feel polished
State changes should be smooth but not distracting
Avoid heavy animation that slows down executive scanning


Success Criteria
The project is successful if it demonstrates the following:
Product / UX Success

Clearly communicates campaign performance at a glance
Supports realistic marketing-team workflows
Feels useful and intuitive for internal users
Shows strong information hierarchy and executive readability
Supports action-taking, not just reporting

Visual / Design Success

Clean, modern, high-polish design
Strong and consistent spacing using an 8px grid
Effective use of neon / bright color accents without sacrificing readability
Consistent gutters, card structure, and layout rhythm
Clear inspiration from the INSPO folder while remaining cohesive and original

Technical Success

Built with Vue 3 + TypeScript
Uses Vuetify 3 properly for layout/components
Uses Chart.js + vue-chartjs for data visualizations
Uses local JSON data only
Functions as a single-page application
Includes the requested routed views / app sections

Responsive Success

Mobile-first implementation
Clean stacking behavior on small screens
Readable and balanced at all sizes

Accessibility Success

Keyboard-accessible controls
Readable text and spacing
Meaning conveyed through labels/icons, not only color
Contrast considered carefully, especially in dark mode
Accessibility integrated into the design from the start


Non-Goals
The following are out of scope unless time allows:

Backend integration
Authentication
Real analytics APIs
User account management
Live data refresh
CMS integration
Advanced export/report generation


Deliverables
The project should include:

A working Vue 3 + TypeScript application
Vuetify-based UI implementation
Local JSON mock data files
Dashboard landing page
New campaign page
Campaign lifecycle tracker page
Campaign detail page
Responsive styling
Accessibility considerations
Polished visual design aligned to the brief


Final Creative Summary
This project should feel like a high-end internal campaign intelligence dashboard for a cruise line marketing team — one that combines strong UI craft, realistic business context, polished data visualization, and thoughtful UX. It should be modern, responsive, accessible, and visually distinctive, while still remaining clean, useful, and easy to scan.
The end result should communicate that this is not just a visually attractive dashboard, but a practical internal tool that helps marketing teams monitor, manage, and improve campaigns across the full campaign lifecycle.

---

# Recommended Vue App Structure

This structure is designed to support the exact brief above with **clear separation of views, reusable components, local JSON data, and shared utilities**.

```txt
src/
├─ assets/
│  ├─ styles/
│  │  ├─ main.scss
│  │  ├─ variables.scss
│  │  ├─ utilities.scss
│  │  └─ animations.scss
│  └─ images/
│     └─ placeholders/
│
├─ components/
│  ├─ layout/
│  │  ├─ AppShell.vue
│  │  ├─ AppTopBar.vue
│  │  ├─ AppNavDrawer.vue
│  │  └─ PageContainer.vue
│  │
│  ├─ dashboard/
│  │  ├─ CampaignSpotlightCard.vue
│  │  ├─ KpiSummaryGrid.vue
│  │  ├─ KpiCard.vue
│  │  ├─ InsightsPanel.vue
│  │  ├─ AlertsPanel.vue
│  │  ├─ ChannelPerformanceCards.vue
│  │  ├─ CampaignComparisonTable.vue
│  │  ├─ BudgetPacingCard.vue
│  │  ├─ PastCampaignHighlights.vue
│  │  ├─ QuickActionsCard.vue
│  │  └─ HealthStatusBadge.vue
│  │
│  ├─ charts/
│  │  ├─ PerformanceTrendChart.vue
│  │  ├─ ChannelMixChart.vue
│  │  ├─ BudgetSpendChart.vue
│  │  ├─ CampaignRoiChart.vue
│  │  └─ FunnelChartCard.vue
│  │
│  ├─ campaign/
│  │  ├─ CampaignForm.vue
│  │  ├─ CampaignDetailsHeader.vue
│  │  ├─ CampaignMetricsGrid.vue
│  │  ├─ CreativePerformanceCard.vue
│  │  ├─ ActivityFeed.vue
│  │  ├─ NotesPanel.vue
│  │  ├─ ChannelMetricsTabs.vue
│  │  └─ BenchmarkComparisonCard.vue
│  │
│  ├─ lifecycle/
│  │  ├─ LifecycleStepper.vue
│  │  ├─ LifecycleStageCard.vue
│  │  ├─ DeliverablesChecklist.vue
│  │  ├─ MilestonesTimeline.vue
│  │  └─ BlockersPanel.vue
│  │
│  ├─ shared/
│  │  ├─ SectionHeader.vue
│  │  ├─ FilterBar.vue
│  │  ├─ EmptyState.vue
│  │  ├─ LoadingSkeleton.vue
│  │  ├─ StatusChip.vue
│  │  ├─ MetricDelta.vue
│  │  ├─ IconLabel.vue
│  │  └─ AccessibleChartSummary.vue
│
├─ composables/
│  ├─ useCampaignFilters.ts
│  ├─ useDashboardMetrics.ts
│  ├─ useBenchmarks.ts
│  ├─ useCampaignHealth.ts
│  └─ useResponsiveLayout.ts
│
├─ data/
│  ├─ campaigns.json
│  ├─ channel-metrics.json
│  ├─ benchmarks.json
│  ├─ alerts.json
│  ├─ lifecycle.json
│  ├─ activity-feed.json
│  └─ users.json
│
├─ router/
│  └─ index.ts
│
├─ services/
│  └─ dataService.ts
│
├─ types/
│  ├─ campaign.ts
│  ├─ metrics.ts
│  ├─ alerts.ts
│  ├─ lifecycle.ts
│  └─ benchmark.ts
│
├─ utils/
│  ├─ formatters.ts
│  ├─ chartHelpers.ts
│  ├─ accessibility.ts
│  └─ constants.ts
│
├─ views/
│  ├─ DashboardView.vue
│  ├─ NewCampaignView.vue
│  ├─ LifecycleTrackerView.vue
│  └─ CampaignDetailView.vue
│
├─ plugins/
│  ├─ vuetify.ts
│  └─ chart.ts
│
├─ App.vue
└─ main.ts


Recommended Route Map
Use Vue Router so this still behaves like a single-page application but supports multiple internal views.
TypeScript/  -> DashboardView/campaigns/new  -> NewCampaignView/campaigns/:id  -> CampaignDetailView/lifecycle  -> LifecycleTrackerViewShow more lines

Exact Component Responsibilities
These are the most useful components to build first.
High Priority Components
CampaignSpotlightCard.vue
Shows the featured active campaign:

campaign name
objective
primary metrics
status
destination
quick action buttons

KpiSummaryGrid.vue
A responsive grid of KPI cards for:

impressions
clicks
CTR
conversions
spend
ROI

InsightsPanel.vue
Displays short recommendation-style insights such as:

“Instagram CTR is up week over week”
“Email open rate below benchmark”
“This campaign may need creative refresh”

AlertsPanel.vue
Shows warnings or attention items:

over budget
delayed launch
low engagement
QA issue
underperforming channel

FilterBar.vue
Should support:

channel
status
date range
audience segment
destination
offer type

CampaignComparisonTable.vue
A sortable comparison table for:

campaign name
status
budget
spend
CTR
conversions
ROI
health

PerformanceTrendChart.vue
Chart.js line or bar chart for:

clicks over time
CTR over time
conversions over time
spend over time

CampaignForm.vue
Used in the New Campaign page:

campaign name
objective
target segment
destination
channel mix
start/end date
budget
owner
notes

LifecycleStepper.vue
Visual campaign lifecycle:

briefing
planning
copy
design
approval
launch
QA
monitor
optimize
complete

ActivityFeed.vue
Mock internal updates:

“Copy approved”
“Creative uploaded”
“Launch delayed due to QA”
“Optimization added to email CTA”


Suggested View Composition
DashboardView.vue
Suggested structure:
Plain TextDashboardView├─ Page Header├─ FilterBar├─ CampaignSpotlightCard├─ KpiSummaryGrid├─ InsightsPanel + AlertsPanel├─ PerformanceTrendChart├─ ChannelMixChart├─ BudgetPacingCard├─ CampaignComparisonTable├─ PastCampaignHighlights└─ QuickActionsCardShow more lines
NewCampaignView.vue
Suggested structure:
Plain TextNewCampaignView├─ Page Header├─ CampaignForm├─ Optional Campaign Preview Summary└─ Save / Cancel ActionsShow more lines
LifecycleTrackerView.vue
Suggested structure:
Plain TextLifecycleTrackerView├─ Page Header├─ FilterBar├─ LifecycleStepper├─ LifecycleStageCard(s)├─ DeliverablesChecklist├─ MilestonesTimeline└─ BlockersPanelShow more lines
CampaignDetailView.vue
Suggested structure:
Plain TextCampaignDetailView├─ CampaignDetailsHeader├─ CampaignMetricsGrid├─ BenchmarkComparisonCard├─ PerformanceTrendChart├─ ChannelMetricsTabs├─ CreativePerformanceCard├─ ActivityFeed├─ NotesPanel└─ Quick ActionsShow more lines

Recommended Local JSON Shape
Here’s a practical structure for your fake data.
campaigns.json
JSON[  {    "id": "camp-001",    "name": "Summer Caribbean Getaway",    "objective": "Drive bookings for late-summer sailings",    "status": "Active",    "health": "Performing Well",    "owner": "Ava Martinez",    "segment": "Families",    "destination": "Caribbean",    "offerType": "Onboard Credit",    "channels": ["Instagram", "Email", "Website", "Mobile App"],    "startDate": "2026-07-01",    "endDate": "2026-08-15",    "budget": 120000,    "spend": 84500,    "impressions": 2200000,    "clicks": 68400,    "ctr": 3.11,    "conversions": 2450,    "conversionRate": 3.58,    "roi": 4.2,    "featured": true  }]Show more lines
channel-metrics.json
JSON[  {    "campaignId": "camp-001",    "channel": "Instagram",    "impressions": 950000,    "clicks": 29100,    "ctr": 3.06,    "conversions": 740,    "spend": 32000  }]Show more lines
benchmarks.json
JSON[  {    "channel": "Email",    "openRate": 28.5,    "clickRate": 3.7,    "ctr": 2.9,    "conversionRate": 2.4  }]Show more lines
alerts.json
JSON[  {    "id": "alert-001",    "campaignId": "camp-002",    "type": "warning",    "title": "Budget pacing ahead of plan",    "message": "Spend is 82% consumed with 40% of campaign duration remaining."  }]Show more lines
lifecycle.json
JSON[  {    "campaignId": "camp-001",    "stages": [      { "name": "Briefing", "status": "Complete" },      { "name": "Planning", "status": "Complete" },      { "name": "Copywriting", "status": "Complete" },      { "name": "Design", "status": "Complete" },      { "name": "Approval", "status": "Complete" },      { "name": "Launch", "status": "Complete" },      { "name": "QA / Testing", "status": "Complete" },      { "name": "Monitoring", "status": "In Progress" },      { "name": "Optimization", "status": "Pending" },      { "name": "Archived", "status": "Pending" }    ]  }]Show more lines

Build Order I’d Recommend
If you want to move fast without overbuilding, do this in order:

Set up Vuetify + router + theme
Create AppShell + top nav
Build DashboardView layout
Add KPI cards + charts
Create local JSON and wire data
Add filter bar
Build campaign comparison table
Add insights + alerts
Build New Campaign view
Build Lifecycle Tracker view
Build Campaign Detail view
Polish accessibility, spacing, animation, and responsiveness


My Recommendation on “Must-Have” Extra Features
If you need to narrow scope, the best extra features to keep are:

Benchmark comparison
Alerts panel
Campaign health status
Budget pacing
Lifecycle tracker
Activity feed
Destination + audience segmentation
Offer type tracking

Those features make this feel the most like a real internal cruise marketing tool, not just a dashboard mockup. Cross-channel comparison, email-specific reporting, and a planning/execution/reporting lifecycle are especially aligned with how common marketing campaign tools are structured. [coupler.io], [knowledge....ubspot.com], [help.asana.com]