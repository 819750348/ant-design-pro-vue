<template>
  <div>
    <a-card>
      <a-row type="flex">
        <a-col :span="4" :offset="2">
          <span style="font-weight:bold;">
            文档状态:
          </span>
        </a-col>
        <a-col :span="16" style="color: #0615e8">
          <span>文档(</span>
          {{ uploadState }}
          <span>)上传成功!</span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
        </a-col>
        <a-col :span="16" style="color: #f5222d">
          <span>文档(</span>
          {{ uploadState }}
          <span>)转换flash失败图片格式将不转换...</span>
        </a-col>
      </a-row>
    </a-card>
    <a-card>
      <a-row type="flex">
        <a-col :span="4" :offset="2">
          <span style="font-weight:bold;">
            请选择知识角类型
          </span>
        </a-col>
        <a-col :span="6">
          <a-select labelInValue :defaultValue="{ key: '在线知识' }" style="width: 160%">
            <a-select-option value="在线知识">在线知识</a-select-option>
            <a-select-option value="离线知识">离线知识</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-card>
    <a-card>
      <div slot="title">
        <p style="margin-top: 12px;color: white">知识属性</p>
      </div>
      <div>
        <a-form
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item
            label="标题"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            style="font-weight:bold;"
          >
            <a-input
              v-decorator="[
                '标题',
                {rules: [{ required: true, message: '请输入标题!' }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="作者"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            style="font-weight:bold;"
          >
            <a-input
              v-decorator="[
                '作者',
                {rules: [{ message: '请输入作者!' }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="关键词"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            style="font-weight:bold;"
          >
            <a-input
              v-decorator="[
                '关键词',
                {rules: [{ required: true, message: '请输入关键字!' }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="个人知识分类"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            style="font-weight:bold;"
          >
            <a-select
              v-decorator="[
                '个人知识分类',
                {rules: [{ required: true, message: '请选择知识分类!' }]}
              ]"
              placeholder=""
              @change="handleSelectChange"
              style="font-weight:normal;"
            >
              <a-select-option value="male">
                male
              </a-select-option>
              <a-select-option value="female">
                female
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="摘要"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            style="font-weight:bold;"
          >
            <a-input
              v-decorator="[
                '摘要',
                {rules: [{ message: '请输入摘要!' }]}
              ]"
            />
          </a-form-item>
          <a-form-item
            label="密级"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            style="font-weight:bold;"
          >
            <a-select
              v-decorator="[
                '密级',
                {rules: [{ required: true, message: '请选择密级!' }]}
              ]"
              placeholder=""
              @change="handleSelectChange"
              style="font-weight:normal;"
            >
              <a-select-option value="非密">
                非密
              </a-select-option>
              <a-select-option value="秘密">
                秘密
              </a-select-option>
              <a-select-option value="机密">
                机密
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            :wrapper-col="{ span: 12, offset: 10 }"
          >
            <a-button
              type="primary"
              html-type="submit"
            >
              完成知识上传
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>
<script>
import './knowledge.less'
export default {
  data () {
    return {
      uploadState: '微信图片_123',
      formLayout: 'horizontal',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    }
  }
}
</script>
<style src="">

</style>
<style scoped>

</style>
