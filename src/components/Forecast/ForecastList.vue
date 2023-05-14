<template>
  <div
    ref="listRef"
    class="forecast-list"
  >
    <ForecastItem
      v-for="item in props.list"
      :key="item.title"
      v-bind="item"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IForecastItem } from '@/components/Forecast/types';

import ForecastItem from '@/components/Forecast/ForecastItem.vue';
import { onActivated, shallowRef } from 'vue';
import { scrollIntoView } from '@/utils/functions';

const props = defineProps<{
  list: IForecastItem[];
}>();

const listRef = shallowRef<HTMLDivElement | null>(null);

onActivated(() => {
  if (!listRef.value) return;

  scrollIntoView(listRef.value, '.forecast-item_current');
});
</script>

<style lang="scss" scoped>
.forecast-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding: 20px;
  column-gap: 12px;
}
</style>
