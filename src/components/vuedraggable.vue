<template>
  <div>
    <el-table :data="data" row-key="id">
      <el-table-column label="拖拽排序" width="80" align="center">
        <template slot-scope="{ row }">
          <i class="el-icon-rank allowDrag" style="cursor: pointer"></i>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.title" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
export default {
  data() {
    return {
      data: [{ title: "t1" }, { title: "t2" }],
    };
  },
  mounted() {
    // 业务场景描述行拖拽
    const tbody = document.querySelector(".el-table__body-wrapper tbody");
    const _this = this;
    Sortable.create(tbody, {
      handle: ".allowDrag",
      onEnd({ newIndex, oldIndex }) {
        console.log(newIndex, oldIndex);
      },
    });
  },
};
</script>
