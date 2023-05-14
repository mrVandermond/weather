<template>
  <div
    :class="{
      'forecast-item_current': props.isCurrent,
    }"
    class="forecast-item"
  >
    <div class="forecast-item__title">
      {{ props.title }}
    </div>

    <div class="forecast-item__condition">
      <img
        :src="iconPath"
        width="32"
        height="32"
        alt="weather condition icon"
      >
    </div>

    <div class="forecast-item__temperature">
      {{ props.temperature }}&ordm;
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IForecastItem } from '@/components/Forecast/types';
import weatherConditions from '@/utils/weatherConditions.json';
import { computed } from 'vue';

const props = defineProps<{
  title: IForecastItem['title'];
  conditionCode: IForecastItem['conditionCode'];
  temperature: IForecastItem['temperature'];
  isCurrent: IForecastItem['isCurrent'];
}>();

const iconPath = computed(() => {
  const iconName = weatherConditions.find((item) => item.code === props.conditionCode)?.icon;

  if (!iconName) return '';

  return `assets/icons/${iconName}.png`;
});
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
  background-color: rgba(#48319D, 0.2);
  width: 60px;

  &__title {
    font-size: 1rem;
    font-weight: 600;
  }

  &__temperature {
    font-size: 1.25rem;
  }

  &_current {
    background-color: #48319D;
  }
}
</style>
