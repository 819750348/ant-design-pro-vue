<template>
  <div>
    <a-tabs defaultActiveKey="1" onChange="">
      <a-tab-pane tab="Tab 1" key="1">
        <i-know-list>
        </i-know-list>
      </a-tab-pane>
      <a-tab-pane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane tab="Tab 4" key="4">
        Content of Tab Pane 4
      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<script>
import 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import IKnowList from '@/views/knowledge/knowList'
export default {
  name: 'Monitor',
  components: {
    IKnowList
  }
}

</script>

<style scoped>

</style>
