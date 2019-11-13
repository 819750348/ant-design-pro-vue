<template>
  <a-collapse style="padding:0px;margin:0px;" v-model="activeKey" accordion="true">
    <a-collapse-panel header="专业导航" key="1">
      <a-menu style="padding:0px;margin:0px;" mode="inline">
        <a-menu-item key="1" @click="majorC">
          <a-icon type="folder" />
          <span >专业分类</span>
        </a-menu-item>
      </a-menu>
    </a-collapse-panel>
    <a-collapse-panel header="企业知识库" key="2">
      <a-menu style="padding:0px;margin:0px;" mode="inline">
        <a-menu-item key="2">
          <a-icon type="pie-chart" />
          <span>术语知识</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="desktop" />
          <span>词条知识</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="desktop" />
          <span>专业术语TEST知识</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="desktop" />
          <span>术语TESTTHREE知识</span>
        </a-menu-item>
      </a-menu>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
// 模拟数据
const majorContentModal = { class: 'class edu.zju.cims201.GOF.rs.dto.PageDTO', data: [{ 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 3, 'name': 'ç³»ç»Ÿç®¡ç†å‘˜', 'showname': 'ç³»ç»Ÿç®¡ç†å‘˜' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 23, 'rate': 0.0, 'ratecount': null, 'viewCount': 0 }, 'content': null, 'domainNode': null, 'flashFilePath': '8ca4d571-4471-4705-a1c9-c10da92827dd.swf', 'id': 23, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '100', 'titleName': 'æ·±åº¦å­¦ä¹ åœ¨è‡ªç„¶è¯­è¨€å¤„ç†ä¸­çš„åº”ç”¨', 'titleShowName': 'æ·±åº¦å­¦ä¹ åœ¨è‡ªç„¶è¯­è¨€å¤„ç†ä¸­çš„åº”ç”¨', 'uploadTime': '2019-09-12 13:28:22', 'uploaddate': '2019-09-12', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'ç³»ç»Ÿç®¡ç†å‘˜', 'showname': 'ç³»ç»Ÿç®¡ç†å‘˜' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }, { 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 19, 'rate': 0.0, 'ratecount': null, 'viewCount': 0 }, 'content': null, 'domainNode': null, 'flashFilePath': 'c29f30e1-c83b-493b-af83-e3ad9e3e6bbb.swf', 'id': 19, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '100', 'titleName': 'æ–‡æœ¬åˆ†ç±»ç»¼è¿°', 'titleShowName': 'æ–‡æœ¬åˆ†ç±»ç»¼è¿°', 'uploadTime': '2019-09-12 11:24:57', 'uploaddate': '2019-09-12', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 65, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }, { 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 3, 'name': 'ç³»ç»Ÿç®¡ç†å‘˜', 'showname': 'ç³»ç»Ÿç®¡ç†å‘˜' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 10, 'rate': 0.0, 'ratecount': null, 'viewCount': 0 }, 'content': null, 'domainNode': null, 'flashFilePath': '1ee4c8a9-e68b-4de8-b1a3-d8ea2c764f8d.swf', 'id': 10, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '1', 'titleName': 'æœ¯è¯­æµ‹è¯•', 'titleShowName': 'æœ¯è¯­æµ‹è¯•', 'uploadTime': '2019-05-24 13:47:46', 'uploaddate': '2019-05-24', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'ç³»ç»Ÿç®¡ç†å‘˜', 'showname': 'ç³»ç»Ÿç®¡ç†å‘˜' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }, { 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 3, 'name': 'ç³»ç»Ÿç®¡ç†å‘˜', 'showname': 'ç³»ç»Ÿç®¡ç†å‘˜' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 9, 'rate': 0.0, 'ratecount': null, 'viewCount': 0 }, 'content': null, 'domainNode': null, 'flashFilePath': '9645cee2-f2b4-440c-9142-5115a7b8ecd6.swf', 'id': 9, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '1', 'titleName': 'æœ¯è¯­æµ‹è¯•', 'titleShowName': 'æœ¯è¯­æµ‹è¯•', 'uploadTime': '2019-05-24 13:47:46', 'uploaddate': '2019-05-24', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'ç³»ç»Ÿç®¡ç†å‘˜', 'showname': 'ç³»ç»Ÿç®¡ç†å‘˜' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }, { 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 1, 'rate': 0.0, 'ratecount': null, 'viewCount': 9 }, 'content': null, 'domainNode': null, 'flashFilePath': 'a2dc00e3-3bb0-406f-985c-b6eb768a6692.swf', 'id': 1, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'abcd', 'showname': 'abcd' }], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '1', 'titleName': 'abc', 'titleShowName': 'abc', 'uploadTime': '2018-11-05 17:11:46', 'uploaddate': '2018-11-05', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 65, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }], 'firstindex': 0, 'kccounts': 0, 'orderBy': 'order by o.id desc', 'pagesize': 10, 'total': 5, 'totalPage': 1 }
// const termKnowledgeModal = { 'and_or': null, 'class': 'class edu.zju.cims201.GOF.rs.dto.PropertyDTO', 'description': 'è‹±æ–‡', 'id': null, 'isCommon': null, 'isNotNull': null, 'isVisible': null, 'length': 200, 'name': 'eng', 'propertyType': null, 'searchable': null, 'text': null, 'value': null, 'valuelist': null, 'vcomponent': null }

export default {
  data () {
    return {
      majorContent: [],
      // termKnowledge: [],
      // 模拟数据
      majorContentModal: majorContentModal.data

    }
  },
  watch: {

  },
  created () {
  },
  methods: {
    // 专业分类
    majorC () {
      var vm = this
      this.axios.post('/knowledge!ksearch.action', {
        formvalue: { 'searchlist': [{ 'name': 'domainnodeid', 'value': 4, 'and_or': 'and' }] },
        selectid: 4,
        index: 0,
        size: 10
      }).then(function (res) {
        vm.majorContent = res.data
      }).catch(function (err) {
        console.log(err)
      })
      // 模拟数据
      vm.$emit('majorContent', vm.majorContentModal)
    }
    // termKnowledgeF () {
    //   var vm = this
    //   vm.$emit('termKnowledge')
    //   vm.axios.post('knowledge!listWikiSearchablePropertiesByKtype.action', {
    //     ktypeid: 7
    //   }).then(function (res) {
    //     vm.termKnowledge = res
    //     console.log(res)
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
