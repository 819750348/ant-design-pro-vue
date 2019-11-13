<template>
  <div id="personnel-card">
    <a-row type="flex" justify="space-between">
      <a-col :span="10">
        <a-card style="overflow-y:scroll;height: 430px">
          <a-tree
            showLine
            @select="onSelect"
            :treeData="personnelModalTree"
          >
          </a-tree>
          <a-tree
            @select="personnelSelect"
            style="margin-left: 15px"
            :treeData="personnelModalTree"
          >
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card style="overflow-y:scroll;height: 430px" >
          <a-table :columns="columns" :dataSource="personnelList.data">
            <span slot="customTitle">人员</span>
            <span slot="name" slot-scope="text"><a-icon type="user"/>{{ text }}</span>
            <span slot="id" slot-scope="id">
              <a-radio-group @change="determinePersonnel" v-model="radioValue">
                <a-radio :style="radioStyle" :value="id">{{ "选择" }}</a-radio>
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
const columns = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' }
},
{
  dataIndex: 'id',
  scopedSlots: { customRender: 'id' }
}]

const personnelList = { 'class': 'class edu.zju.cims201.GOF.rs.dto.PageDTO', 'data': [{ 'administrativeRole': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.UserDTO', 'email': '10000362', 'hobby': null, 'id': 69, 'introduction': null, 'isVisible': null, 'name': 'test3', 'orderId': null, 'password': null, 'picturePath': null, 'sex': null, 'technicalRole': null }, { 'administrativeRole': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.UserDTO', 'email': '110102198908082350', 'hobby': null, 'id': 72, 'introduction': null, 'isVisible': null, 'name': 'æµ‹è¯•ç¿Ÿç¿”', 'orderId': null, 'password': null, 'picturePath': null, 'sex': null, 'technicalRole': null }, { 'administrativeRole': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.UserDTO', 'email': '10000364', 'hobby': null, 'id': 70, 'introduction': null, 'isVisible': null, 'name': 'test4', 'orderId': null, 'password': null, 'picturePath': null, 'sex': null, 'technicalRole': null }, { 'administrativeRole': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.UserDTO', 'email': '10000358', 'hobby': null, 'id': 67, 'introduction': null, 'isVisible': null, 'name': 'test1', 'orderId': null, 'password': null, 'picturePath': null, 'sex': null, 'technicalRole': null }, { 'administrativeRole': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.UserDTO', 'email': '10000366', 'hobby': null, 'id': 71, 'introduction': null, 'isVisible': null, 'name': 'test5', 'orderId': null, 'password': null, 'picturePath': null, 'sex': null, 'technicalRole': null }, { 'administrativeRole': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.UserDTO', 'email': '10000360', 'hobby': null, 'id': 68, 'introduction': null, 'isVisible': null, 'name': 'test2', 'orderId': null, 'password': null, 'picturePath': null, 'sex': null, 'technicalRole': null }], 'firstindex': 1, 'kccounts': 0, 'orderBy': null, 'pagesize': 15, 'total': 6, 'totalPage': 1 }
export default {
  data () {
    return {
      columns,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      radioValue: 1,
      personnelList: personnelList
    }
  },
  props: {
    personnelModalTree: Array
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
      this.getPersonnelModalTreeDetail(selectedKeys, info)
    },
    nextSubmitModal () {
      this.$emit('nextSubmitModal', 'true')
    },
    // 转换树的内容格式
    setPersonnelModalTree (value) {
      var vm = this
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        if (item.child != null) {
          vm.setPersonnelModalTree(item)
        }
      })
      vm.personnelModalTree = value
    },
    getPersonnelModalTreeDetail (selectedKeys, info, bb) {
      console.log(selectedKeys, info, bb)
      var vm = this

      vm.axios.get('approval!getQualifiedRoleNodes.action?pid=' + selectedKeys[0] + '&_$_d=' + 1573116068794).then(function (res) {

      }).catch(function (err) {
        console.log(err)
      })
    },
    personnelSelect (selectedKeys, info, bb) {
      var vm = this
      vm.axios.post('assignprivilege!QualifiedApproveUsers.action', {
        id: 5,
        nodeId: 4,
        index: 0,
        size: 15
      }).then(function (res) {
        console.log(res)
        vm.personnelList = res
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 确定人员
    determinePersonnel (data) {
      console.log(data.target.value)
      this.$store.commit('SET_PERSONNEL', data.target.value)
      console.log(this.$store.state.approval.personnel)
    }
  },
  created () {
    this.setPersonnelModalTree(this.personnelModalTree)
  }
}
</script>
