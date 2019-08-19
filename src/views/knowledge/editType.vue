<template>
  <div>
    <a-modal
      :maskClosable="false"
      title="修改分类"
      :visible="param.visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form>
        <a-form-item
          :label-col="5"
          :wrapper-col="19"
          label="知识分类"
        >
          <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'EditType',
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
    },
    handleChange (e) {
      // console.log(`selected ${value}`)
    }
  }
}
</script>

<style scoped>

</style>
