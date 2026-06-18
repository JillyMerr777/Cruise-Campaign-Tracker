export type CampaignStatus = 'Active' | 'Paused' | 'Completed' | 'Archived';
export type CampaignHealth = 'Performing Well' | 'Needs Attention' | 'Underperforming';

export interface CampaignTrendPoint {
  week: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  status: CampaignStatus;
  health: CampaignHealth;
  owner: string;
  segment: string;
  destination: string;
  offerType: string;
  channels: string[];
  startDate: string;
  endDate: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
  roi: number;
  featured?: boolean;
  weeklyTrend?: CampaignTrendPoint[];
}
