<template>
  <div id="detailCard">
    <a-card>
      <a-row type="flex">
        <a-col :span="4" :offset="2">
          <span style="font-weight:bold;">
            文档状态:
          </span>
        </a-col>
        <a-col :span="16" style="color: #0615e8">
          <span>
            文档《
          </span>
          {{ uploadState }}
          <span>
            》上传成功！
          </span>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
        </a-col>
        <a-col :span="16" v-if="flashconvertState===''" style="color: #0615e8">
          <span ></span>
        </a-col>
        <a-col :span="16" v-if="flashconvertState===true" style="color: #0615e8">
          <span >文档《</span>
          <span>{{ uploadState }}</span>
          <span>》转换为flash成功！</span>
        </a-col>
        <a-col :span="16" style="color: #f5222d" v-if="flashconvertState===false" >
          <span>文档《</span>
          <span>{{ uploadState }}</span>
          <span>》转换为flash失败！</span>
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
          <a-select v-modal="kType" style="width: 160%" @change="selectKType" :defaultValue="kType[0].ktypeName">
            <a-select-option v-for="type in kType" :key="type.id">{{ type.ktypeName }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-card>
    <a-card>
      <div slot="title">
        <p style="margin-top: 12px;color: white">知识属性</p>
      </div>
      <div>
        <a-form :form="form" @submit="catagorytreeSubmit" v-if="dform">
          <span v-for="item in KList" :key="item.id">
            <a-form-item
              selfUpdate="true"
              :label="item.description"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
              v-if="item.vcomponent ==='textfield' && item.isVisible ===true ">
              <a-input
                v-decorator="[
                  item.name + '-' + item.id,
                  { rules: [{ required: item.isNotNull, message: '不能为空!' }] },
                ]"
                placeholder=""/>
            </a-form-item>
            <a-form-item
              selfUpdate="true"
              :label="item.description"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
              v-if="item.vcomponent ==='combo' && item.isVisible ===true ">
              <a-select
                style="width: 100%;"
                v-decorator="[
                  item.name + '-' + item.id,
                  { rules: [{ required: item.isNotNull, message: '不能为空!' }] },
                ]">
                <a-select-option
                  v-for="d in item.valuelist.split(',')"
                  :key="d"
                  :value="d"
                >{{ d }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              selfUpdate="true"
              :label="item.description"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
              v-if="item.vcomponent ==='textarea' && item.isVisible ===true ">
              <a-textarea
                v-decorator="[
                  item.name + '-' + item.id,
                  { rules: [{ required: item.isNotNull, message: '不能为空!' }] },
                ]"/>
            </a-form-item>
            <a-form-item
              selfUpdate="true"
              :label="item.description"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 12 }"
              v-if="item.vcomponent ==='catagorytree' && item.isVisible ===true ">
              <a-input
                @click="catagorytreeModal"
                v-model="catagorytreeTitle"
              >
                <a-tooltip slot="suffix" title="Extra information">
                  <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                </a-tooltip>
              </a-input>
            </a-form-item>
            <!--<a-form-item-->
            <!--:label="item.description+ 'domaintree'"-->
            <!--:label-col="{ span: 5 }"-->
            <!--:wrapper-col="{ span: 12 }"-->
            <!--v-if="item.vcomponent ==='domaintree' && item.isVisible ===true ">-->
            <!--<a-input-->
            <!--@click="domaintreeModal">-->
            <!--<a-tooltip slot="suffix" title="Extra information">-->
            <!--<a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />-->
            <!--</a-tooltip>-->
            <!--</a-input>-->
            <!--</a-form-item>-->
          </span>
          <a-form-item >
            <a-button type="primary" html-type="submit" style="margin-left: 40%">
              {{ "完成提交" }}
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
    <a-modal
      :visible="catagorytreeVisible"
      @ok="catagorytreeOk"
      :confirmLoading="confirmLoading"
      @cancel="catagorytreeCancel"
      id="catagorytreeModal"
      width="800px"
    >
      <template slot="title">{{ "选择个人分类" }}</template>
      <a-card size="small" style="width: 750px">
        <template solt="title">
          <a-radio-group name="radioGroup" @change="selectRadio" style="width: 100%;text-overflow: ellipsis;white-space: normal;">
            <a-radio v-for=" ctr in catagorytreeRadio " :key="ctr.id" :value="ctr.nodeId">{{ ctr.name }}</a-radio>
          </a-radio-group>
        </template>
        <div>
          {{ "分类" }}
        </div>
        <div style="height: 260px;overflow-y: auto">
          <a-tree
            checkable
            :treeData="catagorytreeData"
            checkStrictly="true"
            defaultExpandAll="true"
            @check="catagorytreeCheck"
          ></a-tree>
        </div>
      </a-card>
    </a-modal>
    <a-modal
      title="Title"
      :visible="domaintreeVisible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <p>{{ "domaintreeVisible" }}</p>
    </a-modal>
  </div>
