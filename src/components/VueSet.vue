<template>
  <div>
    <ul>
      <li v-for="item in items">
        {{ item.change }}
        <button @click="change(item)">change</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Syntax",
  comments: {},
  props: {
    value: [String, Object],
  },
  mixins: {},
  data() {
    return {
      items: [
        { id: 1, content: "Item 1" },
        { id: 2, content: "Item 2" },
        { id: 3, content: "Item 3" },
        { id: 4, content: "Item 4" },
        { id: 5, content: "Item 5" },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    change(item) {
      // Vue.set(item, "change", "hhh");
      this.$set(item, "change", "hhh");

      this.$delete(item, "id");
      console.log(item);
      this.handleChangevalue();
    },
    handleChangevalue() {
      if (typeof this.value == "string") {
        this.value = "111";
      } else {
        this.value.value = "111";
      }
    },
  },
  beforeCreate() {},
  created() {
    console.log(this.value);
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  destroyed() {},
  beforeRouteEnter(to, from, next) {
    // ...
  },
  beforeRouteLeave(to, from, next) {},
};
</script>
