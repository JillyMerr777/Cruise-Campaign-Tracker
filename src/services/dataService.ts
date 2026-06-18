import alerts from '../data/alerts.json';
import benchmarks from '../data/benchmarks.json';
import campaigns from '../data/campaigns.json';
import channelMetrics from '../data/channel-metrics.json';
import lifecycle from '../data/lifecycle.json';
import activityFeed from '../data/activity-feed.json';
import mockData from '../data/mock-data.json';
import type { AlertItem } from '../types/alerts';
import type { Benchmark } from '../types/benchmark';
import type { Campaign } from '../types/campaign';
import type { CampaignLifecycle } from '../types/lifecycle';
import type { ChannelMetric } from '../types/metrics';

type ActivityFeedItem = { id: string; campaignId: string; time: string; message: string };

type MockDataShape = {
  campaigns?: Campaign[];
  channelMetrics?: ChannelMetric[];
  benchmarks?: Benchmark[];
  alerts?: AlertItem[];
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

export const dataService = {
  campaigns: pickArray(mockCampaigns, campaigns as Campaign[]),
  channelMetrics: pickArray(mockChannelMetrics, channelMetrics as ChannelMetric[]),
  benchmarks: pickArray(mockBenchmarks, benchmarks as Benchmark[]),
  alerts: pickArray(mockAlerts, alerts as AlertItem[]),
  lifecycle: pickArray(mockLifecycle, lifecycle as CampaignLifecycle[]),
  activityFeed: pickArray(mockActivityFeed, activityFeed as ActivityFeedItem[])
};
