<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      console.log("domUpdate");
    });
  },
};
</script>
