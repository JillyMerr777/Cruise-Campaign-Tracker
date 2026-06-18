<template>
  <div class="mb-4">
    <h1 class="page-title">Campaign Performance Command Center</h1>
    <p class="page-subtitle">Track cruise marketing outcomes, identify risk, and act quickly across touchpoints.</p>
  </div>

  <FilterBar v-model="filters" />

  <template v-if="featuredCampaign">
    <CampaignSpotlightCard :campaign="featuredCampaign" class="mb-4" />

    <v-alert
      class="mb-3"
      density="comfortable"
      variant="tonal"
      color="info"
      icon="mdi-information-outline"
      text="KPI deltas are week-over-week for the current filtered campaigns unless a KPI tooltip states otherwise."
    />

    <KpiSummaryGrid :items="kpis" class="mb-4" />

    <v-row class="mb-4">
      <v-col cols="12" lg="7"><PerformanceTrendChart :clicks="totals.clicks" :conversions="totals.conversions" /></v-col>
      <v-col cols="12" lg="5"><ChannelMixChart :metrics="filteredChannelMetrics" /></v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" lg="6"><InsightsPanel :insights="insights" /></v-col>
      <v-col cols="12" lg="6"><AlertsPanel :alerts="filteredAlerts" /></v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" lg="6"><BudgetPacingCard :budget="totals.budget" :spend="totals.spend" /></v-col>
      <v-col cols="12" lg="6"><QuickActionsCard /></v-col>
    </v-row>

    <ChannelPerformanceCards :metrics="filteredChannelMetrics" class="mb-4" />
    <CampaignComparisonTable :campaigns="filteredCampaigns" class="mb-4" />
    <PastCampaignHighlights :campaigns="filteredCampaigns" class="mb-4" />
  </template>

  <EmptyState v-else message="No campaigns match your current filters. Clear filters to view the full dashboard." />
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
import EmptyState from '../components/shared/EmptyState.vue';
import FilterBar from '../components/shared/FilterBar.vue';
import { useDashboardMetrics } from '../composables/useDashboardMetrics';
import { dataService } from '../services/dataService';
import type { Campaign } from '../types/campaign';
import { formatCompact, formatCurrency } from '../utils/formatters';

const campaigns = dataService.campaigns as Campaign[];
const channelMetrics = dataService.channelMetrics;
const alerts = dataService.alerts;
const benchmarks = dataService.benchmarks;

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

const filteredCampaignIds = computed(() => new Set(filteredCampaigns.value.map((campaign) => campaign.id)));
const filteredChannelMetrics = computed(() =>
  channelMetrics.filter((metric) => filteredCampaignIds.value.has(metric.campaignId))
);
const filteredAlerts = computed(() => alerts.filter((alert) => filteredCampaignIds.value.has(alert.campaignId)));

const featuredCampaign = computed(() => filteredCampaigns.value.find((campaign) => campaign.featured) ?? filteredCampaigns.value[0] ?? null);
const { totals } = useDashboardMetrics(filteredCampaigns);

const trendTotals = computed(() =>
  filteredCampaigns.value.reduce(
    (acc, campaign) => {
      const orderedTrend = [...(campaign.weeklyTrend ?? [])].sort(
        (a, b) => new Date(a.week).getTime() - new Date(b.week).getTime()
      );

      const latest = orderedTrend.at(-1);
      const previous = orderedTrend.at(-2);

      if (latest) {
        acc.latest.impressions += latest.impressions;
        acc.latest.clicks += latest.clicks;
        acc.latest.conversions += latest.conversions;
        acc.latest.spend += latest.spend;
      }

      if (previous) {
        acc.previous.impressions += previous.impressions;
        acc.previous.clicks += previous.clicks;
        acc.previous.conversions += previous.conversions;
        acc.previous.spend += previous.spend;
      }

      return acc;
    },
    {
      latest: { impressions: 0, clicks: 0, conversions: 0, spend: 0 },
      previous: { impressions: 0, clicks: 0, conversions: 0, spend: 0 }
    }
  )
);

const percentDelta = (latest: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((latest - previous) / previous) * 100;
};

const safeDelta = (value: number): number => (Number.isFinite(value) ? value : 0);

const roiDelta = computed(() => {
  const allAverage = campaigns.length === 0 ? 0 : campaigns.reduce((sum, campaign) => sum + campaign.roi, 0) / campaigns.length;
  const filteredAverage =
    filteredCampaigns.value.length === 0
      ? 0
      : filteredCampaigns.value.reduce((sum, campaign) => sum + campaign.roi, 0) / filteredCampaigns.value.length;
  return safeDelta(percentDelta(filteredAverage, allAverage));
});