</template>
<script>
import './knowledge.less'
import './edit.less'
import { mapState } from 'vuex'
import { getFlashconvert, selectKType, catagorytree, changeCatagorytree, catagorytreeOK } from '@/api/upload.js'
import { getPrivateTree } from '@/api/personalKnowledge.js'
import ARow from 'ant-design-vue/es/grid/Row'

// import Vue from 'vue'
export default {
  components: { ARow },
  data () {
    return {
      // kType: '',
      uploadState: '',
      uploadFile: '',
      uploadInfo: '',
      knowledgeType: '',
      formLayout: 'horizontal',
      biaoqain: '',
      treeIds: '',
      treeNames: [],
      form: this.$form.createForm(this, { name: 'uploadForm' }),
      /**
       * 文件转换状态
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      flashconvertState: '',
      /**
       * 知识数据
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      KList: '',
      /**
       * 默认知识类型选择
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      // dktypeName: '',
      /**
       * 知识类型选择id
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      selectKTypeId: '',
      catagorytreeVisible: false,
      domaintreeVisible: false,
      /**
       * 上传catagorytree弹出框radio数据
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      catagorytreeRadio: '',
      /**
       * catagorytree树数据
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      catagorytreeData: '',
      /**
       * catagorytree输入框key
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      catagorytreeKey: '',
      /**
       * catagorytree输入框title
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      catagorytreeTitle: '',
      /**
       * 登录表单
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      // catagorytreeArrayTitle: ''

      /**
       * 表单销毁
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      dform: true
    }
  },
  // beforeCreate () {
  //   this.form = this.$form.createForm(this, { name: 'normal_login' })
  // },
  methods: {
    // handleSubmit (e) {
    //   e.preventDefault()
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log('Received values of form: ', values)
    //     }
    //   })
    // },
    // handleSelectChange (value) {
    //   console.log(value)
    //   this.form.setFieldsValue({
    //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
    //   })
    // },
    /**
     * 选择知识类型
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    selectKType (value) {
      var vm = this
      vm.$nextTick(() => {
        vm.dform = false
      })
      vm.$nextTick(() => {
        vm.dform = true
      })

      selectKType({ id: value }).then(function (res) {
        // res.forEach(item => vm.dynamicComponents(item))
        vm.KList = res
        vm.selectKTypeId = value
      }).catch(function (err) {
        console.log(err)
      })
    },

    /**
     * 动态渲染dom
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    // dynamicComponents (item) {
    //   this.form = this.$form.createForm(this, options)

    // if (item.isVisible) {
    //   if (item.vcomponent === 'textfield') {
    //     var Profile = Vue.extend({
    //       template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    //       data: function () {
    //         return {
    //           firstName: 'Walter',
    //           lastName: 'White',
    //           alias: 'Heisenberg'
    //         }
    //       }
    //     })
    //     new Profile().$mount('#pp')
    //   }
    // }
    // },

    handleReset () {
      this.form.resetFields()
    },
    /**
     * 提交表单
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    catagorytreeSubmit (e) {
      e.preventDefault()
      var vm = this
      if (vm.catagorytreeTitle === '') {
        vm.$message.info('个人知识分类不能为空')
      } else {
        this.form.validateFields((err, values) => {
          if (!err) {
            vm.$router.push({ name: 'upload', params: {} })
            console.log('values' + values)
            const obj = {}
            for (const key in values) {
              const arrayKeys = key.split('-')
              const objKey = arrayKeys[0]
              if (arrayKeys.length > 0) {
                obj[objKey] = values[key]
              }
            }
            console.log('obj' + obj)
            console.log(vm.catagorytreeKey)
            var categories = { categories: vm.catagorytreeKey }
            Object.assign(obj, categories)
            console.log('values' + values)
            var formvalue = JSON.stringify(obj)
            console.log(vm.selectKTypeId)
            catagorytreeOK({
              sourcefilepath: vm.uploadFile,
              formvalue: formvalue,
              domain: '',
              ktypeid: vm.selectKTypeId
            }).then(function (res) {
              if (res === '知识保存成功!') {
                // vm.$store.commit('saveState', true)
                setTimeout(() => {
                  vm.$notification.success({
                    message: '保存成功'
                  })
                }, 1000)
              } else {
                setTimeout(() => {
                  vm.$notification.success({
                    message: '保存失败'
                  })
                }, 1000)
                // vm.$store.commit('saveState', false)
              }
            }).catch(function (err) {
              console.log(err)
            })
          }
        })
      }
    },
    // handleSelectChange (values) {
    //   var vm = this
    //   var arrayValue = values.split('-')
    //   var k = arrayValue[0].toString()
    //   var v = arrayValue[1]
    //   vm.form.setFieldsValue({
    //     k: v
    //   })
    // }
    /**
     * 分类模态框
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    catagorytreeModal () {
      this.catagorytreeVisible = true
      this.uploadCatagorytree()
      this.uploadPrivateTree()
    },

    uploadCatagorytree () {
      /**
       * 上传分类树
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      var vm = this
      catagorytree({
        treeType:	'categoryTree',
        disableInte:	true,
        operationName: '上传知识'
      }).then(function (res) {
        console.log(res)
        vm.catagorytreeRadio = res
        console.log(vm.catagorytreeRadio)
      }).catch(function (err) {
        console.log(err)
      })
    },
    uploadPrivateTree () {
      /**
       * 上传个人知识
       *
       * @Author 尘埃Friend
       * @date 2019-12-03
       */
      var vm = this
      getPrivateTree({
        treeType:	'categoryTree',
        operationName:	'上传知识'
      }).then(function (res) {
        console.log(res)
        vm.setTreeModal(res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    /**
     * catagorytree选择事件
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    selectRadio (e) {
      var vm = this
      console.log(e)
      changeCatagorytree({
        nodeId:	e.target.value,
        operationName:	'上传知识',
        collapse:	true })
        .then(function (res) {
          console.log(res)
          vm.setTreeModal(res)
        }).catch(function (err) {
          console.log(err)
        })
      // // 模拟数据
      //
      // const ss = [{
      //   '__viewicon': false,
      //   'checked': 0,
      //   'children': [{
      //     '__viewicon': false,
      //     'checked': 0,
      //     'children': null,
      //     'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO',
      //     'expanded': true,
      //     'icon': 'e-tree-category-child',
      //     'id': 1008,
      //     'index': 'categoriesid',
      //     'name': '12444',
      //     'nodeDescription': null,
      //     'orderId': 1008,
      //     'parentId': 0,
      //     'style': null,
      //     'treenodedtos': []
      //   }],
      //   'class': 'class edu.zju.cims201.GOF.rs.dto.TreeNodeDTO',
      //   'expanded': true,
      //   'icon': 'e-tree-category',
      //   'id': 15,
      //   'index': 'categoriesid',
      //   'name': '125553',
      //   'nodeDescription': null,
      //   'orderId': 10,
      //   'parentId': 0,
      //   'style': null,
      //   'treenodedtos': []
      // }]
      // this.setTreeModal(ss)
    },
    /**
     *catagorytree树选择事件
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    catagorytreeCheck (selectedKeys, e) {
      var vm = this
      vm.treeNames = []
      console.log(selectedKeys, e)
      vm.treeIds = selectedKeys.checked
      // this.getTreeName(vm.treeNames)

      vm.treeIds.forEach(item => {
        vm.getTreeName(vm.catagorytreeData, item)
      })
      // this.getTreeName(selectedKeys)
      // catagorytreeData

      // if (e.checkedNodes.length > 0) {
      //   for (let i = 0; i < e.checkedNodes.length; i++) {
      //     vm.arrayTitles.push(e.checkedNodes[i].componentOptions.propsData.title)
      //   }
      // }
      // vm.catagorytreeTitle = vm.arrayTitles.join(',')
      // vm.catagorytreeKey = selectedKeys.checked.join(',')
      // console.log(vm.catagorytreeTitle, vm.catagorytreeKey)
    },
    /**
     * 根据复选框获取树名称
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    getTreeName (names, id) {
      var vm = this
      names.forEach(item => {
        if (item.id === id) {
          vm.treeNames.push(item.name)
        }
        if (item.children !== null) {
          vm.getTreeName(item.children, id)
        }
      })
    },
    /**
     * catagorytree提交
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    catagorytreeOk () {
      this.catagorytreeKey = ''
      this.catagorytreeTitle = ''
      this.catagorytreeKey = this.treeIds.join(',')
      this.catagorytreeTitle = this.treeNames.join(',')
      this.catagorytreeVisible = false
    },

    /**
     * catagorytree取消
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    catagorytreeCancel () {
      this.catagorytreeVisible = false
      this.catagorytreeTitle = ''
      this.catagorytreeKey = ''
    },
    /**
     * domaintreeModal
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    domaintreeModal () {
      this.domaintreeVisible = true
    },
    /**
     * 树属性转换
     *
     * @Author 尘埃Friend
     * @date 2019-11-27
     */
    setTreeModal (value) {
      value.forEach(item => {
        item.title = item.name
        item.key = item.id
        if (item.children != null) {
          this.setTreeModal(item.children)
        }
      })
      console.log(JSON.stringify(value))
      this.catagorytreeData = value
    },
    /**
     * 调用flash转换接口
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    flashconvert (fileName, fileTitle) {
      var vm = this
      console.log('getFlashconvert' + fileName + fileTitle)
      // new Promise(function (resolve, reject) {
      /**
         * 调用flash转换接口
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */
      getFlashconvert({ filename: fileName, fileTitle: fileTitle }).then(function (res) {
        console.log('getFlashconvert' + fileName + fileTitle)
        console.log('getFlashconvert' + res)
        if (res === '转换成功') {
          console.log('getFlashconvert' + fileName + fileTitle)
          // resolve(res)
          // if (res.data === '转换成功') {
          //   resolve(res.data)
          vm.flashconvertState = true
        } else {
          vm.flashconvertState = false
          // reject(new Error('转换失败'))
        }
      }).catch(function (err) {
        console.log(err)
      })
      // }).then(
      //   function (r) {
      //     console.log(r)
      //     vm.flashconvertState = true
      //   },
      //   function (e) {
      //     console.log(e)
      //     vm.flashconvertState = false
      //   }).catch(function (data) {
      //   console.log(data)
      // })
    }
  },
  // mounted () {
  //   this.uploadState = this.$route.params.updateState
  //   this.updateFile = this.$route.params.updateFile
  //   // this.dynamicComponents()
  //   //
  //   // var Profile = Vue.extend({
  //   //   template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  //   //   data: function () {
  //   //     return {
  //   //       firstName: 'Walter',
  //   //       lastName: 'White',
  //   //       alias: 'Heisenberg'
  //   //     }
  //   //   }
  //   // })
  //   // new Profile().$mount('#pp')
  //   /**
  //    * 初始化表单
  //    *
  //    * @Author 尘埃Friend
  //    * @date 2019-12-03
  //    */
  //   this.selectKType(this.kType)
  //   this.selectKType(this.kType)
  //   // console.log(this.kType[0].id)
  // },
  created () {
    this.uploadState = this.$route.params.uploadState
    this.uploadFile = this.$route.params.uploadFile
    this.uploadInfo = this.$route.params.info
    this.flashconvert(this.uploadFile, this.uploadState)
    this.selectKType(this.kType[0].id)
  },
  // watch: {
  //   '$route' (to, from) {
  //     // 对路由变化作出响应...
  //     this.uploadState = this.$route.params.updateState
  //     this.updateFile = this.$route.params.updateFile
  //   }
  // },
  computed: {
    ...mapState({
      // flashconvert: state => state.knowledge.flashconvert,
      kType: state => state.knowledge.kType
    })
  }
}
</script>
<style scoped>

</style>
