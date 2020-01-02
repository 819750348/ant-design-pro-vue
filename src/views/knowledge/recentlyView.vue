<template>
  <div>
    <a-card :bordered="true" title="浏览历史列表">
      <div>
        <a-row type="flex">
          <a-col :span="5">
            <span>{{ "知识状态:" }}&nbsp;</span>
            <a-select style="width:180px;" placeholder="全部" default-value="" @change="getknowledgeStatus">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">已审批入库</a-select-option>
              <a-select-option value="2">未审批入库</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5">
            <span>{{ "知识作者:" }}&nbsp;</span>
            <a-select style="width:180px;" placeholder="全部" default-value="all" @change="getknowledgeAuthors">
              <a-select-option value="all">全部</a-select-option>
              <a-select-option value="1">我的知识</a-select-option>
              <a-select-option value="2">他人知识</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="8">
            <span>{{ "知识标题:" }}&nbsp;</span>
            <a-input-search
              v-model="ktitle"
              placeholder=""
              @search="getTitleName"
              enterButton="过滤"
              style="width:220px;"
            />
          </a-col>
        </a-row>
        <a-row>
          <template>
            <a-list itemLayout="vertical" :pagination="pagination" :dataSource="recentlyViewList.data">
              <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                <template>
                  <a-row>
                    <a-col :span="20">
                      <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                        <a-list-item-meta>
                          <a slot="title" :href="item.href">{{ item.titleName }}</a>
                        </a-list-item-meta>
                      </div>
                    </a-col>
                    <a-col :span="4">
                      <a-button @click="details(item.id)">详情</a-button>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="2" title="上传者" v-if="item.uploader!==null"><img style="height: 15px;width: 15px;" src="@/assets/2.png" ></img>{{ item.uploader.name }}</a-col>
                    <a-col :span="2" title="原文作者" v-if="item.KAuthors.length > 0"><img style="height: 15px;width: 15px;" src="@/assets/1.png" ></img>{{ item.KAuthors[0].name }}</a-col>
                    <a-col :span="5" title="关键词" v-if="item.keywords.length >0"><img style="height: 15px;width: 15px;" src="@/assets/5.png" ></img>{{ item.keywords[0].name }}</a-col>
                    <a-col :span="3" title="所属类别" v-if="item.knowledgetype !== null"><img style="height: 15px;width: 15px;" src="@/assets/3.png" ></img>{{ item.knowledgetype.name }}</a-col>
                    <a-col :span="3" title="共享状态" v-if="item.status !== null"><img style="height: 15px;width: 15px;" src="@/assets/4.png" ></img>{{ item.status }}</a-col>
                    <a-col :span="4" title="长传时间" v-if="item.uploadTime !==null "><img style="height: 15px;width: 15px;" src="@/assets/4.png" ></img>{{ item.uploadTime }}</a-col>
                    <a-col :span="4" title="上传浏览时间" v-if="item.uploaddate !==null "><img style="height: 15px;width: 15px;" src="@/assets/4.png" ></img>{{ item.uploaddate }}</a-col>
                  </a-row>
                </template>
              </a-list-item>
            </a-list>
          </template>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
import 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import STable from '@/components/Table/'
import 'timers'
import TabPane from 'ant-design-vue/es/vc-tabs/src/TabPane'
import { mapState } from 'vuex'
import { getRecentlyView } from '@/api/recentlyView'

export default {
  components: {
    TabPane,
    STable
  },
  data () {
    return {
      cardvisible: true,
      pagination: {
        onChange: (page, pageSize) => {
          // 分页事件
        },
        pageSize: 5
      },
      /**
       * 新
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      knowledgeStatus: '',
      knowledgeAuthors: '',
      ktitle: ''

    }
  },
  methods: {
    /**
     * 知识状态下拉框搜索赋值
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    getknowledgeStatus (value) {
      this.knowledgeStatus = value
      this.getknowledgeSearch()
    },
    /**
     * 知识作者下拉框搜索赋值
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    getknowledgeAuthors (value) {
      this.knowledgeAuthors = value
      this.getknowledgeSearch()
    },
    /**
     * 标题搜索
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    getTitleName (value) {
      this.getknowledgeSearch()
    },
    /**
     * 最近浏览搜索
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    getknowledgeSearch () {
      var that = this
      getRecentlyView({ kstatus: that.knowledgeStatus, index:	0, size: 10, selfk: that.knowledgeAuthors, ktitle: that.ktitle })
        .then(function (res) {
          that.$store.commit('saveRecentlyViewList', res)
          console.log(res)
          console.log(that.recentlyViewList)
        }).catch(function (err) {
          console.log(err)
        })
    },
    /**
     * 详情信息
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    details (id) {

    }
  },
  computed: {
    ...mapState({
      recentlyViewList: state => state.knowledge.recentlyViewList
    })
  }
}
</script>

<style>
  .row-margin-top{
    margin-top: -16px;
  }
  #leftCard > .ant-card-body{
    padding:0px;
  }
  .ant-collapse-content > .ant-collapse-content-box{
    padding:0px;
  }
</style>
