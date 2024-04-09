const partComponentsRender = {
  render: function (createElement) {
    return createElement(
      "span",
      {
        style: {
          color: "red",
        },
      },
      this.$slots.default
    );
  },
  props: {
    name: "render-part",
  },
};

export default partComponentsRender;
