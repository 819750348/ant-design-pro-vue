<template>
  <a-card :bordered="true">
    <div>
      <span>标题&nbsp;<a-input v-model="titlename" style="width:150px;"/></span>
      <span v-for="s in searchList" ref="inputValue">
        {{ s.description }}&nbsp;<a-input :name="s.name" style="width:150px;"/>
      </span>
      <span>
        <a-button type="primary" @click="convertKnowledgeBaseList">过滤</a-button>
      </span>
      <a-form layout="inline">
        <a-row>
          <template>
            <a-list itemLayout="vertical" :pagination="pagination" :dataSource="knowledgeBaseList.data">
              <a-list-item slot="renderItem" slot-scope="item">
                <template>
                  <a-row>
                    <a-col :span="14">
                      <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                        <a-list-item-meta>
                          <a slot="title" :href="item.href">{{ item[0].titleName }}</a>
                        </a-list-item-meta>
                      </div>
                    </a-col>
                    <a-col :span="10">
                      <a-button @click="aa">详情</a-button>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col>
                      <span>
                        <img style="height: 15px;width: 15px;" src="@/assets/2.png"/>{{ item[0].uploaderName }}
                      </span>
                      <template v-for="m in item[1]">
                        <span>
                          <img style="height: 15px;width: 15px;" src="@/assets/5.png"/>{{ m }}
                        </span>
                      </template>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col>
                      <template v-for="d in item[3]">
                        <span>
                          <img style="height: 15px;width: 15px;" src="@/assets/4.png"/>{{ d }}
                        </span>
                      </template>
                    </a-col>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchlist: [],
      titlename: ''
    }
  },
  props: {
  },
  methods: {
    /**
     * 动态生成输入框查询
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    query () {
      this.searchlist = []
      console.log(this.$refs)
      this.searchlist.push({ 'name': 'titlename', 'value': this.titlename, 'and_or': 'and' })
      for (var i = 0; i < this.$refs.inputValue.length; i++) {
        this.searchlist.push({ 'name': this.$refs.inputValue[i].children[0].name, 'value': this.$refs.inputValue[i].children[0].value, 'and_or': 'and' })
      }
    },
    /**
     * 转换知识库列表属性
     *
     * @Author 尘埃Friend
     * @date 2019-12-03
     */
    convertKnowledgeBaseList () {
      console.log(this.knowledgeBaseList)
      for (var i = 0; i < this.knowledgeBaseList.data.length; i++) {
        for (var j = 0; j < this.knowledgeBaseList.data[i].length; j++) {
          this.knowledgeBaseArray.push(this.knowledgeBaseList.data[i][j])
        }
      }
    }
  },
  computed: {
    ...mapState({
      /**
         * 知识库列表
         *
         * @Author 尘埃Friend
         * @date 2019-11-29
         */
      knowledgeBaseList: state => state.knowledge.knowledgeBaseList,
      /**
         * 获取知识库搜索框
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */
      searchList: state => state.knowledge.searchList
    })
  }
}
</script>

<style scoped>

</style>
