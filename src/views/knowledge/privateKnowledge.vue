<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <personal-knowledge :privateTreeModal="privateTreeModal" @privateKnowledgeList="privateKnowledgeListF"></personal-knowledge>
      </a-col>
      <a-col :span="18">
        <personal-list :privateKnowledgeList="privateKnowledgeList"></personal-list>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import personalKnowledge from './personalKnowledge'
import personalList from './personalList'
export default {
  name: 'PrivateKnowledge',
  data () {
    return {
      privateKnowledgeList: ''
    }
  },
  components: {
    personalKnowledge,
    personalList
  },
  props: {
    privateTreeModal: Array
  },
  methods: {
    privateKnowledgeListF (data) {
      this.privateKnowledgeList = data
    }
  }
}
</script>

<style scoped>

</style>
