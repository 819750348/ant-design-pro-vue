<template>
  <div>
    <a-card :bordered="true" title="浏览历史列表">
      <div>
        <a-form layout="inline">
          <a-row type="flex">
            <a-col :span="5">
              <a-form-item label="知识状态">
                <a-select style="width:180px;" placeholder="全部" default-value="" @change="getknowledgeStatus">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="0">已审批入库</a-select-option>
                  <a-select-option value="1">未审批入库</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item label="知识作者">
                <a-select style="width:180px;" placeholder="全部" default-value="" @chang="getknowledgeAuthors">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="0">我的知识</a-select-option>
                  <a-select-option value="1">他人知识</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item label="知识标题">
                <a-input style="width:180px;" v-model="titleName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <span>
                <a-button type="primary" @click="searchUser">过滤</a-button>
              </span>
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
                      <a-col :span="4"><a-button>详情</a-button></a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="2" title="上传者" v-if="item.uploader!==null"><img style="height: 15px;width: 15px;" src="@/assets/2.png" ></img>{{ item.uploader.name }}</a-col>
                      <a-col :span="2" title="原文作者" v-if="item.KAuthors.length > 0"><img style="height: 15px;width: 15px;" src="@/assets/1.png" ></img>{{ item.KAuthors[0].name }}</a-col>
                      <a-col :span="5" title="关键词" v-if="item.keywords.length >0"><img style="height: 15px;width: 15px;" src="@/assets/5.png" ></img>{{ item.keywords[0].name }}</a-col>
                      <a-col :span="2" title="所属类别" v-if="item.knowledgetype !== null"><img style="height: 15px;width: 15px;" src="@/assets/3.png" ></img>{{ item.knowledgetype.name }}</a-col>
                      <a-col :span="2" title="共享状态" v-if="item.status !== null"><img style="height: 15px;width: 15px;" src="@/assets/4.png" ></img>{{ item.status }}</a-col>
                      <a-col :span="3" title="长传时间" v-if="item.uploadTime !==null "><img style="height: 15px;width: 15px;" src="@/assets/4.png" ></img>{{ item.uploadTime }}</a-col>
                      <a-col :span="3" title="上传浏览时间" v-if="item.uploaddate !==null "><img style="height: 15px;width: 15px;" src="@/assets/4.png" ></img>{{ item.uploaddate }}</a-col>
                    </a-row>
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
        onChange: (page) => {
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
      titleName: ''

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
     * 最近浏览搜索
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    getknowledgeSearch (value) {
      var that = this
      getRecentlyView({ kstatus: this.knowledgeAuthors, index:	0, size:	10, selfk: this.knowledgeStatus, ktitle: this.titleName })
        .then(function (res) {
          that.recentlyViewList = res
          console.log(res)
        }).catch(function (err) {
          console.log(err)
        })
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
