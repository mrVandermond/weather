<template>
  <ForecastList
    :list="forecastList"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { IForecastHour } from '@/api/types';
import type { IForecastItem } from '@/components/Forecast/types';

import ForecastList from '@/components/Forecast/ForecastList.vue';
import { useFilters } from '@/composables';
import { isCurrentHour } from '@/utils/functions';

const props = defineProps<{
  hourlyForecast: IForecastHour[];
}>();
const filters = useFilters();

const forecastList = computed<IForecastItem[]>(() => props.hourlyForecast.map((item) => ({
  title: filters.hoursWithLeadingZero(item.time_epoch * 1e3),
  conditionCode: item.condition.code,
  temperature: Math.round(item.temp_c),
  isCurrent: isCurrentHour(item.time_epoch * 1e3),
})));
</script>
