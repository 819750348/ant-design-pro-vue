<template>
  <div>
    <a-row :gutter="8" class="row-margin-top">
      <a-col :span="5">
        <a-card :bordered="true" title="知识分类" v-show="cardvisible">
          <a-tree
            ref="typetree"
            :treeData="typeTree"
            @select="handleClick"
          />
        </a-card>
      </a-col>

      <a-col :span="19">
        <a-card :bordered="true" title="个人知识列表">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="8">
                <a-col :md="7" :sm="24">
                  <a-form-item label="名称">
                    <a-input />
                  </a-form-item>
                </a-col>
                <a-col :md="7" :sm="24">
                  <a-form-item label="作者">
                    <a-input />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="分类">
                    <a-select placeholder="请选择" default-value="0">
                      <a-select-option value="0">全部</a-select-option>
                      <a-select-option value="1">分类1</a-select-option>
                      <a-select-option value="2">分类2</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="10" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchUser">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                    <a-button style="margin-left: 30px" type="primary" @click="openEditModal('','1')" v-action:add>新增知识</a-button>
                  </span>
                </a-col>
              </a-row>
              <a-row>
                <template>
                  <a-list itemLayout="vertical" :pagination="pagination" :dataSource="listData">
                    <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
                      <template>
                        <a-row>
                          <a-col :span="18">
                            <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                              <a-list-item-meta :description="item.description">
                                <a slot="title" :href="item.href">{{ item.title }},{{ index }}</a>
                              </a-list-item-meta>
                            </div>
                          </a-col>
                          <a-col :span="6"><a-button>详情</a-button></a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">{{ item.content }}</div>
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
      </a-col>

    </a-row>
  </div>
</template>

<script>
import 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import STable from '@/components/Table/'
import 'timers'
import TabPane from 'ant-design-vue/es/vc-tabs/src/TabPane'

// 测试数据,没有后端支持时前端写死
const typeTest = [{ 'id': '01', 'parentId': 'root', 'children': [{ 'id': '0101', 'parentId': '01', 'children': [{ 'id': '010101', 'parentId': '0101', 'children': [], 'label': '第一个子分类', 'order': 1 }, { 'id': '010102', 'parentId': '0101', 'children': [], 'label': '第二个子分类', 'order': 2 }], 'label': '第一个分类', 'order': 1 }, { 'id': '0102', 'parentId': '01', 'children': [], 'label': '第二个分类', 'order': 2 }], 'label': '根节点分类', 'order': 1 }]
const listData = []
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'javascript:void(0)',
    title: `个人知识 ${i}`,
    avatar: '#',
    description: '系统管理员   系统管理员   abcd    论文    2019-05-24 13:47:46   descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
    content: '详情：contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent'
  })
}

export default {
  name: 'KnowList',
  components: {
    TabPane,
    STable
  },
  data () {
    return {
      cardvisible: true,
      typeTree: typeTest,
      TypeTreeSelects: [],
      listData,
      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 3
      }
    }
  },
  created () {
    this.getTypeTree()
  },
  actions: {
    add () {
      console.log(1)
    }
  },
  methods: {
    genernateTree (value) {
      value.forEach(item => {
        // item.value = item.key
        item.value = item.id + 'select'
        item.title = item.label
        item.key = item.id
        if (item.children && item.children.length) {
          this.genernateTree(item.children)
        }
      })
      return value
    },
    getTypeTree () {
      this.TypeTreeSelects = this.genernateTree(this.typeTree)
    },
    handleClick (item, e) {
      this.queryParam = {
        'typeCode': item[0]
      }
      this.$refs.stable.refresh(true)
    }
  }
}
</script>

<style scoped>
.row-margin-top{
  margin-top: -16px;
}
</style>
