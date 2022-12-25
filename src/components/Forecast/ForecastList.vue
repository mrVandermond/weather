<template>
  <div class="forecast-list">
    <ForecastItem
      v-for="item in props.list"
      :key="item.title"
      :title="item.title"
      :condition-code="item.conditionCode"
      :temperature="item.temperature"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IForecastItem } from '@/components/Forecast/types';

import ForecastItem from '@/components/Forecast/ForecastItem.vue';

const props = defineProps<{
  list: IForecastItem[];
}>();
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
