<template>
  <div
    ref="modal"
    :style="{
      transform: transformSlider,
    }"
    :class="{
      'slider-modal__transition': !isDragModal,
    }"
    class="slider-modal"
  >
    <div
      ref="modalHeader"
      class="slider-header"
    >
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

    <transition
      :name="directionOfTransition"
      mode="out-in"
    >
      <keep-alive>
        <component
          :is="currentTabComponent"
          :hourly-forecast="hourlyForecast"
          :weekly-forecast="weeklyForecast"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import HourlyForecast from '@/components/Tabs/HourlyForecast.vue';
import WeeklyForecast from '@/components/Tabs/WeeklyForecast.vue';
import { getHourlyForecastWeather, IForecastDay, IForecastHour, IHourlyForecast } from '@/api';

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

const isDragModal = ref(false);
const isBodyTabVisible = ref(false);

const modal = ref<HTMLDivElement | null>(null);
const modalHeader = ref<HTMLDivElement | null>(null);

const touchCoordY = ref<number | null>(null);
const touchCoordYStart = ref<number | null>(null);
const transformY = ref(0);

const heightModalHeader = ref(0);
const heightModal = ref(0);

const forecastData = ref<IHourlyForecast | null>(null);

const transformSlider = computed(() => `translateY(${transformY.value}px)`);
const currentTabComponent = computed(() => {
  if (activeTab.value === 0) return HourlyForecast;

  if (activeTab.value === 1) return WeeklyForecast;

  return '';
});
const directionOfTransition = computed(() => {
  if (activeTab.value === 0) return 'right';

  if (activeTab.value === 1) return 'left';

  return '';
});
const hourlyForecast = computed<IForecastHour[]>(() => {
  if (!forecastData.value) return [];

  return forecastData.value.forecast.forecastday[0].hour;
});
const weeklyForecast = computed<IForecastDay[]>(() => {
  if (!forecastData.value) return [];

  return forecastData.value.forecast.forecastday.map((item) => item.day);
});

const fetchForecast = async (): Promise<void> => {
  try {
    forecastData.value = await getHourlyForecastWeather(props.latitude, props.longitude);
  } catch {
    // TODO
  }
};

watchEffect(() => {
  if (!isBodyTabVisible.value) return;

  void fetchForecast();
});

const onTouchStart = (event: TouchEvent): void => {
  isDragModal.value = true;
  touchCoordY.value = Math.round(event.touches[0].screenY);
  touchCoordYStart.value = Math.round(event.touches[0].screenY);
};
const onTouchMove = (event: TouchEvent): void => {
  if (touchCoordY.value === null || !isDragModal.value) return;

  const delta = event.touches[0].screenY - touchCoordY.value;

  if (transformY.value + delta >= -heightModalHeader.value) return;

  if (transformY.value + delta <= -heightModal.value) return;

  transformY.value += Math.round(delta);
  touchCoordY.value = event.touches[0].screenY;
};
const onTouchEnd = (): void => {
  isDragModal.value = false;

  if (touchCoordYStart.value === null || touchCoordY.value === null) return;

  const delta = touchCoordYStart.value - touchCoordY.value;

  if (delta < -50 && delta < 0) {
    transformY.value = -heightModalHeader.value;
    isBodyTabVisible.value = false;

    return;
  }

  if (delta >= -50 && delta < 0) {
    transformY.value = -heightModal.value;

    return;
  }

  if (delta > 50 && delta > 0) {
    transformY.value = -heightModal.value;
    isBodyTabVisible.value = true;

    return;
  }

  if (delta <= 50 && delta > 0) {
    transformY.value = -heightModalHeader.value;
  }
};

onMounted(() => {
  if (!modal.value) return;

  modal.value.addEventListener('touchstart', onTouchStart);
  modal.value.addEventListener('touchmove', onTouchMove);
  modal.value.addEventListener('touchend', onTouchEnd);

  if (modalHeader.value) {
    heightModalHeader.value = parseFloat(getComputedStyle(modalHeader.value).height);
    heightModal.value = parseFloat(getComputedStyle(modal.value).height);

    transformY.value = -heightModalHeader.value;
  }
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
  height: 260px;

  &__transition {
    transition: transform 0.2s ease;
  }
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

.right-enter-from,
.left-leave-to {
  transform: translateX(-100vw);
}
.right-enter-active,
.left-leave-active,
.right-leave-active,
.left-enter-active {
  transition: transform 0.3s ease;
}
.right-leave-to,
.left-enter-from {
  transform: translateX(100vw);
}
</style>
