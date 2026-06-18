import alerts from '../data/alerts.json';
import benchmarks from '../data/benchmarks.json';
import campaigns from '../data/campaigns.json';
import channelMetrics from '../data/channel-metrics.json';
import lifecycle from '../data/lifecycle.json';
import activityFeed from '../data/activity-feed.json';
import mockData from '../data/mock-data.json';
import type { AlertItem } from '../types/alerts';
import type { Benchmark } from '../types/benchmark';
import type { Campaign, CampaignTrendPoint } from '../types/campaign';
import type { CampaignLifecycle, LifecycleStage } from '../types/lifecycle';
import type { ChannelMetric } from '../types/metrics';

type ActivityFeedItem = { id: string; campaignId: string; time: string; message: string };

type MockDataShape = {
  campaigns?: unknown[];
  channelMetrics?: unknown[];
  benchmarks?: Benchmark[] | { overall?: Record<string, unknown>; byChannel?: unknown[] };
  alerts?: Array<AlertItem | { id: string; campaignId: string; severity?: string; type?: string; title: string; message: string }>;
  lifecycle?: CampaignLifecycle[];
  activityFeed?: ActivityFeedItem[];
};

const pickArray = <T>(override: T[] | undefined, fallback: T[]): T[] =>
  Array.isArray(override) && override.length > 0 ? override : fallback;

const rawMock = mockData as unknown;
const mockObject = !Array.isArray(rawMock) && typeof rawMock === 'object' && rawMock !== null
  ? (rawMock as MockDataShape)
  : null;

const mockCampaigns = Array.isArray(rawMock) ? (rawMock as Campaign[]) : mockObject?.campaigns;
const mockChannelMetrics = mockObject?.channelMetrics;
const mockBenchmarks = mockObject?.benchmarks;
const mockAlerts = mockObject?.alerts;
const mockLifecycle = mockObject?.lifecycle;
const mockActivityFeed = mockObject?.activityFeed;

const asNumber = (value: unknown): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const normalizeCampaignStatus = (value: unknown): Campaign['status'] => {
  const raw = String(value ?? '').toLowerCase();
  if (raw === 'active' || raw === 'paused' || raw === 'completed' || raw === 'archived') {
    return raw.charAt(0).toUpperCase() + raw.slice(1) as Campaign['status'];
  }
  return 'Active';
};

const normalizeCampaignHealth = (value: unknown): Campaign['health'] => {
  const raw = String(value ?? '').toLowerCase();
  if (raw.includes('performing')) return 'Performing Well';
  if (raw.includes('attention')) return 'Needs Attention';
  if (raw.includes('under')) return 'Underperforming';
  return 'Needs Attention';
};

const normalizeTrendPoint = (raw: unknown): CampaignTrendPoint | null => {
  const item = raw as Record<string, unknown>;
  if (!item || typeof item !== 'object' || typeof item.week !== 'string') return null;
  return {
    week: item.week,
    impressions: asNumber(item.impressions),
    clicks: asNumber(item.clicks),
    conversions: asNumber(item.conversions),
    spend: asNumber(item.spend)
  };
};

const normalizeCampaign = (raw: unknown): Campaign | null => {
  const item = raw as Record<string, unknown>;
  if (!item || typeof item !== 'object' || typeof item.id !== 'string' || typeof item.name !== 'string') return null;

  const kpis = (item.kpis ?? {}) as Record<string, unknown>;
  const channelList = Array.isArray(item.channels)
    ? item.channels.filter((v): v is string => typeof v === 'string')
    : [];
  const weeklyTrend = Array.isArray(item.weeklyTrend)
    ? item.weeklyTrend.map(normalizeTrendPoint).filter((point): point is CampaignTrendPoint => point !== null)
    : [];

  return {
    id: item.id,
    name: item.name,
    objective: String(item.objective ?? ''),
    status: normalizeCampaignStatus(item.status),
    health: normalizeCampaignHealth(item.health),
    owner: String(item.owner ?? 'Unassigned'),
    segment: String(item.segment ?? 'General'),
    destination: String(item.destination ?? 'Multiple'),
    offerType: String(item.offerType ?? 'Offer'),
    channels: channelList,
    startDate: String(item.startDate ?? ''),
    endDate: String(item.endDate ?? ''),
    budget: asNumber(item.budget),
    spend: asNumber(item.spend),
    impressions: asNumber(item.impressions ?? kpis.impressions),
    clicks: asNumber(item.clicks ?? kpis.clicks),
    ctr: asNumber(item.ctr ?? kpis.ctr),
    conversions: asNumber(item.conversions ?? kpis.conversions),
    conversionRate: asNumber(item.conversionRate ?? kpis.conversionRate),
    roi: asNumber(item.roi ?? kpis.roi),
    featured: Boolean(item.featured),
    weeklyTrend
  };
};

