<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Benchmark Comparison</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Channel</TableHead>
            <TableHead>Your CTR</TableHead>
            <TableHead>Benchmark</TableHead>
            <TableHead>Delta</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in rows" :key="row.channel">
            <TableCell class="font-medium text-slate-800">{{ row.channel }}</TableCell>
            <TableCell>{{ row.ctr.toFixed(2) }}%</TableCell>
            <TableCell>{{ row.benchmarkCtr.toFixed(2) }}%</TableCell>
            <TableCell>
              <MetricDelta :delta="row.delta" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MetricDelta from '../shared/MetricDelta.vue';
defineProps<{ rows: Array<{ channel: string; ctr: number; benchmarkCtr: number; delta: number }> }>();
</script>
