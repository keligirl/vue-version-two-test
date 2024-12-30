<template>
  <div id="app">
    <div class="padding">=========vue插件开发=========</div>
    <!-- <vue-plugin type="text" @click="handleClick">我是自定义插件</vue-plugin> -->
    <vue-plugin type="text" @click="handleClick">
      <template v-slot:header>
        <h1>函数类型组件</h1>
      </template>

      <p>button</p>

      <template v-slot:footer>
        <p>具名作用域插槽</p>
      </template>
    </vue-plugin>
    <div class="padding">=========vue插件开发=========</div>

    <div class="padding">=========Vue定制化组件渲染=========</div>
    <functionComponentOfRender :level="2"
      >functionComponentOfRender</functionComponentOfRender
    >
    <partComponentsRender
      >overallSituationComponentOfRender</partComponentsRender
    >
    <div class="padding">=========Vue定制化组件渲染=========</div>

    <div class="padding">=========第三方插件使用测试=========</div>
    <KeepAlive>
      <component :is="currentComponent" id="1" :value="{}"></component>
    </KeepAlive>
    <div class="padding">=========第三方插件使用测试=========</div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import VueDirective from "./components/VueDirective.vue";
import VueSet from "./components/VueSet.vue";
import VueNextTick from "./components/VueNextTick.vue";
import partComponentsRender from "./components/part";

import axios from "axios";

export default {
  name: "App",
  components: {
    HelloWorld,
    VueDirective,
    VueSet,
    VueNextTick,
    partComponentsRender,
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
  provide: {
    provideInfo: "我是依赖注入提供方",
  },
  methods: {
    updateItemsOrder(newOrder) {
      this.items = newOrder;
      console.log("新排序:", newOrder);
    },
    handleClick() {
      console.log("el-button-methods");
    },
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    axios.get("http://localhost:5000/api/data").then((response) => {
      this.message = response.data.message;
    });
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
.padding {
  padding: 20px 0;
}
</style>
