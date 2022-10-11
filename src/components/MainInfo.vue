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

    <div class="main-info__house-wrapper">
      <img
        class="main-info__house-img"
        src="/assets/house.svg"
        alt="house"
      >
    </div>
  </div>

  <SliderDialog
    class="slider-dialog"
  />
</template>

<script lang="ts" setup>
import type { ICurrentWeather } from '@/api';

import { computed } from 'vue';
import { useFilters } from '@/composables';

import SliderDialog from '@/components/SliderDialog.vue';

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
  height: 100%;
  padding-top: 150px;
  padding-bottom: 50px;
  user-select: none;

  &__location-name {
    font-size: 72px;
    text-align: center;
  }

  &__temp {
    margin-top: 12px;
    font-size: 200px;
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

  &__house-wrapper {
    margin-top: 100px;
  }

  &__house-img {
    width: 100%;
  }
}

.slider-dialog {
  width: 100%;
  height: 560px;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
