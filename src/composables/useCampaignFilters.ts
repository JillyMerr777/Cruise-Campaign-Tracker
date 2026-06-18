import { computed, ref } from 'vue';
import type { Campaign } from '../types/campaign';

export const useCampaignFilters = (source: Campaign[]) => {
  const channel = ref('All');
  const status = ref('All');
  const destination = ref('All');

  const filteredCampaigns = computed(() =>
    source.filter((campaign) => {
      const channelMatch = channel.value === 'All' || campaign.channels.includes(channel.value);
      const statusMatch = status.value === 'All' || campaign.status === status.value;
      const destinationMatch = destination.value === 'All' || campaign.destination === destination.value;
      return channelMatch && statusMatch && destinationMatch;
    })
  );

  return { channel, status, destination, filteredCampaigns };
};
