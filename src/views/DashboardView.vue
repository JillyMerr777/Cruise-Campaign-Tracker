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
          <v-card-subtitle>Ranked by performance score, budget efficiency, and revenue impact.</v-card-subtitle>
          <v-card-text>
            <v-row v-if="performanceLeaders.length > 0" dense>
              <v-col v-for="(campaign, index) in performanceLeaders" :key="campaign.id" cols="12">
                <v-sheet class="pa-3 rounded-lg" color="transparent" border>
                  <div class="d-flex justify-space-between align-center mb-2">
                    <div class="d-flex align-center ga-2">
                      <v-avatar size="28" :color="index === 0 ? 'warning' : 'info'" variant="tonal">
                        <span class="text-caption font-weight-bold">{{ index + 1 }}</span>
                      </v-avatar>
                      <div>
                        <div class="text-subtitle-2 font-weight-semibold">{{ campaign.name }}</div>
                        <div class="text-caption text-medium-emphasis">{{ campaign.status }} | {{ campaign.destination }}</div>
                      </div>
                    </div>
                    <v-chip size="x-small" color="success" variant="tonal">Score {{ campaign.performanceScore }}</v-chip>
                  </div>

                  <div class="d-flex justify-space-between text-caption mb-1">
                    <span>Budget Utilization</span>
                    <span>{{ campaign.budgetUtilization.toFixed(1) }}%</span>
                  </div>
                  <v-progress-linear :model-value="campaign.budgetUtilization" color="primary" rounded height="8" class="mb-2" />

                  <div class="d-flex flex-wrap ga-2">
                    <v-chip size="x-small" color="info" variant="tonal">{{ formatCompact(campaign.impressions) }} impressions</v-chip>
                    <v-chip size="x-small" color="info" variant="tonal">CTR {{ campaign.ctr.toFixed(2) }}%</v-chip>
                    <v-chip size="x-small" color="success" variant="tonal">{{ campaign.conversions }} conversions</v-chip>
                    <v-chip size="x-small" color="secondary" variant="tonal">{{ formatCurrency(campaign.revenue) }} revenue</v-chip>
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
            <EmptyState v-else message="No campaign performance leaders in this filter set." />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" lg="5">
        <v-card class="h-100">
          <v-card-title class="d-flex align-center ga-2">
            <v-icon color="secondary" icon="mdi-account-group-outline" />
            Audience Insights
          </v-card-title>
          <v-card-subtitle>Segment, device, and geography breakdown for active campaigns.</v-card-subtitle>
          <v-card-text>
            <div class="text-caption text-medium-emphasis mb-2">Top Audience Segments</div>
            <div class="d-flex flex-wrap ga-2 mb-3">
              <v-chip v-for="item in audienceSegments" :key="item.label" size="small" color="secondary" variant="tonal">
                {{ item.label }} {{ item.share }}%
              </v-chip>
            </div>

            <div class="text-caption text-medium-emphasis mb-2">Device Usage</div>
            <div class="d-flex ga-3 mb-3 flex-wrap">
              <div v-for="device in deviceMix" :key="device.label" class="text-center">
                <v-progress-circular :model-value="device.share" size="56" width="6" color="info">
                  <span class="text-caption">{{ device.share }}%</span>
                </v-progress-circular>
                <div class="text-caption mt-1">{{ device.label }}</div>
              </div>
            </div>

            <div class="text-caption text-medium-emphasis mb-2">Demographic Distribution</div>
            <div class="d-flex flex-wrap ga-2 mb-3">
              <v-chip v-for="item in demographicMix" :key="item.label" size="small" color="primary" variant="tonal">
                {{ item.label }} {{ item.share }}%
              </v-chip>
            </div>

            <div class="text-caption text-medium-emphasis mt-3 mb-2">Geographic Performance</div>
            <v-list density="compact" class="bg-transparent py-0">
              <v-list-item v-for="geo in audienceGeography" :key="geo.label" class="px-0" :title="geo.label">
                <template #append>
                  <v-chip size="x-small" color="primary" variant="tonal">{{ geo.share }}%</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

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
      <v-col cols="12" lg="7"><ChannelPerformanceCards :metrics="filteredChannelMetrics" /></v-col>
      <v-col cols="12" lg="5"><CreativePerformanceCard /></v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" lg="6"><InsightsPanel :insights="insights" /></v-col>
      <v-col cols="12" lg="6"><AlertsPanel :alerts="filteredAlerts" /></v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" lg="6"><BudgetPacingCard :budget="totals.budget" :spend="totals.spend" /></v-col>
      <v-col cols="12" lg="6"><QuickActionsCard /></v-col>
    </v-row>

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
import CreativePerformanceCard from '../components/campaign/CreativePerformanceCard.vue';
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

