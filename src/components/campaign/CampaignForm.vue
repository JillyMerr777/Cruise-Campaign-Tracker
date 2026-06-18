<template>
  <v-card>
    <v-card-title>Create New Campaign</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12" md="6"><v-text-field label="Campaign Name" /></v-col>
          <v-col cols="12" md="6"><v-text-field label="Objective" /></v-col>
          <v-col cols="12" md="6"><v-select label="Target Segment" :items="segments" /></v-col>
          <v-col cols="12" md="6"><v-select label="Destination" :items="destinations" /></v-col>
          <v-col cols="12" md="6"><v-select label="Offer Type" :items="offers" /></v-col>
          <v-col cols="12" md="6"><v-select label="Channel Mix" :items="channels" multiple chips /></v-col>
          <v-col cols="12" md="6"><v-text-field type="date" label="Start Date" /></v-col>
          <v-col cols="12" md="6"><v-text-field type="date" label="End Date" /></v-col>
          <v-col cols="12" md="6"><v-text-field label="Budget" prefix="$" /></v-col>
          <v-col cols="12" md="6"><v-text-field label="Owner" /></v-col>
          <v-col cols="12"><v-textarea label="Summary Notes" rows="3" /></v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const segments = ['Families', 'Couples', 'Loyalty Guests', 'First-time Cruisers', 'Luxury Travelers'];
const destinations = ['Caribbean', 'Mediterranean', 'Alaska', 'Bahamas'];
const offers = ['% Off Fare', 'Onboard Credit', 'Kids Sail Free', 'Balcony Upgrade'];
const channels = ['Instagram', 'Email', 'Website', 'Mobile App', 'X/Twitter'];
</script>
