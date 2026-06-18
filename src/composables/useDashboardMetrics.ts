import { computed } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { Campaign } from '../types/campaign';

type CampaignSource = Campaign[] | Ref<Campaign[]> | ComputedRef<Campaign[]>;

const resolveCampaigns = (campaigns: CampaignSource): Campaign[] =>
  Array.isArray(campaigns) ? campaigns : campaigns.value;

export const useDashboardMetrics = (campaigns: CampaignSource) => {
  const totals = computed(() => ({
    impressions: resolveCampaigns(campaigns).reduce((sum, c) => sum + c.impressions, 0),
    clicks: resolveCampaigns(campaigns).reduce((sum, c) => sum + c.clicks, 0),
    conversions: resolveCampaigns(campaigns).reduce((sum, c) => sum + c.conversions, 0),
    spend: resolveCampaigns(campaigns).reduce((sum, c) => sum + c.spend, 0),
    budget: resolveCampaigns(campaigns).reduce((sum, c) => sum + c.budget, 0)
  }));

  return { totals };
};
