<template>
  <div id="personnel-card">
    <a-row type="flex" justify="space-between">
      <a-col :span="10">
        <a-card style="overflow-y:scroll;height: 430px">
          <a-tree
            style="margin-left: 15px"
            :loadData="onLoadData"
            :treeData="personnelTreeData"
            @select="getPersonnel"
          >
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card style="overflow-y:scroll;height: 430px" >
          <a-table :columns="columns" :dataSource="personnelList.data">
            <!--<span slot="customTitle">人员</span>-->
            <span slot="name" slot-scope="text">
              <a-icon type="user"/>
              {{ text }}
            </span>
            <span slot="id" slot-scope="id">
              <a-radio-group @change="determinePersonnel" v-model="radioValue">
                <a-radio :style="radioStyle" :value="id">
                  {{ "选择" }}
                </a-radio>
              </a-radio-group>
            </span>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-row type="flex" justify="center" >
      <a-col >
        <a-button style="margin-top: 10px" @click="nextSubmitModal">确定</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import './model.less'
import { setQualifiedRoleNodes, getPersonnel } from '@/api/personalKnowledge'

const columns = [
  {
    title: '人员',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  }
]
export default {

  data () {
    return {
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      radioValue: 1,
      personnelList: '',
      /**
       * 人员数据
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      personnelTreeData: '',
      treeData: '',
      columns
    }
  },
  props: {
    // personnelModalTree: Array
  },
  methods: {
    // onSelect (selectedKeys, info) {
    //   console.log('selected', selectedKeys, info)
    //   this.getPersonnelModalTreeDetail(selectedKeys, info)
    // },
    // nextSubmitModal () {
    //   this.$emit('nextSubmitModal', 'true')
    // },
    // // 转换树的内容格式
    // setPersonnelModalTree (value) {
    //   var vm = this
    //   value.forEach(item => {
    //     item.title = item.name
    //     item.key = item.id
    //     if (item.child != null) {
    //       vm.setPersonnelModalTree(item)
    //     }
    //   })
    //   vm.personnelModalTree = value
    // },
    // getPersonnelModalTreeDetail (selectedKeys, info, bb) {
    //   console.log(selectedKeys, info, bb)
    //   var vm = this
    //
    //   vm.axios.get('approval!getQualifiedRoleNodes.action?pid=' + selectedKeys[0] + '&_$_d=' + 1573116068794).then(function (res) {
    //
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // },
    // personnelSelect (selectedKeys, info, bb) {
    //   var vm = this
    //   vm.axios.post('assignprivilege!QualifiedApproveUsers.action', {
    //     id: 5,
    //     nodeId: 4,
    //     index: 0,
    //     size: 15
    //   }).then(function (res) {
    //     console.log(res)
    //     vm.personnelList = res
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // },
    // // 确定人员
    // determinePersonnel (data) {
    //   console.log(data.target.value)
    //   this.$store.commit('SET_PERSONNEL', data.target.value)
    //   console.log(this.$store.state.approval.personnel)
    // },
    // /**
    //  * 树的异步数据
    //  *
    //  * @Author 尘埃Friend
    //  * @date 2019-12-03
    //  */
    onLoadData (treeNode) {
      // setQualifiedRoleNodes
      /**
       * 先获取数据
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      const that = this

      setQualifiedRoleNodes({
        id: treeNode.dataRef.children
      }).then(function (res) {
        that.setLoadTreeModal(res)
      }).catch(function (err) {
        console.log(err)
      })

      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        setTimeout(() => {
          // treeNode.dataRef.children = [
          //   { title: 'Child Node', key: `${treeNode.eventKey}-0` },
          //   { title: 'Child Node', key: `${treeNode.eventKey}-1` }
          // ]
          treeNode.dataRef.children = that.treeData
          this.personnelTreeData = [...this.personnelTreeData]
          resolve()
        }, 1000)
      })
    },
    /**
     * 获取人员
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    setQualifiedRoleNodes () {
      const that = this
      setQualifiedRoleNodes({}).then(function (res) {
        console.log(res)
        that.setTreeModal(res)
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
    setTreeModal (value) {
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        if (item.children != null) {
          this.setTreeModal(item.children)
        }
      })
      this.personnelTreeData = value
    },

    setLoadTreeModal (value) {
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        if (item.children != null) {
          this.setTreeModal(item.children)
        }
      })
      this.treeData = value
    },
    /**
     * 获取人员数据
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    getPersonnel (selectedKeys, e) {
      const that = this
      var nodeId = that.$store.state.knowledge.majorSort
      getPersonnel({
        id: selectedKeys[0],
        nodeId: nodeId,
        index: 0,
        size: 15
      }).then(function (res) {
        that.personnelList = res
        console.log(res)
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    // this.setPersonnelModalTree(this.personnelModalTree)
    this.setQualifiedRoleNodes()
  }
}
</script>
