<template>
  <a-collapse style="padding:0px;margin:0px;" v-model="activeKey">
    <a-collapse-panel header="个人知识库导航" key="1">
      <a-tree
        :treeData="typeTree"
        showIcon
        defaultExpandAll
        :defaultSelectedKeys="['01']"
      >
        <a-icon slot="folder" type="folder" />
        <a-icon slot="menu-unfold" type="menu-unfold" />
      </a-tree>
    </a-collapse-panel>
    <a-collapse-panel header="编辑个人知识分类" key="2">
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
const typeTest = [{ 'id': '01', slots: { icon: 'folder' }, 'parentId': 'root', 'children': [{ 'id': '0101', slots: { icon: 'folder' }, 'parentId': '01', 'children': [{ 'id': '010101', slots: { icon: 'menu-unfold' }, 'parentId': '0101', 'children': [], 'label': '第一个子分类', 'order': 1 }, { 'id': '010102', slots: { icon: 'menu-unfold' }, 'parentId': '0101', 'children': [], 'label': '第二个子分类', 'order': 2 }], 'label': '第一个分类', 'order': 1 }, { 'id': '0102', slots: { icon: 'menu-unfold' }, 'parentId': '01', 'children': [], 'label': '第二个分类', 'order': 2 }], 'label': '根节点分类', 'order': 1 }]

export default {
  name: 'PersonalTree',
  data () {
    return {
      typeTree: typeTest,
      selectedKeys: [],
      activeKey: ['1'],
      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 3
      }
    }
  },
  watch: {
    activeKey (key) {
      // console.log(key)
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
