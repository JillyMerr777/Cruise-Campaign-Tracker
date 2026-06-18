<template>
  <Card class="border-sky-100/60 bg-white/85 shadow-[0_14px_30px_rgba(41,71,125,0.13)] backdrop-blur-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base font-semibold text-slate-900">Campaign Notes</CardTitle>
    </CardHeader>
    <CardContent>
      <Textarea v-model="note" placeholder="Add note" rows="4" />
      <Button class="mt-2 bg-cyan-500 text-white hover:bg-cyan-400">
        <Save class="mr-1 size-4" />
        Save Note
      </Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Save } from '@lucide/vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const note = ref('');
</script>
