<template>
  <v-card>
    <v-card-title>Budget Pacing</v-card-title>
    <v-card-text>
      <div class="d-flex justify-space-between mb-2">
        <span>Spend</span>
        <strong>{{ spendLabel }} / {{ budgetLabel }}</strong>
      </div>
      <v-progress-linear :model-value="pace" color="warning" height="12" rounded />
      <p class="text-caption mt-2">{{ pace.toFixed(1) }}% of budget consumed</p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatCurrency } from '../../utils/formatters';

const props = defineProps<{ spend: number; budget: number }>();

const pace = computed(() => (props.budget === 0 ? 0 : (props.spend / props.budget) * 100));
const spendLabel = computed(() => formatCurrency(props.spend));
const budgetLabel = computed(() => formatCurrency(props.budget));
</script>
