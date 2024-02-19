import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import VuePlugin from "./components/VuePlugin";

import App from "./App.vue";

import "animate.css";

// 注册全局指令
Vue.directive("focus", {
  inserted: function (element) {
    element.focus();
  },
});
console.log(Vue.directive("focus"));

//使用第三方插件
Vue.use(ElementUI);
// 自定义第三方插件
Vue.use(VuePlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
