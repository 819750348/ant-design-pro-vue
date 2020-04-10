<template>
  <a-card>
    <a-row type="flex" justify="center">
      <a-col :span="18" >
        <p>你已选择了<span style="color: #cf1322">{{ approvalName }}</span>作为该阶段的审批人员，将知识共享在<span style="color: #cf1322">{{ approvalType }}</span>
          的专业分类中</p>
      </a-col>
      <a-col :span="6">
        <a-button @click="submit">确定并提交</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import { submitApprovalor } from '@/api/personalKnowledge'
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
    submit () {
      const that = this
      submitApprovalor({
        approvalorId: that.$store.state.approval.personnel,
        approvalFlowId: that.$store.state.knowledge.approvalFlowId,
        domainid: that.$store.state.knowledge.majorSort,
        domainname: '',
        knowledgeId: that.$store.state.knowledge.knowledgeId
      }).then(function (res) {
        that.$emit('handleCancel')
        console.log(res)
      }).catch(function (err) {
        that.$emit('handleCancel')
        console.log(err)
      })
    }
  },
  mounted () {
    this.approvalName = this.$store.state.approval.majorName
    this.approvalType = this.$store.state.approval.personnel
  }
}
</script>
