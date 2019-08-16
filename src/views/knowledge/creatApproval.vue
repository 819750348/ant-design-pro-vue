<template>
  <a-modal
    title="创建审批"
    v-model="apply"
    closable="false"
    :bodyStyle="{ padding: '4px'}"
    @ok="handleOk"
    :okButtonProps="{ props: {disabled: true} }"
    :cancelButtonProps="{ props: {disabled: true} }"
  >
    <a-card>
      <div v-if="personalModal">
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
      </div>
      <div v-if="majorModal">
        <major-tree @personnelModal="showPersonnelModal"></major-tree>
      </div>
      <div v-if="personnelModal">
        <personnel-list></personnel-list>
      </div>
    </a-card>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭窗口</a-button>
    </template>
  </a-modal>
</template>
<script>
import './model.less'
import majorTree from './majorTree'
import personnelList from './personnelList'

export default {
  data () {
    return {
      personalModal: true,
      majorModal: false,
      personnelModal: false
    }
  },
  props: {
    apply: {
      type: Boolean,
      default: false
    }
  },
  components: {
    majorTree: majorTree,
    personnelList: personnelList
  },
  methods: {
    handleOk (e) {
      console.log(e)
    },
    handleCancel (e) {
      console.log(e)
      this.$emit('shareApply', false)
    },
    showMajorModal () {
      this.personalModal = false
      this.majorModal = true
    },
    showPersonnelModal () {
      this.personalModal = false
      this.majorModal = false
      this.personnelModal = true
    }
  },
  watch: {
    apply (val) {
      this.apply = val
      this.$emit('shareApply', this.apply)
    }
  }
}
</script>
<style scoped>
</style>
