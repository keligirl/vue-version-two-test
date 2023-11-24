<template>
      <div>
        <a-table
          size="middle"
          bordered
          :columns="columns" 
          :data-source="dataSource" 
          :loading="loading"
          @expand="handleExpand"
          :expandIcon="customExpandIcon"
          :pagination="false"
        >  
          <span slot="finishRate" slot-scope="text,record">
            <a-progress :percent="record.finishRate" size="small" />
          </span>
          <span slot="dealyDays" slot-scope="text,record">
            {{ record.finishRateFenzi+'/'+record.finishRateFenmu }}
          </span>

          <a-table
            slot="expandedRowRender"
            slot-scope="innerRecord"
            :columns="innerColumns"
            :dataSource="innerRecord.innerData"
            size="middle"
            bordered
            :pagination="false"
            :loading="loading"
            :rowClassName="setRowbg"
          >

          </a-table>
        </a-table>
      </div>
  </template>
  
  <script>
  import {getAction,postAction} from '@/api/manage'
  import {JeecgListMixin} from '@/mixins/JeecgListMixin'
  import Vue from 'vue';
  
  export default {
    mixins: [JeecgListMixin],
    components: {
        
    },
    props: {
      hoverMsg: {
        // type: Object,
        required: false,
      },
    },
    data() {
      return {
        //样式布局
        labelCol: {
          lg: {span: 6},
          md: {span: 8},
          sm: {span: 9},
          xs: {span: 4},
        },
        wrapperCol: {
          lg: {span: 18},
          md: {span: 16},
          sm: {span: 15},
          xs: {span: 20},
        },
        content: this.hoverMsg,
        currentId: '',
        loading: true,
        url: {
          list: '/yin/yinPtypeReleProc/listAll',
          innerlist: "/yin/yinWorkOrder/list",
        },
        current:0,
        columns: [
          {
            align: "center",
            title: '名称',
            dataIndex: 'procName',
            key: 'procName',
            sorter:true,
          },
          {
            align: "center",
            title: '报工日期',
            dataIndex: 'baogongTimeStr',
            key: 'baogongTimeStr',
            sorter: true,
          },
          {              
            align: "center",
            title: '工单进度',
            dataIndex: 'finishRate',
            key: 'finishRate',
            sorter: true,
            scopedSlots: { customRender: 'finishRate' }
          },
          {           
            align: "center",
            title: '进度',
            dataIndex: 'dealyDays',
            key: 'dealyDays',
            sorter: true,
            scopedSlots: { customRender: 'dealyDays' }
          },
        ],
        innerColumns: [
          {
            title: '工单日期',
            align:'center',
            dataIndex: 'orderTime',
            sorter: true,
            key:'orderTime',
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: '报工日期',
            align:'center',
            dataIndex: 'workTime',
            sorter: true,
            key: 'workTime',
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: '职员',
            align: "center",
            dataIndex: 'username',
            sorter: true,
            key:"userId",
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: '车间',
            align: "center",
            dataIndex: 'depName',
            key:"departList",
          },
          {
            title: '时间段',
            align: "center",
            dataIndex: 'timePart',
            sorter: true,
            key: 'startTime',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '产品型号',
            align: 'center',
            dataIndex: 'ptypeName',
            scopedSlots: { customRender: 'ptypeName' },
            sorter: true,
            key: 'ptypeName',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '任务单号',
            align: 'center',
            dataIndex: 'taskNo',
            sorter: true,
            key: 'taskNo',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '工序名称',
            align: "center",
            dataIndex: 'procName',
            scopedSlots: { customRender: 'procName' },
            sorter: true,
            key: 'procName',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '用时',
            align: "center",
            dataIndex: 'hourLen',
            sorter: true,
            key: 'hourLen',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '报工数',
            align: "center",
            dataIndex: 'prodNum',
            scopedSlots: { customRender: 'prodNum' },
            sorter: true,
            key: 'prodNum',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '入库数',
            align: "center",
            dataIndex: 'inventoryNum',
            scopedSlots: { customRender: 'inventoryNum' },
            sorter: true,
            key: 'inventoryNum',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '不良品数',
            align: "center",
            dataIndex: 'badNum',
            scopedSlots: { customRender: 'badNum' },
            sorter: true,
            key: 'badNum',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '计件(元/个)',
            align: "center",
            dataIndex: 'prodPrice',
            scopedSlots: { customRender: 'prodPrice' },
            sorter: true,
            key: 'prodPrice',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '计时(元/时)',
            align: "center",
            dataIndex: 'timePrice',
            scopedSlots: { customRender: 'timePrice' },
            sorter: true,
            key: 'timePrice',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '工资（元）',
            align: "center",
            dataIndex: 'totalPrice',
            scopedSlots: { customRender: 'totalPrice' },
            sorter: true,
            key: 'totalPrice',
            sortDirections: ['descend', 'ascend'],

          },
          {
            title: '备注',
            align: "center",
            dataIndex: 'workNote',
            key: 'workNote',

          },
        ],
      }
    },
    methods: {
      //获取展示列表数据区
      loadData() {
        if(!this.url.list){
          this.$message.error("请设置url.list属性!")
          return
        }
        const {id}=this.content
        if(this.currentId!=id) {
          this.currentId=id
          this.loading = true;
          getAction(this.url.list,{ptypeId:id}).then((res) => {
            if(res.success) {
              this.dataSource =res.result.records||res.result
            }else{
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.loading = false
          })
        }
      },
      //判断是否有展开项
      customExpandIcon (props) {
        // 是否有子项，无子项不展示图标
        // record是每行的数据，后端返回的数据会有一个hasChild字段判断是否有子项
        if (props.record && props.record.id!=='$21') {
          // props.expanded a-table组件判断是否展开了为true是展开,false为没展开
          if (props.expanded) {
            // return <a-icon type="delete"  />
            // onClick事件必须添加上，相当于把a-table里的展开事件给了自定义的图标，不加的话点击会失效
            return <a-icon type="caret-down" onClick={e => { props.onExpand(props.record, e) }} />
  
          } else {
            return <a-icon type="caret-down" onClick={e => { props.onExpand(props.record, e) }} />
            
          }
        } else {
          return <span style="padding-left: 21px;" />
      }},
      //展开功能
      handleExpand(expanded, record){
        Vue.set(record,'innerData',[])
        if(expanded===true){
            this.innerLoadData(record)
        }
      },

      //子表格
      setRowbg(record) {
        if(record.subtotal) {
          return 'bg-blue'
        }
      },
      //获取展开列表数据区
      innerLoadData(record) {
        this.loading=true
        getAction(this.url.innerlist,{ptypeId:record.ptypeId,procId:record.procId}).then((res) => {
          if(res.success) {
            record.innerData = res.result.pageList.records
            record.innerData.forEach(value => {
            value.timePart = value.startTime.slice(11,16)+'-'+value.endTime.slice(11,16)
          })
          }else{
            this.$message.warning(res.message)
          }
        }).finally(() => {
          this.loading=false
        })
      },

    },
  }
  </script>
  
  <style lang="less" scoped>
  @import '~@assets/less/common.less';
  </style>