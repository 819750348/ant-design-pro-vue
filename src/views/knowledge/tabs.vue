<template>
  <a-tabs @change="callback" type="card">
    <a-tab-pane tab="个人知识" key="1">
      <personal></personal>
    </a-tab-pane>
    <a-tab-pane tab="共享知识" key="2">
      <share></share>
    </a-tab-pane>
    <a-tab-pane tab="最近浏览" key="3">
      <history></history>
    </a-tab-pane>
    <a-tab-pane tab="上传知识" key="4">
      <upload v-if="state==0" @uploadedSuccessfully="uploadInit"></upload>
      <edit v-if="state==1"></edit>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import upload from './upload'
import edit from './edit'
import share from './share'
import personal from './personal'
import history from './history'
export default {
  data () {
    return {
      state: 0
    }
  },
  components: {
    upload: upload,
    personal: personal,
    edit: edit,
    share: share,
    history: history
  },
  methods: {
    callback (key) {
      // console.log(key)
    },
    uploadInit () {
      this.state = 1
    }
  }
}
</script>
