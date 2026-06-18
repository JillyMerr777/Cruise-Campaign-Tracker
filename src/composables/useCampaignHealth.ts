import type { CampaignHealth } from '../types/campaign';

export const useCampaignHealth = () => {
  const healthIcon = (health: CampaignHealth): string => {
    if (health === 'Performing Well') return 'mdi-check-decagram';
    if (health === 'Needs Attention') return 'mdi-alert-circle-outline';
    return 'mdi-alert-octagon-outline';
  };

  return { healthIcon };
};
