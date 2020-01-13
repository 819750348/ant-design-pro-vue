<template>
  <div>
    <a-tabs type="card" @change="showPrivateKnowledge" defaultActiveKey="2">
      <a-tab-pane tab="个人知识" key="1" />
      <a-tab-pane tab="共享知识" key="2"/>
      <a-tab-pane tab="最近浏览" key="3"/>
      <a-tab-pane tab="上传知识" key="4"/>
    </a-tabs>
    <route-view></route-view>
  </div>
</template>
<script>
import upload from './upload'
import edit from './edit'
import knowledgeCore from './knowledgeCore'
import privateKnowledge from './privateKnowledge'
import history from './recentlyView'
import RouteView from '../../layouts/RouteView'
import { getPrivateTree } from '@/api/personalKnowledge'
import { getProfessionalNavigation, getKnowledgeBase } from '@/api/knowledgeCore'
import { getRecentlyView } from '@/api/recentlyView'

export default {
  data () {
    return {
      state: 0,
      privateTreeModal: ''
    }
  },
  components: {
    RouteView,
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
    /**
       * 个人知识路由
       *
       * @Author 尘埃Friend
       * @date 2019-07-04
       */
    showPrivateKnowledge (activeKey) {
      if (activeKey === '1') {
        this.$router.push({ name: 'privateKnowledge', params: {} })
        this.getPrivateTree()
      } else if (activeKey === '2') {
        this.$router.push({ name: 'knowledgeCore', params: {} })
        this.getProfessionalNavigation()
        this.getKnowledgeBase()
      } else if (activeKey === '3') {
        this.$router.push({ name: 'recentlyView', params: {} })
        this.getRecentlyView()
      } else if (activeKey === '4') {
        this.$router.push({ name: 'upload', params: {} })
      }
    },
    /**
     * 个人知识树
     *
     * @Author 尘埃Friend
     * @date 2019-11-27
     */
    getPrivateTree () {
      var that = this
      getPrivateTree({ treeType: 'categoryTree', operationName: '查看知识' }).then(function (res) {
        console.log(res)
        that.$store.commit('savePrivateTree', res)
        console.log(that.$store.state.knowledge.privateTreeData)
      }).catch(function (err) {
        console.log(err)
      })
    },
    /**
     * 专业导航
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    getProfessionalNavigation () {
      var that = this
      getProfessionalNavigation({ treeType: 'domainTree', disableInte: true, operationName: '查看知识' }).then(function (res) {
        console.log(res)
        that.$store.commit('saveProfessionalNavigation', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    /**
     * 企业知识库
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    getKnowledgeBase () {
      var that = this
      getKnowledgeBase({}).then(function (res) {
        console.log(res)
        that.$store.commit('saveKnowledgeBase', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    /**
     * 最近浏览
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    getRecentlyView () {
      var that = this
      getRecentlyView({ kstatus: '', index: 0, size: 10 }).then(function (res) {
        that.$store.commit('saveRecentlyViewList', res)
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    this.showPrivateKnowledge('2')
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
</script>
