<template>
  <CampaignDetailsHeader :campaign="campaign" />

  <CampaignMetricsGrid class="mb-4" :metrics="metricCards" />

  <div class="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
    <div class="lg:col-span-8">
      <PerformanceTrendChart :clicks="campaign.clicks" :conversions="campaign.conversions" />
    </div>
    <div class="lg:col-span-4">
      <BudgetSpendChart :budget="campaign.budget" :spend="campaign.spend" />
    </div>
  </div>

  <div class="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
    <BenchmarkComparisonCard :rows="benchmarkRows" />
    <ChannelMetricsTabs :metrics="channelMetrics" />
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <CreativePerformanceCard />
    <ActivityFeed :items="activityFeed" />
    <div class="lg:col-span-2">
      <NotesPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ActivityFeed from '../components/campaign/ActivityFeed.vue';
import BenchmarkComparisonCard from '../components/campaign/BenchmarkComparisonCard.vue';
import CampaignDetailsHeader from '../components/campaign/CampaignDetailsHeader.vue';
import CampaignMetricsGrid from '../components/campaign/CampaignMetricsGrid.vue';
import ChannelMetricsTabs from '../components/campaign/ChannelMetricsTabs.vue';
import CreativePerformanceCard from '../components/campaign/CreativePerformanceCard.vue';
import NotesPanel from '../components/campaign/NotesPanel.vue';
import BudgetSpendChart from '../components/charts/BudgetSpendChart.vue';
import PerformanceTrendChart from '../components/charts/PerformanceTrendChart.vue';
import { useBenchmarks } from '../composables/useBenchmarks';
import { dataService } from '../services/dataService';
import { formatCompact, formatCurrency } from '../utils/formatters';

const route = useRoute();
const campaignId = computed(() => route.params.id as string);

const campaign = computed(() => dataService.campaigns.find((item) => item.id === campaignId.value) ?? dataService.campaigns[0]);
const channelMetrics = computed(() => dataService.channelMetrics.filter((metric) => metric.campaignId === campaign.value.id));
const activityFeed = computed(() => dataService.activityFeed.filter((item) => item.campaignId === campaign.value.id));

const benchmarkRows = computed(() => useBenchmarks(dataService.benchmarks, channelMetrics.value).comparison.value);

const metricCards = computed(() => [
  { label: 'Impressions', value: formatCompact(campaign.value.impressions) },
  { label: 'Clicks', value: formatCompact(campaign.value.clicks) },
  { label: 'Conversions', value: formatCompact(campaign.value.conversions) },
  { label: 'Budget', value: formatCurrency(campaign.value.budget) },
  { label: 'Spend', value: formatCurrency(campaign.value.spend) },
  { label: 'CTR', value: `${campaign.value.ctr}%` },
  { label: 'ROI', value: `${campaign.value.roi}x` },
  { label: 'Destination', value: campaign.value.destination }
]);
</script>
