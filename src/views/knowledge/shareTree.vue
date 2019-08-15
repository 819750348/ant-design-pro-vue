<template>
  <a-collapse style="padding:0px;margin:0px;" v-model="activeKey">
    <a-collapse-panel header="研究室知识库" key="1">
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
    <a-collapse-panel header="企业知识库" key="2">
      <a-menu style="padding:0px;margin:0px;" mode="inline">
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>术语知识</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>词条知识</span>
        </a-menu-item>
      </a-menu>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
const typeTest = [{ 'id': '01', slots: { icon: 'folder' }, 'parentId': 'root', 'children': [{ 'id': '0101', slots: { icon: 'folder' }, 'parentId': '01', 'children': [{ 'id': '010101', slots: { icon: 'menu-unfold' }, 'parentId': '0101', 'children': [], 'label': '第一个子分类', 'order': 1 }, { 'id': '010102', slots: { icon: 'menu-unfold' }, 'parentId': '0101', 'children': [], 'label': '第二个子分类', 'order': 2 }], 'label': '第一个分类', 'order': 1 }, { 'id': '0102', slots: { icon: 'menu-unfold' }, 'parentId': '01', 'children': [], 'label': '第二个分类', 'order': 2 }], 'label': '根节点分类', 'order': 1 }]

export default {
  name: 'ShareTree',
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

<style scoped>

</style>