const campaignRevenue = (campaign: Campaign): number => campaign.revenue ?? campaign.spend * campaign.roi;

const totalRevenue = computed(() => filteredCampaigns.value.reduce((sum, campaign) => sum + campaignRevenue(campaign), 0));
const allRevenue = computed(() => campaigns.reduce((sum, campaign) => sum + campaignRevenue(campaign), 0));

const weightedEngagement = (metrics: typeof channelMetrics): number => {
  const totalImpressions = metrics.reduce((sum, metric) => sum + metric.impressions, 0);
  if (totalImpressions === 0) return 0;

  return (
    metrics.reduce((sum, metric) => {
      const rate = metric.engagementRate ?? 0;
      return sum + rate * metric.impressions;
    }, 0) / totalImpressions
  );
};

const filteredEngagementRate = computed(() => weightedEngagement(filteredChannelMetrics.value));
const allEngagementRate = computed(() => weightedEngagement(channelMetrics));

const filteredConversionRate = computed(() => {
  if (totals.value.clicks === 0) return 0;
  return (totals.value.conversions / totals.value.clicks) * 100;
});

const previousConversionRate = computed(() => {
  if (trendTotals.value.previous.clicks === 0) return 0;
  return (trendTotals.value.previous.conversions / trendTotals.value.previous.clicks) * 100;
});

const filteredRoas = computed(() => {
  if (totals.value.spend === 0) return 0;
  return totalRevenue.value / totals.value.spend;
});

const allRoas = computed(() => {
  const overallSpend = campaigns.reduce((sum, campaign) => sum + campaign.spend, 0);
  if (overallSpend === 0) return 0;
  return allRevenue.value / overallSpend;
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
      const aScore = a.roi * 45 + a.conversions * 0.4 + campaignRevenue(a) / 10000;
      const bScore = b.roi * 45 + b.conversions * 0.4 + campaignRevenue(b) / 10000;
      return bScore - aScore;
    })
    .slice(0, 3)
    .map((campaign) => {
      const budgetUtilization = campaign.budget === 0 ? 0 : (campaign.spend / campaign.budget) * 100;
      const performanceScore = Math.round(campaign.roi * 30 + campaign.ctr * 12 + campaign.conversions / 8);

      return {
        ...campaign,
        revenue: campaignRevenue(campaign),
        budgetUtilization: Math.min(100, Math.max(0, budgetUtilization)),
        performanceScore
      };
    });
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
    label: 'Total Campaign Spend',
    value: formatCurrency(totals.value.spend),
    delta: safeDelta(percentDelta(trendTotals.value.latest.spend, trendTotals.value.previous.spend)),
    deltaContext: 'Spend change versus previous week (filtered campaigns).',
    icon: 'mdi-cash-multiple'
  },
  {
    label: 'Revenue Generated',
    value: formatCurrency(totalRevenue.value),
    delta: safeDelta(percentDelta(totalRevenue.value, allRevenue.value === 0 ? totalRevenue.value : allRevenue.value)),
    deltaContext: 'Relative revenue versus overall dataset baseline.',
    icon: 'mdi-bank-outline'
  },
  {
    label: 'Impressions',
    value: formatCompact(totals.value.impressions),
    delta: safeDelta(percentDelta(trendTotals.value.latest.impressions, trendTotals.value.previous.impressions)),
    deltaContext: 'Impressions change versus previous week (filtered campaigns).',
    icon: 'mdi-image-multiple-outline'
  },
  {
    label: 'Engagement Rate',
    value: `${filteredEngagementRate.value.toFixed(2)}%`,
    delta: safeDelta(percentDelta(filteredEngagementRate.value, allEngagementRate.value === 0 ? filteredEngagementRate.value : allEngagementRate.value)),
    deltaContext: 'Weighted engagement rate relative to overall channel baseline.',
    icon: 'mdi-heart-pulse'
  },
  {
    label: 'Conversion Rate',
    value: `${filteredConversionRate.value.toFixed(2)}%`,
    delta: safeDelta(percentDelta(filteredConversionRate.value, previousConversionRate.value === 0 ? filteredConversionRate.value : previousConversionRate.value)),
    deltaContext: 'Conversion rate change versus previous week.',
    icon: 'mdi-check-decagram-outline'
  },
  {
    label: 'ROAS',
    value: `${filteredRoas.value.toFixed(2)}x`,
    delta: safeDelta(percentDelta(filteredRoas.value, allRoas.value === 0 ? filteredRoas.value : allRoas.value)),
    deltaContext: 'Delta versus overall ROAS baseline in the full dataset.',
    icon: 'mdi-finance'
  }
]);

