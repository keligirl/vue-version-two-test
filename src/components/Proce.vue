<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form name="搜索" layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8">
            <a-form-item label="工序" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select v-model="queryParam.id" :options="options" placeholder="请选择工序"> </j-select>
            </a-form-item>
          </a-col>

          <a-col :md="7" :sm="8">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" icon="search" @click="searchQuery">查询</a-button>
              <a-button type="primary" icon="plus" style="margin-left: 8px" @click="handleAdd">添加</a-button>
              <a-button type="primary" icon="reload" style="margin-left: 8px" @click="searchReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>

      <columnsFilter :columns="DefaultColumns" @columnsChange="columnsChange"></columnsFilter>
      <a-table ref="table" rowKey="id" size="middle" :columns="columns" :dataSource="dataSource" :pagination="ipagination" :loading="loading" @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">
            <a-icon type="edit" />
            编辑
          </a>
          <a-divider type="vertical" />

          <a-popconfirm title="确定要删除吗" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>

    <proce-modal ref="modalForm" @ok="modalFormOk"></proce-modal>
  </a-card>
</template>

<script>
import { getAction, deleteAction } from "@/api/manage";
import { JeecgListMixin } from "@/mixins/JeecgListMixin";
import ProceModal from "./modules/ProceModal.vue";
import columnsFilter from "./components/columnsFilter.vue";

export default {
  name: "Proce",
  mixins: [JeecgListMixin],
  components: {
    ProceModal,
    columnsFilter,
  },
  data() {
    return {
      // 自定义数据
      description: "这是工序页面",
      columns: [
        {
          title: "工序名称",
          align: "left",
          dataIndex: "procName",
          scopedSlots: { customRender: "procName" },
          sorter: () => {},
        },
        {
          title: "序号",
          align: "left",
          dataIndex: "procSort",
          scopedSlots: { customRender: "procSort" },
          sorter: () => {},
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          // vue中的作用域插槽,customRender 	生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
          scopedSlots: { customRender: "action" },
        },
      ],
      DefaultColumns: [
        {
          title: "工序名称",
          align: "left",
          dataIndex: "procName",
          scopedSlots: { customRender: "procName" },
          sorter: () => {},
        },
        {
          title: "序号",
          align: "left",
          dataIndex: "procSort",
          scopedSlots: { customRender: "procSort" },
          sorter: () => {},
        },
        {
          title: "操作",
          dataIndex: "action",
          align: "center",
          // vue中的作用域插槽,customRender 	生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
          scopedSlots: { customRender: "action" },
        },
      ],
      //样式布局
      labelCol: {
        lg: { span: 6 },
        md: { span: 8 },
        sm: { span: 9 },
        xs: { span: 4 },
      },
      wrapperCol: {
        lg: { span: 18 },
        md: { span: 16 },
        sm: { span: 15 },
        xs: { span: 20 },
      },
      options: [],
      url: {
        list: "/yin/yinProc/list",
        queryList: "/yin/yinProc/listAll",
        delete: "/yin/yinProc/delete",
      },
    };
  },
  mounted() {
    this.querProc();
  },
  methods: {
    querProc() {
      getAction(this.url.queryList, { column: "procSort", order: "asc" }).then((res) => {
        if (res.success) {
          this.options = res.result.map((item, index, arr) => {
            let c = { label: item.procName, value: item.id + "", index: item.procSort };
            return c;
          });
          // this.options.sort((a,b)=> {return a.index-b.index})
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    handleDelete(id) {
      if (!this.url.delete) {
        this.$message.error("请设置url.delete属性!");
        return;
      }
      var that = this;
      deleteAction(that.url.delete, { id: id }).then((res) => {
        if (res.success) {
          //重新计算分页问题
          that.reCalculatePage(1);
          that.$message.success(res.message);
          that.loadData();
          that.querProc();
        } else {
          that.$message.warning(res.message);
        }
      });
    },
    modalFormOk() {
      this.loadData();
      this.querProc();
    },
    columnsChange(val) {
      this.columns = val;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@assets/less/common.less";
</style>
