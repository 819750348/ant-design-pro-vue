<template>
  <a-collapse style="padding:0px;margin:0px;" v-model="activeKey">
    <a-collapse-panel header="个人知识库导航" key="1">
      <a-tree
        :treeData="typeTree"
        showIcon
        defaultExpandAll
        :defaultSelectedKeys="['01']"
        @select="onSelect"
      >
        <a-icon slot="folder" type="folder" />
        <a-icon slot="menu-unfold" type="menu-unfold" />
      </a-tree>
    </a-collapse-panel>
    <a-collapse-panel header="编辑个人知识分类" key="2">
      <tree-form @editNodeName="editNodeName" :param="param"></tree-form>
      <a-tree
        :treeData="typeTree"
        showIcon
        defaultExpandAll
        :defaultSelectedKeys="['01']"
        @select="onSelectByEdit"
      >
        <a-icon slot="folder" type="folder" />
        <a-icon slot="menu-unfold" type="menu-unfold" />
        <template slot="custom" slot-scope="item">
          <span>{{ item.title }}</span>
          <img v-show="item.id==itemId" @click="addNode(item.id)" title="add" style="height: 15px;width: 15px;" src="@/assets/5.png"></img>
          <img v-show="item.id==itemId" @click="editNode(item.id, item.title)" title="edit" style="height: 15px;width: 15px;" src="@/assets/5.png"></img>
          <img v-show="item.id==itemId" @click="delNode(item.id)" title="del" style="height: 15px;width: 15px;" src="@/assets/5.png"></img>
        </template>

      </a-tree>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import treeForm from './treeForm'
const typeTest = [{ 'id': '01', slots: { icon: 'folder' }, scopedSlots: { title: 'custom' }, 'parentId': 'root', 'children': [{ 'id': '0101', slots: { icon: 'folder' }, scopedSlots: { title: 'custom' }, 'parentId': '01', 'children': [{ 'id': '010101', slots: { icon: 'menu-unfold' }, scopedSlots: { title: 'custom' }, 'parentId': '0101', 'children': [], 'label': '第一个子分类', 'order': 1 }, { 'id': '010102', slots: { icon: 'menu-unfold' }, scopedSlots: { title: 'custom' }, 'parentId': '0101', 'children': [], 'label': '第二个子分类', 'order': 2 }], 'label': '第一个分类', 'order': 1 }, { 'id': '0102', slots: { icon: 'menu-unfold' }, scopedSlots: { title: 'custom' }, 'parentId': '01', 'children': [], 'label': '第二个分类', 'order': 2 }], 'label': '根节点分类', 'order': 1 }]

export default {
  name: 'PersonalTree',
  data () {
    return {
      typeTree: typeTest,
      param: {
        treeNodeName: '',
        visible: false
      },
      selectedKeys: [],
      activeKey: ['1'],
      itemId: 0,
      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 3
      }
    }
  },
  components: {
    treeForm
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
    },
    onSelect (keys) {
      this.itemId = keys
      // console.log('Trigger Select', keys)
    },
    onSelectByEdit (keys) {
      this.itemId = keys
      // console.log('Trigger Select', keys)
    },
    addNode (keys) {
      this.visible = true
      this.param.visible = true
      // console.log('add: ' + keys)
    },
    editNode (keys, nName) {
      this.itemId = keys
      this.param.treeNodeName = nName
      this.param.visible = true
      // console.log('edit: ' + keys)
    },
    delNode (keys) {
      this.itemId = keys
      // console.log('del: ' + keys)
    },
    editNodeName (val) {
      // val.nName获取新节点名称,然后清空数据
      // this.itemId = ''
      // this.param.treeNodeName = ''
      // this.param.visible = false
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