const audienceSegments = computed(() => {
  const counts = filteredCampaigns.value.reduce<Record<string, number>>((acc, campaign) => {
    acc[campaign.segment] = (acc[campaign.segment] ?? 0) + 1;
    return acc;
  }, {});

  const total = Math.max(filteredCampaigns.value.length, 1);

  return Object.entries(counts)
    .map(([label, count]) => ({
      label,
      share: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.share - a.share)
    .slice(0, 4);
});

const audienceGeography = computed(() => {
  const counts = filteredCampaigns.value.reduce<Record<string, number>>((acc, campaign) => {
    acc[campaign.destination] = (acc[campaign.destination] ?? 0) + 1;
    return acc;
  }, {});

  const total = Math.max(filteredCampaigns.value.length, 1);

  return Object.entries(counts)
    .map(([label, count]) => ({
      label,
      share: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.share - a.share)
    .slice(0, 4);
});

const demographicMix = computed(() => {
  const cohortCounts = filteredCampaigns.value.reduce<Record<string, number>>((acc, campaign) => {
    const segment = campaign.segment.toLowerCase();

    if (segment.includes('family')) {
      acc.Families = (acc.Families ?? 0) + 1;
      return acc;
    }

    if (segment.includes('retiree') || segment.includes('luxury')) {
      acc.Premium = (acc.Premium ?? 0) + 1;
      return acc;
    }

    if (segment.includes('adventure') || segment.includes('younger')) {
      acc.Explorers = (acc.Explorers ?? 0) + 1;
      return acc;
    }

    acc.General = (acc.General ?? 0) + 1;
    return acc;
  }, {});

  const total = Math.max(filteredCampaigns.value.length, 1);

  return Object.entries(cohortCounts)
    .map(([label, count]) => ({
      label,
      share: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.share - a.share)
    .slice(0, 4);
});

const deviceMix = computed(() => {
  const base = { mobile: 0, desktop: 0, tablet: 0 };

  filteredChannelMetrics.value.forEach((metric) => {
    const weight = metric.impressions || 1;
    const channel = metric.channel.toLowerCase();

    if (channel.includes('youtube') || channel.includes('social') || channel.includes('meta') || channel.includes('instagram')) {
      base.mobile += weight * 0.68;
      base.desktop += weight * 0.24;
      base.tablet += weight * 0.08;
      return;
    }

    if (channel.includes('email') || channel.includes('organic') || channel.includes('search') || channel.includes('google')) {
      base.mobile += weight * 0.52;
      base.desktop += weight * 0.4;
      base.tablet += weight * 0.08;
      return;
    }

    base.mobile += weight * 0.58;
    base.desktop += weight * 0.32;
    base.tablet += weight * 0.1;
  });

  const total = base.mobile + base.desktop + base.tablet;
  const safeTotal = total === 0 ? 1 : total;

  return [
    { label: 'Mobile', share: Math.round((base.mobile / safeTotal) * 100) },
    { label: 'Desktop', share: Math.round((base.desktop / safeTotal) * 100) },
    { label: 'Tablet', share: Math.round((base.tablet / safeTotal) * 100) }
  ];
});

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
