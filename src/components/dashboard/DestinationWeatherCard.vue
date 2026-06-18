<template>
  <Card class="h-full border-slate-200 bg-white shadow-sm">
    <CardHeader class="pb-2">
      <CardTitle class="flex items-center gap-2 text-base font-semibold text-slate-900">
        <CloudSun class="size-4 text-sky-600" />
        Destination Weather Outlook
      </CardTitle>
      <CardDescription>Live forecast check for cruise planning.</CardDescription>
    </CardHeader>

    <CardContent class="pb-4 pt-0">
      <div v-if="isLoading" class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600">
        Checking destination weather...
      </div>

      <div v-else-if="errorMessage" class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-3 text-sm text-rose-700">
        Weather unavailable right now.
      </div>

      <div v-else-if="weather" class="space-y-3">
        <div class="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
          <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Destination</div>
          <div class="mt-0.5 text-sm font-semibold text-slate-900">{{ destinationLabel }}</div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-lg border border-slate-200 bg-white p-3">
            <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Temp</div>
            <div class="mt-1 text-2xl font-bold text-slate-900">{{ weather.temperatureF }}°F</div>
          </div>
          <div class="rounded-lg border border-slate-200 bg-white p-3">
            <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Condition</div>
            <div class="mt-1 text-sm font-semibold text-slate-900">{{ weather.condition }}</div>
          </div>
        </div>

        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <div class="mb-2 flex items-center justify-between gap-2">
            <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Precip Chance</div>
            <Badge class="bg-sky-100 text-sky-900 hover:bg-sky-100">{{ weather.precipChance }}%</Badge>
          </div>
          <Progress :model-value="weather.precipChance" class="h-2 bg-slate-100 [&>*]:bg-sky-500" />
        </div>

        <div class="rounded-lg border border-slate-200 bg-white p-3">
          <div class="mb-2 flex items-center justify-between gap-2">
            <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Cruise Day Score</div>
            <Badge
              :class="[
                weather.cruiseDayScore >= 8
                  ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-100'
                  : weather.cruiseDayScore >= 5
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-100'
                    : 'bg-rose-100 text-rose-900 hover:bg-rose-100'
              ]"
            >
              {{ weather.cruiseDayScore }}/10
            </Badge>
          </div>
          <Progress :model-value="weather.cruiseDayScore * 10" class="h-2 bg-slate-100 [&>*]:bg-emerald-500" />
        </div>
      </div>

      <div v-else class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600">
        Weather unavailable right now.
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CloudSun } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type OpenMeteoResponse = {
  current?: {
    time?: string;
    temperature_2m?: number;
    precipitation?: number;
    weather_code?: number;
  };
  hourly?: {
    time?: string[];
    precipitation_probability?: number[];
  };
};

type WeatherState = {
  temperatureF: number;
  condition: string;
  precipChance: number;
  cruiseDayScore: number;
};

const destinationLabel = 'Cozumel, Mexico';
const latitude = 20.4230;
const longitude = -86.9223;

const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude.toFixed(4)}&longitude=${longitude.toFixed(4)}&current=temperature_2m,precipitation,weather_code&hourly=precipitation_probability&temperature_unit=fahrenheit&forecast_days=1`;

const isLoading = ref(true);
const errorMessage = ref<string | null>(null);
const weather = ref<WeatherState | null>(null);

const toFriendlyCondition = (weatherCode: number): string => {
  if (weatherCode === 0) return 'Clear skies';
  if (weatherCode === 1 || weatherCode === 2) return 'Partly cloudy';
  if (weatherCode === 3) return 'Overcast';
  if (weatherCode === 45 || weatherCode === 48) return 'Foggy';
  if ([51, 53, 55, 56, 57].includes(weatherCode)) return 'Light drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return 'Rain likely';
  if ([95, 96, 99].includes(weatherCode)) return 'Storm risk';
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return 'Snow conditions';
  return 'Mixed conditions';
};

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const isRainOrStormCode = (weatherCode: number): boolean => {
  return [61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(weatherCode);
};

const computeCruiseDayScore = (temperatureF: number, precipChance: number, weatherCode: number): number => {
  let score = 10;

  if (precipChance > 40) {
    score -= 2;
  }

  if (isRainOrStormCode(weatherCode)) {
    score -= 2;
  }

  if (temperatureF < 70 || temperatureF > 90) {
    score -= 1;
  }

  return clamp(score, 1, 10);
};

const getNextPrecipitationChance = (payload: OpenMeteoResponse): number => {
  const times = payload.hourly?.time ?? [];
  const values = payload.hourly?.precipitation_probability ?? [];

  if (times.length === 0 || values.length === 0) {
    return 0;
  }

  const currentTimeIso = payload.current?.time;
  if (!currentTimeIso) {
    return clamp(Math.round(values[0] ?? 0), 0, 100);
  }

  const now = new Date(currentTimeIso).getTime();

  for (let index = 0; index < times.length; index += 1) {
    const slot = new Date(times[index]).getTime();
    if (slot >= now) {
      return clamp(Math.round(values[index] ?? 0), 0, 100);
    }
  }

  return clamp(Math.round(values[0] ?? 0), 0, 100);
};

const loadWeather = async (): Promise<void> => {
  isLoading.value = true;
  errorMessage.value = null;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Failed weather request');
    }

    const payload = (await response.json()) as OpenMeteoResponse;
    const temperatureF = Math.round(payload.current?.temperature_2m ?? NaN);
    const weatherCode = payload.current?.weather_code;

    if (!Number.isFinite(temperatureF) || weatherCode === undefined) {
      throw new Error('Missing weather fields');
    }

    const precipChance = getNextPrecipitationChance(payload);
    const cruiseDayScore = computeCruiseDayScore(temperatureF, precipChance, weatherCode);

    weather.value = {
      temperatureF,
      condition: toFriendlyCondition(weatherCode),
      precipChance,
      cruiseDayScore
    };
  } catch {
    errorMessage.value = 'Weather unavailable right now.';
    weather.value = null;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  void loadWeather();
});
</script>
