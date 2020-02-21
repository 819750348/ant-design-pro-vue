<template>
  <div>
    <a-collapse accordion="true" @change="getPrivateTreeData">
      <a-collapse-panel header="我的知识" key="1">
        <div style="height: 500px;overflow-y: auto">
          <a-tree
            :treeData="privateTreeData"
            @select="onSelect"
          ></a-tree>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="2" @change="getPrivateTreeData">
        <template>
          <a-row type="flex" slot="header" id="btnSm">
            <a-col :span="12">
              编辑个人知识分类
            </a-col>
            <a-col :span="4">
              <a-button @click.stop="add">增加</a-button>
            </a-col>
            <a-col :span="4">
              <a-button style="margin-left: 3px" @click.stop="update">修改</a-button>
            </a-col>
            <a-col :span="4">
              <a-button style="margin-left: 3px" @click.stop="remove">删除</a-button>
            </a-col>
          </a-row>
        </template>
        <div style="height: 500px;overflow-y: auto">
          <a-tree
            defaultExpandAll
            :treeData="privateTreeData"
            @select="onSelectByEdit"
          >
          </a-tree>
        </div>
      </a-collapse-panel>
    </a-collapse>
    <a-modal v-model="addNodeModal" title="增加节点" @ok="addTreeNode" @cancel="cancelOperating">
      <a-row type="flex" justify="center" align="middle">
        <a-col :span="4">
          名称:
        </a-col>
        <a-col :span="20">
          <a-input v-model="name"/>
        </a-col>
      </a-row>
      <a-row type="flex" style="margin-top: 10px">
        <a-col :span="4">
          描述:
        </a-col>
        <a-col :span="20">
          <a-textarea :rows="4" v-model="description"/>
        </a-col>
      </a-row>
    </a-modal>

    <a-modal v-model="editNodeModal" title="增加节点" @ok="updateTreeNode" @cancel="cancelEditOperating">
      <a-row type="flex" justify="center" align="middle">
        <a-col :span="4">
          名称:
        </a-col>
        <a-col :span="20">
          <a-input v-model="editName"/>
        </a-col>
      </a-row>
      <a-row type="flex" style="margin-top: 10px">
        <a-col :span="4">
          描述:
        </a-col>
        <a-col :span="20">
          <a-textarea :rows="4" v-model="editDescription"/>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import treeForm from './treeForm'
