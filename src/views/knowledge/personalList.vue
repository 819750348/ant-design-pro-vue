<template>
  <div>
    <a-card :bordered="true" title="知识列表">
      <div>
        <creat-approval :apply="applymodel" @shareApply="shareApply"></creat-approval>
        <a-form layout="inline">
          <a-row>
            <a-col :span="8">
              <span>{{ "知识标题:" }}&nbsp;</span>
              <a-input
                v-model="searchTitle"
                placeholder=""
                style="width:220px;"
              />
            </a-col>
            <a-col :span="8">
              <span>{{ "知识类型:" }}&nbsp;</span>
              <a-select placeholder="请选择" default-value="全部" style="width:190px;" @change="handleChange">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="术语TESTTHREE">术语TESTTHREE</a-select-option>
                <a-select-option value="词条">词条</a-select-option>
                <a-select-option value="专业术语TEST">专业术语TEST</a-select-option>
                <a-select-option value="论文">论文</a-select-option>
                <a-select-option value="术语">术语</a-select-option>
              </a-select>
              <span style="margin-left: 10px">
                <a-button type="primary" @click="searchKey">过滤</a-button>
              </span>
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
                            <a slot="title" :href="item.href" style="font-weight: bold">{{ item.titleName }}</a>
                          </a-list-item-meta>
                        </div>
                      </a-col>
                      <a-col :span="10">
                        <a-button style="position: relative;top: -5px" @click="visibleApply(item.id)">发起共享申请</a-button>
                        <!--<a-button style="margin-left: 10px" >修改分类</a-button>-->
                        <a-popconfirm title="确定删除吗?" @confirm="() => deleteDetails(item.id)">
                          <a-button  style="position: relative;top: -5px;margin-left: 10px">删除</a-button>
                        </a-popconfirm>
                      </a-col>
                    </a-row>
                    <a-row>
                      <span style="cursor:pointer" :title="item.uploader.name">
                        <span v-if="item.uploader.name.length > 6">
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/2.png"/>
                          {{ item.uploader.name.substring(0,4) + '...' }}
                        </span>
                        <span v-else>
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/2.png"/>
                          {{ item.uploader.name }}
                        </span>
                      </span>
                      <span style="cursor:pointer" :title="item.KAuthors[0].name">
                        <span style="margin-left: 20px" v-if="item.KAuthors.length >6">
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/1.png"/>
                          <span v-if="item.KAuthors.length > 0">
                            {{ item.KAuthors[0].name.substring(0,4) +'...' }}
                          </span>
                        </span>
                        <span style="margin-left: 20px" v-else>
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/1.png"/>
                          <span v-if="item.KAuthors.length > 0">
                            {{ item.KAuthors[0].name }}
                          </span>
                        </span>
                      </span>

                      <span style="cursor:pointer" :title="item.knowledgetype.name">
                        <span style="margin-left: 20px" v-if="item.knowledgetype.name.length >4">
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/3.png"/>
                          {{ item.knowledgetype.name.substring(0,3)+ '...' }}
                        </span>
                        <span style="margin-left: 20px" v-else>
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/3.png"/>
                          {{ item.knowledgetype.name }}
                        </span>
                      </span>

                      <span style="cursor:pointer" :title="item.securityLevel">
                        <span style="margin-left: 20px" v-if="item.securityLevel.length > 6">
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/3.png"/>
                          {{ item.securityLevel.substring(0,4)+ '...' }}
                        </span>
                        <span style="margin-left: 20px" v-else>
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/3.png"/>
                          {{ item.securityLevel }}
                        </span>
                      </span>

                      <span style="cursor:pointer" :title="item.uploaddate">
                        <span style="margin-left: 20px">
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/4.png"/>
                          {{ item.uploaddate }}
                        </span>
                      </span>

                      <span style="cursor:pointer" :title="item.keywords[0].name">
                        <span style="margin-left: 20px" v-if="item.keywords[0].name.length > 10">
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/5.png"/>
                          <span v-if="item.keywords.length > 0">
                            {{ item.keywords[0].name.substring(0,9) + '...' }}
                          </span>
                        </span>
                        <span style="margin-left: 20px" v-else>
                          <img style="height: 15px;width: 15px;margin-bottom: 6px;" src="@/assets/5.png"/>
                          <span v-if="item.keywords.length > 0">
                            {{ item.keywords[0].name }}
                          </span>
                        </span>
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
    <!--<a-modal-->
    <!--:visible="catagorytreeVisible"-->
    <!--@ok="catagorytreeOk"-->
    <!--:confirmLoading="confirmLoading"-->
    <!--@cancel="catagorytreeCancel"-->
    <!--id="catagorytreeModal"-->
    <!--width="800px"-->
    <!--&gt;-->
    <!--<template slot="title">{{ "选择个人分类" }}</template>-->
    <!--<a-radio-group name="radioGroup" @change="selectRadio">-->
    <!--<a-radio v-for=" ctr in catagorytreeRadio " :key="ctr.id" :value="ctr.nodeId">{{ ctr.name }}</a-radio>-->
    <!--</a-radio-group>-->
    <!--<a-card size="small" style="width: 750px">-->
    <!--<template solt="title">{{ "分类" }}</template>-->
    <!--<a-tree-->
    <!--checkable-->
    <!--:treeData="catagorytreeData"-->
    <!--checkStrictly="true"-->
    <!--defaultExpandAll="true"-->
    <!--@check="catagorytreeCheck"-->
    <!--&gt;</a-tree>-->
    <!--</a-card>-->
    <!--</a-modal>-->
  </div>
