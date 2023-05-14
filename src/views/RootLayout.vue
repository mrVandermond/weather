<template>
  <div
    :style="{
      height: height + 'px',
    }"
    :class="{
      'main-frame_error': hasErrorWhenGetLocation,
    }"
    class="main-frame"
  >
    <MainInfo
      v-if="!hasErrorWhenGetLocation && mainInfo"
      :current-weather="mainInfo.currentWeather"
      :location-name="mainInfo.locationName"
      :max-temp="mainInfo.maxTemp"
      :min-temp="mainInfo.minTemp"
    />

    <SliderDialog
      v-if="forecastData && !hasErrorWhenGetLocation"
      :forecast-data="forecastData"
      class="slider-dialog"
    />

    <ErrorGeolocation
      v-if="hasErrorWhenGetLocation"
      @receive-geolocation="handleReceiveGeolocation"
    />

    <img
      class="main-frame__img"
      src="assets/main_frame.png"
      alt="main-frame"
    >
  </div>
</template>

<script lang="ts" setup>
import type { ICurrent, IForecastWeather } from '@/api/types';

import { ref, onMounted, computed, onUnmounted } from 'vue';
import { getGeolocation } from '@/composables/geolocation';

import MainInfo from '@/components/MainInfo.vue';
import ErrorGeolocation from '@/components/ErrorGeolocation.vue';
import SliderDialog from '@/components/SliderDialog.vue';
import { fetchForecastWeather } from '@/api';

interface IMainInfo {
  currentWeather: ICurrent;
  locationName: string;
  maxTemp: number;
  minTemp: number;
}

const forecastData = ref<IForecastWeather | null>(null);
const position = ref<GeolocationPosition>();
const hasErrorWhenGetLocation = ref(false);
const height = ref(0);

const mainInfo = computed<IMainInfo | null>(() => {
  if (!forecastData.value) return null;

  return {
    currentWeather: forecastData.value.current,
    locationName: forecastData.value.location.name,
    maxTemp: forecastData.value.forecast.forecastday[0].day.maxtemp_c,
    minTemp: forecastData.value.forecast.forecastday[0].day.mintemp_c,
  };
});

async function fetchWeather(lat: number, lon: number): Promise<void> {
  try {
    forecastData.value = await fetchForecastWeather(lat, lon);
  } catch (error) {
    // console.error(error); // TODO: Сделать отображение алерта
  }
}

const onResize = (): void => {
  height.value = window.innerHeight;
};

async function handleReceiveGeolocation(): Promise<void> {
  hasErrorWhenGetLocation.value = false;

  try {
    position.value = await getGeolocation();
    await fetchWeather(position.value.coords.latitude, position.value.coords.longitude);
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      hasErrorWhenGetLocation.value = true;
    }
  }
}

onMounted(async () => {
  height.value = window.innerHeight;
  window.addEventListener('resize', onResize);

  await handleReceiveGeolocation();
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<style scoped lang="scss">
.main-frame {
  position: relative;
  overflow: hidden;
  max-width: 425px;
  margin: auto;

  &_error {
    display: flex;
    align-items: center;
  }

  &__img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}

.slider-dialog {
  position: absolute;
  max-width: 425px;
  left: 0;
}
</style>
