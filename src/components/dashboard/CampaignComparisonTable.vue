<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Campaign Comparison</CardTitle>
    </CardHeader>
    <CardContent class="pb-4 pt-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Spend</TableHead>
            <TableHead>CTR</TableHead>
            <TableHead>Conversions</TableHead>
            <TableHead>ROI</TableHead>
            <TableHead>Health</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in campaigns" :key="item.id">
            <TableCell>
              <RouterLink :to="`/campaigns/${item.id}`" class="font-medium text-cyan-700 hover:underline">{{ item.name }}</RouterLink>
            </TableCell>
            <TableCell>{{ item.status }}</TableCell>
            <TableCell>{{ item.budget }}</TableCell>
            <TableCell>{{ item.spend }}</TableCell>
            <TableCell>{{ item.ctr }}</TableCell>
            <TableCell>{{ item.conversions }}</TableCell>
            <TableCell>{{ item.roi }}</TableCell>
            <TableCell>
              <HealthStatusBadge :health="item.health" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Campaign } from '../../types/campaign';
import HealthStatusBadge from './HealthStatusBadge.vue';

defineProps<{ campaigns: Campaign[] }>();
</script>
