<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <professional-navigation></professional-navigation>
      </a-col>
      <a-col :span="18">
        <majorList></majorList>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import professionalNavigation from './professionalNavigation'
import majorList from './majorList'

export default {
  name: 'KnowledgeCore',
  data () {
    return {
      majorContentList: [],
      // 术语知识
      termKnowledgeS: ''
    }
  },
  props: {

  },
  components: {
    professionalNavigation,
    majorList
  },
  methods: {
    // majorContentModal (data) {
    //   this.majorContentList = data
    //   console.log(this.majorContentList)
    // }
  }
}
</script>

<style scoped>

</style>
