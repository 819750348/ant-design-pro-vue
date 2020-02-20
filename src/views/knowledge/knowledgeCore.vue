<template>
  <div>
    <a-row :gutter="0">
      <a-col :span="4">
        <professional-navigation @changeList="changeList"/>
      </a-col>
      <a-col :span="18" v-if="changeListKey==='1'">
        <majorList/>
      </a-col>
      <a-col :span="18" v-if="changeListKey==='2'">
        <knowledgeBase/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import professionalNavigation from './professionalNavigation'
import majorList from './majorList'
import knowledgeBase from './knowledgeBase'

export default {
  name: 'KnowledgeCore',
  data () {
    return {
      majorContentList: [],
      // 术语知识
      termKnowledgeS: '',
      /**
       * 新
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      changeListKey: '1'
    }
  },
  props: {

  },
  components: {
    professionalNavigation,
    majorList,
    knowledgeBase
  },
  methods: {
    // majorContentModal (data) {
    //   this.majorContentList = data
    //   console.log(this.majorContentList)
    // }
    /**
     * 改变详情列表
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    changeList (data) {
      this.changeListKey = data
    }
  }
}
</script>

<style scoped>

</style>
