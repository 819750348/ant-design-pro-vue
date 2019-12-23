<template>
  <a-card :bordered="true" title="知识列表">
    <div>
      <creat-approval :apply="applymodel" @shareApply="shareApply"></creat-approval>
      <a-form layout="inline">
        <a-row>
          <a-col :span="7">
            <span>{{ "知识标题:" }}</span>
            <a-input-search
              v-model="searchTitle"
              placeholder=""
              @search="searchKey"
              enterButton="过滤"
              style="width:220px;"
            />
          </a-col>
          <a-col :span="7">
            <span>{{ "知识类型:" }}</span>
            <a-select placeholder="请选择" default-value="全部" style="width:190px;" @change="handleChange">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="术语TESTTHREE">术语TESTTHREE</a-select-option>
              <a-select-option value="词条">词条</a-select-option>
              <a-select-option value="专业术语TEST">专业术语TEST</a-select-option>
              <a-select-option value="论文">论文</a-select-option>
              <a-select-option value="术语">术语</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row>
          <template>
            <a-list itemLayout="vertical" :pagination="pagination" :dataSource="privateKnowledgeList.data">
              <a-list-item slot="renderItem" slot-scope="item" :key="item.title">
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
                      <a-button style="margin-left: 10px">修改分类</a-button>
                      <a-popconfirm title="确定删除吗?" @confirm="() => deleteDetails(item.id)">
                        <a-button style="margin-left: 10px">删除</a-button>
                      </a-popconfirm>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="3"><img style="height: 15px;width: 15px;" src="@/assets/2.png"></img>{{ item.uploader.name }}</a-col>
                    <a-col :span="3"><img style="height: 15px;width: 15px;" src="@/assets/1.png"></img><span v-if="item.KAuthors.length > 0">{{ item.KAuthors[0].name }}</span></a-col>
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
import { getPrivateList, delectDetails } from '@/api/personalKnowledge'
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
        // total: this.privateKnowledgeList.total
      },
      applymodel: false,
      /**
       * 列表删除
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      deleteVisible: false
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
      var vm = this
      var f = { 'searchlist': [{ 'name': 'categoriesid', 'value': this.privateTreeId, 'and_or': 'and' }, { 'name': 'titlename', 'value': vm.searchTitle, 'and_or': 'and' }, { 'name': 'knowledgetype', 'value': vm.searchType, 'and_or': 'and' }], 'personalk': '1' }
      var formvalue = JSON.stringify(f)
      getPrivateList({
        formvalue: formvalue,
        selectid: this.privateTreeId,
        index: 0,
        size: 10
      }).then(function (res) {
        console.log(res)
        this.pageSize = res.pagesize
        this.total = res.total
        vm.$store.commit('savePrivateKnowledgeList', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    handleChange (value) {
      this.searchType = value
      this.searchKey()
    },
    deleteDetails (id) {
      console.log(id)
      delectDetails({ id: id }).then(function (res) {
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
    /**
     * 初始化分页
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    // this.pageSize = this.privateKnowledgeList.pagesize
    // console.log(this.privateKnowledgeList)
  },
  computed: {
    ...mapState({
      /**
       * 获取个人知识树id
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      privateTreeId: state => state.knowledge.privateTreeId,
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
