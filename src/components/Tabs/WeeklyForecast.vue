<template>
  <div>{{ data }}</div>
</template>

<script lang="ts" setup>
import type { IForecastDay } from '@/api';
import { computed } from 'vue';

const props = defineProps<{
  weeklyForecast: IForecastDay[];
}>();

const data = computed(() => {
  if (!props.weeklyForecast.length) return '';

  return props.weeklyForecast[0].avgtemp_c;
});
</script>

<script lang="ts">
export default {
  name: 'WeeklyForecast',
};
</script>

<style scoped>

</style>
