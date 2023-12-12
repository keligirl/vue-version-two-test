<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <vuedraggable/> -->
    <!-- <upload></upload> -->
    <squared></squared>
    <!-- <grid :items="items" @input="updateItemsOrder"></grid> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import vuedraggable from './components/vuedraggable.vue';
import upload from './components/upload.vue';
import squared from './components/squared.vue';
import grid from "./components/grid.vue"

export default {
  name: 'App',
  components: {
    HelloWorld,
    vuedraggable,
    upload,
    squared,
    grid
  },
  data() {
    return {
      items: [
        { id: 1, content: 'Item 1' },
        { id: 2, content: 'Item 2' },
        { id: 3, content: 'Item 3' },
        { id: 4, content: 'Item 4' },
        { id: 5, content: 'Item 5' },
      ],
    }
  },
  methods: {
    updateItemsOrder(newOrder) {
      this.items = newOrder;
      console.log('新排序:', newOrder);
    },
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
