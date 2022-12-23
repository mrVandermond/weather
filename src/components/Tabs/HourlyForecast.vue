<template>
  <div>{{ data }}</div>
</template>

<script lang="ts" setup>
import type { IForecastHour } from '@/api';
import { computed } from 'vue';

const props = defineProps<{
  hourlyForecast: IForecastHour[];
}>();

const data = computed(() => {
  if (!props.hourlyForecast.length) return '';

  return props.hourlyForecast[0].temp_c;
});
</script>

<script lang="ts">
export default {
  name: 'HourlyForecast',
};
</script>

<style scoped>

</style>
