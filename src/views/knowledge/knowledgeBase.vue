<template>
  <div>
    <a-card :bordered="true">
      <div>
        <span>标题:&nbsp;
          <a-input
            v-model="titlename"
            placeholder=""
            style="width:150px;"
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
          <a-button @click="query" type="primary">{{ "过滤" }}</a-button>
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
                            <a slot="title" :href="item.href" @click="toKnowledgeDetails(item.id)" style="font-weight: bold;font-size: 14px">
                              {{item.titleName }}</a>
                          </a-list-item-meta>
                        </div>
                      </a-col>
                      <!--<a-col :span="10">-->
                      <!--<a-button @click="toKnowledgeDetails(item[0].id)">详情</a-button>-->
                      <!--</a-col>-->
                    </a-row>
                    <a-row>
                      <a-col>
                        <span>
                          <img style="height: 15px;width: 15px;margin-bottom: 6px" src="@/assets/2.png"/>
                          {{ item.uploaderName }}
                        </span>
                        <span v-for="(v,k,i) in item" :key="i" style="margin-left: 15px">
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/5.png"/>
                          <span style="color: #666666;cursor:pointer" v-if="k.length > 8" :title="k">
                            {{ k.substring(0,7)+ '...' }}
                          </span>
                          <span v-else style="color: #666666;cursor:pointer">
                            {{ k }}
                          </span>
                          &nbsp{{ ":" }}&nbsp
                          <span style="color:#999999;cursor:pointer" v-if="v.length > 8" :title="v">
                            {{ v.substring(0,7)+ '...' }}
                          </span>
                          <span v-else style="color:#999999;cursor:pointer">
                            {{ v }}
                          </span>
                        </span>
                        <span style="float: right;margin-right: 20px">
                          <a-button @click="toKnowledgeDetails(item.id)">详情</a-button>
                        </span>
                      </a-col>
                    </a-row>
                    <!--<a-row>-->
                    <!--<a-col>-->
                    <!--<span v-for="d in item[3]" :key="d">-->
                    <!--<img style="height: 15px;width: 15px;margin-bottom: 6px" src="@/assets/4.png"/>{{ d }}-->
                    <!--</span>-->
                    <!--</a-col>-->
                    <!--</a-row>-->
                  </template>
                </a-list-item>
              </a-list>
            </template>
          </a-row>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getKnowledgeBaseList } from '@/api/knowledgeCore'
import './knowledgeBase.less'

export default {
  data () {
    return {
      searchlist: [],
      titlename: '',
      pagination: {
        onChange: (page, pageSize) => {
          // 分页事件
          this.changePages(page, pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          console.log(this)
          console.log(current, pageSize)
          this.pagination.pageSize = pageSize
          this.changePages(current, pageSize)
        },
        total: '',
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 30, 40, 50],
        showTotal: (total, range) => {
          return '总共' + total + '条数据'
        }
      },
      covknowledgeBaseList: []
    }
  },
  props: ['nKey'],
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
        that.searchlist.push({
          'name': that.$refs.inputValue[i].children[0].name,
          'value': that.$refs.inputValue[i].children[0].value,
          'and_or': 'and'
        })
      }
      var searchArray = JSON.stringify(that.searchlist)
      getKnowledgeBaseList({
        formvalue: {
          'searchlist': searchArray
        },
        index: 0,
        size: 10
      }).then(function (res) {
        that.convertKnowledgeBaseList(res)
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
    // convertKnowledgeBaseList () {
    //   console.log(this.knowledgeBaseList)
    //   for (var i = 0; i < this.knowledgeBaseList.data.length; i++) {
    //     for (var j = 0; j < this.knowledgeBaseList.data[i].length; j++) {
    //       this.knowledgeBaseArray.push(this.knowledgeBaseList.data[i][j])
    //     }
    //   }
    // },
    toKnowledgeDetails (id) {
      // const routerHref = this.$router.resolve({
      //   // name: 'knowledgeDetails',
      //   // query: { id: id }
      //   path: `/knowledgeDetails/${id}`
      // })
      //
      // const href = routerHref.href.slice(0, routerHref.href.indexOf('#')) + 'clientk.action' + routerHref.href.slice(routerHref.href.indexOf('#'))
      // window.top.open(href, '_blank')
      // console.log('2' + routerHref.href)
      console.log('超链接')
      window.open('http://10.12.97.30:8006/giksp/user!contentpage.action?kid=' + id + '&kname')
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
    },
    changePages (page, pageSize) {
      console.log(this.nKey)
      var that = this
      var f = {
        'searchlist': [{
          'name': 'ktypeid',
          'value': this.nKey,
          'and_or': 'and'
        }] }
      var formvalue = JSON.stringify(f)
      getKnowledgeBaseList({
        formvalue: formvalue,
        index: page - 1,
        size: pageSize
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
    }
  },
  mounted () {
    console.log('123')
    // this.pagination.total = this.knowledgeBaseList.total
    console.log('456')
  },
  computed: {
    ...mapState({
      /**
         * 知识库列表
         *
         * @Author 尘埃Friend
         * @date 2019-11-29
         */
      // knowledgeBaseList: state => {
      //   console.log(this)
      //   this.pagination.total = state.knowledge.knowledgeBaseList.total
      //   console.log(state.knowledge.knowledgeBaseList)
      //   return state.knowledge.knowledgeBaseList
      // },
      /**
         * 获取知识库搜索框
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */
      searchData: state => state.knowledge.searchList
    }),
    knowledgeBaseList () {
      console.log(this)
      console.log(this.$store.state.knowledge.knowledgeBaseList.total)
      this.pagination.total = this.$store.state.knowledge.knowledgeBaseList.total
      return this.$store.state.knowledge.knowledgeBaseList
    }
  }
}
</script>

<style scoped>

</style>
