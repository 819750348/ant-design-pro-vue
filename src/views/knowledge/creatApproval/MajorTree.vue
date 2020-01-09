<template>
  <div id="majorModal">
    <a-card>
      <span slot="title">
        <a-radio-group @change="radioTree">
          <a-radio :value="item.nodeId" v-for=" item in approvalCatagorytree" :key="item.nodeId">{{ item.name }}</a-radio>
        </a-radio-group>
      </span>
      <a-row>
        <a-col :span="12">
          <div>专业名称</div>
          <!--<a-tree-->
          <!--checkable-->
          <!--checkStrictly="false"-->
          <!--v-model="checkedKeys"-->
          <!--@select="onSelect"-->
          <!--:selectedKeys="selectedKeys"-->
          <!--:treeData="approvalPrivateTree"-->
          <!--/>-->
          <a-tree
            @select="choiceProfession"
            :treeData="approvalPrivateTree"
          />
        </a-col>
        <a-col :span="12">
          <div>描述</div>
        </a-col>
      </a-row>
    </a-card>
    <a-row type="flex" justify="center" >
      <a-col >
        <a-button style="margin-top: 10px" @click="personnelModal">确定</a-button>
      </a-col>
    </a-row>

  </div>
</template>
<script>
import '../majorTree.less'
import { mapState } from 'vuex'
import { changeCatagorytree } from '@/api/upload.js'
export default {
  data () {
    return {
      checkedKeys: [''],
      selectedKeys: [],
      approvalPrivateRadio: '',
      majorModalName: '',
      majorKey: ''
    }
  },
  // props: {
  //   majorModalName: Array
  // },
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
      this.$store.commit('SET_MAJORNAME', selectedKeys[0], info.node.title)
    },
    personnelModal () {
      if (this.majorKey === '') {
        this.$message.info('请选择专业分类')
      } else {
        this.$emit('personnelModal', 'true')
      }
    },
    /**
     * 根据radio查询tree
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    radioTree (e) {
      const that = this
      changeCatagorytree({
        nodeId: e.target.value,
        operationName: '上传知识',
        collapse: true
      }).then(function (res) {
        that.setPrivateTreeModal(res)
        console.log(res)
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
      this.approvalPrivateTree = value
    },
    /**
     * 保存选中专业
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    choiceProfession (selectedKeys, info) {
      console.log('onSelect', info)
      this.majorKey = ''
      this.$store.commit('setMajorSort', selectedKeys[0])
      this.majorKey = selectedKeys[0]
    }
  },
  created () {
    // this.setMajorModalName(this.majorModalName)
    // this.setMajorModalName(this.approvalPrivateTree)
  },
  computed: {
    ...mapState({
      approvalCatagorytree: state => state.knowledge.approvalCatagorytree
      // approvalPrivateTree: state => state.knowledge.approvalPrivateTree
    }),
    approvalPrivateTree: {
      set (newValue) {
        this.$store.state.knowledge.approvalPrivateTree = newValue
      },
      get () {
        return this.$store.state.knowledge.approvalPrivateTree
      }
    }
  }

}
</script>
