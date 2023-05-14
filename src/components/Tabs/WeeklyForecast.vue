<template>
  <ForecastList
    :list="forecastList"
  />
</template>

<script lang="ts" setup>
import ForecastList from '@/components/Forecast/ForecastList.vue';
import type { IForecastDayWithDate } from '@/api/types';
import { computed } from 'vue';
import type { IForecastItem } from '@/components/Forecast/types';
import { useFilters } from '@/composables';
import { isCurrentDate } from '@/utils/functions';

const props = defineProps<{
  weeklyForecast: IForecastDayWithDate[];
}>();
const filters = useFilters();

const forecastList = computed<IForecastItem[]>(() => props.weeklyForecast.map((item) => ({
  title: filters.dayOfWeek(item.date_epoch * 1e3),
  conditionCode: item.condition.code,
  temperature: Math.round(item.avgtemp_c),
  isCurrent: isCurrentDate(item.date_epoch * 1e3),
})));
</script>
