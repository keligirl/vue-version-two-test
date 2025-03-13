<template>
  <div>
    <a-checkbox-group v-model="defaultValue" @change="onChange">
      <span v-for="item in options" :key="item.dataIndex">
        <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
      </span>
    </a-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "columnsFilter",
  props: {
    columns: {
      required: true,
    },
  },
  data() {
    return {
      options: [],
      filterOptions: [],
      defaultValue: [],
    };
  },
  mounted() {
    this.options = [...this.columns];
    this.defaultValue = this.options.map((i) => i.dataIndex);
  },
  methods: {
    onChange(checkedValues) {
      console.log("checked = ", checkedValues);
      this.filterOptions = [];
      checkedValues.forEach((element) => {
        let obj = this.columns.find((i) => i.dataIndex == element);
        this.filterOptions.push(obj);
      });
      console.log("filter", this.filterOptions);
      this.$emit("columnsChange", this.filterOptions);
    },
  },
};
</script>

<style></style>
