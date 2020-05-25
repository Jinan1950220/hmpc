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
          <!-- type="daterange" range 区域 date 日期
          value-format 绑定值得格式，不指定则绑定为date对象 -->
          <div class="block">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header" class="clearfix">
        根据筛选条件查询到{{total_count}}条数据，当前是第{{curPage}}页
      </div>
      <!--
        1. 列表的列  根据el-table-coiumn
          label：决定当前列显示出来的标题
          prop：当前列数据的来源 prop="data" 对于表格来说
          它的数据项是一个数组，每一个元素是一个对象，表示一行，这里的pro就是用来
          从每一个对象中取出属性名为prop值(data)的属性值
      -->
      <el-table
        :data="articles"
        style="width: 100%">
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <!-- 图片 -->
            <!-- scope.row 获取当前行的数据 -->
            <!-- <div>{{scope.row.cover.images[0]}}</div> -->
            <el-image
            :src="scope.row.cover.images[0]"
            style="width: 150px; height: 100px"
            lazy
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <!-- 由于后端回传的是数字，而我们要显示的是对应的字符串
        所以，我们这不能直接使用status -->
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status===1" type="info">待审核</el-tag>
            <el-tag v-else-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <!-- scope.$index 当前行的行索引（0开始）
               scope.row 当前行数据
          -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="hEdit(scope.$index, scope.row)" icon="el-icon-edit" circle></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="hDelete(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--
        1.total是总条数
        2.current-change
       -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total_count"
        :page-size="10"
        @current-change="hPageChange">
      </el-pagination>
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
        date: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      curPage: 1, // 当前要查询的数据
      articles: [],
      total_count: 0
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
      getArticles({ page: this.curPage }).then(res => {
        console.log('获取的文章的文章', res)
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },
    hEdit (index, row) {
      console.log(index, row)
    },
    hDelete (index, row) {
      console.log(index, row)
    },
    hPageChange (curPage) {
      console.log(curPage)
      this.curPage = curPage
      this.loadArticles(curPage)
    }
  }
}
// 重看分页原理
</script>

<style scoped lang='less'></style>
