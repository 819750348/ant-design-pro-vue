<template>
  <div id="majorList">
    <a-card :bordered="false">
      <a-card :bordered="true">
        <div>
          <a-form layout="inline">
            <a-form-item label="标题">
              <a-input
                v-model="titleQuery"
                placeholder=""
                style="width:200px;"
              />
            </a-form-item>
            <a-form-item label="作者">
              <a-input
                v-model="authorQuery"
                placeholder=""
                style="width:200px;"
              />
            </a-form-item>
            <a-form-item label="类型">
              <a-select @change="typeChange" placeholder="请选择" default-value="" style="width:180px;">
                <a-select-option value="">全部</a-select-option>
                <a-select-option :value="item.name" v-for="item in knowledgeTypeSelect" :key="item">{{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="query">过滤</a-button>
            </a-form-item>
            <a-row>
              <template>
                <a-list itemLayout="vertical" :pagination="pagination" :dataSource="navigationDetail.data">
                  <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                    <template>
                      <a-row>
                        <a-col :span="14">
                          <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                            <a-list-item-meta>
                              <a slot="title" :href="item.href" style="font-weight: bold">{{ item.titleName }}</a>
                            </a-list-item-meta>
                          </div>
                        </a-col>
                      </a-row>
                      <a-row>
                        <span><img style="height: 15px;width: 15px;margin-bottom: 6px" src="@/assets/2.png"></img>{{ item.uploader.name }}</span>
                        <span style="margin-left: 20px"><img
                          style="height: 15px;width: 15px;margin-bottom: 6px"
                          src="@/assets/1.png"></img><span
                            v-if="item.keywords.length > 0">{{ item.KAuthors[0].name }}</span></span>
                        <span style="margin-left: 20px"><img
                          style="height: 15px;width: 15px;margin-bottom: 6px"
                          src="@/assets/5.png"></img><span
                            v-if="item.keywords.length > 0">{{ item.keywords[0].name }}</span></span>
                        <sapn style="margin-left: 20px"><img
                          style="height: 15px;width: 15px;margin-bottom: 6px"
                          src="@/assets/3.png"></img>{{ item.knowledgetype.name }}
                        </sapn>
                        <sapn style="margin-left: 20px"><img
                          style="height: 15px;width: 15px;margin-bottom: 6px"
                          src="@/assets/4.png"></img>{{ item.uploaddate }}
                        </sapn>
                        <span style="float: right;margin-right: 20px">
                          <a-button @click="details">详情</a-button>
                        </span>
                      </a-row>
                    </template>
                  </a-list-item>
                </a-list>
              </template>
            </a-row>
          </a-form>
        </div>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getNavigationDetail } from '@/api/knowledgeCore'
import './majorList.less'
import './knowledgeCSS.less'

export default {
  name: 'ShareList',
  data () {
    return {
      // listData,
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
        current: 1,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 30, 40, 50],
        showTotal: (total, range) => {
          return '总共' + total + '页'
        }
      },
      titleQuery: '',
      authorQuery: '',
      navigationId: '',
      knowledgeType: '',
      total: ''
      /**
         * 列表
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */
      // majorContentLists: ''
    }
  },
  // props: {
  //   majorContentLists: {
  //     Type: Array,
  //     default: []
  //   }
  // },
  methods: {
    query () {
      var vm = this
      vm.navigationId = vm.$store.state.knowledge.navigationId
      var f = {
        'searchlist': [{ 'name': 'domainnodeid', 'value': vm.navigationId, 'and_or': 'and' },
          { 'name': 'kauthors_or_uploader', 'value': vm.authorQuery, 'and_or': 'and' },
          { 'name': 'titlename', 'value': vm.titleQuery, 'and_or': 'and' },
          { 'name': 'knowledgetype', 'value': vm.knowledgeType, 'and_or': 'and' }]
      }
      var formvalue = JSON.stringify(f)
      getNavigationDetail({
        formvalue: formvalue,
        index: 0,
        size: 10
      })
        .then(function (res) {
          vm.$store.commit('saveNavigationDetail', res)
        }).catch(function (err) {
          console.log(err)
        })
    },
    /**
       * 获取分类详情
       *
       * @Author 尘埃Friend
       * @date 2019-11-29
       */
    changePages (page, pageSize) {
      console.log(this.pagination.pageSize)
      console.log(page - 1)
      var that = this
      that.navigationId = that.$store.state.knowledge.navigationId
      var f = {
        'searchlist': [{ 'name': 'domainnodeid', 'value': that.navigationId, 'and_or': 'and' },
          { 'name': 'kauthors_or_uploader', 'value': '', 'and_or': 'and' },
          { 'name': 'titlename', 'value': '', 'and_or': 'and' },
          { 'name': 'knowledgetype', 'value': '', 'and_or': 'and' }]
      }
      var formvalue = JSON.stringify(f)

      getNavigationDetail({
        formvalue: formvalue,
        index: page - 1,
        size: pageSize
      }).then(function (res) {
        that.$store.commit('saveNavigationDetail', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    typeChange (data) {
      this.knowledgeType = data
      this.query()
    },
    details () {
      console.log('超链接')
      window.open('http://10.12.97.30:8006/giksp/user!contentpage.action?kid=' + '2927' + '&kname')
    }
  },
  mounted () {
    this.pagination.total = this.navigationDetail.total
  },
  computed: {
    ...mapState({
      /**
         * 知识中心分类数据
         *
         * @Author 尘埃Friend
         * @date 2019-11-29
         */
      navigationDetail: state => state.knowledge.navigationDetail,
      /**
         * 获取知识库搜索框
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */
      searchList: state => state.knowledge.searchList,
      /**
         * 获取知识类型
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */
      knowledgeTypeSelect: state => state.knowledge.knowledgeTypeSelect
    })
  }
}
</script>

<style scoped>

</style>
