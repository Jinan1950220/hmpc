<template>
<div class="fans-container">
    <el-card>
      <div slot="header">
        <!-- 面包屑路径导航 -->
        <my-breadcrumb>粉丝管理</my-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card" @tab-click="hTabCLick">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item"
            v-for="(fan,index) in list"
            :key="index">
              <el-avatar :size="80" :src="fan.photo"></el-avatar>
              <p>{{fan.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="per_page"
            @current-change="changePager"
            :total="total_count">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="img">
            <!-- 准备dom容器 让echart在这里画图
            注意
            --1. 宽 高
            --2.设置ref，方便访问dom元素 -->
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
/**
 * 1.准备dom元素
 * 2.引入echart
 * 3.画图
 */
import MyBreadcrumb from '../../components/MyBreadcrumb.vue'
import echarts from 'echarts'
import { getFans, getFansStatistics } from '../../api/fans.js'
export default {
  name: 'MyFans',
  data () {
    return {
      // tabs的当前激活选项卡的name属性值
      activeName: 'list',
      per_page: 20,
      page: 1,
      list: [],
      total_count: 0,
      // 测试头像
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  components: {
    MyBreadcrumb
  },
  created () {
    this.loadFans()
  },
  methods: {
    changePager (curPage) {
      this.page = curPage
      this.loadFans()
    },
    async loadFans () {
      const result = await getFans(this.page, this.per_page)
      console.log(result)
      this.total_count = result.data.data.total_count
      this.list = result.data.data.results
    },
    hTabCLick (tab) {
      if (tab.name === 'img') {
        console.log(tab)
        console.log(echarts)
        /**
         * 1.初始化echarts对象
         *   const echartobj = echarts.init(dom结构)
         * 2.通过固定的option来画图
         *   ecarts
         */
        this.draw()
      }
    },
    async draw () {
      const result = await getFansStatistics()
      const ages = result.data.data.age
      const ageY = []
      const ageX = []
      for (const key in ages) {
        ageY.push(ages[key])
        ageX.push(key.replace('le', '小于').replace('gt', '大于') + '岁')
      }
      console.log(result)
      console.log(ageY, ageX)
      var myChart = echarts.init(this.$refs.main)
      var option = {
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          data: ageX
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: [120, 200, 150, 80, 70, 110, 130],
          data: ageY,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang='less'>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>
