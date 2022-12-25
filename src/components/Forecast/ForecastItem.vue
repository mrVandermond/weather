<template>
  <div class="forecast-item">
    <div class="forecast-item__title">
      {{ props.title }}
    </div>

    <div class="forecast-item__condition">
      {{ props.conditionCode }}
    </div>

    <div class="forecast-item__temperature">
      {{ props.temperature }}&ordm;
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IForecastItem } from '@/components/Forecast/types';

const props = defineProps<{
  title: IForecastItem['title'];
  conditionCode: IForecastItem['conditionCode'];
  temperature: IForecastItem['temperature'];
}>();
</script>

<style lang="scss" scoped>
.forecast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  padding: 16px 8px;
  box-shadow: 5px 4px 10px rgba(#000, 0.25), inset 1px 1px 0 rgba(#fff, 0.25);
  border: 1px solid rgba(#fff, 0.2);
  border-radius: 30px;
  background: rgba(#48319D, 0.2);
  width: 60px;

  &__title {
    font-size: 15px;
    font-weight: 600;
  }

  &__temperature {
    font-size: 20px;
  }
}
</style>
