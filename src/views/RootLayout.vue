<template>
  <div class="main-frame">
    <MainInfo
      v-if="forecastData && !hasErrorWhenGetLocation"
      :current-weather="currentWeather"
      :location-name="locationName"
    />

    <SliderDialog
      v-if="forecastData && !hasErrorWhenGetLocation"
      :latitude="position?.coords.latitude"
      :longitude="position?.coords.longitude"
      class="slider-dialog"
    />

    <ErrorGeolocation
      v-if="hasErrorWhenGetLocation"
    />

    <img
      class="main-frame-img"
      src="assets/main_frame.svg"
      alt="main-frame"
    >
  </div>
</template>

<script lang="ts" setup>
import type { ICurrent, IForecastWeather } from '@/api/types';

import { ref, onMounted, computed } from 'vue';
import { getGeolocation } from '@/composables/geolocation';

import MainInfo from '@/components/MainInfo.vue';
import ErrorGeolocation from '@/components/ErrorGeolocation.vue';
import SliderDialog from '@/components/SliderDialog.vue';
import { fetchForecastWeather } from '@/api';

const forecastData = ref<IForecastWeather | null>(null);
const position = ref<GeolocationPosition>();
const hasErrorWhenGetLocation = ref(false);

const currentWeather = computed<ICurrent | null>(() => {
  if (!forecastData.value) return null;

  return forecastData.value.current;
});
const locationName = computed(() => {
  if (!forecastData.value) return '';

  return forecastData.value.location.name;
});

async function fetchWeather(lat: number, lon: number): Promise<void> {
  try {
    forecastData.value = await fetchForecastWeather(lat, lon);
  } catch (error) {
    // console.error(error); // TODO: Сделать отображение алерта
  }
}

onMounted(async () => {
  try {
    position.value = await getGeolocation();

    await fetchWeather(position.value.coords.latitude, position.value.coords.longitude);
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      hasErrorWhenGetLocation.value = true;
    }
  }
});
</script>

<style scoped lang="scss">
.main-frame {
  position: relative;
  overflow: hidden;
  max-width: 425px;
  margin: auto;
}
.main-frame-img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.slider-dialog {
  position: absolute;
  max-width: 425px;
  left: 0;
}
</style>
