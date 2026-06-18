<template>
  <v-card>
    <v-card-title>Creative Performance</v-card-title>
    <v-card-text>
      <v-row class="mb-2" dense>
        <v-col cols="12" md="6">
          <v-sheet rounded="lg" color="surface-bright" class="pa-4 h-100">
            <div class="text-caption mb-1">Top Creative</div>
            <div class="text-body-1 font-weight-medium mb-1">Family Adventure Reel</div>
            <div class="text-caption mb-3">CTR 3.9% • Conversions 460 • Revenue $182K</div>

            <div class="d-flex align-center ga-3">
              <v-progress-circular :model-value="89" size="54" width="6" color="success">
                89
              </v-progress-circular>
              <div>
                <div class="text-caption text-medium-emphasis">Resonance Score</div>
                <div class="text-body-2 font-weight-medium">Top 8% of active creatives</div>
              </div>
            </div>
          </v-sheet>
        </v-col>

        <v-col cols="12" md="6">
          <v-sheet rounded="lg" color="surface-bright" class="pa-4 h-100">
            <div class="text-caption mb-1">A/B Insight</div>
            <div class="text-body-1 font-weight-medium mb-2">CTA "Book by Friday" outperformed by 18%</div>
            <div class="text-caption mb-3">Recommendation: propagate variant B across Paid Social and Email.</div>

            <v-chip size="x-small" color="primary" variant="tonal" prepend-icon="mdi-trending-up">
              +14% projected conversion lift
            </v-chip>
          </v-sheet>
        </v-col>
      </v-row>

      <div class="text-caption text-medium-emphasis mb-2">Creative Impact Metrics</div>
      <div class="mb-2">
        <div class="d-flex justify-space-between text-caption mb-1">
          <span>Hook Strength</span>
          <span>84%</span>
        </div>
        <v-progress-linear :model-value="84" color="info" rounded height="8" />
      </div>

      <div class="mb-2">
        <div class="d-flex justify-space-between text-caption mb-1">
          <span>Message Clarity</span>
          <span>78%</span>
        </div>
        <v-progress-linear :model-value="78" color="secondary" rounded height="8" />
      </div>

      <div>
        <div class="d-flex justify-space-between text-caption mb-1">
          <span>Conversion Impact</span>
          <span>81%</span>
        </div>
        <v-progress-linear :model-value="81" color="success" rounded height="8" />
      </div>
    </v-card-text>
  </v-card>
</template>
