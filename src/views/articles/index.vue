<template>
  <div class='article-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header" class="clearfix">
        根据筛选条件查询到XXX条
      </div>
      <!--
        1. 列表的列  根据el-table-coiumn
          label：决定当前列显示出来的标题
          prop：当前列数据的来源 prop="data" 对于表格来说
          它的数据项是一个数组，每一个元素是一个对象，表示一行，这里的pro就是用来
          从每一个对象中取出属性名为prop值(data)的属性值
      -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="封面"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="发布时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getArticles } from '../../api/article.js'
export default {
  name: 'ArticlesIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      articles: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticles () {
      getArticles().then(res => {
        console.log('获取的文章的文章', res)
        this.articles = res.data.data.results
      })
    }
  }
}
</script>

<style scoped lang='less'></style>
