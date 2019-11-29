<template>
  <div>
    <a-collapse style="padding:0px;margin:0px;" @change="getPrivateTreeData">
      <a-collapse-panel header="我的知识" key="1">
        <a-tree
          :treeData="privateTreeData"
          defaultExpandAll
          @select="onSelect"
        ></a-tree>
      </a-collapse-panel>
      <a-collapse-panel key="2">
        <template>
          <span slot="header">
            编辑个人知识分类
            <span style="float: right;margin-right: 10px">
              <button @click.stop="add">增加</button>
              <button style="margin-left: 10px">修改</button>
              <button style="margin-left: 10px">删除</button>
            </span>
          </span>
        </template>
        <a-tree
          defaultExpandAll
          checkable
          @check="check"
          checkStrictly="true"
          :treeData="privateTreeData"
        >
        </a-tree>
      </a-collapse-panel>
    </a-collapse>
    <a-modal v-model="addNodeModal" title="增加节点">
      <a-row type="flex" justify="center" align="middle">
        <a-col :span="4">
          名称:
        </a-col>
        <a-col :span="20">
          <a-input>

          </a-input>
        </a-col>
      </a-row>
      <a-row type="flex" style="margin-top: 10px">
        <a-col :span="4">
          描述:
        </a-col>
        <a-col :span="20">
          <a-textarea :rows="4">

          </a-textarea>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import treeForm from './treeForm'
import { getPrivateList } from '@/api/personalKnowledge'

export default {
  name: 'PersonalTree',
  data () {
    return {
      // 我的知识树
      myKnowledgeTree: [],
      editMyKnowledgeTree: [],
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
      },
      // 个人知识列表
      privateKnowledgeList: '',
      treeId: 0,
      addNodeModal: false,
      privateTreeData: ''
    }
  },
  created () {
    /**
     * 获取个人知识数据
     *
     * @Author 尘埃Friend
     * @date 2019-11-27
     */
    this.getPrivateTreeData()

    // console.log(this.privateTreeData)
    // // ui组件树属性和返回的树属性有区别，需要转化下
    // this.setPrivateTreeModal(this.privateTreeData)
    // this.getMyKnowledge()
    // this.getEditKnowledge()
  },
  components: {
    treeForm
  },
  methods: {
    /**
     * 获取个人知识数据
     *
     * @Author 尘埃Friend
     * @date 2019-11-27
     */
    getPrivateTreeData (key) {
      if (key.length > 0) {
        if (key[key.length - 1] === '1') {
          this.setPrivateTreeModal(this.$store.state.knowledge.privateTreeData)
        }
      }
    },
    // 个人知识 @尘埃
    getMyKnowledge () {
      var vm = this
      this.post('giksp/tree/privilege-tree!listPrivilegeTreeNodes.action', {
        treeType: 'categoryTree',
        operationName: '查看知识'
      }).then(function (res) {
        console.log(res)
        vm.myKnowledgeTree = res
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 编辑个人知识 @尘埃
    getEditKnowledge () {
      var vm = this
      this.post('giksp/tree/privilege-tree!listPrivilegeTreeNodes.action', {
        treeType: 'categoryTree',
        operationName: '节点管理'
      }).then(function (res) {
        console.log(res)
        vm.editMyKnowledgeTree = res
      }).catch(function (err) {
        console.log(err)
      })
    },

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
    /**
     * 选择树节点展示个人节点列表
     *
     * @Author 尘埃Friend
     * @date 2019-11-27
     */
    onSelect (keys) {
      console.log(keys)
      var id = keys[0]
      var that = this
      getPrivateList({
        formvalue: { 'searchlist': [{ 'name': 'categoriesid', 'value': id, 'and_or': 'and' }], 'personalk': '1' },
        selectid: 10,
        index: 0,
        size: 10
      }).then(function (res) {
        that.$store.commit('savePrivateKnowledgeList', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    onSelectByEdit (keys) {
      this.itemId = keys
      // console.log('Trigger Select', keys)
    },
    // 修改添加知识 @尘埃
    addNode (keys) {
      var vm = this
      this.visible = true
      this.param.visible = true
      // console.log('add: ' + keys)
      // 编辑知识树添加知识 @尘埃
      this.axios.post('giksp/tree/tree!save.action', {
        id: keys,
        name: '',
        nodeDescription: ''
      }).then(function (res) {
        console.log(res)
        vm.getMyKnowledge()
        vm.getEditKnowledge()
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 修改编辑知识 @尘埃
    editNode (keys, nName) {
      var vm = this
      this.itemId = keys
      this.param.treeNodeName = nName
      this.param.visible = true
      // console.log('edit: ' + keys)
      // 编辑知识树编辑知识 @尘埃
      this.axios.post('giksp/tree/tree!update.action', {
        id: keys,
        name: '',
        nodeDescription: ''
      }).then(function (res) {
        console.log(res)
        vm.getMyKnowledge()
        vm.getEditKnowledge()
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 修改删除知识 @尘埃
    delNode (keys) {
      var vm = this
      this.itemId = keys
      // console.log('del: ' + keys)
      this.axios.post('giksp/tree/tree!delete.action', {
        id: keys
      }).then(function (res) {
        console.log(res)
        vm.getMyKnowledge()
        vm.getEditKnowledge()
      }).catch(function (err) {
        console.log(err)
      })
    },
    /**
     * 树属性转换
     *
     * @Author 尘埃Friend
     * @date 2019-11-27
     */
    setPrivateTreeModal (value) {
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        if (item.children != null) {
          this.setPrivateTreeModal(item.children)
        }
      })
      console.log(JSON.stringify(this.privateTreeModal))
      console.log(JSON.stringify(value))
      this.privateTreeData = value
    },
    // 编辑树选择节点
    check (checkedKeys, event) {
      var vm = this
      var treeLength = checkedKeys.checked.length
      if (treeLength > 0) {
        vm.treeId = checkedKeys.checked[treeLength - 1]
      }
    },
    add () {
      this.addNodeModal = true
      if (this.TreeId !== 0) {

      }
    }
  }
}
</script>

<style>
  .row-margin-top {
    margin-top: -16px;
  }

  #leftCard > .ant-card-body {
    padding: 0px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px;
  }
</style>
