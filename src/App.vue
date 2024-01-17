<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <vuedraggable/> -->
    <!-- <upload></upload> -->
    <!-- <squared></squared> -->
    <!-- <grid :items="items" @input="updateItemsOrder"></grid> -->
    <!-- <Syntax v-model="vModel"></Syntax> -->
    <!-- <animalCss></animalCss> -->
    <KeepAlive>
      <component :is="currentComponent" id="1"></component>
    </KeepAlive>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import vuedraggable from "./components/vuedraggable.vue";
import upload from "./components/upload.vue";
import squared from "./components/squared.vue";
import grid from "./components/grid.vue";
import Syntax from "./components/Syntax.vue";
import animalCss from "./components/animalCss.vue"

export default {
  name: "App",
  components: {
    HelloWorld,
    vuedraggable,
    upload,
    squared,
    grid,
    Syntax,
    animalCss
  },
  data() {
    return {
      items: [
        { id: 1, content: "Item 1" },
        { id: 2, content: "Item 2" },
        { id: 3, content: "Item 3" },
        { id: 4, content: "Item 4" },
        { id: 5, content: "Item 5" },
      ],
      // vModel: "222",
      vModel: {
        value: "222"
      },
      // 动态引入组件
      currentComponent: "upload"
    };
  },
  methods: {
    updateItemsOrder(newOrder) {
      this.items = newOrder;
      console.log("新排序:", newOrder);
    },
  },
};
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