</template>
<script>
import creatApproval from './creatApproval/CreatApproval'
import { getPrivateList, delectDetails, createApprovalFlow } from '@/api/personalKnowledge'
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
    /**
       * 创建审批，获取审批状态
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
    visibleApply (id) {
      const that = this
      createApprovalFlow({
        knowledgeId: id
      }).then(function (res) {
        that.$store.state.knowledge.createApprovalFlowState = res
        that.applymodel = true
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 关键字搜索
    searchKey () {
      console.log(this.privateKnowledgeList)
      var vm = this
      var f = {
        'searchlist': [{
          'name': 'categoriesid',
          'value': vm.privateTreeId,
          'and_or': 'and'
        }, { 'name': 'titlename', 'value': vm.searchTitle, 'and_or': 'and' }, {
          'name': 'knowledgetype',
          'value': vm.searchType,
          'and_or': 'and'
        }],
        'personalk': '1'
      }
      var formvalue = JSON.stringify(f)
      getPrivateList({
        formvalue: formvalue,
        selectid: vm.privateTreeId,
        index: 0,
        size: 10
      }).then(function (res) {
        vm.$store.commit('savePrivateKnowledgeList', res)
        console.log('savePrivateKnowledgeList' + vm.$store.state.knowledge.privateKnowledgeList)
        console.log(res)
        vm.pageSize = res.pagesize
        // vm.total = res.total
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
    },
    changePages () {
      console.log('123')
      var id = this.$store.state.knowledge.privateTreeId
      var that = this
      var f = { 'searchlist': [{ 'name': 'categoriesid', 'value': id, 'and_or': 'and' }], 'personalk': '1' }
      var formvalue = JSON.stringify(f)
      getPrivateList({
        formvalue: formvalue,
        selectid: id,
        index: this.page - 1,
        size: this.pageSize
      }).then(function (res) {
        that.$store.commit('savePrivateKnowledgeList', res)
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
      privateTreeId: state => state.knowledge.privateTreeId
      /**
         * 根据树获取数据列表
         *
         * @Author 尘埃Friend
         * @date 2019-11-27
         */
    }),
    privateKnowledgeList () {
      this.pagination.total = this.$store.state.knowledge.privateKnowledgeList.total
      return this.$store.state.knowledge.privateKnowledgeList
    }
  }
}
</script>

<style scoped>

</style>
