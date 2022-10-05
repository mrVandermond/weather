<template>
  <div class="main-frame">
    <MainInfo
      v-if="currentWeather"
      :current-weather="currentWeather"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ICurrentWeather } from '@/api';

import { ref, onMounted } from 'vue';
import { getWeather } from '@/api';

import MainInfo from '@/components/MainInfo.vue';

const currentWeather = ref<ICurrentWeather>();

async function fetchWeather(lat: number, lon: number): Promise<void> {
  try {
    currentWeather.value = await getWeather(lat, lon);
  } catch (error) {
    // TODO: Сделать отображение алерта
  }
}

onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => { // TODO: Сделать промисификацию
    void fetchWeather(position.coords.latitude, position.coords.longitude);
  }); // TODO: Сделать обработку, когда не получили геоданные
});
</script>

<style scoped lang="scss">
.main-frame {
  width: 100vw;
  height: 100vh;
  background: url('assets/main_frame.svg') no-repeat;
  background-size: cover;
}
</style>
