<template>
  <div>
    <draggable v-model="items">
      <div v-for="item in items" :key="item.id" class="grid-item">
        {{ item.content }}
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "Grid",
  components: {
    draggable,
  },
  props: {
    // items: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return {
      items: [
        { id: 1, content: 'Item 1' },
        { id: 2, content: 'Item 2' },
        { id: 3, content: 'Item 3' },
        { id: 4, content: 'Item 4' },
        { id: 5, content: 'Item 5' },
      ],
    }
  },
  methods: {
    // 更新排序时触发的方法
    updateOrder() {
      console.log(666);
      this.$emit("input", this.items);
    },
  },
};
</script>
<style>
.grid-item {
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}
</style>
