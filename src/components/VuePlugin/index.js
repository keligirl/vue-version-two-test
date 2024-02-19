
import MyPluginButton from "./MyPlugin.vue"

const MyPlugin= {
  install(Vue) {
    Vue.component("Vue-plugin",MyPluginButton)
  }
}

export default MyPlugin;