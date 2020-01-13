<template>
  <a-card :bordered="true">
    <div>
      <span>标题:&nbsp;
        <a-input
          v-model="titlename"
          placeholder=""
          style="width:220px;"
        />
      </span>
      <span v-for="(s,index) in searchData" ref="inputValue" :key="s">
        <span>
          {{ s.description }}
          {{ ":" }}
        </span>
        <span>
          <a-input :name="s.name" style="width:150px;"/>
          <span v-if="index=== 1 || index % 3 ===1 "><br></br></span>
        </span>
      </span>
      <span style="margin-left: 10px">
        <a-button @click="query" type="primary">{{"过滤"}}</a-button>
      </span>
      <a-form layout="inline">
        <a-row>
          <template>
            <a-list itemLayout="vertical" :pagination="pagination" :dataSource="knowledgeBaseList.data">
              <a-list-item slot="renderItem" slot-scope="item">
                <template>
                  <a-row>
                    <a-col :span="14">
                      <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                        <a-list-item-meta>
                          <a slot="title" :href="item.href">{{ item[0].titleName }}</a>
                        </a-list-item-meta>
                      </div>
                    </a-col>
                    <a-col :span="10">
                      <a-button @click="toKnowledgeDetails(item[0].id)">详情</a-button>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col>
                      <span>
                        <img style="height: 15px;width: 15px;" src="@/assets/2.png"/>{{ item[0].uploaderName }}
                      </span>
                      <span v-for="m in item[1]" :key="m">
                        <img style="height: 15px;width: 15px;" src="@/assets/5.png"/>{{ m }}
                      </span>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col>
                      <span v-for="d in item[3]" :key="d">
                        <img style="height: 15px;width: 15px;" src="@/assets/4.png"/>{{ d }}
                      </span>
                    </a-col>
                  </a-row>
                </template>
              </a-list-item>
            </a-list>
          </template>
        </a-row>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import { mapState } from 'vuex'
import { getKnowledgeBaseList } from '@/api/knowledgeCore'
import './knowledgeBase.less'
export default {
  data () {
    return {
      searchlist: [],
      titlename: ''
    }
  },
  props: {
  },
  methods: {
    /**
     * 动态生成输入框查询
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    query () {
      const that = this
      that.searchlist = []
      console.log(this.$refs)
      that.searchlist.push({ 'name': 'titlename', 'value': that.titlename, 'and_or': 'and' })
      for (var i = 0; i < that.$refs.inputValue.length; i++) {
        that.searchlist.push({ 'name': that.$refs.inputValue[i].children[0].name, 'value': that.$refs.inputValue[i].children[0].value, 'and_or': 'and' })
      }
      var searchArray = JSON.stringify(that.searchlist)
      getKnowledgeBaseList({
        formvalue: {
          'searchlist': searchArray
        },
        index: 0,
        size: 10
      }).then(function (res) {
        that.$store.commit('saveKnowledgeBaseList', res)
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    /**
     * 转换知识库列表属性
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    convertKnowledgeBaseList () {
      console.log(this.knowledgeBaseList)
      for (var i = 0; i < this.knowledgeBaseList.data.length; i++) {
        for (var j = 0; j < this.knowledgeBaseList.data[i].length; j++) {
          this.knowledgeBaseArray.push(this.knowledgeBaseList.data[i][j])
        }
      }
    },
    toKnowledgeDetails (id) {
      const routerHref = this.$router.resolve({
        // name: 'knowledgeDetails',
        // query: { id: id }
        path: `/knowledgeDetails/${id}`
      })

      const href = routerHref.href.slice(0, routerHref.href.indexOf('#')) + 'clientk.action' + routerHref.href.slice(routerHref.href.indexOf('#'))
      window.top.open(href, '_blank')
      console.log('2' + routerHref.href)
    }
  },
  computed: {
    ...mapState({
      /**
         * 知识库列表
         *
         * @Author 尘埃Friend
         * @date 2019-11-29
         */
      knowledgeBaseList: state => state.knowledge.knowledgeBaseList,
      /**
         * 获取知识库搜索框
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */
      searchData: state => state.knowledge.searchList
    })
  }
}
</script>

<style scoped>

</style>
