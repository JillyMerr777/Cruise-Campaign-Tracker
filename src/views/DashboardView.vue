<template>
  <div class="mb-4">
    <h1 class="page-title">Campaign Performance Command Center</h1>
    <p class="page-subtitle">Track cruise marketing outcomes, identify risk, and act quickly across touchpoints.</p>
  </div>

  <FilterBar v-model="filters" />

  <CampaignSpotlightCard :campaign="featuredCampaign" class="mb-4" />

  <KpiSummaryGrid :items="kpis" class="mb-4" />

  <v-row class="mb-4">
    <v-col cols="12" lg="7"><PerformanceTrendChart :clicks="totals.clicks" :conversions="totals.conversions" /></v-col>
    <v-col cols="12" lg="5"><ChannelMixChart :metrics="channelMetrics" /></v-col>
  </v-row>

  <v-row class="mb-4">
    <v-col cols="12" lg="6"><InsightsPanel :insights="insights" /></v-col>
    <v-col cols="12" lg="6"><AlertsPanel :alerts="alerts" /></v-col>
  </v-row>

  <v-row class="mb-4">
    <v-col cols="12" lg="6"><BudgetPacingCard :budget="totals.budget" :spend="totals.spend" /></v-col>
    <v-col cols="12" lg="6"><QuickActionsCard /></v-col>
  </v-row>

  <ChannelPerformanceCards :metrics="channelMetrics" class="mb-4" />
  <CampaignComparisonTable :campaigns="filteredCampaigns" class="mb-4" />
  <PastCampaignHighlights :campaigns="campaigns" class="mb-4" />
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import AlertsPanel from '../components/dashboard/AlertsPanel.vue';
import BudgetPacingCard from '../components/dashboard/BudgetPacingCard.vue';
import CampaignComparisonTable from '../components/dashboard/CampaignComparisonTable.vue';
import CampaignSpotlightCard from '../components/dashboard/CampaignSpotlightCard.vue';
import ChannelPerformanceCards from '../components/dashboard/ChannelPerformanceCards.vue';
import InsightsPanel from '../components/dashboard/InsightsPanel.vue';
import KpiSummaryGrid from '../components/dashboard/KpiSummaryGrid.vue';
import PastCampaignHighlights from '../components/dashboard/PastCampaignHighlights.vue';
import QuickActionsCard from '../components/dashboard/QuickActionsCard.vue';
import ChannelMixChart from '../components/charts/ChannelMixChart.vue';
import PerformanceTrendChart from '../components/charts/PerformanceTrendChart.vue';
import FilterBar from '../components/shared/FilterBar.vue';
import { useDashboardMetrics } from '../composables/useDashboardMetrics';
import { dataService } from '../services/dataService';
import type { Campaign } from '../types/campaign';
import { formatCompact, formatCurrency } from '../utils/formatters';

const campaigns = dataService.campaigns as Campaign[];
const channelMetrics = dataService.channelMetrics;
const alerts = dataService.alerts;

const filters = reactive({ channel: 'All', status: 'All', destination: 'All', segment: '' });

const filteredCampaigns = computed(() =>
  campaigns.filter((campaign) => {
    const channelMatch = filters.channel === 'All' || campaign.channels.includes(filters.channel);
    const statusMatch = filters.status === 'All' || campaign.status === filters.status;
    const destinationMatch = filters.destination === 'All' || campaign.destination === filters.destination;
    const segmentMatch = !filters.segment || campaign.segment.toLowerCase().includes(filters.segment.toLowerCase());
    return channelMatch && statusMatch && destinationMatch && segmentMatch;
  })
);

const featuredCampaign = computed(() => filteredCampaigns.value.find((campaign) => campaign.featured) ?? filteredCampaigns.value[0]);
const { totals } = useDashboardMetrics(filteredCampaigns.value);

const kpis = computed(() => [
  { label: 'Impressions', value: formatCompact(totals.value.impressions), delta: 8.4 },
  { label: 'Clicks', value: formatCompact(totals.value.clicks), delta: 6.9 },
  { label: 'CTR', value: `${(totals.value.clicks / Math.max(totals.value.impressions, 1) * 100).toFixed(2)}%`, delta: 2.1 },
  { label: 'Conversions', value: formatCompact(totals.value.conversions), delta: 4.8 },
  { label: 'Spend', value: formatCurrency(totals.value.spend), delta: -1.7 },
  { label: 'ROI', value: '4.0x', delta: 5.5 }
]);

const insights = [
  'Instagram CTR is up week over week for family segments.',
  'Email conversion rate is below benchmark in luxury traveler cohort.',
  'Weekend Flash Fare can be repurposed for Bahamas shoulder season.'
];
</script>
