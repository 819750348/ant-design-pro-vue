<template>
  <div id="majorModal">
    <a-card>
      <a-tree
        checkable
        @expand="onExpand"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        v-model="checkedKeys"
        @select="onSelect"
        :selectedKeys="selectedKeys"
        :treeData="treeData"
      />
    </a-card>
    <a-row type="flex" justify="center" >
      <a-col >
        <a-button style="margin-top: 10px" @click="personnelModal">确定</a-button>
      </a-col>
    </a-row>

  </div>
</template>
<script>
import './majorTree.less'
const treeData = [{
  title: '仿真',
  key: '0-0',
  children: [{
    title: '信息化',
    key: '0-0-0',
    children: [
      { title: '装备制造', key: '0-0-0-0' },
      { title: '武器系统软件', key: '0-0-0-1' },
      { title: '军用计算机', key: '0-0-0-2' }
    ]
  }, {
    title: '弹上信息处理',
    key: '0-0-1',
    children: [
      { title: '装备制造', key: '0-0-1-0' },
      { title: '装备制造', key: '0-0-1-1' },
      { title: '装备制造', key: '0-0-1-2' }
    ]
  }, {
    title: '新概念武器',
    key: '0-0-2'
  }]
}, {
  title: '新概念武器',
  key: '0-1',
  children: [
    { title: '弹上信息处理', key: '0-1-0-0' },
    { title: '弹上信息处理', key: '0-1-0-1' },
    { title: '弹上信息处理', key: '0-1-0-2' }
  ]
}, {
  title: '新概念武器',
  key: '0-2'
}]

export default {
  data () {
    return {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      treeData
    }
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
    },
    personnelModal () {
      this.$emit('personnelModal', 'true')
    }
  }
}

</script>
