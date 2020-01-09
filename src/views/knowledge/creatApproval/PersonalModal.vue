<template>
  <a-card id="approval-card">
    <a-row type="flex">
      <a-col :span="4">
        <a-tag color="#2f54eb" style="width: 80%; font-size: 16px">审批阶段</a-tag>
      </a-col>
      <a-col :span="5">
        <a-tag color="#2f54eb" style="width: 90%; font-size: 16px">节点状态</a-tag>
      </a-col>
      <a-col :span="5">
        <a-tag color="#2f54eb" style="width: 80%; font-size: 16px">审批人</a-tag>
      </a-col>
      <a-col :span="7">
        <a-tag color="#2f54eb" style="width: 80%; font-size: 16px">审批意见</a-tag>
      </a-col>
      <a-col :span="3">
        <a-tag color="#2f54eb" style="width: 40%; font-size: 16px">操作</a-tag>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin-top: 10px" v-for="(item,index) in createApprovalFlowState.nodes" :key="item">
      <a-col :span="4">
        <span style="color: #333333">第{{ index }}阶段</span>
      </a-col>
      <a-col :span="5">
        <span style="color: #cf1322">{{ item.nodeStatus }}</span>
      </a-col>
      <a-col :span="5">
        <span style="color: #333333">{{ item.approverORLenderName }}</span>
      </a-col>
      <a-col :span="7">
        <span style="color: #333333" v-if="item.nodeStatus==='等待审批'">待选择</span>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" size="small" @click="showMajorModal" v-if="item.nodeStatus==='等待审批'">选择专业</a-button>
        <a-button type="primary" size="small" @click="showMajorModal"v-else>无</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import './model.less'
import { mapState } from 'vuex'
import { getPrivateTree } from '@/api/personalKnowledge'
import { catagorytree } from '@/api/upload'
export default {
  data () {
    return {
    }
  },
  watch: {

  },
  methods: {
    showMajorModal () {
      const that = this
      getPrivateTree({
        treeType:	'domainTree',
        disableInte:	true,
        operationName:	'上传知识'
      }).then(function (res) {
        that.setMajorModalName(res)
        that.$store.commit('approvalPrivateTree', res)
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
      catagorytree({
        treeType:	'domainTree',
        disableInte:	true,
        operationName:	'上传知识'
      }).then(function (res) {
        that.$store.commit('approvalCatagorytree', res)
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
      this.$emit('majorModal', 'true')
    },
    // 转换树的格式名称
    setMajorModalName (value) {
      var vm = this
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        if (item.children != null) {
          vm.setMajorModalName(item.children)
        }
      })
    }
  },
  computed: {
    ...mapState({
      createApprovalFlowState: state => state.knowledge.createApprovalFlowState
    })
  }
}

</script>
