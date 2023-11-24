<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <vuedraggable/> -->
    <upload></upload>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import vuedraggable from './components/vuedraggable.vue';
import upload from './components/upload.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    vuedraggable,
    upload
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
