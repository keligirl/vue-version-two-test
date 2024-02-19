<template>
  <div id="app">
    <vue-plugin>我是自定义插件</vue-plugin>
    <KeepAlive>
      <component :is="currentComponent" id="1" :value="{}"></component>
    </KeepAlive>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import VueDirective from "./components/VueDirective.vue";
import VueSet from "./components/VueSet.vue";
import VueNextTick from "./components/VueNextTick.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    VueDirective,
    VueSet,
    VueNextTick,
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
        value: "222",
      },
      // 动态引入组件
      currentComponent: "VueDirective",
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
