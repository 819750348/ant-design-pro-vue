<template>
  <div>
    <a-menu
      @click="handleClick"
      style="width: 256px"
      :defaultSelectedKeys="['1']"
      :openKeys.sync="openKeys"
      mode="inline"
    >
      <a-sub-menu key="sub1" @titleClick="titleClick">
        <span slot="title"><span>研究生知识库</span></span>
        <a-menu-item-group key="g1">
          <a-menu-item key="1"><a-icon type="folder" />专业分类</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="sub2" @titleClick="titleClick">
        <span slot="title"><span>企业知识库</span></span>
        <a-menu-item key="5">术语知识</a-menu-item>
        <a-menu-item key="6">词条知识</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      current: ['mail'],
      openKeys: ['sub1']
    }
  },
  methods: {
    handleClick (e) {
      console.log('click', e)
    },
    titleClick (e) {
      console.log('titleClick', e)
    }
  },
  watch: {
    openKeys (val) {
      console.log('openKeys', val)
    }
  }
}

</script>
