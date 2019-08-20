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
          <personnel-list @nextSubmitModal="showSubmitModal"></personnel-list>
        </div>
        <div v-if="submitModal">
          <submit-modal></submit-modal>
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
import majorTree from './MajorTree'
import personnelList from './PersonnelList'
import submitModal from './SubmitModal'

export default {
  data () {
    return {
      personalModal: true,
      majorModal: false,
      personnelModal: false,
      submitModal: false
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
    submitModal,
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
      this.submitModal = false
    },
    showPersonnelModal () {
      this.personalModal = false
      this.majorModal = false
      this.personnelModal = true
      this.submitModal = false
    },
    showSubmitModal () {
      this.personalModal = false
      this.majorModal = false
      this.personnelModal = false
      this.submitModal = true
    }
  },
  watch: {
    apply (val) {
      this.apply = val
      if (val === true) {
        this.personalModal = true
        this.majorModal = false
        this.personnelModal = false
        this.submitModal = false
      }
      this.$emit('shareApply', this.apply)
    }
  }
}
</script>
<style scoped>
</style>
