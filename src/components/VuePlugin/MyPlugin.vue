<template>
  <button class="button" :class="type" @click="handleClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style>
.button {
  /* 样式 */
}
.default {
  /* 默认样式 */
}
.primary {
  /* 主要样式 */
}
/* 其他样式 */
</style>
