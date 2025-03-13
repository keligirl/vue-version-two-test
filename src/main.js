import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

/* 注册全局组件函数组件 */
import "./components/Render"

import VuePlugin from "./components/VuePlugin";

import "animate.css";

import App from "./App.vue";

/* 注册全局指令 */
Vue.directive("focus", {
  inserted: function (element) {
    element.focus();
  },
});

/* 使用第三方插件 */
Vue.use(ElementUI);
/* 自定义第三方插件 */
Vue.use(VuePlugin);

Vue.config.productionTip = false;

//由于脚手架方式引入的vue是非完整版的vue.runtime.esm.js文件，所以无法使用Vue.compile函数

new Vue({
  /* 渲染函数 */
  render: (h) => h(App),
}).$mount("#app");
