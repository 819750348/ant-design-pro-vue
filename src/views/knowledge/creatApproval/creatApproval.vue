<template>
  <div id="approvalModal">
    <a-modal
      title="创建审批"
      v-model="apply"
      wrapClassName="modal-header"
      closable="false"
      :bodyStyle="{ padding: '4px'}"
      @ok="handleOk"
      :okButtonProps="{ props: {disabled: true} }"
      :cancelButtonProps="{ props: {disabled: true} }"
    >
      <a-card id="approval-card">
        <div v-if="personalModal">
          <personal-modal @majorModal="showMajorModal"></personal-modal>
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
  </div>
</template>
<script>
import './model.less'
import personalModal from './PersonalModal'
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
    personalModal,
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
      this.personnelModal = false
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
