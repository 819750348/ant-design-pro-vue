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
    <a-row type="flex" style="margin-top: 10px">
      <a-col :span="4">
        <span style="color: #333333">第一阶段</span>
      </a-col>
      <a-col :span="5">
        <span style="color: #cf1322">刚刚创建</span>
      </a-col>
      <a-col :span="5">
        <span style="color: #333333">待选择</span>
      </a-col>
      <a-col :span="7">
        <span style="color: #333333">无</span>
      </a-col>
      <a-col :span="3">
        <a-button type="primary" size="small" @click="showMajorModal">选择专业</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import './model.less'
export default {
  data () {
    return {
    }
  },
  watch: {

  },
  methods: {
    showMajorModal () {
      this.$emit('majorModal', 'true')
    }
  }
}

</script>
