<template>
  <a-collapse style="padding:0px;margin:0px;" v-model="activeKey" accordion="true" @change="getData">
    <a-collapse-panel header="专业导航" key="1">
      <a-menu style="padding:0px;margin:0px;" mode="inline" >
        <a-menu-item key="1">
          <a-tree
            :treeData="professionalNavigation"
            defaultExpandAll
            @select="onSelect"
          ></a-tree>
        </a-menu-item>
      </a-menu>
    </a-collapse-panel>
    <a-collapse-panel header="企业知识库" key="2">
      <a-menu style="padding:0px;margin:0px;" mode="inline">
        <a-menu-item key="2">
          <a-icon type="pie-chart" />
          <span>术语知识</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="desktop" />
          <span>词条知识</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="desktop" />
          <span>专业术语TEST知识</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="desktop" />
          <span>术语TESTTHREE知识</span>
        </a-menu-item>
      </a-menu>
    </a-collapse-panel>
  </a-collapse>
</template>
<script>
import { getNavigationDetail } from '@/api/knowledgeCore'
export default {
  data () {
    return {
      majorContent: [],
      /**
       * 新
       *
       * @Author 尘埃Friend
       * @date 2019-11-29
       */
      professionalNavigation: ''
    }
  },
  watch: {

  },
  mounted () {

  },
  methods: {
    // 专业分类
    // majorC () {
    //   var vm = this
    //   this.axios.post('/knowledge!ksearch.action', {
    //     formvalue: { 'searchlist': [{ 'name': 'domainnodeid', 'value': 4, 'and_or': 'and' }] },
    //     selectid: 4,
    //     index: 0,
    //     size: 10
    //   }).then(function (res) {
    //     vm.majorContent = res.data
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    //   // 模拟数据
    //   vm.$emit('majorContent', vm.majorContentModal)
    // }
    // termKnowledgeF () {
    //   var vm = this
    //   vm.$emit('termKnowledge')
    //   vm.axios.post('knowledge!listWikiSearchablePropertiesByKtype.action', {
    //     ktypeid: 7
    //   }).then(function (res) {
    //     vm.termKnowledge = res
    //     console.log(res)
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // }
    // /**
    //  * 专业分类
    //  *
    //  * @Author 尘埃Friend
    //  * @date 2019-11-29
    //  */
    // specialitySort () {
    //   // speciality
    // }

    /**
     * 获取导航数据点击事件
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    getData (key) {
      if (key.length > 0) {
        if (key[key.length - 1] === '1') {
          this.setTreeModal(this.$store.state.knowledge.professionalNavigation)
        }
      }
    },
    /**
     * 树属性转换
     *
     * @Author 尘埃Friend
     * @date 2019-11-27
     */
    setTreeModal (value) {
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        if (item.children != null) {
          this.setTreeModal(item.children)
        }
      })
      console.log(JSON.stringify(value))
      this.professionalNavigation = value
    },
    /**
     * 获取分类详情
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    onSelect (keys) {
      var id = keys[0]
      var that = this
      getNavigationDetail({
        formvalue: { 'searchlist': [{ 'name': 'domainnodeid', 'value': id, 'and_or': 'and' }] },
        selectid: id,
        index: 0,
        size: 10
      }).then(function (res) {
        that.$store.commit('saveNavigationDetail', res)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
