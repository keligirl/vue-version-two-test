<template>
  <div>
    <h1 class="animate__animated animate__bounce">An animated element</h1>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
  },
  created() {
    console.log(this.id);
  },
};
</script>
