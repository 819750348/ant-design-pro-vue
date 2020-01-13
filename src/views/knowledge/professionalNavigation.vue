<template>
  <a-collapse
    style="padding:0px;margin:0px;"
    accordion="true"
    v-model="activeKey"
    @change="getData"
    defaultActiveKey="1"
    id="professionalNavigation">
    <a-collapse-panel header="研究室知识库" key="1">
      <a-tree
        :treeData="professionalNavigation"
        @select="onSelect"
      ></a-tree>
    </a-collapse-panel>

    <a-collapse-panel header="企业知识库" key="2">
      <a-list size="large" bordered :dataSource="knowledgeBase" :rowKey="knowledgeBase.id" >
        <a-list-item slot="renderItem" slot-scope="item" @click="listId(item.id)">{{ item.ktypeName }}</a-list-item>
      </a-list>
    </a-collapse-panel>
  </a-collapse>
</template>
<script>
import { getNavigationDetail, getSearchList, getKnowledgeBaseList, getKnowledgeType } from '@/api/knowledgeCore'
import './professionalNavigation.less'
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
      professionalNavigation: '',
      knowledgeBase: []
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
          this.getKnowledgeTypeData()
          this.$emit('changeList', '1')
        } else if (key[key.length - 1] === '2') {
          this.knowledgeBase = this.$store.state.knowledge.knowledgeBase
          this.$emit('changeList', '2')
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
      that.$store.commit('saveNavigationId', id)
      var f = { 'searchlist': [{ 'name': 'domainnodeid', 'value': id, 'and_or': 'and' }] }
      var formvalue = JSON.stringify(f)
      getNavigationDetail({
        formvalue: formvalue,
        selectid: id,
        index: 0,
        size: 10
      }).then(function (res) {
        that.$store.commit('saveNavigationDetail', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    /**
     * 获取列表知识库id
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    listId (key) {
      console.log(key)
      var that = this
      getSearchList({ ktypeid: key }).then(function (res) {
        that.$store.commit('saveSearchList', res)
      }).catch(function (err) {
        console.log(err)
      })

      var f = { 'searchlist': [{ 'name': 'ktypeid', 'value': key, 'and_or': 'and' }] }
      var formvalue = JSON.stringify(f)
      getKnowledgeBaseList({ formvalue: formvalue, index: 0, size: 10 }).then(function (res) {
        /**
         * 转换知识库列表属性
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */

        // for (var i = 0; i < res.data.length; i++) {
        //   for (var j = 0; j < res.data[i].length; j++) {
        //     that.knowledgeBaseArray.push(res.data[i][j])
        //   }
        // }

        that.$store.commit('saveKnowledgeBaseList', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    getKnowledgeTypeData () {
      const that = this
      getKnowledgeType({}).then(function (res) {
        that.$store.commit('saveKnowledgeType', res)
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .ant-list-item:hover{background-color: #85BDFF;}
  .ant-list-item:active{background-color: #040FFF;}
</style>
