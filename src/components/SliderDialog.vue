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
import { ref } from 'vue';

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

const activeTab = ref(tabs[0].value);

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
}

.slider-header {
  padding-top: 44px;
  border-bottom: 1px solid rgba(#FFF, 30%);
  box-shadow: 0 1px 0 rgba(#000, 20%);

  &__pin {
    position: absolute;
    top: 15px;
    left: calc(50% - 60px);
    height: 15px;
    width: 120px;
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
    font-size: 45px;
    color: rgba(#EBEBF5, 60%);
    user-select: none;
  }

  &__active {
    border-bottom: 5px solid #5936B4;
  }
}
</style>
