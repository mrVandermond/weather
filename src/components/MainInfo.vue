<template>
  <div
    :style="{
      height: height + 'px'
    }"
    class="main-info"
  >
    <div class="main-info__location-name">
      {{ props.locationName }}
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
        src="/assets/house.png"
        alt="house"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useFilters } from '@/composables';
import type { ICurrent } from '@/api/types';

const props = defineProps<{
  currentWeather: ICurrent;
  locationName: string;
  maxTemp: number;
  minTemp: number;
}>();
const filters = useFilters();

const height = ref(0);

const roundedTemp = computed(() => Math.round(props.currentWeather.temp_c));
const roundedMaxTemp = computed(() => Math.round(props.maxTemp));
const roundedMinTemp = computed(() => Math.round(props.minTemp));
const description = computed(() => filters.capitalize(props.currentWeather.condition.text));

const onResize = (): void => {
  height.value = window.innerHeight;
};

onMounted(() => {
  height.value = window.innerHeight;
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<style lang="scss" scoped>
.main-info {
  position: relative;
  padding-top: 150px;
  padding-bottom: 50px;
  user-select: none;
  z-index: 0;

  &__location-name {
    font-size: 2.125rem;
    text-align: center;
    line-height: 2.5rem;
  }

  &__temp {
    margin-top: 0.75rem;
    font-size: 6rem;
    text-align: center;
    font-weight: 100;
    line-height: 4.375rem;
  }

  &__description {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin-top: 0.75rem;
    color: rgba(#EBEBF5, 60%);
    text-align: center;
  }

  &__range-temp {
    text-align: center;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }

  &__house-wrapper {
    position: absolute;
    bottom: -16px;
    left: 0;
    margin-top: 100px;
    z-index: -1;
    width: 100%;
  }

  &__house-img {
    width: 100%;
  }
}
</style>
