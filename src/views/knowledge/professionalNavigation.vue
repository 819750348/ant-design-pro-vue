<template>
  <div id="professionalNavigation" class="professionalNavigation" style="height: 800px;overflow-y: auto;">
    <a-collapse
      style="padding:0px;margin:0px;"
      @change="getData"
      v-model="activeKey"
    >
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
  </div>
</template>
<script>
import { getNavigationDetail, getSearchList, getKnowledgeBaseList, getKnowledgeType, getProfessionalNavigation, getKnowledgeBase } from '@/api/knowledgeCore'
import './professionalNavigation.less'
import './scrollbar.less'

// import { mapState } from 'vuex'
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
      knowledgeBase: [],
      activeKey: ['1', '2'],
      knowledgeBaseList: {}
    }
  },
  watch: {

  },
  mounted () {
    this.setDefaultData()
    this.onSelect([])
    this.getKnowledgeTypeData()
    // this.setTreeModal(this.$store.state.knowledge.professionalNavigation)
    // this.knowledgeBase = this.$store.state.knowledge.knowledgeBase
  },
  computed: {
    // ...mapState({
    //   recentlyViewList: state => state.knowledge.recentlyViewList
    // })
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
    // getData (key) {
    //   if (key.length > 0) {
    //     if (key[key.length - 1] === '1') {
    //       this.setTreeModal(this.$store.state.knowledge.professionalNavigation)
    //       this.getKnowledgeTypeData()
    //       this.$emit('changeList', '1')
    //     } else if (key[key.length - 1] === '2') {
    //       this.knowledgeBase = this.$store.state.knowledge.knowledgeBase
    //       this.$emit('changeList', '2')
    //     }
    //   }
    // },
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
      this.$emit('changeList', '1')
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
      this.$emit('changeList', '2')
      this.$emit('listKey', key)
      getSearchList({ ktypeid: key }).then(function (res) {
        that.$store.commit('saveSearchList', res)
      }).catch(function (err) {
        console.log(err)
      })

      var f = {
        'searchlist': [{
          'name': 'ktypeid',
          'value': key,
          'and_or': 'and'
        }] }
      var formvalue = JSON.stringify(f)
      getKnowledgeBaseList({
        formvalue: formvalue,
        index: 0,
        size: 10
      }).then(function (res) {
        /**
         * 转换知识库列表属性
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */
        that.convertKnowledgeBaseList(res)
        that.$store.commit('saveKnowledgeBaseList', res)
        console.log(that.knowledgeBaseList)
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    getKnowledgeTypeData () {
      const that = this
      getKnowledgeType({

      }).then(function (res) {
        that.$store.commit('saveKnowledgeType', res)
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    setDefaultData () {
      /**
       * 研究生知识库
       *
       * @Author 尘埃Friend
       * @date 2019-11-29
       */
      var that = this
      getProfessionalNavigation({ treeType: 'domainTree', disableInte: true, operationName: '查看知识' }).then(function (res) {
        console.log(res)
        this.professionalNavigation = that.setTreeModal(res)
        // that.$store.commit('saveProfessionalNavigation', res)
      }).catch(function (err) {
        console.log(err)
      })

      /**
       * 企业知识库
       *
       * @Author 尘埃Friend
       * @date 2019-11-29
       */
      getKnowledgeBase({}).then(function (res) {
        console.log(res)
        that.knowledgeBase = res
        // that.$store.commit('saveKnowledgeBase', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    convertKnowledgeBaseList (datas) {
      var i
      var j
      var arrayBase = []
      this.knowledgeBaseList = {}
      for (i = 0; i < datas.data.length; i++) {
        const newObj = {}
        for (j = 0; j < datas.data[i].length; j++) {
          console.log(datas.data[i])
          console.log(datas.data[i][j])
          Object.assign(newObj, datas.data[i][j])
        }
        arrayBase.push(newObj)
      }
      datas.data = arrayBase
      console.log(datas)
    }
  }
}
</script>

<style scoped>
  .ant-list-item:hover{background-color: #85BDFF;}
  .ant-list-item:active{background-color: #040FFF;}
  .professionalNavigation::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .professionalNavigation::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius   : 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  .professionalNavigation::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #ededed;
    border-radius: 10px;
  }
</style>
