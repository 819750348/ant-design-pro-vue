<template>
  <div>
    <a-collapse style="padding:0px;margin:0px;" v-model="activeKey">
      <a-collapse-panel header="我的知识" key="1">
        <a-tree
          :treeData="privateTreeModal"
          defaultExpandAll
          @select="onSelect"
        ></a-tree>
      </a-collapse-panel>
      <a-collapse-panel key="2">
        <template>
          <span slot="header">
            编辑个人知识分类
            <span style="float: right;margin-right: 10px">
              <button @click.stop="add">增加</button>
              <button style="margin-left: 10px">修改</button>
              <button style="margin-left: 10px">删除</button>
            </span>
          </span>
        </template>
        <a-tree
          defaultExpandAll
          checkable
          @check="check"
          checkStrictly="true"
          :treeData="privateTreeModal"
        >
        </a-tree>
      </a-collapse-panel>
    </a-collapse>
    <a-modal v-model="addNodeModal" title="增加节点">
      <a-row type="flex" justify="center" align="middle">
        <a-col :span="4">
          名称:
        </a-col>
        <a-col :span="20">
          <a-input>

          </a-input>
        </a-col>
      </a-row>
      <a-row type="flex" style="margin-top: 10px">
        <a-col :span="4">
          描述:
        </a-col>
        <a-col :span="20">
          <a-textarea :rows="4">

          </a-textarea>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import treeForm from './treeForm'
