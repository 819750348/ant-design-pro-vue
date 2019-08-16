<template>
  <a-card :bordered="true" title="共享知识列表">
    <div>
      <creat-approval :apply="applymodel" @shareApply="shareApply"></creat-approval>
      <a-form layout="inline">
        <a-row>
          <a-col :md="5" :sm="24" :span="5">
            <a-form-item label="名称">
              <a-input style="width:90px;"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24" :span="5">
            <a-form-item label="作者">
              <a-input style="width:90px;"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24" :span="5">
            <a-form-item label="分类">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">分类1</a-select-option>
                <a-select-option value="2">分类2</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="9" :sm="24" :span="9">
            <span>
              <a-button type="primary" @click="searchUser">过滤</a-button>
            </span>
          </a-col>
        </a-row>
        <a-row>
          <template>
            <a-list itemLayout="vertical" :pagination="pagination" :dataSource="listData">
              <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
                <template>
                  <a-row>
                    <a-col :span="14">
                      <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;">
                        <a-list-item-meta>
                          <a slot="title" :href="item.href">{{ item.title }},{{ index }}</a>
                        </a-list-item-meta>
                      </div>
                    </a-col>
                    <a-col :span="10">
                      <a-button @click="visibleApply">发起共享申请</a-button>
                      <a-button>修改分类</a-button>
                      <a-button>详情</a-button>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/2.png"></img>{{ item.manage }}
                    </a-col>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/1.png"></img>{{
                      item.createUser }}
                    </a-col>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/5.png"></img>{{ item.abcd }}
                    </a-col>
                    <a-col :span="4"><img style="height: 15px;width: 15px;" src="@/assets/3.png"></img>{{ item.type }}
                    </a-col>
                    <a-col :span="7"><img style="height: 15px;width: 15px;" src="@/assets/4.png"></img>{{ item.timer }}
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
import creatApproval from './creatApproval'

const listData = []
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'javascript:void(0)',
    title: `共享知识 ${i}`,
    avatar: '#',
    manage: '系统管理员',
    createUser: '系统管理员',
    abcd: 'abcd',
    type: '论文',
    timer: '2019-05-24 13:47:46',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription'
  })
}
export default {
  name: 'PersonalList',
  data () {
    return {
      listData,
      pagination: {
        onChange: (page) => {
          // 分页事件
        },
        pageSize: 5
      },
      applymodel: false
    }
  },
  components: {
    creatApproval
  },
  methods: {
    shareApply (val) {
      this.applymodel = val
    },
    visibleApply () {
      this.applymodel = true
    }
  }
}
</script>

<style scoped>

</style>
