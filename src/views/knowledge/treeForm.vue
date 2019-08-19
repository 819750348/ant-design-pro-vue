<template>
  <div>
    <a-modal
      :maskClosable="false"
      title="编辑节点"
      :visible="param.visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form>
        <a-form-item
          :label-col="5"
          :wrapper-col="19"
          label="节点名称"
        >
          <a-input v-model="param.treeNodeName" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'TreeName',
  data () {
    return {
      confirmLoading: false
      // form: this.$form.createForm(this)
    }
  },
  props: {
    param: {
      treeNodeName: '',
      visible: false
    }
  },
  methods: {
    showModal () {
      this.param.visible = true
    },
    handleOk (e) {
      const d = {
        nName: this.param.treeNodeName
      }
      this.$emit('editNodeName', d)
      this.param.visible = false
    },
    handleCancel (e) {
      // console.log('Clicked cancel button')
      this.param.visible = false
    }
  }
}
</script>

<style scoped>

</style>
