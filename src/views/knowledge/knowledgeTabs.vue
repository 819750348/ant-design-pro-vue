<template>
  <a-tabs @change="callback" type="card">
    <a-tab-pane tab="个人知识" key="1">
      <personalKnowledge></personalKnowledge>
    </a-tab-pane>
    <a-tab-pane tab="共享知识" key="2">
      <shareKnowledge></shareKnowledge>
    </a-tab-pane>
    <a-tab-pane tab="最近浏览" key="3">
      <historyKnowledge></historyKnowledge>
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
import personalKnowledge from './personalKnowledge'
import historyKnowledge from './historyKnowledge'
export default {
  data () {
    return {
      state: 0
    }
  },
  components: {
    uploadKnowledge: uploadKnowledge,
    personalKnowledge: personalKnowledge,
    knowledgeDetails: knowledgeDetails,
    shareKnowledge: shareKnowledge,
    historyKnowledge: historyKnowledge
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
