<template>
  <div class="main-info">
    <div class="main-info__location-name">
      {{ props.currentWeather.name }}
    </div>

    <div class="main-info__temp">
      {{ roundedTemp }}&ordm;
    </div>

    <div class="main-info__description">
      {{ description }}
    </div>

    <div class="main-info__range-temp">
      H:{{ roundedMaxTemp }}&ordm; L:{{ roundedMinTemp }}&ordm;
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ICurrentWeather } from '@/api';

import { defineProps, computed } from 'vue';
import { useFilters } from '@/composables';

const props = defineProps<{
  currentWeather: ICurrentWeather;
}>();
const filters = useFilters();

const roundedTemp = computed(() => Math.round(props.currentWeather.main.temp));
const roundedMaxTemp = computed(() => Math.round(props.currentWeather.main.temp_max));
const roundedMinTemp = computed(() => Math.round(props.currentWeather.main.temp_min));
const description = computed(() => {
  if (!props.currentWeather.weather.length) return '';

  return filters.capitalize(props.currentWeather.weather[0].description);
});
</script>

<style lang="scss" scoped>
.main-info {
  padding-top: 100px;

  &__location-name {
    font-size: 56px;
    text-align: center;
  }

  &__temp {
    margin-top: 12px;
    font-size: 140px;
    text-align: center;
    font-weight: 300;
  }

  &__description {
    font-weight: 600;
    font-size: 45px;
    margin-top: 12px;
    color: rgba(#EBEBF5, 60%);
    text-align: center;
  }

  &__range-temp {
    text-align: center;
    font-weight: 600;
    font-size: 45px;
  }
}
</style>
