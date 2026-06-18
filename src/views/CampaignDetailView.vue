<template>
  <CampaignDetailsHeader :campaign="campaign" />

  <CampaignMetricsGrid class="mb-4" :metrics="metricCards" />

  <v-row class="mb-4">
    <v-col cols="12" lg="8"><PerformanceTrendChart :clicks="campaign.clicks" :conversions="campaign.conversions" /></v-col>
    <v-col cols="12" lg="4"><BudgetSpendChart :budget="campaign.budget" :spend="campaign.spend" /></v-col>
  </v-row>

  <v-row class="mb-4">
    <v-col cols="12" lg="6"><BenchmarkComparisonCard :rows="benchmarkRows" /></v-col>
    <v-col cols="12" lg="6"><ChannelMetricsTabs :metrics="channelMetrics" /></v-col>
  </v-row>

  <v-row>
    <v-col cols="12" lg="6"><CreativePerformanceCard /></v-col>
    <v-col cols="12" lg="6"><ActivityFeed :items="activityFeed" /></v-col>
    <v-col cols="12"><NotesPanel /></v-col>
  </v-row>
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
