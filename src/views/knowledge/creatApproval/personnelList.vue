<template>
  <div id="personnel-card">
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
          <a-table :columns="columns" :dataSource="data">
            <span slot="customTitle">人员</span>
            <span slot="name" slot-scope="text"><a-icon type="user"/>{{ text }}</span>
            <span slot="tags" slot-scope="tags">
              <a-radio-group @change="onChange" v-model="radioValue">
                <a-radio :style="radioStyle" :value="tags">{{ "选择" }}</a-radio>
              </a-radio-group>
            </span>
          </a-table>
        </a-card>
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
  // title: 'Tags',
  // key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' }
}]

const data = [{
  key: '1',
  name: 'John Brown',
  tags: 1
}, {
  key: '2',
  name: 'Jim Green',
  tags: 2
}, {
  key: '3',
  name: 'Joe Black',
  tags: 3
}]
const treeData = [{
  title: '精导秘书办公室',
  key: '0-0',
  slots: {
    icon: 'smile'
  },
  children: [
    { title: '1', key: '0-0-0', slots: { icon: 'meh' } },
    { title: '2', key: '0-0-1', scopedSlots: { icon: 'custom' } }]
}, {
  title: '十一室',
  key: '0-1',
  slots: {
    icon: 'smile'
  },
  children: [
    { title: '3', key: '0-1-0', slots: { icon: 'meh' } },
    { title: '4', key: '0-1-1', scopedSlots: { icon: 'custom' } }]
},
{
  title: '十室',
  key: '0-2',
  slots: {
    icon: 'smile'
  },
  children: [
    { title: '5', key: '0-2-0', slots: { icon: 'meh' } },
    { title: '6', key: '0-2-1', scopedSlots: { icon: 'custom' } }]
}
]
export default {
  data () {
    return {
      treeData: treeData,
      data,
      columns,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      radioValue: 1
    }
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    }
  }
}
</script>
