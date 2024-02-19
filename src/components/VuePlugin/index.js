import MyPluginButton from "./MyPlugin.vue";

const MyPlugin = {
  install(Vue) {
    Vue.component("vue-plugin", MyPluginButton);
  },
};

//对象类型插件
export default MyPlugin;

//函数类型插件
// export default function (Vue) {
//   console.log(Vue.version);
// }
