<template>
  <button
    class="base-button"
    @click="onClick"
  >
    <slot name="pre-icon">
      <img
        v-if="props.icon"
        :src="`assets/icons/${icon}.svg`"
        alt="button icon"
        class="base-button__icon"
      >
    </slot>

    <span v-if="props.title">
      {{ props.title }}
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  icon?: string;
}>();

const emits = defineEmits<{
  (event: 'click'): void;
}>();

function onClick(): void {
  emits('click');
}
</script>

<style scoped lang="scss">
.base-button {
  user-select: none;
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid #48319D;
  background-color: rgb(33, 26, 68);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  transition: background-color 200ms ease-in;

  &:hover, &:active {
    background-color: lighten(#48319D, 10%);
  }

  &__icon {
    margin-right: 8px;
  }
}
</style>
