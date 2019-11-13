<template>
  <div id="majorModal">
    <a-card>
      <a-row>
        <a-col :span="12">
          <div>专业名称</div>
          <a-tree
            checkable
            @expand="onExpand"
            :expandedKeys="expandedKeys"
            :autoExpandParent="autoExpandParent"
            v-model="checkedKeys"
            @select="onSelect"
            :selectedKeys="selectedKeys"
            :treeData="majorModalName"
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
export default {
  data () {
    return {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: [''],
      selectedKeys: []
    }
  },
  props: {
    majorModalName: Array
  },
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
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
      this.$emit('personnelModal', 'true')
    },
    // 转换树的格式名称
    setMajorModalName (value) {
      var vm = this
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        if (item.child != null) {
          vm.setMajorModalName(value)
        }
        vm.majorModalName = value
      })
    }

  },
  created () {
    this.setMajorModalName(this.majorModalName)
  }

}
</script>
