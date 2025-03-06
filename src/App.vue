<template>
  <div id="app">
    <!-- <h2 class="padding">vue插件开发</h2>
    <vue-plugin type="text" @click="handleClick">
      <template v-slot:header>
        <h4>函数类型组件</h4>
      </template>
      <template v-slot:default> default </template>
      <template v-slot:footer>
        <p>具名作用域插槽</p>
      </template>
    </vue-plugin>

    <h2 class="padding">Vue定制化组件渲染</h2>
    <functionComponentOfRender :level="2">functionComponentOfRender</functionComponentOfRender>
    <partComponentsRender>overallSituationComponentOfRender</partComponentsRender> -->

    <!--    debugger -->

    <button @click="handleClick">debugger</button>

    <div class="padding">动态引入组件</div>
    <KeepAlive>
      <component v-model="modelValue" :is="currentComponent"></component>
    </KeepAlive>
  </div>
</template>

<script>
import axios from "axios";

import VueDirective from "./components/VueDirective.vue";
import VueSet from "./components/VueSet.vue";
import VueNextTick from "./components/VueNextTick.vue";
import partComponentsRender from "./components/part";

import HelloWorld from "./components/HelloWorld.vue";
import Upload from "./components/Upload.vue";

export default {
  name: "App",
  components: {
    VueDirective,
    VueSet,
    VueNextTick,
    partComponentsRender,

    HelloWorld,
    Upload
  },
  data() {
    return {
      items: [
        { id: 1, content: "Item 1" },
        { id: 2, content: "Item 2" },
        { id: 3, content: "Item 3" },
        { id: 4, content: "Item 4" },
        { id: 5, content: "Item 5" }
      ],
      // 动态引入组件
      currentComponent: "Upload",
      modelValue: ""
    };
  },
  provide: {
    provideInfo: "我是依赖注入提供方"
  },
  methods: {
    async getData() {
      let respose = await axios.get("http://localhost:9000/api/data");
      console.log("响应数据：", respose);
    },
    updateItemsOrder(newOrder) {
      this.items = newOrder;
      console.log("新排序:", newOrder);
    },
    handleClick() {
      let i = 1;
      i = i + 1;
      console.log("el-button-methods:", i);
    }
  },
  created() {
    console.log("created");
    // this.getData();
  },
  mounted() {
    console.log("mounted");
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.padding {
  width: 100%;
  height: 24px;
  background-color: rgb(240, 179, 104);
  padding: 20px 0;
}
</style>
