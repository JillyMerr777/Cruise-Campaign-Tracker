<template>
  <div class="mb-4 dashboard-hero-card pa-4 pa-md-5">
    <div class="d-flex justify-space-between align-start flex-wrap ga-3">
      <div>
        <h1 class="page-title">Start New Campaign</h1>
        <p class="page-subtitle mb-0">Build launch-ready campaigns with audience clarity, budget discipline, and lifecycle ownership from day one.</p>
      </div>
      <div class="d-flex ga-2 flex-wrap">
        <v-chip color="primary" variant="tonal" prepend-icon="mdi-target-account">Planning Studio</v-chip>
        <v-chip color="success" variant="tonal" prepend-icon="mdi-shield-check-outline">Quality Gate Enabled</v-chip>
      </div>
    </div>
  </div>

  <v-row class="mb-4">
    <v-col cols="12" lg="8">
      <CampaignForm />

      <v-card class="mt-4">
        <v-card-text class="d-flex ga-2 flex-wrap">
          <v-btn color="primary" prepend-icon="mdi-content-save-outline">Save Campaign Draft</v-btn>
          <v-btn color="secondary" variant="tonal" prepend-icon="mdi-send-outline">Submit For Approval</v-btn>
          <v-btn variant="tonal" to="/">Cancel</v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="4">
      <v-card class="mb-4">
        <v-card-title class="d-flex align-center justify-space-between">
          Launch Readiness
          <v-chip size="small" color="warning" variant="tonal">{{ readinessPercent }}%</v-chip>
        </v-card-title>
        <v-card-text>
          <v-progress-linear :model-value="readinessPercent" color="warning" bg-color="info" rounded height="10" class="mb-3" />

          <v-list density="compact" class="bg-transparent">
            <v-list-item
              v-for="item in readinessChecklist"
              :key="item.label"
              :prepend-icon="item.complete ? 'mdi-check-circle-outline' : 'mdi-alert-outline'"
              :title="item.label"
            >
              <template #append>
                <v-chip :color="item.complete ? 'success' : 'warning'" size="x-small" variant="tonal">
                  {{ item.complete ? 'Ready' : 'Pending' }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card class="mb-4">
        <v-card-title>Budget Guardrails</v-card-title>
        <v-card-text>
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="text-caption">Planned investment</span>
            <strong>{{ budgetPlan }}</strong>
          </div>
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="text-caption">Expected launch window</span>
            <strong>14 days</strong>
          </div>
          <div class="d-flex justify-space-between align-center">
            <span class="text-caption">Primary KPI</span>
            <strong>Booking conversion rate</strong>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>Workflow Handoff</v-card-title>
        <v-card-text>
          <p class="text-body-2 mb-3">Once submitted, this campaign is routed into lifecycle operations for approvals, QA readiness, and monitored launch.</p>

          <v-btn block color="secondary" variant="tonal" prepend-icon="mdi-chart-timeline-variant" to="/lifecycle">
            Open Lifecycle Tracker
          </v-btn>

          <v-divider class="my-3" />

          <div class="text-caption text-medium-emphasis mb-2">Recommended next action</div>
          <div class="d-flex align-center ga-2">
            <v-icon color="warning" icon="mdi-lightbulb-on-outline" />
            <span class="text-body-2">Attach creative brief and approve spend before final submission.</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="4">
      <v-card>
        <v-card-title>Audience Focus</v-card-title>
        <v-card-text>
          <p class="text-body-2 mb-2">Primary target: Luxury family and premium couple segments.</p>
          <v-chip size="small" color="info" variant="tonal" class="mr-2 mb-2">Family Travel</v-chip>
          <v-chip size="small" color="info" variant="tonal" class="mr-2 mb-2">Retiree Escapes</v-chip>
          <v-chip size="small" color="info" variant="tonal" class="mb-2">Adventure Seekers</v-chip>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card>
        <v-card-title>Channel Split Recommendation</v-card-title>
        <v-card-text>
          <div class="d-flex justify-space-between mb-2">
            <span class="text-body-2">Paid Search</span>
            <strong>35%</strong>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span class="text-body-2">Paid Social</span>
            <strong>30%</strong>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span class="text-body-2">Email</span>
            <strong>20%</strong>
          </div>
          <div class="d-flex justify-space-between">
            <span class="text-body-2">Display</span>
            <strong>15%</strong>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card>
        <v-card-title>Launch SLA</v-card-title>
        <v-card-text>
          <p class="text-body-2 mb-2">Average time from draft to launch is 12.4 days for campaigns with completed creative documentation.</p>
          <v-chip size="small" color="success" variant="tonal" prepend-icon="mdi-trending-up">2.3 days faster vs last quarter</v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CampaignForm from '../components/campaign/CampaignForm.vue';

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
