/**
* 1. 安装 npm i -S vuedraggable
* 2. 引入 import draggable from 'vuedraggable'
* 3. 组件注册
*/
<template>
  <section class="section">
    <div class="box" v-for="itemData in dataArr" :key="itemData.id"
      :class="itemData.class ? itemData.class : ''" >
      <el-popover placement="top" width="320" trigger="click" :content="itemData.remark">
        <el-button class="box-title" type="text" slot="reference">{{`${itemData.name}【${itemData.id}】（人数：${itemData.userList && itemData.userList.length || 0}）`}}</el-button>
      </el-popover>
      <draggable v-model="itemData.userList" group="itemDragger" animation="300"
        class="removeBox" :id="itemData.id"
        dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass" 
        @add="add" @start="onStart" @end="onEnd" :move="onMove">
        <transition-group class="removeBoxSpan"><!-- 这里是个span -->
          <div class="remove-item" v-for="item in itemData.userList" :key="item.id" :userName="item.name" :userId="item.id">
            <span class="remove-name">{{item.name}}</span>
          </div>
        </transition-group>
      </draggable> 
    </div>
  </section>
</template>
 
<script>
import draggable from 'vuedraggable'
 
export default {
  name: 'Index',
  components: {
    draggable
  },
  data () {
    return {
      dataArr: [
        {
          id: 1,
          name: '这里是id1',
          remark: '这里是备注',
          class: 'good',
          userList: [
            {id:1,name:'姓名a', num: 1},
            {id:2,name:'姓名b', num: 1},
            {id:3,name:'姓名c', num: 1}
          ]
        }, {
          id: 2,
          name: '这里是id2',
          remark: '这里是备注',
          userList: [
            {id:5,name:'姓名2a', num: 2},
            {id:6,name:'姓名2b', num: 2},
            {id:7,name:'姓名2c', num: 2},
          ]
        }, {
          id: 3,
          class: 'bad',
          name: '这里是id3',
          remark: '这里是备注',
          userList: [
            {id:8,name:'姓名3a', num: 3},
            {id:9,name:'姓名3b', num: 3},
            {id:10,name:'姓名3c', num: 3}
          ]
        }, {
          id: 4,
          name: '这里是id4',
          remark: '这里是备注',
          userList: [
            {id:11,name:'姓名4a', num: 4},
            {id:12,name:'姓名4b', num: 4},
            {id:13,name:'姓名4c', num: 4}
          ]
        }, {
          id: 5,
          name: '这里是id5',
          class: 'good',
          remark: '这里是备注',
          userList: [
            {id:14,name:'姓名5a', num: 5},
            {id:15,name:'姓名5b', num: 5},
            {id:16,name:'姓名5c', num: 5}
          ]
        }, {
          id: 6,
          name: '这里是id6',
          class: 'good',
          remark: '这里是备注',
          userList: [
            {id:61,name:'姓名6a', num: 6},
            {id:62,name:'姓名6b', num: 6},
            {id:63,name:'姓名6c', num: 6}
          ]
        }, {
          id: 7,
          name: '这里是id7',
          remark: '这里是备注',
          userList: [
            {id:71,name:'姓名7a', num: 7},
            {id:72,name:'姓名7b', num: 7},
            {id:73,name:'姓名7c', num: 7}
          ]
        }, {
          id: 8,
          name: '这里是id8',
          remark: '这里是备注',
          userList: [
            {id:81,name:'姓名8a', num: 8},
            {id:82,name:'姓名8b', num: 8},
            {id:83,name:'姓名8c', num: 8}
          ]
        }, {
          id: 9,
          name: '这里是id9',
          remark: '这里是备注',
          userList: [
            {id:91,name:'姓名9a', num: 9},
            {id:92,name:'姓名9b', num: 9},
            {id:93,name:'姓名9c', num: 9}
          ]
        }
      ],
      moveUserInfo: {}
    }
  },
  computed: {
  },
  beforeMount () {
  },
  created () {
  },
  watch: {
  },
  methods: {
    //开始拖拽事件
    onStart(e){
    },
    //拖拽结束事件
    onEnd(e, a) {
    },
    // 元素移动到另一个框
    add(e) {
      this.$confirm('确定移动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('移动成功')
      }).catch(() => {
        // 点击取消 - 元素还原至原来的框
        var userItem = {}
        const oldBox = this.dataArr.filter(item => item.id === this.moveUserInfo.boxId)[0]
        userItem = oldBox.userList.filter(val => val.id === this.moveUserInfo.userId)[0]
 
        this.dataArr.forEach(item => {
          if (item.id === this.moveUserInfo.boxId) {
            item.userList = item.userList.filter(val => val.id !== this.moveUserInfo.userId)
          }
          if (item.id === this.moveUserInfo.boxOldId) {
            item.userList.unshift(userItem)
          }
        })
      });
    },
    // 元素移动
    onMove(e) {
      this.moveUserInfo.userId = e.draggedContext.element.id
      this.moveUserInfo.boxId = e.relatedContext.component.$attrs.id
      this.moveUserInfo.boxOldId = parseInt(e.from.parentElement.id)
    }
  }
}
</script>
 
<style lang="less" scoped>
@goodBgColor: rgba(103, 194, 58, 0.1);
@badBgColor: rgba(245, 108, 108, 0.1);
@borderColor: #E4E7ED;
@boxTitleFontsize: 14px;
 
.section {
  width: 903px;
  margin: 20px auto;
  border-left: 1px solid @borderColor;
  border-bottom: 1px solid @borderColor;
  overflow: hidden;
  .box{
    width: 300px;
    height: 200px;
    float: left;
    border-top: 1px solid @borderColor;
    border-right: 1px solid @borderColor;
    padding: 5px 2px;
    box-sizing: border-box;
    .box-title{
      height: 20px;
      line-height: 20px;
      font-size: @boxTitleFontsize;
      font-weight: bold;
      margin: 0;
      padding: 0;
      padding-left: 5px;
      color: rgba(0,0,0,.65);
    }
    .removeBox{
      height: calc(100% - 20px);
      .removeBoxSpan{
        display: inline-block;
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }
    .remove-item{
      width: 75px;
      display: inline-block;
      padding: 5px;
      cursor: move;
    }
  }
}
 
.good{
  background: @goodBgColor;
}
.bad{
  background: @badBgColor;
}
 
// 拖拽时的样式
.dragClass{
  .remove-name{
    color: #000;
    font-weight: bold;
  }
}
.ghostClass{
  .remove-name{
    color: #000;
    font-weight: bold;
  }
}
.chosenClass{
  background: #DCDFE6;
}
</style>
 