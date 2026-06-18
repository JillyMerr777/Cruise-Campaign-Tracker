import { computed } from 'vue';
import type { Campaign } from '../types/campaign';

export const useDashboardMetrics = (campaigns: Campaign[]) => {
  const totals = computed(() => ({
    impressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    clicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    conversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    spend: campaigns.reduce((sum, c) => sum + c.spend, 0),
    budget: campaigns.reduce((sum, c) => sum + c.budget, 0)
  }));

  return { totals };
};
