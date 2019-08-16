<template>
  <div>
    <a-row type="flex" justify="space-between">
      <a-col :span="10">
        <a-card>
          <a-tree
            showLine
            :defaultExpandedKeys="['0-0-0']"
            @select="onSelect"
            :treeData="treeData"
          >
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card>
          <a-list
            bordered
            :dataSource="dataList"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <span>{{item}}</span>
            </a-list-item>
            <div slot="header" style="color: #666666">人员</div>
            <div slot="footer">Footer</div>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
const treeData = [{
  title: 'parent 1',
  key: '0-0',
  slots: {
    icon: 'smile'
  },
  children: [
    { title: 'leaf', key: '0-0-0', slots: { icon: 'meh' } },
    { title: 'leaf', key: '0-0-1', scopedSlots: { icon: 'custom' } }]
}]
export default {
  data () {
    return {
      treeData: treeData,
      dataList: [
        'Racing',
        'Japanese',
        'Australian',
        'Man',
        'Los'
      ]
    }
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    }
  }
}
</script>
