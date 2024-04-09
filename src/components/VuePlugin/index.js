import MyPluginButton from "./MyPlugin.vue";

const MyPlugin = {
  install(Vue) {
    // Vue.component("vue-plugin", MyPluginButton);
    Vue.component("vue-plugin", {
      render: function (createElement) {
        // return createElement(
        //   "button",
        //   {
        //     style: { color: "red" },
        //     class: { padding: true },
        //     attrs: {
        //       id: "my-button",
        //       name: "my-button",
        //     },
        //     // domProps: {
        //     //   innerHTML: 'baz'
        //     // },
        //     on: {
        //       // click: function(e) {
        //       //   console.log(e)
        //       // }
        //       click: this.clickHandler,
        //     },
        //     key: "myKey",
        //     ref: "myRef",
        //   },
        //   this.$slots.default
        // );

        var header = this.$slots.header;
        var body = this.$slots.default;
        var footer = this.$slots.footer;
        return createElement("div", [
          createElement("header", header),
          createElement(
            "button",
            {
              style: { color: "red" },
              class: { padding: true },
              attrs: {
                id: "my-button",
                name: "my-button",
              },
              // domProps: {
              //   innerHTML: 'baz'
              // },
              on: {
                // click: function(e) {
                //   console.log(e)
                // }
                click: this.clickHandler,
              },
              key: "myKey",
              ref: "myRef",
            },
            body
          ),
          createElement("footer", footer),
        ]);
      },
      props: {
        size: {
          type: String,
        },
        type: {
          type: String,
          default: "primary",
        },
      },
      methods: {
        clickHandler() {
          this.$emit("click");
        },
      },
      mounted() {
        console.log("已加载");
      },
    });
  },
};

//对象类型插件
export default MyPlugin;

//函数类型插件
// export default function (Vue) {
//   console.log(Vue.version);
// }
