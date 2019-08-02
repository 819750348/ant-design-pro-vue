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
                <a-col :md="10" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary" @click="searchUser">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                    <a-button style="margin-left: 30px" type="primary" @click="openEditModal('','1')" v-action:add>新增知识</a-button>
                  </span>
                </a-col>
              </a-row>
              <a-row>
                <s-table
                  ref="stable"
                  size="default"
                  :columns="columns"
                  :data="loadData"
                  :alert="false"
                >
                  <span slot="action" slot-scope="text, record">
                    <template>
                      <a @click="openEditModal(record,'2')" v-action:update>编辑</a>
                      <a-divider type="vertical"/>
                    </template>
                    <template>
                      <a @click="handleDel(record)" v-action:delete>删除</a>
                    </template>
                  </span>
                </s-table>
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
import STable from '@/components/table/'
import RoleChecked from '@/components/admin/RoleChecked'
import 'timers'
import TabPane from 'ant-design-vue/es/vc-tabs/src/TabPane'

const typeTest = [{ 'id': '01', 'parentId': 'root', 'children': [{ 'id': '0101', 'parentId': '01', 'children': [{ 'id': '010101', 'parentId': '0101', 'children': [], 'label': '第一个子分类', 'order': 1 }, { 'id': '010102', 'parentId': '0101', 'children': [], 'label': '第二个子分类', 'order': 2 }], 'label': '第一个分类', 'order': 1 }, { 'id': '0102', 'parentId': '01', 'children': [], 'label': '第二个分类', 'order': 2 }], 'label': '根节点分类', 'order': 1 }]

export default {
  name: 'KnowList',
  components: {
    TabPane,
    STable,
    RoleChecked
  },
  data () {
    return {
      cardvisible: true,
      typeTree: typeTest,
      TypeTreeSelects: []
    }
  },
  created () {
    this.getTypeTree()
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
        'orgCode': item[0]
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
