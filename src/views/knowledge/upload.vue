<template>
  <a-upload-dragger
    name="file"
    :multiple="false"
    action="http://localhost:8006/giksp/knowledge/fileupload!sourcefileupload_j.action"
    @change="handleChange">
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox"/>
    </p>
    <p class="ant-upload-text">+上传文档</p>
    <p class="ant-upload-hint">文档上传须知</p>
    <p class="ant-upload-hint">请上传大小小于50M的附件</p>
    <p class="ant-upload-hint">为了保证文档能正常显示，我们支持以下格式文档上传:</p>
    <p> MS Office文档 <span><img style="height: 18px;width: 18px;" src="@/assets/w.png"></span> doc docx
      <span><img style="height: 18px;width: 18px;" src="@/assets/x.png"></span>xls xlsx
      <span><img style="height: 18px;width: 18px;" src="@/assets/p.png"></span>ppt pptx pot pps</p>
    <p> PDM <span><img style="height: 18px;width: 18px;" src="@/assets/pdf.png"></span> pdf</p>
    <p> 图片 <span><img style="height: 18px;width: 18px;" src="@/assets/jpg.png"></span> jpg
      <span><img style="height: 18px;width: 18px;" src="@/assets/gif.png"></span>gif
      <span><img style="height: 18px;width: 18px;" src="@/assets/png.png"></span>png</p>
    <p>纯文本 <span><img style="height: 18px;width: 18px;" src="@/assets/txt.png"></span> txt</p>
  </a-upload-dragger>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleChange (info) {
      const status = info.file.status
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
        this.$emit('uploadedSuccessfully')
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>
