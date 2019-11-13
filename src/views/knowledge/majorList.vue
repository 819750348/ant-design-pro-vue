<template>
  <a-card :bordered="true" title="专业分类">
    <div>
      <a-form layout="inline">
        <a-row>
          <a-col :md="5" :sm="24" :span="5">
            <a-form-item label="标题">
              <a-input :value="titleQuery" style="width:150px;"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24" :span="5">
            <a-form-item label="作者">
              <a-input :value="authorQuery" style="width:150px;" />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24" :span="5">
            <a-form-item label="类型">
              <a-select @change="typeChange" placeholder="请选择" default-value="0" style="width:150px;">
                <a-select-option value="4">全部</a-select-option>
                <a-select-option value="1">术语TESTTHREE知识</a-select-option>
                <a-select-option value="2">词条</a-select-option>
                <a-select-option value="2">专业术语TEST知识</a-select-option>
                <a-select-option value="2">论文</a-select-option>
                <a-select-option value="2">术语</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="9" :sm="24" :span="9">
            <span>
              <a-button type="primary" @click="query">过滤</a-button>
            </span>
          </a-col>
        </a-row>
        <a-row>
          <template>
            <a-list itemLayout="vertical" :pagination="pagination" :dataSource="majorContentLists">
              <a-list-item slot="renderItem" slot-scope="item" key="item.title">
                <template>
                  <a-row>
                    <a-col :span="14">
                      <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                        <a-list-item-meta>
                          <a slot="title" :href="item.href">{{ item.titleName }}</a>
                        </a-list-item-meta>
                      </div>
                    </a-col>
                    <a-col :span="10">
                      <a-button @click="aa">详情</a-button>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/2.png"></img>{{ item.uploader.name }}</a-col>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/1.png"></img><span v-if="item.keywords.length > 0">{{ item.KAuthors[0].name }}</span></a-col>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/5.png"></img><span v-if="item.keywords.length > 0">{{ item.keywords[0].name }}</span></a-col>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/3.png"></img>{{ item.knowledgetype.name }}</a-col>
                    <a-col :span="7"><img style="height: 15px;width: 15px;" src="@/assets/4.png"></img>{{ item.uploaddate }}</a-col>
                  </a-row>
                </template>
              </a-list-item>
            </a-list>
          </template>
        </a-row>
      </a-form>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'ShareList',
  data () {
    return {
      // listData,
      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 5
      },
      titleQuery: '',
      authorQuery: '',
      typeQuery: ''
    }
  },
  props: {
    majorContentLists: Array
  },
  methods: {
    aa () {
      console.log(this.majorContentLists)
      console.log(this.majorContentLists)
    },
    query () {
      var vm = this
      vm.axios.post('knowledge!ksearch.action', {
        formvalue: { 'searchlist': [{ 'name': 'domainnodeid', 'value': vm.typeQuery, 'and_or': 'and' }, { 'name': 'kauthors_or_uploader', 'value': vm.titleQuery, 'and_or': 'and' }, { 'name': 'titlename', 'value': vm.authorQuery, 'and_or': 'and' }] },
        selectid: 4,
        index: 0,
        size: 10
      }).then(function (res) {
        vm.majorContentLists = res
      }).catch(function (err) {
        console.log(err)
      })
    },
    typeChange (data) {
      this.typeChange = data
    }
  }
}
</script>

<style scoped>

</style>
