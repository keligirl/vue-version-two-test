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
  border-radius: 5px;
  width: 90px;
  height: 30px;
  font-size: 32px;
  color: #fff;
}
.default {
  /* 默认样式 */
  background-color: aqua;
}
.primary {
  /* 主要样式 */
  background-color: antiquewhite;
}
/* 其他样式 */
</style>
