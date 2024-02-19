
import MyPluginButton from "./MyPlugin.vue"

const MyPlugin= {
  install(Vue) {
    Vue.component("vue-plugin",MyPluginButton)
  }
}

export default MyPlugin;