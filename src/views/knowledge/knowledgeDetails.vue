<template>
  <div id="components-layout-demo-basic">
    <a-row type="flex" justify="center">
      <a-col :span="14">
        <a-layout-content>
          <a-row type="flex" >
            <a-col :span="10">
              <h1>
                {{ showwikiData.titleName }}
              </h1>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :span="12" v-for="(val, key, index) of showwikiData.shortProperty" :key="index">
              <span style="color: #aaaaaa">
                {{ key }}
              </span>
                  &nbsp;
              <span>
                {{ val }}
              </span>
            </a-col>
          </a-row>
          <a-divider />
          <span v-for="(val,key,index) in wikiContent" :key="index" :id="key">
            <h2>{{ key }}</h2>
            <!--<h3>{{ val }}</h3>-->
            <p>
                  &nbsp; &nbsp;
              <span v-html="val"></span>
            </p>
          </span>
        </a-layout-content>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="5">
        <a-row type="flex">
          <a-col :span="24">
            <a-carousel arrows autoplay >
              <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
                <a-icon type="left-circle" />
              </div>
              <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
                <a-icon type="right-circle" />
              </div>
              <div >

              </div>
              <div v-for="item in 5" :key="item">
                <img src="../../../public/pp.jpg" style="height: 320px;width: 320px;">
              </div>
            </a-carousel>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-card size="small" style="width: 300px;">
              <span slot="title">
                {{ "相关推荐文档" }}
              </span>
              <div v-for="item in 3" :key="item">
                <a>{{ "实验数据交互标准" }}</a>
                <a-rate v-model="rate" />
              </div>
            </a-card>
          </a-col>
        </a-row>
        <a-row>
          <a-col>

          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-anchor>
              <a-anchor-link v-for="item in anchor" :href="item" :key="item" :title="item" />
            </a-anchor>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { getWiki } from '@/api/wiki'
import ARow from 'ant-design-vue/es/grid/Row'

export default {
  components: { ARow },
  data () {
    return {
      showwikiData: '',
      wikiContent: {},
      imgFilePath: '',
      anchor: '',
      rate: ''
    }
  },
  methods: {
    showwiki () {
      const vm = this
      const id = this.$route.query.id
      getWiki({
        id: id
      }).then(function (res) {
        vm.showwikiData = res
        /**
         * 把图片路劲放入字符串
         *
         * @Author 尘埃Friend
         * @date 2019-12-03
         */
        vm.imgFilePath = res.imgFilePath
        Object.entries(res.longProperty).forEach(item => {
          // var as = item[1].replace('src=', 'src=' + vm.imgFilePath)
          // console.log(as)

          vm.wikiContent[item[0]] = item[1].replace('src=', 'src=' + vm.imgFilePath + '\\')
        })
        vm.anchor = []
        Object.keys(vm.wikiContent).forEach(item => {
          vm.anchor.push('#' + item)
        })
        console.log(vm.wikiContent)
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    this.showwiki()
  }
}
</script>
<style>
  #components-layout-demo-basic{
    background-color: white;
  }
  #components-layout-demo-basic .ant-layout-header{
    /*background: #cc3a9e;*/
    /*color: #fff;*/
  }
  #components-layout-demo-basic .ant-layout-sider {
    /*background: #1e9eff;*/
    /*color: #fff;*/
  }
  .ant-carousel >>> .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel >>> .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #040fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }
  .ant-carousel >>> .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel >>> .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  .ant-carousel >>> .slick-slide h3 {
    color: #fff;
  }
</style>