import { getPrivateList, addTreeNodeMethod, updateTreeNodeMethod, deleteTreeNodeMethod, getPrivateTree } from '@/api/personalKnowledge'
import ARow from 'ant-design-vue/es/grid/Row'
import './knowledge.less'
// import { mapState } from 'vuex'

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
        pageSize: 5
      },
      // 个人知识列表
      privateKnowledgeList: '',
      treeId: 0,

      privateTreeData: '',

      /**
       * 新
       *
       * @Author 尘埃Friend
       * @date 2019-11-29
       */
      TreeEditId: 0,
      addNodeModal: false,
      name: '',
      description: '',

      editNodeModal: false,
      editName: '',
      editDescription: ''

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
    ARow,
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
        if (key[key.length - 1] === '1' || key[key.length - 1] === '2') {
          this.setPrivateTreeModal(this.$store.state.knowledge.privateTreeData)
        }
      }
    },
    // // 个人知识 @尘埃
    // getMyKnowledge () {
    //   var vm = this
    //   this.post('giksp/tree/privilege-tree!listPrivilegeTreeNodes.action', {
    //     treeType: 'categoryTree',
    //     operationName: '查看知识'
    //   }).then(function (res) {
    //     console.log(res)
    //     vm.myKnowledgeTree = res
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // },
    // 编辑个人知识 @尘埃
    // getEditKnowledge () {
    //   var vm = this
    //   this.post('giksp/tree/privilege-tree!listPrivilegeTreeNodes.action', {
    //     treeType: 'categoryTree',
    //     operationName: '节点管理'
    //   }).then(function (res) {
    //     console.log(res)
    //     vm.editMyKnowledgeTree = res
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // },

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
      var id = keys[0]
      this.$store.commit('savePrivateTreeId', id)

      var that = this
      var f = { 'searchlist': [{ 'name': 'categoriesid', 'value': id, 'and_or': 'and' }], 'personalk': '1' }
      var formvalue = JSON.stringify(f)
      getPrivateList({
        formvalue: formvalue,
        selectid: id,
        index: 0,
        size: 10
      }).then(function (res) {
        that.$store.commit('savePrivateKnowledgeList', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    /**
     * 个人知识编辑树触发事件
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    onSelectByEdit (selectedKeys, e) {
      console.log(selectedKeys)
      console.log(e)
      this.TreeEditId = selectedKeys[0]
      this.editName = e.selectedNodes[0].data.props.name
    },
    // // 修改添加知识 @尘埃
    // addNode (keys) {
    //   var vm = this
    //   this.visible = true
    //   this.param.visible = true
    //   // console.log('add: ' + keys)
    //   // 编辑知识树添加知识 @尘埃
    //   this.axios.post('giksp/tree/tree!save.action', {
    //     id: keys,
    //     name: '',
    //     nodeDescription: ''
    //   }).then(function (res) {
    //     console.log(res)
    //     vm.getMyKnowledge()
    //     vm.getEditKnowledge()
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // },
    // // 修改编辑知识 @尘埃
    // editNode (keys, nName) {
    //   var vm = this
    //   this.itemId = keys
    //   this.param.treeNodeName = nName
    //   this.param.visible = true
    //   // console.log('edit: ' + keys)
    //   // 编辑知识树编辑知识 @尘埃
    //   this.axios.post('giksp/tree/tree!update.action', {
    //     id: keys,
    //     name: '',
    //     nodeDescription: ''
    //   }).then(function (res) {
    //     console.log(res)
    //     vm.getMyKnowledge()
    //     vm.getEditKnowledge()
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // },
    // // 修改删除知识 @尘埃
    // delNode (keys) {
    //   var vm = this
    //   this.itemId = keys
    //   // console.log('del: ' + keys)
    //   this.axios.post('giksp/tree/tree!delete.action', {
    //     id: keys
    //   }).then(function (res) {
    //     console.log(res)
    //     vm.getMyKnowledge()
    //     vm.getEditKnowledge()
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // },
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
    /**
     * 编辑触发获取节点id
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    add () {
      if (this.TreeEditId === 0) {
        this.$message.info('请先选择节点')
      } else {
        this.addNodeModal = true
      }
    },
    /**
     * 添加节点
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    addTreeNode () {
      const that = this
      addTreeNodeMethod({
        name: this.name,
        nodeDescription: this.description,
        id: this.TreeEditId
      }).then(function (res) {
        console.log(res)
        that.addNodeModal = false
        that.getPrivateTree()
        that.$message.success('添加成功')
      }).catch(function (err) {
        console.log(err)
        that.$message.error('添加失败')
      })
    },
    /**
     * 取消添加框
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    cancelOperating () {
      this.addNodeModal = false
    },

    /**
     * 修改节点
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    update () {
      if (this.TreeEditId === 0) {
        this.$message.info('请先选择节点')
      } else {
        this.editNodeModal = true
      }
    },
    /**
     * 修改节点提交
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    updateTreeNode () {
      const that = this
      updateTreeNodeMethod({
        name: this.editName,
        nodeDescription: this.editDescription,
        id: this.TreeEditId
      }).then(function (res) {
        console.log(res)
        that.editNodeModal = false
        that.getPrivateTree()
        that.$message.success('修改成功')
      }).catch(function (err) {
        console.log(err)
        that.$message.error('修改失败')
      })
    },
    /**
     * 编辑节点框取消
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    cancelEditOperating () {
      this.editNodeModal = false
    },
    /**
     * 节点删除
     *
     * @Author 尘埃Friend
     * @date 2019-11-29
     */
    remove () {
      var that = this
      if (this.TreeEditId === 0) {
        this.$message.info('请先选择节点')
      } else {
        this.$confirm({
          title: '确定删除该节点吗?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            deleteTreeNodeMethod({
              id: that.TreeEditId
            }).then(function (res) {
              console.log(res)
              that.getPrivateTree()
              that.$message.success(res)
            }).catch(function (err) {
              console.log(err)
              that.$message.error('删除失败')
            })
          },
          onCancel () {
            console.log('Cancel')
          }
        })
      }
    },
    /**
     * 个人知识树刷新
     *
     * @Author 尘埃Friend
     * @date 2019-11-27
     */
    getPrivateTree () {
      var that = this
      getPrivateTree({ treeType: 'categoryTree', operationName: '查看知识' }).then(function (res) {
        console.log(res)
        that.$store.commit('savePrivateTree', res)
        that.setPrivateTreeModal(res)
        console.log(that.$store.state.knowledge.privateTreeData)
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  computed: {
    // this.$store.state.knowledge.privateTreeData
    // ...mapState({
    //   privateTreeData: state => state.knowledge.privateTreeData
    // })
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
