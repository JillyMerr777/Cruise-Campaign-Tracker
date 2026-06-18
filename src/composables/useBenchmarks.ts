import { computed } from 'vue';
import type { Benchmark } from '../types/benchmark';
import type { ChannelMetric } from '../types/metrics';

export const useBenchmarks = (benchmarks: Benchmark[], channelMetrics: ChannelMetric[]) => {
  const comparison = computed(() =>
    channelMetrics.map((metric) => {
      const benchmark = benchmarks.find((item) => item.channel === metric.channel);
      return {
        channel: metric.channel,
        ctr: metric.ctr,
        benchmarkCtr: benchmark?.ctr ?? 0,
        delta: metric.ctr - (benchmark?.ctr ?? 0)
      };
    })
  );

  return { comparison };
};
