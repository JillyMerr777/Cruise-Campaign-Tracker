<template>
  <div class="mb-5 px-1 pt-1">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 class="text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-slate-900 sm:text-[2.2rem]">Dashboard</h1>
        <p class="mt-1 text-[0.94rem] text-slate-500">Welcome back, Ava. Here is what is happening with your cruise campaigns.</p>
      </div>

      <div class="rounded-xl border border-cyan-100 bg-cyan-50/70 px-3 py-2 text-xs shadow-[0_10px_22px_rgba(12,71,153,0.09)]">
        <div class="font-semibold uppercase tracking-wide text-cyan-900">Reporting Period</div>
        <div class="text-sm font-semibold text-slate-800">Q1 2026 Campaign Performance</div>
        <div class="mt-1 inline-flex items-center gap-1.5 text-cyan-900">
          <span class="block size-2 rounded-full bg-rose-500" />
          <span>3 active notifications</span>
        </div>
      </div>
    </div>
  </div>

  <template v-if="featuredCampaign">
    <KpiSummaryGrid :items="kpis" class="mb-5" />

    <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <Card class="h-full border-slate-200 bg-white shadow-sm">
          <CardHeader class="pb-2">
            <CardTitle class="flex items-center gap-2 text-base font-semibold text-slate-900"><Trophy class="size-4 text-amber-500" />Top 3 Campaigns</CardTitle>
            <CardDescription>Ranked by performance score, budget efficiency, and revenue impact.</CardDescription>
          </CardHeader>
          <CardContent class="pb-4 pt-0">
            <div v-if="performanceLeaders.length > 0" class="space-y-2.5">
              <div v-for="(campaign, index) in performanceLeaders" :key="campaign.id" class="rounded-xl border border-slate-200 bg-white p-3">
                <div class="mb-2 h-20 overflow-hidden rounded-lg border border-cyan-100/60">
                  <img :src="leaderImage(index)" :alt="`${campaign.name} campaign visual`" class="h-full w-full object-cover" />
                </div>
                <div class="mb-2 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span :class="index === 0 ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'" class="grid h-7 w-7 place-items-center rounded-full text-xs font-bold">{{ index + 1 }}</span>
                    <div>
                      <div class="text-sm font-semibold text-slate-800">{{ campaign.name }}</div>
                      <div class="text-xs text-slate-500">{{ campaign.status }} | {{ campaign.destination }}</div>
                    </div>
                  </div>
                  <Badge class="bg-emerald-50 text-emerald-800 hover:bg-emerald-50">{{ campaign.performanceScore }}</Badge>
                </div>

                <div class="mb-1 flex justify-between text-xs text-slate-500">
                  <span>Budget Utilization</span>
                  <span>{{ campaign.budgetUtilization.toFixed(1) }}%</span>
                </div>
                <Progress :model-value="campaign.budgetUtilization" class="mb-2 h-1.5 bg-slate-100 [&>*]:bg-blue-500" />

                <div class="grid grid-cols-3 gap-2 text-xs text-slate-500">
                  <div>
                    <div class="text-[10px] uppercase tracking-wide">Spend</div>
                    <div class="font-semibold text-slate-700">{{ formatCurrency(campaign.spend) }}</div>
                  </div>
                  <div>
                    <div class="text-[10px] uppercase tracking-wide">ROAS</div>
                    <div class="font-semibold text-slate-700">{{ campaign.roi.toFixed(2) }}x</div>
                  </div>
                  <div>
                    <div class="text-[10px] uppercase tracking-wide">Revenue</div>
                    <div class="font-semibold text-slate-700">{{ formatCurrency(campaign.revenue) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <EmptyState v-else message="No campaign performance leaders in this filter set." />
          </CardContent>
        </Card>
      </div>

      <div class="lg:col-span-7">
        <PerformanceTrendChart :clicks="totals.clicks" :conversions="totals.conversions" />
      </div>
    </div>

    <FilterBar v-model="filters" />

    <CampaignSpotlightCard :campaign="featuredCampaign" class="mb-5" />

    <Alert class="mb-4 border-slate-200 bg-white text-slate-700 shadow-sm">
      <Info class="size-4" />
      <AlertTitle>KPI Context</AlertTitle>
      <AlertDescription>
        KPI deltas are week-over-week in the current filtered view. Use the Top 3 board to prioritize immediate budget and creative actions.
      </AlertDescription>
    </Alert>

    <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <Card class="h-full border-slate-200 bg-white shadow-sm">
          <CardHeader class="pb-2">
            <CardTitle class="flex items-center gap-2 text-base font-semibold text-slate-900"><Users class="size-4 text-pink-500" />Audience Insights</CardTitle>
            <CardDescription>Segment, device, and geography breakdown for active campaigns.</CardDescription>
          </CardHeader>
          <CardContent class="pb-4 pt-0">
            <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Top Audience Segments</div>
            <div class="mb-3 flex flex-wrap gap-1.5">
              <Badge v-for="item in audienceSegments" :key="item.label" class="bg-pink-100 text-pink-900 hover:bg-pink-100">{{ item.label }} {{ item.share }}%</Badge>
            </div>

            <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Device Usage</div>
            <div class="mb-3 flex flex-wrap gap-3">
              <div v-for="device in deviceMix" :key="device.label" class="text-center">
                <div class="grid size-14 place-items-center rounded-full bg-white text-xs font-semibold text-slate-700 shadow-sm" :style="circleProgress(device.share)">
                  <div class="grid size-10 place-items-center rounded-full bg-white">{{ device.share }}%</div>
                </div>
                <div class="mt-1 text-xs text-slate-600">{{ device.label }}</div>
              </div>
            </div>

            <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Demographic Distribution</div>
            <div class="mb-3 flex flex-wrap gap-1.5">
              <Badge v-for="item in demographicMix" :key="item.label" class="bg-slate-100 text-slate-700 hover:bg-slate-100">{{ item.label }} {{ item.share }}%</Badge>
            </div>

            <div class="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Geographic Performance</div>
            <div class="space-y-2">
              <div v-for="geo in audienceGeography" :key="geo.label" class="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2">
                <span class="text-sm text-slate-700">{{ geo.label }}</span>
                <Badge class="bg-slate-100 text-slate-700 hover:bg-slate-100">{{ geo.share }}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="lg:col-span-7">
        <Card class="h-full border-slate-200 bg-white shadow-sm">
          <CardHeader class="pb-2">
            <CardTitle class="flex items-center gap-2 text-base font-semibold text-slate-900"><Lightbulb class="size-4 text-cyan-600" />Channel Intelligence Highlights</CardTitle>
            <CardDescription>Creative and placement signals from your top channels.</CardDescription>
          </CardHeader>
          <CardContent class="pb-4 pt-0">
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div v-for="item in channelIntelligence" :key="`${item.channel}-${item.placement}`" class="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <div class="mb-1 text-sm font-semibold text-slate-800">{{ item.channel }}</div>
                <div class="mb-1 text-sm text-slate-700">{{ item.topCreative || 'Creative insight pending' }}</div>
                <div class="mb-2 text-xs text-slate-500">Placement: {{ item.placement || 'Mixed placements' }}</div>
                <div class="flex items-center justify-between gap-2">
                  <Badge class="bg-slate-100 text-slate-700 hover:bg-slate-100">Engagement {{ item.engagementRate.toFixed(2) }}%</Badge>
                  <Badge class="bg-emerald-50 text-emerald-800 hover:bg-emerald-50">Revenue {{ formatCurrency(item.revenue) }}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div class="lg:col-span-7"><ChannelPerformanceCards :metrics="filteredChannelMetrics" /></div>
      <div class="lg:col-span-5"><CreativePerformanceCard /></div>
    </div>

    <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <InsightsPanel :insights="insights" />
      <AlertsPanel :alerts="filteredAlerts" />
    </div>

    <div class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <BudgetPacingCard :budget="totals.budget" :spend="totals.spend" />
      <QuickActionsCard />
    </div>

    <CampaignComparisonTable :campaigns="filteredCampaigns" class="mb-5" />
    <PastCampaignHighlights :campaigns="filteredCampaigns" class="mb-1" />
  </template>

  <EmptyState v-else message="No campaigns match your current filters. Clear filters to view the full dashboard." />
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { Info, Lightbulb, Trophy, Users } from '@lucide/vue';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useDashboardMetrics } from '../composables/useDashboardMetrics';
import { dataService } from '../services/dataService';
import type { Campaign } from '../types/campaign';
import { formatCompact, formatCurrency } from '../utils/formatters';
import leaderVisualA from '../assets/CAMPAIGN IMAGES/Campaign-1.png';
import leaderVisualB from '../assets/CAMPAIGN IMAGES/Campaign-2.png';
import leaderVisualC from '../assets/CAMPAIGN IMAGES/Campaign-3.png';

const campaigns = dataService.campaigns as Campaign[];
const channelMetrics = dataService.channelMetrics;
const alerts = dataService.alerts;
const benchmarks = dataService.benchmarks;

const filters = reactive({ channel: 'All', status: 'All', destination: 'All', segment: '' });

const leaderImage = (index: number): string => {
  const visuals = [leaderVisualA, leaderVisualB, leaderVisualC];
  return visuals[index % visuals.length];
};

const circleProgress = (value: number): string => {
  const clamped = Math.max(0, Math.min(100, value));
  return `background: conic-gradient(rgb(14 165 233) ${clamped * 3.6}deg, rgb(224 242 254) 0deg);`;
};

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
