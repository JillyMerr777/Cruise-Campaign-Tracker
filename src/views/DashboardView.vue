<template>
  <div class="mb-4 dashboard-hero-card pa-4 pa-md-5">
    <div class="d-flex justify-space-between align-start flex-wrap ga-3">
      <div>
        <h1 class="page-title">Campaign Performance Command Center</h1>
        <p class="page-subtitle mb-0">Operate with live cruise demand signals, weekly momentum, and high-impact campaign recommendations.</p>
      </div>

      <div class="d-flex ga-2 flex-wrap">
        <v-chip color="primary" variant="tonal" prepend-icon="mdi-ferry">Cruise Marketing Ops</v-chip>
        <v-chip color="info" variant="tonal" prepend-icon="mdi-calendar-week">Weekly Pulse</v-chip>
        <v-chip color="warning" variant="tonal" prepend-icon="mdi-lightning-bolt-outline">Decision Window: 48h</v-chip>
      </div>
    </div>
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
      text="KPI deltas are week-over-week in the current filtered view. Use the Top 3 board to prioritize immediate budget and creative actions."
    />

    <KpiSummaryGrid :items="kpis" class="mb-5" />

    <v-row class="mb-4">
      <v-col cols="12" lg="8"><PerformanceTrendChart :clicks="totals.clicks" :conversions="totals.conversions" /></v-col>
      <v-col cols="12" lg="4">
        <v-card class="h-100">
          <v-card-title class="d-flex align-center ga-2">
            <v-icon color="success" icon="mdi-podium-gold" />
            Top 3 Campaigns
          </v-card-title>
          <v-card-subtitle>Ranked by conversion momentum, ROI, and attributable revenue.</v-card-subtitle>
          <v-card-text>
            <v-list v-if="performanceLeaders.length > 0" class="bg-transparent" lines="two">
              <v-list-item v-for="(campaign, index) in performanceLeaders" :key="campaign.id" class="px-0">
                <template #prepend>
                  <v-avatar size="30" :color="index === 0 ? 'warning' : 'info'" variant="tonal">
                    <span class="text-caption font-weight-bold">{{ index + 1 }}</span>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-semibold">{{ campaign.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ campaign.destination }} | ROI {{ campaign.roi.toFixed(2) }}x | {{ formatCurrency(campaign.revenue ?? 0) }} revenue
                </v-list-item-subtitle>

                <template #append>
                  <v-chip size="small" color="success" variant="tonal" prepend-icon="mdi-trending-up">
                    {{ campaign.conversions }} conv
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
            <EmptyState v-else message="No campaign performance leaders in this filter set." />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" lg="5"><ChannelMixChart :metrics="filteredChannelMetrics" /></v-col>
      <v-col cols="12" lg="7">
        <v-card class="h-100">
          <v-card-title class="d-flex align-center ga-2">
            <v-icon color="primary" icon="mdi-lightbulb-on-outline" />
            Channel Intelligence Highlights
          </v-card-title>
          <v-card-subtitle>Creative and placement signals from your top channels.</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col v-for="item in channelIntelligence" :key="`${item.channel}-${item.placement}`" cols="12" md="6">
                <v-sheet class="pa-3 rounded-lg" color="transparent" border>
                  <div class="text-subtitle-2 font-weight-semibold mb-1">{{ item.channel }}</div>
                  <div class="text-body-2 mb-1">{{ item.topCreative || 'Creative insight pending' }}</div>
                  <div class="text-caption text-medium-emphasis mb-2">Placement: {{ item.placement || 'Mixed placements' }}</div>
                  <div class="d-flex align-center justify-space-between ga-2">
                    <v-chip size="x-small" color="info" variant="tonal">Engagement {{ item.engagementRate.toFixed(2) }}%</v-chip>
                    <v-chip size="x-small" color="success" variant="tonal">Revenue {{ formatCurrency(item.revenue) }}</v-chip>
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
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

const performanceLeaders = computed(() => {
  return [...filteredCampaigns.value]
    .sort((a, b) => {
      const aScore = a.roi * 80 + a.conversions * 2 + (a.revenue ?? 0) / 5000;
      const bScore = b.roi * 80 + b.conversions * 2 + (b.revenue ?? 0) / 5000;
      return bScore - aScore;
    })
    .slice(0, 3);
});

const channelIntelligence = computed(() => {
  return [...filteredChannelMetrics.value]
    .sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0))
    .slice(0, 4)
    .map((metric) => ({
      channel: metric.channel,
      revenue: metric.revenue ?? 0,
      engagementRate: metric.engagementRate ?? 0,
      topCreative: metric.topCreative,
      placement: metric.placement
    }));
});

const kpis = computed(() => [
  {
    label: 'Impressions',
    value: formatCompact(totals.value.impressions),
    delta: safeDelta(percentDelta(trendTotals.value.latest.impressions, trendTotals.value.previous.impressions)),
    deltaContext: 'Change versus previous week (filtered campaigns).',
    icon: 'mdi-image-multiple-outline'
  },
  {
    label: 'Clicks',
    value: formatCompact(totals.value.clicks),
    delta: safeDelta(percentDelta(trendTotals.value.latest.clicks, trendTotals.value.previous.clicks)),
    deltaContext: 'Change versus previous week (filtered campaigns).',
    icon: 'mdi-cursor-default-click-outline'
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
    deltaContext: 'CTR change versus previous week using aggregated trend points.',
    icon: 'mdi-trending-up'
  },
  {
    label: 'Conversions',
    value: formatCompact(totals.value.conversions),
    delta: safeDelta(percentDelta(trendTotals.value.latest.conversions, trendTotals.value.previous.conversions)),
    deltaContext: 'Change versus previous week (filtered campaigns).',
    icon: 'mdi-check-decagram-outline'
  },
  {
    label: 'Spend',
    value: formatCurrency(totals.value.spend),
    delta: safeDelta(percentDelta(trendTotals.value.latest.spend, trendTotals.value.previous.spend)),
    deltaContext: 'Change versus previous week (filtered campaigns).',
    icon: 'mdi-cash-multiple'
  },
  {
    label: 'ROI',
    value: `${(filteredCampaigns.value.length === 0 ? 0 : filteredCampaigns.value.reduce((sum, campaign) => sum + campaign.roi, 0) / filteredCampaigns.value.length).toFixed(2)}x`,
    delta: roiDelta.value,
    deltaContext: 'Delta versus overall campaign ROI baseline in the full dataset.',
    icon: 'mdi-finance'
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