const topRoiCampaign = computed(() => {
  if (filteredCampaigns.value.length === 0) return null;
  return filteredCampaigns.value.reduce((best, candidate) => (candidate.roi > best.roi ? candidate : best));
});

const weakestChannelAgainstBenchmark = computed(() => {
  if (filteredChannelMetrics.value.length === 0) return null;

  const byChannel = filteredChannelMetrics.value.reduce<Record<string, { ctrSum: number; count: number }>>((acc, metric) => {
    const current = acc[metric.channel] ?? { ctrSum: 0, count: 0 };
    acc[metric.channel] = { ctrSum: current.ctrSum + metric.ctr, count: current.count + 1 };
    return acc;
  }, {});

  const deltas = Object.entries(byChannel)
    .map(([channel, value]) => {
      const benchmarkCtr = benchmarks.find((item) => item.channel === channel)?.ctr ?? 0;
      const avgCtr = value.ctrSum / Math.max(value.count, 1);
      return { channel, delta: avgCtr - benchmarkCtr };
    })
    .sort((a, b) => a.delta - b.delta);

  return deltas[0] ?? null;
});

const kpis = computed(() => [
  {
    label: 'Impressions',
    value: formatCompact(totals.value.impressions),
    delta: safeDelta(percentDelta(trendTotals.value.latest.impressions, trendTotals.value.previous.impressions)),
    deltaContext: 'Change versus previous week (filtered campaigns).'
  },
  {
    label: 'Clicks',
    value: formatCompact(totals.value.clicks),
    delta: safeDelta(percentDelta(trendTotals.value.latest.clicks, trendTotals.value.previous.clicks)),
    deltaContext: 'Change versus previous week (filtered campaigns).'
  },
  {
    label: 'CTR',
    value: `${(totals.value.clicks / Math.max(totals.value.impressions, 1) * 100).toFixed(2)}%`,
    delta: safeDelta(
      percentDelta(
        (trendTotals.value.latest.clicks / Math.max(trendTotals.value.latest.impressions, 1)) * 100,
        (trendTotals.value.previous.clicks / Math.max(trendTotals.value.previous.impressions, 1)) * 100
      )
    ),
    deltaContext: 'CTR change versus previous week using aggregated trend points.'
  },
  {
    label: 'Conversions',
    value: formatCompact(totals.value.conversions),
    delta: safeDelta(percentDelta(trendTotals.value.latest.conversions, trendTotals.value.previous.conversions)),
    deltaContext: 'Change versus previous week (filtered campaigns).'
  },
  {
    label: 'Spend',
    value: formatCurrency(totals.value.spend),
    delta: safeDelta(percentDelta(trendTotals.value.latest.spend, trendTotals.value.previous.spend)),
    deltaContext: 'Change versus previous week (filtered campaigns).'
  },
  {
    label: 'ROI',
    value: `${(filteredCampaigns.value.length === 0 ? 0 : filteredCampaigns.value.reduce((sum, campaign) => sum + campaign.roi, 0) / filteredCampaigns.value.length).toFixed(2)}x`,
    delta: roiDelta.value,
    deltaContext: 'Delta versus overall campaign ROI baseline in the full dataset.'
  }
]);

const insights = computed(() => {
  if (filteredCampaigns.value.length === 0) {
    return ['No campaigns match the current filters. Clear filters to restore executive summary insights.'];
  }

  const nextInsights: string[] = [];

  if (topRoiCampaign.value) {
    nextInsights.push(
      `${topRoiCampaign.value.name} is currently leading with ${topRoiCampaign.value.roi.toFixed(2)}x ROI in ${topRoiCampaign.value.destination}.`
    );
  }

  if (weakestChannelAgainstBenchmark.value && weakestChannelAgainstBenchmark.value.delta < 0) {
    nextInsights.push(
      `${weakestChannelAgainstBenchmark.value.channel} CTR is ${Math.abs(weakestChannelAgainstBenchmark.value.delta).toFixed(2)}% below benchmark and should be prioritized for creative/targeting optimization.`
    );
  }

  const pace = totals.value.budget === 0 ? 0 : (totals.value.spend / totals.value.budget) * 100;
  if (pace > 80) {
    nextInsights.push(`Budget pacing is at ${pace.toFixed(1)}% of plan, so monitor spend and tighten underperforming channels.`);
  } else {
    nextInsights.push(`Budget pacing is healthy at ${pace.toFixed(1)}%, leaving room to scale high-converting audiences.`);
  }

  if (filteredAlerts.value.length > 0) {
    nextInsights.push(`${filteredAlerts.value.length} active alert${filteredAlerts.value.length > 1 ? 's' : ''} require review in this filtered view.`);
  }

  return nextInsights.slice(0, 4);
});
</script>
