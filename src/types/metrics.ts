export interface ChannelMetric {
  campaignId: string;
  channel: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  spend: number;
  revenue?: number;
  engagementRate?: number;
  topCreative?: string;
  placement?: string;
}
