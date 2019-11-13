<template>
  <a-card>
    <a-row type="flex" justify="center">
      <a-col :span="18" >
        <p>你已选择了<span style="color: #cf1322">{{ approvalName }}</span>作为该阶段的审批人员，将知识共享在<span style="color: #cf1322">{{ approvalType }}</span>
          的专业分类中</p>
      </a-col>
      <a-col :span="6">
        <a-button>确定并提交</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
export default {
  data () {
    return {
      approvalName: '',
      approvalType: ''
    }
  },
  watch: {

  },
  methods: {

  },
  mounted () {
    this.approvalName = this.$store.state.approval.majorName
    this.approvalType = this.$store.state.approval.personnel
  }
}
</script>
