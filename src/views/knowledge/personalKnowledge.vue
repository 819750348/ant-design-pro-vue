<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <a-collapse style="padding:0px;margin:0px;" v-model="activeKey">
          <a-collapse-panel header="个人知识库导航" key="1">
            <a-tree
              showIcon
              @expand="onExpand"
              :expandedKeys="expandedKeys"
              :autoExpandParent="autoExpandParent"
              v-model="checkedKeys"
              :selectedKeys="selectedKeys"
              @select="selectNode"
              :treeData="typeTree"
            >
              <a-icon slot="folder" type="folder" />
              <a-icon slot="menu-unfold" type="menu-unfold" />
            </a-tree>
          </a-collapse-panel>
          <a-collapse-panel header="编辑个人知识分类" key="2">
          </a-collapse-panel>
        </a-collapse>
      </a-col>
      <a-col :span="18">
        <a-card :bordered="true" title="共享知识列表">
          <div>
            <a-form layout="inline">
              <a-row>
                <a-col :md="5" :sm="24" :span="5">
                  <a-form-item label="名称">
                    <a-input style="width:90px;" />
                  </a-form-item>
                </a-col>
                <a-col :md="5" :sm="24" :span="5">
                  <a-form-item label="作者">
                    <a-input style="width:90px;" />
                  </a-form-item>
                </a-col>
                <a-col :md="5" :sm="24" :span="5">
                  <a-form-item label="分类">
                    <a-select placeholder="请选择" default-value="0">
                      <a-select-option value="0">全部</a-select-option>
                      <a-select-option value="1">分类1</a-select-option>
                      <a-select-option value="2">分类2</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="9" :sm="24" :span="9">
                  <span>
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
                          <a-col :span="14">
                            <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                              <a-list-item-meta>
                                <a slot="title" :href="item.href">{{ item.title }},{{ index }}</a>
                              </a-list-item-meta>
                            </div>
                          </a-col>
                          <a-col :span="10">
                            <a-button>发起共享申请</a-button>
                            <a-button>修改分类</a-button>
                            <a-button>详情</a-button>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/2.png"></img>系统管理员</a-col>
                          <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/1.png"></img>系统管理员</a-col>
                          <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/5.png"></img>abcd</a-col>
                          <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/3.png"></img>论文</a-col>
                          <a-col :span="7"><img style="height: 15px;width: 15px;" src="@/assets/4.png"></img>2019-05-24 13:47:46</a-col>
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
const typeTest = [{ 'id': '01', slots: { icon: 'folder' }, 'parentId': 'root', 'children': [{ 'id': '0101', slots: { icon: 'folder' }, 'parentId': '01', 'children': [{ 'id': '010101', slots: { icon: 'menu-unfold' }, 'parentId': '0101', 'children': [], 'label': '第一个子分类', 'order': 1 }, { 'id': '010102', slots: { icon: 'menu-unfold' }, 'parentId': '0101', 'children': [], 'label': '第二个子分类', 'order': 2 }], 'label': '第一个分类', 'order': 1 }, { 'id': '0102', slots: { icon: 'menu-unfold' }, 'parentId': '01', 'children': [], 'label': '第二个分类', 'order': 2 }], 'label': '根节点分类', 'order': 1 }]
const listData = []
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'javascript:void(0)',
    title: `个人知识 ${i}`,
    avatar: '#',
    description: '系统管理员   系统管理员   abcd    论文    2019-05-24 13:47:46   descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription'
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
      activeKey: ['1'],
      TypeTreeSelects: [],
      expandedKeys: ['01'],
      autoExpandParent: true,
      selectedKeys: [],
      listData,
      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 3
      }
    }
  },
  watch: {
    checkedKeys (val) {
      // console.log('onCheck', val)
    },
    activeKey (key) {
      console.log(key)
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
    onExpand (expandedKeys) {
      // 展开收起节点时触发
      // console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      // console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      // console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    }
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
