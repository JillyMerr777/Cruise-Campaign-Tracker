<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_16px_34px_rgba(41,71,125,0.14)] backdrop-blur-sm">
    <CardHeader class="border-b border-sky-100/70 pb-4">
      <CardTitle class="text-lg font-semibold text-slate-900">Create New Campaign</CardTitle>
    </CardHeader>

    <CardContent class="pt-5">
      <form class="grid grid-cols-1 gap-4 md:grid-cols-2" @submit.prevent>
        <div class="space-y-2">
          <label for="campaign-name" class="text-sm font-medium text-slate-700">Campaign Name</label>
          <Input id="campaign-name" v-model="form.name" placeholder="Summer Escape Push" />
        </div>

        <div class="space-y-2">
          <label for="objective" class="text-sm font-medium text-slate-700">Objective</label>
          <Input id="objective" v-model="form.objective" placeholder="Drive conversion lift" />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700">Target Segment</label>
          <Select :model-value="form.segment" @update:model-value="(value) => (form.segment = String(value ?? ''))">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="item in segments" :key="item" :value="item">{{ item }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700">Destination</label>
          <Select :model-value="form.destination" @update:model-value="(value) => (form.destination = String(value ?? ''))">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="item in destinations" :key="item" :value="item">{{ item }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700">Offer Type</label>
          <Select :model-value="form.offer" @update:model-value="(value) => (form.offer = String(value ?? ''))">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select offer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="item in offers" :key="item" :value="item">{{ item }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700">Channel Mix</label>
          <div class="flex flex-wrap gap-2 rounded-lg border border-sky-100 bg-sky-50/60 p-2">
            <button
              v-for="channel in channels"
              :key="channel"
              type="button"
              :class="[
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                form.channels.includes(channel)
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-sky-100'
              ]"
              @click="toggleChannel(channel)"
            >
              {{ channel }}
            </button>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <Badge v-for="channel in form.channels" :key="channel" variant="secondary">{{ channel }}</Badge>
          </div>
        </div>

        <div class="space-y-2">
          <label for="start-date" class="text-sm font-medium text-slate-700">Start Date</label>
          <Input id="start-date" v-model="form.startDate" type="date" />
        </div>

        <div class="space-y-2">
          <label for="end-date" class="text-sm font-medium text-slate-700">End Date</label>
          <Input id="end-date" v-model="form.endDate" type="date" />
        </div>

        <div class="space-y-2">
          <label for="budget" class="text-sm font-medium text-slate-700">Budget</label>
          <div class="relative">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">$</span>
            <Input id="budget" v-model="form.budget" class="pl-7" placeholder="95000" />
          </div>
        </div>

        <div class="space-y-2">
          <label for="owner" class="text-sm font-medium text-slate-700">Owner</label>
          <Input id="owner" v-model="form.owner" placeholder="Ava Martinez" />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label for="summary" class="text-sm font-medium text-slate-700">Summary Notes</label>
          <Textarea id="summary" v-model="form.notes" rows="4" placeholder="Audience intent, creative direction, and risks to track..." />
        </div>
      </form>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const segments = ['Families', 'Couples', 'Loyalty Guests', 'First-time Cruisers', 'Luxury Travelers'];
const destinations = ['Caribbean', 'Mediterranean', 'Alaska', 'Bahamas'];
const offers = ['% Off Fare', 'Onboard Credit', 'Kids Sail Free', 'Balcony Upgrade'];
const channels = ['Instagram', 'Email', 'Website', 'Mobile App', 'X/Twitter'];

const form = reactive({
  name: '',
  objective: '',
  segment: '',
  destination: '',
  offer: '',
  channels: [] as string[],
  startDate: '',
  endDate: '',
  budget: '',
  owner: '',
  notes: ''
});

const toggleChannel = (channel: string): void => {
  if (form.channels.includes(channel)) {
    form.channels = form.channels.filter((item) => item !== channel);
    return;
  }

  form.channels = [...form.channels, channel];
};
</script>
