<template>
  <div>
    <a-card :bordered="true" title="浏览历史列表">
      <div>
        <a-form layout="inline">
          <a-row>
            <a-col :md="6" :sm="24" :span="6">
              <a-form-item label="名称">
                <a-input style="width:120px;" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24" :span="6">
              <a-form-item label="作者">
                <a-input style="width:120px;" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24" :span="6">
              <a-form-item label="分类">
                <a-select style="width:120px;" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">分类1</a-select-option>
                  <a-select-option value="2">分类2</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24" :span="6">
              <span>
                <a-button type="primary" @click="searchUser">过滤</a-button>
              </span>
            </a-col>
          </a-row>
          <a-row>
            <template>
              <a-list itemLayout="vertical" :pagination="pagination" :dataSource="listData">
                <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
                  <template>
                    <a-row>
                      <a-col :span="20">
                        <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                          <a-list-item-meta>
                            <a slot="title" :href="item.href">{{ item.title }},{{ index }}</a>
                          </a-list-item-meta>
                        </div>
                      </a-col>
                      <a-col :span="4"><a-button>详情</a-button></a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/2.png"></img>{{item.manage}}</a-col>
                      <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/1.png"></img>{{item.createUser}}</a-col>
                      <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/5.png"></img>{{item.abcd}}</a-col>
                      <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/3.png"></img>{{item.type}}</a-col>
                      <a-col :span="7"><img style="height: 15px;width: 15px;" src="@/assets/4.png"></img>{{item.timer}}</a-col>
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

// 测试数据,没有后端支持时前端写死
const listData = []
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'javascript:void(0)',
    title: `浏览历史 ${i}`,
    avatar: '#',
    manage: '系统管理员',
    createUser: '系统管理员',
    abcd: 'abcd',
    type: '论文',
    timer: '2019-05-24 13:47:46',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription'
  })
}

export default {
  name: 'History',
  components: {
    TabPane,
    STable
  },
  data () {
    return {
      cardvisible: true,
      listData,
      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 5
      }
    }
  },
  methods: {
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