const normalizeChannelMetric = (raw: unknown, campaignId: string): ChannelMetric | null => {
  const item = raw as Record<string, unknown>;
  if (!item || typeof item !== 'object' || typeof item.channel !== 'string') return null;
  return {
    campaignId,
    channel: item.channel,
    impressions: asNumber(item.impressions ?? item.views ?? item.sends),
    clicks: asNumber(item.clicks),
    ctr: asNumber(item.ctr),
    conversions: asNumber(item.conversions),
    spend: asNumber(item.spend)
  };
};

const normalizeBenchmark = (raw: unknown): Benchmark | null => {
  const item = raw as Record<string, unknown>;
  if (!item || typeof item !== 'object' || typeof item.channel !== 'string') return null;
  return {
    channel: item.channel,
    openRate: asNumber(item.openRate),
    clickRate: asNumber(item.clickRate),
    ctr: asNumber(item.ctr),
    conversionRate: asNumber(item.conversionRate)
  };
};

const normalizeAlertType = (value: unknown): AlertItem['type'] => {
  const raw = String(value ?? '').toLowerCase();
  if (raw === 'warning') return 'warning';
  if (raw === 'critical' || raw === 'error') return 'error';
  if (raw === 'success') return 'success';
  return 'info';
};

const normalizeAlert = (raw: unknown): AlertItem | null => {
  const item = raw as Record<string, unknown>;
  if (!item || typeof item !== 'object') return null;
  if (typeof item.id !== 'string' || typeof item.campaignId !== 'string' || typeof item.title !== 'string' || typeof item.message !== 'string') {
    return null;
  }
  return {
    id: item.id,
    campaignId: item.campaignId,
    type: normalizeAlertType(item.type ?? item.severity),
    title: item.title,
    message: item.message
  };
};

const normalizeLifecycleStatus = (value: unknown): LifecycleStage['status'] => {
  const raw = String(value ?? '').toLowerCase();
  if (raw.includes('complete')) return 'Complete';
  if (raw.includes('in progress')) return 'In Progress';
  return 'Pending';
};

const normalizedCampaigns = pickArray(
  (mockCampaigns ?? []).map(normalizeCampaign).filter((item): item is Campaign => item !== null),
  campaigns as Campaign[]
);

const topLevelChannelMetrics = (mockChannelMetrics ?? [])
  .map((item) => normalizeChannelMetric(item, String((item as Record<string, unknown>)?.campaignId ?? '')))
  .filter((item): item is ChannelMetric => item !== null && item.campaignId.length > 0);

const nestedChannelMetrics = (mockCampaigns ?? []).flatMap((rawCampaign) => {
  const campaign = rawCampaign as Record<string, unknown>;
  const campaignId = String(campaign?.id ?? '');
  const channels = Array.isArray(campaign?.channelMetrics) ? campaign.channelMetrics : [];
  return channels
    .map((channel) => normalizeChannelMetric(channel, campaignId))
    .filter((item): item is ChannelMetric => item !== null);
});

const normalizedChannelMetrics =
  topLevelChannelMetrics.length > 0
    ? topLevelChannelMetrics
    : (nestedChannelMetrics.length > 0 ? nestedChannelMetrics : (channelMetrics as ChannelMetric[]));

const benchmarkSource = Array.isArray(mockBenchmarks)
  ? mockBenchmarks
  : ((mockBenchmarks as { byChannel?: unknown[] } | undefined)?.byChannel ?? []);

const normalizedBenchmarks = pickArray(
  benchmarkSource.map(normalizeBenchmark).filter((item): item is Benchmark => item !== null),
  benchmarks as Benchmark[]
);

const normalizedAlerts = pickArray(
  (mockAlerts ?? []).map(normalizeAlert).filter((item): item is AlertItem => item !== null),
  alerts as AlertItem[]
);

const normalizedLifecycle = pickArray(
  (mockLifecycle ?? []).map((flow) => ({
    campaignId: flow.campaignId,
    stages: flow.stages.map((stage) => ({
      ...stage,
      status: normalizeLifecycleStatus(stage.status)
    }))
  })),
  lifecycle as CampaignLifecycle[]
);

export const dataService = {
  campaigns: normalizedCampaigns,
  channelMetrics: normalizedChannelMetrics,
  benchmarks: normalizedBenchmarks,
  alerts: normalizedAlerts,
  lifecycle: normalizedLifecycle,
  activityFeed: pickArray(mockActivityFeed, activityFeed as ActivityFeedItem[])
};
