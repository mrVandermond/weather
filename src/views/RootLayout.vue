<template>
  <div>Пока</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { getWeather } from '@/api';

async function fetchWeather(lat: number, lon: number): Promise<void> {
  await getWeather(lat, lon);
}

onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    void fetchWeather(position.coords.latitude, position.coords.longitude);
  });
});
</script>

<style scoped>

</style>
