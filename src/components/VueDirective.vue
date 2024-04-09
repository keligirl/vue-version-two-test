<template>
  <div>
    <input type="text" name="" id="" v-focus />
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
  },
  data() {
    return {
      // bar: this.provideInfo,
    };
  },
  // inject: ["provideInfo"],
  inject: {
    provideInfo: {
      // from: "App",
      // default: "provideInfo"
      default: () => [111],
    },
  },
  mounted() {
    console.log(this.provideInfo);
    console.log(this.bar);
  },
};
</script>
