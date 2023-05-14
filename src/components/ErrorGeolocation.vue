<template>
  <div class="geolocation-error">
    <span>Ошибка при получении геоданных. Попробуйте изменить настройки браузера</span>

    <BaseButton
      icon="geolocation"
      title="Определить местоположение"
      class="geolocation-error__button"
      @click="onClickReceiveGeolocation"
    />
  </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/BaseButton.vue';

const emits = defineEmits<{
  (event: 'receiveGeolocation'): void;
}>();

function onClickReceiveGeolocation(): void {
  emits('receiveGeolocation');
}
</script>

<style lang="scss" scoped>
.geolocation-error {
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  margin: 0 10px;
  border-radius: 10px;
  border: 1px solid #48319D;
  background-color: rgb(33, 26, 68);

  &__button {
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
  }
}
</style>
