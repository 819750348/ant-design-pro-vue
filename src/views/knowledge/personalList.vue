<template>
  <a-card :bordered="true" title="知识列表">
    <div>
      <creat-approval :apply="applymodel" @shareApply="shareApply"></creat-approval>
      <a-form layout="inline">
        <a-row>
          <a-col :span="7">
            <a-form-item label="知识标题">
              <a-input v-model="searchTitle" style="width:190px;"/>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item label="知识类型">
              <a-select placeholder="请选择" default-value="全部" style="width:190px;" @change="handleChange">
                <a-select-option value="全部">全部</a-select-option>
                <a-select-option value="术语TESTTHREE">术语TESTTHREE</a-select-option>
                <a-select-option value="词条">词条</a-select-option>
                <a-select-option value="专业术语TEST">专业术语TEST</a-select-option>
                <a-select-option value="论文">论文</a-select-option>
                <a-select-option value="术语">术语</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-button type="primary" @click="searchKey">过滤</a-button>
          </a-col>
        </a-row>
        <a-row>
          <template>
            <a-list itemLayout="vertical" :pagination="pagination" :dataSource="privateKnowledgeList.data">
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
                      <a-button @click="visibleApply">发起共享申请</a-button>
                      <a-button>修改分类</a-button>
                      <a-button @click="delect">删除</a-button>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="3"><img style="height: 15px;width: 15px;" src="@/assets/2.png"></img>{{ item.uploader.name }}</a-col>
                    <a-col :span="3"><img style="height: 15px;width: 15px;" src="@/assets/1.png"></img><span v-if="item.keywords.length > 0">{{ item.KAuthors[0].name }}</span></a-col>
                    <a-col :span="3"><img style="height: 15px;width: 15px;" src="@/assets/5.png"></img><span v-if="item.keywords.length > 0">{{ item.keywords[0].name }}</span></a-col>
                    <a-col :span="3"><img style="height: 15px;width: 15px;" src="@/assets/3.png"></img>{{ item.knowledgetype.name }}</a-col>
                    <a-col :span="3"><img style="height: 15px;width: 15px;" src="@/assets/3.png"></img>{{ item.securityLevel }}</a-col>
                    <a-col :span="3"><img style="height: 15px;width: 15px;" src="@/assets/4.png"></img>{{ item.uploaddate }}</a-col>
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
import creatApproval from './creatApproval/CreatApproval'
import { mapState } from 'vuex'
export default {
  name: 'PersonalList',
  data () {
    return {
      // 个人知识数据参数
      kid: '',
      j_username: '',
      flag: 'client',
      // 搜索标题关键字
      searchTitle: '',
      searchType: '',

      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 5
      },
      applymodel: false
    }
  },
  components: {
    creatApproval
  },
  // props: {
  //   privateKnowledgeList: String
  // },
  methods: {
    shareApply (val) {
      this.applymodel = val
    },
    visibleApply () {
      this.applymodel = true
    },
    // 关键字搜索
    searchKey () {
      console.log(this.privateKnowledgeList)
      console.log(this.privateKnowledgeList)

      var vm = this
      var f = { 'searchlist': [{ 'name': 'categoriesid', 'value': 10, 'and_or': 'and' }, { 'name': 'titlename', 'value': vm.searchTitle, 'and_or': 'and' }, { 'name': 'knowledgetype', 'value': vm.searchType, 'and_or': 'and' }], 'personalk': '1' }
      var formvalue = JSON.stringify(f)
      vm.axios.post('/knowledge!ksearch.action', {
        formvalue: formvalue,
        selectid: 10,
        index: 0,
        size: 10
      }).then(function (res) {
        console.log(res)
        vm.privateKnowledgeList = res
      }).catch(function (err) {
        console.log(err)
      })
    },
    handleChange (value) {
      this.searchType = value
    },
    delect (data) {
      console.log(data)
      var vm = this
      vm.axios.post('knowledge!hideKnowledge.action', data).then(function (res) {
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    // var vm = this
    // vm.axios.get('/giksp/user!contentpage.action?kid=' + vm.kid + '&j_username=' + vm.j_username + '&flag=' + vm.flag)
    //   .then(function (res) {
    //     console.log(res)
    //     vm.privateKnowledgeData = res
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
  },
  computed: {
    ...mapState({
      /**
       * 根据树获取数据列表
       *
       * @Author 尘埃Friend
       * @date 2019-11-27
       */
      privateKnowledgeList: state => state.knowledge.privateKnowledgeList
    })
    // privateKnowledgeList () {
    //   return this.$store.state.knowledge.privateKnowledgeList
    // }
  }
}
</script>

<style scoped>

</style>
