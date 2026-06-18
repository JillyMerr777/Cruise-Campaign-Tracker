<template>
  <div class="dashboard-hero-card mb-4 rounded-2xl px-4 py-5 md:px-6">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div class="max-w-3xl">
        <h1 class="page-title">Start New Campaign</h1>
        <p class="page-subtitle mb-0 mt-1">
          Build launch-ready campaigns with audience clarity, budget discipline, and lifecycle ownership from day one.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <Badge class="bg-cyan-100 text-cyan-900 hover:bg-cyan-100">
          <Target class="mr-1 size-3.5" />
          Planning Studio
        </Badge>
        <Badge class="bg-emerald-100 text-emerald-900 hover:bg-emerald-100">
          <ShieldCheck class="mr-1 size-3.5" />
          Quality Gate Enabled
        </Badge>
      </div>
    </div>
  </div>

  <div class="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
    <div class="lg:col-span-8">
      <CampaignForm />

      <Card class="mt-4 border-sky-100/60 bg-white/85 shadow-[0_16px_34px_rgba(41,71,125,0.14)] backdrop-blur-sm">
        <CardContent class="flex flex-wrap gap-2 pt-4">
          <Button class="bg-cyan-500 text-white hover:bg-cyan-400">
            <Save class="mr-1 size-4" />
            Save Campaign Draft
          </Button>
          <Button variant="secondary" class="bg-pink-100 text-pink-900 hover:bg-pink-200">
            <Send class="mr-1 size-4" />
            Submit For Approval
          </Button>
          <RouterLink :to="'/'" :class="buttonVariants({ variant: 'outline' })">Cancel</RouterLink>
        </CardContent>
      </Card>
    </div>

    <div class="lg:col-span-4">
      <Card class="mb-4 border-sky-100/60 bg-white/85 shadow-[0_16px_34px_rgba(41,71,125,0.14)] backdrop-blur-sm">
        <CardHeader class="flex flex-row items-center justify-between pb-3">
          <CardTitle>Launch Readiness</CardTitle>
          <Badge class="bg-amber-100 text-amber-900 hover:bg-amber-100">{{ readinessPercent }}%</Badge>
        </CardHeader>
        <CardContent>
          <Progress :model-value="readinessPercent" class="mb-4 h-2 bg-sky-100 [&>*]:bg-amber-400" />

          <div class="space-y-2">
            <div
              v-for="item in readinessChecklist"
              :key="item.label"
              class="flex items-center justify-between rounded-lg border border-sky-100/70 bg-sky-50/40 px-3 py-2"
            >
              <div class="flex items-center gap-2 text-sm font-medium text-slate-800">
                <CheckCircle2 v-if="item.complete" class="size-4 text-emerald-600" />
                <AlertCircle v-else class="size-4 text-amber-600" />
                {{ item.label }}
              </div>
              <Badge :class="item.complete ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-100' : 'bg-amber-100 text-amber-900 hover:bg-amber-100'">
                {{ item.complete ? 'Ready' : 'Pending' }}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="mb-4 border-sky-100/60 bg-white/85 shadow-[0_16px_34px_rgba(41,71,125,0.14)] backdrop-blur-sm">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-semibold text-slate-900">Budget Guardrails</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2 text-sm">
          <div class="flex items-center justify-between">
            <span class="text-slate-500">Planned investment</span>
            <strong>{{ budgetPlan }}</strong>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500">Expected launch window</span>
            <strong>14 days</strong>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-500">Primary KPI</span>
            <strong>Booking conversion rate</strong>
          </div>
        </CardContent>
      </Card>

      <Card class="border-sky-100/60 bg-white/85 shadow-[0_16px_34px_rgba(41,71,125,0.14)] backdrop-blur-sm">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-semibold text-slate-900">Workflow Handoff</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="mb-3 text-sm text-slate-600">
            Once submitted, this campaign is routed into lifecycle operations for approvals, QA readiness, and monitored launch.
          </p>

          <RouterLink :to="'/lifecycle'" :class="buttonVariants({ variant: 'secondary' }) + ' w-full bg-pink-100 text-pink-900 hover:bg-pink-200'">
            <ChartLine class="mr-1 size-4" />
            Open Lifecycle Tracker
          </RouterLink>

          <Separator class="my-3" />

          <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Recommended next action</div>
          <div class="flex items-center gap-2">
            <Lightbulb class="size-4 text-amber-500" />
            <span class="text-sm text-slate-700">Attach creative brief and approve spend before final submission.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <Card class="border-sky-100/60 bg-white/85 shadow-[0_16px_34px_rgba(41,71,125,0.14)] backdrop-blur-sm">
      <CardHeader class="pb-3">
        <CardTitle class="text-base font-semibold text-slate-900">Audience Focus</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="mb-3 text-sm text-slate-600">Primary target: Luxury family and premium couple segments.</p>
        <div class="flex flex-wrap gap-2">
          <Badge class="bg-cyan-100 text-cyan-900 hover:bg-cyan-100">Family Travel</Badge>
          <Badge class="bg-cyan-100 text-cyan-900 hover:bg-cyan-100">Retiree Escapes</Badge>
          <Badge class="bg-cyan-100 text-cyan-900 hover:bg-cyan-100">Adventure Seekers</Badge>
        </div>
      </CardContent>
    </Card>

    <Card class="border-sky-100/60 bg-white/85 shadow-[0_16px_34px_rgba(41,71,125,0.14)] backdrop-blur-sm">
      <CardHeader class="pb-3">
        <CardTitle class="text-base font-semibold text-slate-900">Channel Split Recommendation</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-slate-700">Paid Search</span>
          <strong>35%</strong>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-700">Paid Social</span>
          <strong>30%</strong>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-700">Email</span>
          <strong>20%</strong>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-700">Display</span>
          <strong>15%</strong>
        </div>
      </CardContent>
    </Card>

    <Card class="border-sky-100/60 bg-white/85 shadow-[0_16px_34px_rgba(41,71,125,0.14)] backdrop-blur-sm">
      <CardHeader class="pb-3">
        <CardTitle class="text-base font-semibold text-slate-900">Launch SLA</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="mb-2 text-sm text-slate-600">
          Average time from draft to launch is 12.4 days for campaigns with completed creative documentation.
        </p>
        <Badge class="bg-emerald-100 text-emerald-900 hover:bg-emerald-100">
          <TrendingUp class="mr-1 size-3.5" />
          2.3 days faster vs last quarter
        </Badge>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  AlertCircle,
  ChartLine,
  CheckCircle2,
  Lightbulb,
  Save,
  Send,
  ShieldCheck,
  Target,
  TrendingUp
} from '@lucide/vue';
import { RouterLink } from 'vue-router';
import CampaignForm from '../components/campaign/CampaignForm.vue';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const readinessChecklist = [
  { label: 'Objective defined', complete: true },
  { label: 'Audience selected', complete: true },
  { label: 'Creative brief attached', complete: false },
  { label: 'Budget approval confirmed', complete: false }
];

const readinessPercent = computed(() => {
  const done = readinessChecklist.filter((item) => item.complete).length;
  return Math.round((done / readinessChecklist.length) * 100);
});

const budgetPlan = '$95,000';
</script>
