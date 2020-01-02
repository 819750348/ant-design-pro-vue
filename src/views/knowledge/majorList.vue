<template>
  <a-card :bordered="true">
    <div>
      <a-form layout="inline">
        <a-form-item label="标题">
          <a-input-search
            v-model="titleQuery"
            placeholder=""
            @search="query"
            enterButton="过滤"
            style="width:220px;"
          />
        </a-form-item>
        <a-form-item label="类型">
          <a-select @change="typeChange" placeholder="请选择" default-value="" style="width:180px;">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="术语TESTTHREE知识">术语TESTTHREE知识</a-select-option>
            <a-select-option value="词条">词条</a-select-option>
            <a-select-option value="专业术语TEST知识">专业术语TEST知识</a-select-option>
            <a-select-option value="论文">论文</a-select-option>
            <a-select-option value="术语">术语</a-select-option>
          </a-select>
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
                          <a slot="title" :href="item.href">{{ item.titleName }}</a>
                        </a-list-item-meta>
                      </div>
                    </a-col>
                    <a-col :span="10">
                      <a-button @click="aa">详情</a-button>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/2.png"></img>{{ item.uploader.name }}</a-col>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/1.png"></img><span v-if="item.keywords.length > 0">{{ item.KAuthors[0].name }}</span></a-col>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/5.png"></img><span v-if="item.keywords.length > 0">{{ item.keywords[0].name }}</span></a-col>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/3.png"></img>{{ item.knowledgetype.name }}</a-col>
                    <a-col :span="7"><img style="height: 15px;width: 15px;" src="@/assets/4.png"></img>{{ item.uploaddate }}</a-col>
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
import { getNavigationDetail } from '@/api/knowledgeCore'
export default {
  name: 'ShareList',
  data () {
    return {
      // listData,
      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 5
      },
      titleQuery: '',
      authorQuery: '',
      navigationId: '',
      knowledgeType: ''
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
    aa () {
      // console.log(this.majorContentLists)
      // console.log(this.majorContentLists)
    },
    query () {
      var vm = this
      vm.navigationId = vm.$store.state.knowledge.navigationId
      var f = { 'searchlist': [{ 'name': 'domainnodeid', 'value': vm.navigationId, 'and_or': 'and' },
        { 'name': 'kauthors_or_uploader', 'value': vm.authorQuery, 'and_or': 'and' },
        { 'name': 'titlename', 'value': vm.titleQuery, 'and_or': 'and' },
        { 'name': 'knowledgetype', 'value': vm.knowledgeType, 'and_or': 'and' }] }
      var formvalue = JSON.stringify(f)
      getNavigationDetail({
        formvalue: formvalue,
        index: 0,
        size: 10 })
        .then(function (res) {
          vm.$store.commit('saveNavigationDetail', res)
          vm.pageSize = res.pagesize
        }).catch(function (err) {
          console.log(err)
        })
    },
    typeChange (data) {
      this.knowledgeType = data
      this.query()
    }
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
      searchList: state => state.knowledge.searchList
    })
  }
}
</script>

<style scoped>

</style>
