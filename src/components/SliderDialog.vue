<template>
  <div class="slider-modal">
    <div class="slider-header">
      <div class="slider-header__pin" />

      <div class="slider-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.value"
          :class="{
            'slider-tabs__active': tab.value === activeTab
          }"
          class="slider-tabs__tab"
          @click="onClickTab(tab)"
        >
          {{ tab.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getHourlyForecastWeather } from '@/api';

interface ITab {
  name: string;
  value: number;
}

const tabs: ITab[] = [
  {
    name: 'По часам',
    value: 0,
  },
  {
    name: 'На неделю',
    value: 1,
  },
];

const props = defineProps<{
  latitude: number;
  longitude: number;
}>();
const activeTab = ref(tabs[0].value);

async function fetchHourlyForecast(lat: number, lon: number): Promise<void> {
  try {
    await getHourlyForecastWeather(lat, lon);
  } catch (error) {
    // TODO: Сделать отображение алерта
  }
}

onMounted(async () => {
  await fetchHourlyForecast(props.latitude, props.longitude);
});

const onClickTab = (tab: ITab): void => {
  if (tab.value === activeTab.value) return;

  activeTab.value = tab.value;
};
</script>

<style lang="scss" scoped>
.slider-modal {
  overflow: hidden;
  border-radius: 44px 44px 0 0;
  background-color: rgba(#2E335A,74%);
  box-shadow: inset 0 1px 0 #FFFFFF;
  backdrop-filter: blur(25px);
  width: 100%;
}

.slider-header {
  padding-top: 44px;
  border-bottom: 1px solid rgba(#FFF, 30%);
  box-shadow: 0 1px 0 rgba(#000, 20%);

  &__pin {
    position: absolute;
    top: 15px;
    left: calc(50% - 25px);
    height: 8px;
    width: 50px;
    background-color: rgba(#000, 40%);
    border-radius: 10px;
  }
}

.slider-tabs {
  display: flex;
  justify-content: space-between;
  padding: 0 44px;

  &__tab {
    font-weight: 600;
    font-size: 1rem;
    color: rgba(#EBEBF5, 60%);
    user-select: none;
  }

  &__active {
    border-bottom: 2px solid #5936B4;
  }
}
</style>
