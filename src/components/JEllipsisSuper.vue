<template>
  <a-tooltip 
    overlayClassName="bgc_tooltip"
    placement="rightTop" 
    @visibleChange="visibleChange" 
  >
    <template slot="title" v-if="loading">
      <div>
        <a-spin tip="Loading...">
          <!-- <div class="spin-content">
            {{"关联工序加载中"}}
          </div> -->
        </a-spin>
      </div>
    </template>

    <template slot="title" v-if="ElliArr.length">
      <a-steps direction="vertical" :current="current" style="color:#fff">
        <a-step v-for="item,index in ElliArr" :key="item.id">
          <template slot="icon">
            <div v-if="item.finishRate>=100" class="stepClassActive">
              {{ index+1 }}
            </div>
            <div v-else class="stepClass">{{ index+1 }}</div>
          </template>
          <template slot="title" >
            <div class="jEllipsis-l">{{item.procName}}</div>
            <div class="jEllipsis-r">
              <a-progress type="circle" :percent="item.finishRate" :width="40">
              <template #format="percent">
                <span>{{ percent +'%'}}</span>
              </template>
            </a-progress>
            </div>
          </template>
        </a-step>
      </a-steps>
    </template>

    <template slot="title" v-if="isShow">
      <span>{{'无关联工序'}}</span>
    </template>
    
    <a-button block ghost size="large"  @click="showModal">
      <a-progress :percent="value" size="small" />
    </a-button>

    <j-modal 
      title="进度详情"
      :visible="visible" 
      :width="1000"    
      draggable
      :footer="null"
      :switchFullscreen="true"
      @update:visible="close">

      <PreviewDetails :hoverMsg="content"/>
      
    </j-modal>   

  </a-tooltip>
</template>

<script>
  import { getAction } from '@/api/manage'
  import PreviewDetails from './PreviewDetails.vue'
  export default {
    name: 'JEllipsisSuper',
    components: {
      PreviewDetails
    },
    props: {
      value: {
        // type: String,
        required: false,
      },
      hoverMsg: {
        // type: Object,
        required: false,
      },
      length: {
        type: Number,
        required: false,
        default: 25,
      }
    },
    data() {
      return {
        content: this.hoverMsg,
        ElliArr:[],
        currentId: '',
        loading: true,
        isShow: false,
        url: {
          procList: '/yin/yinPtypeReleProc/listAll'
        },
        current:0,
        visible: false,
      }
    },
    methods: {
      visibleChange() {
        const {id}=this.content
        if(this.currentId!=id) {
          this.currentId=id
          getAction(this.url.procList,{ptypeId:id}).then((res)=>{
            if (res.success) {
              this.loading=false
              this.ElliArr = res.result.records||res.result;
              this.ElliArr.length===0 ? this.isShow=true : this.isShow=false
              // console.log(this.ElliArr);
              let arr=this.ElliArr.map((item,index)=>{
                if(item.finishRate>=100) {
                  return  index
                }else{
                  return -1
                }
              })
              this.current=arr.length==0? 0:Math.max(...arr)
              // console.log(this.current);
            }else{
              this.$message.warning(res.message)
            }
          })
        }
      },
      showModal() {
        this.visible = true;
      },
      close() {
        this.visible = false;
      },
    },
  }
</script>

<style lang="less">
// 注意，vue 项目，style 标签不能加 scoped 选项，否则样式不生效
.bgc_tooltip {
    .ant-tooltip-inner {
      // 这里是框框
      color: #333;
      background-color: #fff!important;
    }
    .ant-tooltip-arrow::before {
      // 这里是小三角形
      background-color: #fff!important;
    }
}
</style>

<style lang="less" scoped>
  /deep/.ant-steps-item-title {
    width: 170px;
    display: flex;
  }
  /deep/.jEllipsis-l {
    flex: 2;
  }
  /deep/.jEllipsis-r {
    flex: 1;
  }
  .stepClass {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: #fff;
    background-color: #eee;
  }
  .stepClassActive {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: #fff;
    background-color: #1890ff;
  }
</style>