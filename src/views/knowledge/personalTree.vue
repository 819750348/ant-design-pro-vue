<template>
  <a-collapse style="padding:0px;margin:0px;" v-model="activeKey">
    <a-collapse-panel header="个人知识库导航" key="1">
      <a-tree
        :treeData="typeTree"
        defaultExpandAll
        :defaultSelectedKeys="['01']"
        @select="onSelect"
      >
        <template slot="custom" slot-scope="item">
          <a-icon v-if="item.children != null" slot="folder" type="folder" />
          <a-icon v-if="item.children == null" slot="smile" type="folder" />
          <span>{{ item.title }}</span>
        </template>
      </a-tree>
    </a-collapse-panel>
    <a-collapse-panel header="编辑个人知识分类" key="2">
      <tree-form @editNodeName="editNodeName" :param="param"></tree-form>
      <a-tree
        :treeData="typeTree"
        defaultExpandAll
        @select="onSelectByEdit"
      >
        <template slot="custom" slot-scope="item">
          <a-icon v-if="item.children != null" slot="folder" type="folder" />
          <a-icon v-if="item.children == null" slot="smile" type="folder" />
          <span>{{ item.title }}</span>
          <a-icon v-show="itemId==item.id" @click="addNode(item.id)" title="add" style="margin-left:10px;" type="plus" />
          <a-icon v-show="itemId==item.id" @click="editNode(item.id, item.title)" title="edit" type="edit" />
          <a-icon v-show="itemId==item.id" @click="delNode(item.id)" title="del" type="delete" />
        </template>
      </a-tree>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import treeForm from './treeForm'
const typeTest = [{ '__viewicon': false, 'checked': 0, 'children': [{ '__viewicon': false, 'checked': 0, 'children': [{ '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 142, 'index': 'categoriesid', 'name': '设计知识概论', 'nodeDescription': null, 'orderId': 142, 'parentId': 0, 'style': null, 'treenodedtos': [] }], 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category', 'id': 120, 'index': 'categoriesid', 'name': '地空导弹设计', 'nodeDescription': null, 'orderId': 120, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': [{ '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 123, 'index': 'categoriesid', 'name': '绪论', 'nodeDescription': null, 'orderId': 123, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 124, 'index': 'categoriesid', 'name': '战略方法和工具', 'nodeDescription': null, 'orderId': 124, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 125, 'index': 'categoriesid', 'name': '评价和激励方法及工具', 'nodeDescription': null, 'orderId': 125, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 126, 'index': 'categoriesid', 'name': '群化方法和工具', 'nodeDescription': null, 'orderId': 126, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 127, 'index': 'categoriesid', 'name': '外化方法和工具', 'nodeDescription': null, 'orderId': 127, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 128, 'index': 'categoriesid', 'name': '整合方法与工具', 'nodeDescription': null, 'orderId': 128, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 129, 'index': 'categoriesid', 'name': '内化方法和工具', 'nodeDescription': null, 'orderId': 129, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 130, 'index': 'categoriesid', 'name': '应用和创新方法和工具', 'nodeDescription': null, 'orderId': 130, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 131, 'index': 'categoriesid', 'name': '工程的实施方法和案例', 'nodeDescription': null, 'orderId': 131, 'parentId': 0, 'style': null, 'treenodedtos': [] }], 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category', 'id': 121, 'index': 'categoriesid', 'name': '导弹设计知识管理', 'nodeDescription': null, 'orderId': 121, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 122, 'index': 'categoriesid', 'name': '共享资料', 'nodeDescription': null, 'orderId': 122, 'parentId': 0, 'style': null, 'treenodedtos': [] }], 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category', 'id': 80, 'index': 'categoriesid', 'name': '飞行器产品设计', 'nodeDescription': null, 'orderId': 80, 'parentId': 0, 'style': null, 'treenodedtos': [] }, { '__viewicon': false, 'checked': 0, 'children': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO', 'expanded': true, 'icon': 'e-tree-category-child', 'id': 144, 'index': 'categoriesid', 'name': '代风个人知识分类', 'nodeDescription': null, 'orderId': 144, 'parentId': 0, 'style': null, 'treenodedtos': [] }]

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
        item.title = item.name
        item.key = item.id
        delete item['icon']
        item.scopedSlots = { title: 'custom' }
        if (item.children && item.children.length) {
          this.genernateTree(item.children)
        }
      })
      console.log(JSON.stringify(value))
      return value
    },
    getTypeTree () {
      this.typeTree = this.genernateTree(this.typeTree)
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