const privateKnowledgeListModal = { 'class': 'class edu.zju.cims201.GOF.rs.dto.PageDTO', 'data': [{ 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 22, 'rate': 0.0, 'ratecount': null, 'viewCount': 0 }, 'content': null, 'domainNode': null, 'flashFilePath': '361b2ad1-a0a2-436e-a53f-0ce1962e2d56.swf', 'id': 22, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 6, 'name': 'ä¹ åœ¨è‡ªç„¶è¯­è¨€å¤„', 'showname': 'ä¹ åœ¨è‡ªç„¶è¯­è¨€å¤„' }], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '0', 'titleName': 'ä¹ åœ¨è‡ªç„¶è¯­è¨€å¤„', 'titleShowName': 'ä¹ åœ¨è‡ªç„¶è¯­è¨€å¤„', 'uploadTime': '2019-09-12 13:26:51', 'uploaddate': '2019-09-12', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 65, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }, { 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 21, 'rate': 0.0, 'ratecount': null, 'viewCount': 0 }, 'content': null, 'domainNode': null, 'flashFilePath': 'd2a0e009-0da4-4587-b261-bb1d69f4af01.swf', 'id': 21, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '0', 'titleName': 'æœç´¢å¼•æ“ŽæŠ€æœ¯åŸºç¡€', 'titleShowName': 'æœç´¢å¼•æ“ŽæŠ€æœ¯åŸºç¡€', 'uploadTime': '2019-09-12 11:24:57', 'uploaddate': '2019-09-12', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 65, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }, { 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 20, 'rate': 0.0, 'ratecount': null, 'viewCount': 0 }, 'content': null, 'domainNode': null, 'flashFilePath': 'e0bab29c-6d63-4de3-b054-842959d74e0f.swf', 'id': 20, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '0', 'titleName': 'ä¿¡æ¯æ£€ç´¢æ¨¡åž‹ä¸Žæœç´¢å¼•æ“ŽæŽ’åºç®—æ³•', 'titleShowName': 'ä¿¡æ¯æ£€ç´¢æ¨¡åž‹ä¸Žæœç´¢å¼•æ“ŽæŽ’åºç®—æ³•', 'uploadTime': '2019-09-12 11:24:57', 'uploaddate': '2019-09-12', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 65, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }, { 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 19, 'rate': 0.0, 'ratecount': null, 'viewCount': 0 }, 'content': null, 'domainNode': null, 'flashFilePath': 'c29f30e1-c83b-493b-af83-e3ad9e3e6bbb.swf', 'id': 19, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '100', 'titleName': 'æ–‡æœ¬åˆ†ç±»ç»¼è¿°', 'titleShowName': 'æ–‡æœ¬åˆ†ç±»ç»¼è¿°', 'uploadTime': '2019-09-12 11:24:57', 'uploaddate': '2019-09-12', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 65, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }, { 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 2, 'rate': 0.0, 'ratecount': null, 'viewCount': 10 }, 'content': null, 'domainNode': null, 'flashFilePath': 'adfa4ce4-ac57-4d04-bd7d-c51b529ae334.swf', 'id': 2, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 3, 'name': 'ä¸­æœŸæ£€æŸ¥æŠ¥å‘Š', 'showname': 'ä¸­æœŸæ£€æŸ¥æŠ¥å‘Š' }], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '0', 'titleName': 'ä¸­æœŸæ£€æŸ¥æŠ¥å‘Š', 'titleShowName': 'ä¸­æœŸæ£€æŸ¥æŠ¥å‘Š', 'uploadTime': '2018-12-24 10:56:20', 'uploaddate': '2018-12-24', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 65, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }, { 'KAuthors': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }], 'abstractText': null, 'attachments': null, 'borrowFlowId': null, 'borrowFlowNodeId': null, 'categories': null, 'citationKnowledges': [], 'class': 'class edu.zju.cims201.GOF.rs.dto.KnowledgeDTO', 'commentRecord': { 'class': 'class edu.zju.cims201.GOF.rs.dto.CommentRecordDTO', 'commentCount': 0, 'downloadCount': 0, 'id': 1, 'rate': 0.0, 'ratecount': null, 'viewCount': 9 }, 'content': null, 'domainNode': null, 'flashFilePath': 'a2dc00e3-3bb0-406f-985c-b6eb768a6692.swf', 'id': 1, 'identifier': null, 'isRead': null, 'isUserEqualUpload': null, 'isVisible': null, 'keywords': [{ 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'abcd', 'showname': 'abcd' }], 'knowledgeSourceFilePath': null, 'knowledgeType': null, 'knowledgetype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 1, 'name': 'è®ºæ–‡', 'showname': 'è®ºæ–‡' }, 'ktype': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 2, 'name': 'åœ¨çº¿çŸ¥è¯†', 'showname': 'åœ¨çº¿çŸ¥è¯†' }, 'questioncontent': null, 'questionstatus': null, 'questionsupplement': null, 'securityLevel': 'éžå¯†', 'status': '1', 'titleName': 'abc', 'titleShowName': 'abc', 'uploadTime': '2018-11-05 17:11:46', 'uploaddate': '2018-11-05', 'uploader': { 'class': 'class edu.zju.cims201.GOF.rs.dto.ObjectDTO', 'email': null, 'id': 65, 'name': 'çŽ‹å‡†å¿ ', 'showname': 'çŽ‹å‡†å¿ ' }, 'uploaderName': null, 'userKnowledgeTags': [], 'versions': null }], 'firstindex': 0, 'kccounts': 0, 'orderBy': 'order by o.id desc', 'pagesize': 10, 'total': 6, 'totalPage': 1 }
export default {
  name: 'PersonalTree',
  data () {
    return {
      // 我的知识树
      myKnowledgeTree: [],
      editMyKnowledgeTree: [],
      param: {
        treeNodeName: '',
        visible: false
      },
      selectedKeys: [],
      activeKey: ['1'],
      itemId: 0,
      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 3
      },
      // 个人知识列表
      privateKnowledgeList: privateKnowledgeListModal,
      treeId: 0,
      addNodeModal: false
    }
  },
  props: {
    privateTreeModal: Array
  },
  mounted () {
    console.log(this.privateTreeModal)
    // ui组件树属性和返回的树属性有区别，需要转化下
    this.setPrivateTreeModal(this.privateTreeModal)
    this.getMyKnowledge()
    this.getEditKnowledge()
  },
  components: {
    treeForm
  },
  watch: {
    activeKey (key) {
      // console.log(key)
    }
  },
  methods: {
    // 个人知识 @尘埃
    getMyKnowledge () {
      var vm = this
      this.post('giksp/tree/privilege-tree!listPrivilegeTreeNodes.action', {
        treeType: 'categoryTree',
        operationName: '查看知识'
      }).then(function (res) {
        console.log(res)
        vm.myKnowledgeTree = res
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 编辑个人知识 @尘埃
    getEditKnowledge () {
      var vm = this
      this.post('giksp/tree/privilege-tree!listPrivilegeTreeNodes.action', {
        treeType: 'categoryTree',
        operationName: '节点管理'
      }).then(function (res) {
        console.log(res)
        vm.editMyKnowledgeTree = res
      }).catch(function (err) {
        console.log(err)
      })
    },

    genernateTree (value) {
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        delete item['icon']
        item.scopedSlots = { title: 'custom' }
        if (item.children && item.children.length) {
          this.genernateTree(item.children)
        }
      })
      console.log(JSON.stringify(value))
      return value
    },
    // 选择树节点展示个人节点列表
    onSelect (keys) {
      console.log(keys)
      var id = keys[0]
      var vm = this
      this.axios.post('knowledge!ksearch.action', {
        formvalue: { 'searchlist': [{ 'name': 'categoriesid', 'value': id, 'and_or': 'and' }], 'personalk': '1' },
        selectid: 10,
        index: 0,
        size: 10
      }).then(function (res) {
        vm.privateKnowledgeList = res
      }).catch(function (err) {
        console.log(err)
      })
      vm.$emit('privateKnowledgeList', vm.privateKnowledgeList)
    },
    onSelectByEdit (keys) {
      this.itemId = keys
      // console.log('Trigger Select', keys)
    },
    // 修改添加知识 @尘埃
    addNode (keys) {
      var vm = this
      this.visible = true
      this.param.visible = true
      // console.log('add: ' + keys)
      // 编辑知识树添加知识 @尘埃
      this.axios.post('giksp/tree/tree!save.action', {
        id: keys,
        name: '',
        nodeDescription: ''
      }).then(function (res) {
        console.log(res)
        vm.getMyKnowledge()
        vm.getEditKnowledge()
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 修改编辑知识 @尘埃
    editNode (keys, nName) {
      var vm = this
      this.itemId = keys
      this.param.treeNodeName = nName
      this.param.visible = true
      // console.log('edit: ' + keys)
      // 编辑知识树编辑知识 @尘埃
      this.axios.post('giksp/tree/tree!update.action', {
        id: keys,
        name: '',
        nodeDescription: ''
      }).then(function (res) {
        console.log(res)
        vm.getMyKnowledge()
        vm.getEditKnowledge()
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 修改删除知识 @尘埃
    delNode (keys) {
      var vm = this
      this.itemId = keys
      // console.log('del: ' + keys)
      this.axios.post('giksp/tree/tree!delete.action', {
        id: keys
      }).then(function (res) {
        console.log(res)
        vm.getMyKnowledge()
        vm.getEditKnowledge()
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 转化树属性 @尘埃
    setPrivateTreeModal (value) {
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        if (item.children != null) {
          this.setPrivateTreeModal(item.children)
        }
      })
      console.log(JSON.stringify(this.privateTreeModal))
      console.log(JSON.stringify(value))
      this.privateTreeModal = value
    },
    // 编辑树选择节点
    check (checkedKeys, event) {
      var vm = this
      var treeLength = checkedKeys.checked.length
      if (treeLength > 0) {
        vm.treeId = checkedKeys.checked[treeLength - 1]
      }
    },
    add () {
      this.addNodeModal = true
      if (this.TreeId !== 0) {

      }
    }
  }
}
</script>

<style>
  .row-margin-top {
    margin-top: -16px;
  }

  #leftCard > .ant-card-body {
    padding: 0px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px;
  }
</style>
