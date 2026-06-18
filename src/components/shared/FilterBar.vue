<template>
  <Card class="mb-5 border-slate-200 bg-white shadow-sm" role="search" aria-label="Campaign filters">
    <CardContent class="pb-3 pt-3.5">
      <div class="grid grid-cols-1 gap-3 md:grid-cols-4">
        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">Channel</label>
          <Select :model-value="model.channel" @update:model-value="(value) => updateField('channel', String(value ?? 'All'))">
            <SelectTrigger class="w-full border-slate-200" aria-label="Filter by channel">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="item in channels" :key="item" :value="item">{{ item }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</label>
          <Select :model-value="model.status" @update:model-value="(value) => updateField('status', String(value ?? 'All'))">
            <SelectTrigger class="w-full border-slate-200" aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="item in statuses" :key="item" :value="item">{{ item }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">Destination</label>
          <Select :model-value="model.destination" @update:model-value="(value) => updateField('destination', String(value ?? 'All'))">
            <SelectTrigger class="w-full border-slate-200" aria-label="Filter by destination">
              <SelectValue placeholder="Destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="item in destinations" :key="item" :value="item">{{ item }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <label for="segment-filter" class="text-xs font-semibold uppercase tracking-wide text-slate-500">Audience Segment</label>
          <Input
            id="segment-filter"
            class="border-slate-200"
            v-model="model.segment"
            aria-label="Filter by audience segment"
            placeholder="Families, Luxury..."
          />
        </div>
      </div>

      <div class="mt-3 flex justify-end">
        <Button variant="outline" size="sm" class="text-slate-600" @click="clearFilters">
          <FilterX class="mr-1 size-4" />
          Clear Filters
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { FilterX } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DESTINATIONS, CHANNELS, STATUSES } from '../../utils/constants';

const model = defineModel<{ channel: string; status: string; destination: string; segment: string }>({
  default: {
    channel: 'All',
    status: 'All',
    destination: 'All',
    segment: ''
  }
});

const channels = ['All', ...CHANNELS];
const statuses = ['All', ...STATUSES];
const destinations = ['All', ...DESTINATIONS];

const updateField = (field: 'channel' | 'status' | 'destination' | 'segment', value: string): void => {
  model.value = {
    ...model.value,
    [field]: value
  };
};

const clearFilters = () => {
  model.value = {
    channel: 'All',
    status: 'All',
    destination: 'All',
    segment: ''
  };
};
</script>
