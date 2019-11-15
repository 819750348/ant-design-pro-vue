<template>
  <div id="approvalModal">
    <a-modal
      title="创建审批"
      v-model="apply"
      wrapClassName="modal-header"
      :closable="false"
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
          <major-tree @personnelModal="showPersonnelModal" :majorModalName="majorModalName"></major-tree>
        </div>
        <div v-if="personnelModal">
          <personnel-list @nextSubmitModal="showSubmitModal" :personnelModalTree="personnelModalTree"></personnel-list>
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
// 创建审批数据
const majorModalName = [{ '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': false, 'icon': 'e-tree-folder', 'id': 4, 'index': 'domainnodeid', 'name': 'ä¸“ä¸šåˆ†ç±»', 'nodeDescription': null, 'orderId': 4, 'parentId': 0, 'style': null, 'treenodedtos': [] }]
const personnelModalTree = [{ '__viewicon': true, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': false, 'icon': 'e-tree-folder', 'id': 5, 'index': null, 'name': 'äººå‘˜ç»„ç»‡', 'nodeDescription': null, 'orderId': 5, 'parentId': 0, 'style': null, 'treenodedtos': [] }]

export default {
  data () {
    return {
      personalModal: true,
      majorModal: false,
      personnelModal: false,
      submitModal: false,
      majorModalName: majorModalName,
      personnelModalTree: personnelModalTree
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
      this.getMajorModalName()
    },
    showPersonnelModal () {
      this.personalModal = false
      this.majorModal = false
      this.personnelModal = true
      this.submitModal = false
      this.getPersonnelModalTree()
    },
    showSubmitModal () {
      this.personalModal = false
      this.majorModal = false
      this.personnelModal = false
      this.submitModal = true
    },
    // 创建审批获取专业名称
    getMajorModalName () {
      var vm = this
      vm.axios.post('privilege-tree!listPrivilegeTreeNodes.action', {
        treeType: 'domainTree',
        disableInte: true,
        operationName: '上传知识'
      }).then(function (res) {
        vm.majorModalName = res
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 获取人员模块树结构数据
    getPersonnelModalTree () {
      var vm = this
      this.axios.post('approval!getQualifiedRoleNodes.action').then(function (res) {
        vm.personnelModalTree = res
      }).catch(function (err) {
        console.log(err)
      })
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
