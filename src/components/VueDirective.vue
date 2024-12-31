<template>
  <div>
    <input v-model="value" type="text" v-focus />
  </div>
</template>
<script>
export default {
  props: {
    bar: {
      default() {
        return this.provideInfo;
      },
    },
    modelValue: String,
  },
  // inject: ["provideInfo"],
  inject: {
    provideInfo: {
      // from: "App",
      // default: "provideInfo"
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {};
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  mounted() {
    console.log(this.provideInfo);
    console.log(this.bar);
  },
};
</script>
