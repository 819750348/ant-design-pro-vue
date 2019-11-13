<template>
  <a-tabs @change="callback" type="card">
    <a-tab-pane tab="个人知识" key="1">
      <private-knowledge @click="getPrivateTree" :privateTreeModal="privateTreeModal"></private-knowledge>
    </a-tab-pane>
    <a-tab-pane tab="知识中心" key="2">
      <knowledge-core></knowledge-core>
    </a-tab-pane>
    <a-tab-pane tab="最近浏览" key="3">
      <history></history>
    </a-tab-pane>
    <a-tab-pane tab="上传知识" key="4">
      <upload v-if="state==0" @uploadedSuccessfully="uploadInit"></upload>
      <edit v-if="state==1"></edit>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import upload from './upload'
import edit from './edit'
import knowledgeCore from './knowledgeCore'
import privateKnowledge from './privateKnowledge'
import history from './history'
const privateTreeModal = [{

  'id': 10,
  'index': 'categoriesid',
  'name': '66',
  'nodeDescription': null,
  'orderId': 10,
  'parentId': 0,

  'children': [{ '__viewicon': false,
    'checked': 0,
    'children': null,
    'id': 10008,
    'index': 'categoriesid',
    'name': '12',
    'nodeDescription': null,
    'orderId': 10008,
    'parentId': 0,
    'style': null,
    'treenodedtos': [] }]
}]
export default {
  data () {
    return {
      state: 0,
      privateTreeModal: privateTreeModal
    }
  },
  components: {
    upload: upload,
    privateKnowledge: privateKnowledge,
    edit: edit,
    knowledgeCore: knowledgeCore,
    history: history
  },
  methods: {
    callback (key) {
      // console.log(key)
    },
    uploadInit () {
      this.state = 1
    },
    getPrivateTree () {
      var vm = this
      vm.axios.post('privilege-tree!listPrivilegeTreeNodes.action', {
        treeType: 'categoryTree',
        operationName: '查看知识'
      }).then(function (res) {
        console.log(res)
        this.privateTreeModal = res
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>
