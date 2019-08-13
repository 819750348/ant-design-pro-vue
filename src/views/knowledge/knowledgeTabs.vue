<template>
  <a-tabs @change="callback" type="card">
    <a-tab-pane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </a-tab-pane>
    <a-tab-pane tab="共享知识" key="2">
      <shareKnowledge></shareKnowledge>
    </a-tab-pane>
    <a-tab-pane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </a-tab-pane>
    <a-tab-pane tab="上传知识" key="4">
      <upload-knowledge v-if="state==0" @uploadedSuccessfully="upload"></upload-knowledge>
      <knowledge-details v-if="state==1"></knowledge-details>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import uploadKnowledge from './uploadKnowledge'
import knowledgeDetails from './knowledgeDetails'
import shareKnowledge from './shareKnowledge'
export default {
  data () {
    return {
      state: 0
    }
  },
  components: {
    uploadKnowledge: uploadKnowledge,
    knowledgeDetails: knowledgeDetails,
    shareKnowledge: shareKnowledge
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    upload () {
      this.state = 1
    }
  }
}
</script>
