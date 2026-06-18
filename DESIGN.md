Design Direction: Modern Marketing Intelligence Dashboard
Product Vision
Create a modern, enterprise-grade marketing intelligence platform that immediately lands users on a Dashboard Overview experience. The interface should feel premium, approachable, and highly data-focused while maintaining exceptional clarity and accessibility.
The overall experience should combine the confidence of a business analytics platform with the visual refinement of contemporary SaaS products. The design should feel light, spacious, and sophisticated rather than corporate or sterile.
Built with Vuetify 3, the system should leverage native components whenever possible while applying a custom visual layer that creates a distinctive brand experience.
Core Design Principles
1. Data First
The dashboard is the primary destination and should prioritize:
Immediate visibility into campaign performance
Rapid scanning of critical KPIs
Clear hierarchy of information
Minimal cognitive load
Actionable insights within seconds
Users should be able to understand campaign health without navigating deeper into the application.
2. Modern Glassmorphism
Use a restrained glass-inspired visual system.
Characteristics:
Semi-transparent surfaces
Soft background blurs
Frosted panel treatments
Subtle layered depth
Soft shadows instead of hard elevation
Gentle borders using low-opacity white and gray tones
The effect should feel premium and modern without becoming decorative or reducing readability.
3. Light Mode by Default
The primary theme should be light mode.
Visual characteristics:
Bright neutral backgrounds
Large amounts of white space
Light gray canvas layers
Soft card surfaces
High contrast typography
Strategic use of vibrant accent colors
The interface should never feel dark, heavy, or visually crowded.
4. Vibrant Data Accents
Use bold color strategically against the light interface.
Accent colors should feel:
Electric cyan
Bright aqua
Soft violet
Lavender
Coral highlights
Mint green
These colors should appear primarily in:
Charts
KPI indicators
Progress rings
Status badges
Active navigation states
Hover states
Large blocks of saturated color should be avoided. Color should guide attention.
Layout Architecture
Global Layout
┌──────────────┬──────────────────────────────┐
│              │                              │
│              │                              │
│ Left Nav     │      Main Content Area       │
│              │                              │
│              │                              │
├──────────────┴──────────────────────────────┤
Navigation Width
Collapsed:
72px
Expanded:
280px
Smooth animation:
200–250ms ease transition
Left Navigation System
The navigation should be a permanent vertical sidebar.
Collapsed State
Displays:
Icon only
Tooltips on hover
Compact width
Expanded State
Displays:
Icon
Section title
Brief description beneath title
Example:
📊 Dashboard
Campaign performance overview

📢 Campaigns
Manage and optimize campaigns

📈 Analytics
Performance reporting

🎯 Audiences
Customer segments

⚙ Settings
Platform configuration
Navigation Styling
Frosted glass background
Rounded container
Slight transparency
Active item highlighted with color
Hover states with subtle elevation
Soft glowing accent on active item
User Profile Area
Positioned at the bottom of the sidebar.
Contains:
Circular avatar
Marketing team member name
Role title
Sign Out action
Example:
[Avatar]

Alex Morgan
Senior Marketing Analyst

↳ Sign Out
Styling:
Compact card
Frosted glass treatment
Small role text
Sign out icon and label
Dashboard Landing Experience
The Dashboard tab should act as a command center.
Upon load, users should immediately see:
KPI Summary Row
Large metric cards showing:
Total Campaign Spend
Revenue Generated
Impressions
Engagement Rate
Conversion Rate
ROAS
Each card includes:
Icon
Current value
Trend indicator
Percentage change
Positive/negative status color
Cards should feel elevated and interactive.
Top Campaign Performance
Prominent section displaying:
Top 3 Campaigns
Each campaign card includes:
Campaign name
Status
Budget utilization
Impressions
CTR
Conversions
Revenue generated
Performance score
Include visual ranking indicators.
Campaign Health Visualization
Large central chart area.
Potential visualizations:
Spend vs Revenue
Conversion trends
Campaign growth over time
Multi-series performance chart
Use smooth curved lines and high-quality chart styling.
Audience Insights
Card section containing:
Audience breakdown
Device usage
Geographic performance
Demographic distribution
Use:
Donut charts
Ring charts
Radial charts
Channel Performance
Comparative view of:
Google Ads
Meta
LinkedIn
YouTube
Email
Organic Search
Use:
Horizontal bar charts
Performance ranking cards
Creative Performance
Show:
Top performing creatives
Engagement scores
Conversion impact
Resonance metrics
Visualized using:
Circular score indicators
Progress bars
Small trend charts
Visual Style Language
Shapes
Favor:
Rounded corners (16–24px)
Pill buttons
Circular data indicators
Soft geometric forms
Avoid:
Sharp corners
Harsh rectangles
Heavy borders
Cards
Every major section should exist inside a card.
Card characteristics:
18–24px radius
Frosted surface
Subtle shadow
Soft border
Layered appearance
Cards should appear to float above the page background.
Background System
Use layered backgrounds:
Layer 1
Very light gray canvas
Layer 2
Large blurred color gradients
Examples:
Cyan glow
Violet glow
Aqua glow
Layer 3
Glass cards floating above
The result should create depth without visual noise.
Typography
Use modern sans-serif typography.
Recommended:
Inter
Plus Jakarta Sans
Manrope
Hierarchy:
Display
32–40px
Section Titles
24–28px
Card Titles
16–18px
Body
14–16px
Metadata
12–13px
Typography should remain clean, readable, and highly accessible.
Accessibility Requirements
The application must meet WCAG 2.1 AA standards.
Requirements:
Contrast
Minimum AA contrast ratios
Never rely solely on color
Keyboard Navigation
Full keyboard accessibility
Logical focus order
Visible focus states
Screen Readers
Semantic HTML
Proper ARIA labels
Descriptive chart labels
Motion
Respect reduced motion preferences
Non-essential animations optional
Touch Targets
Minimum 44×44px interaction areas
Vuetify 3 Component Recommendations
Navigation
v-navigation-drawer
v-list
v-list-item
v-avatar
v-tooltip
Layout
v-container
v-row
v-col
v-sheet
Dashboard Cards
v-card
v-chip
v-progress-linear
v-progress-circular
Inputs
v-select
v-text-field
v-btn
v-menu
Data
v-table
v-data-table
Feedback
v-alert
v-snackbar
Desired Emotional Response
The interface should feel:
Intelligent
Premium
Modern
Trustworthy
Data-driven
Fast
Spacious
Refined
Users should feel like they are operating a sophisticated marketing intelligence platform rather than viewing a traditional reporting dashboard. The experience should balance executive-level clarity with modern SaaS visual polish.