<template>
  <div class='article-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-breadcrumb>内容管理</my-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="频道">
          <el-select v-model="form.channelId" clearable placeholder="请选择频道">
            <el-option
            v-for="channels in channels"
            :key="channels.id"
            :label="channels.name"
            :value="channels.id"></el-option>
          </el-select>
        </el-form-item> -->
        <my-channels v-model="form.channelId"></my-channels>
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
          <el-button
          :loading="loading"
          type="primary"
          @click="hQuery">查询</el-button>
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
        v-loading="loading"
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
              @click="hEdit(scope.row)" icon="el-icon-edit" circle></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="hDelete(scope.row)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--
        1.total是总条数
        2.current-change
       -->
      <el-pagination
       :disabled="loading"
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
import MyChannels from '../../components/MyChannels v-model.vue'
import MyBreadcrumb from '../../components/MyBreadcrumb.vue'
import { getArticles, deleteArticle } from '../../api/article.js'
export default {
  name: 'ArticlesIndex',
  data () {
    return {
      form: {
        date: null,
        status: null,
        channelId: null
      },
      curPage: 1, // 当前要查询的数据
      articles: [],
      total_count: 0,
      channels: [],
      loading: false
    }
  },
  created () {
    this.loadArticles()
    // this.loadChannels()
  },
  methods: {
    hQuery () {
      // 重置密码
      this.curPage = 1
      this.loadArticles()
    },
    // loadChannels () {
    //   getArticlesChannels().then(res => {
    //     console.log('频道', res)
    //     this.channels = res.data.data.channels
    //   })
    // },
    loadArticles () {
      // 调用导入的方法
      // 补充一个查询参数
      // 分析后端接口 补充begin——pubdate， end——pubdate
      const beginPubdate = this.form.date && this.form.date[0]
      const endPubdate = this.form.date && this.form.date[1]
      // 如果用户选择了日期范围，则传入即可
      // 如果用户没有选择日期范围，则要把参数设置为null --axios会把参数值为null的数据过滤掉，既不传入给后
      this.loading = true
      getArticles({
        channels_id: this.form.channelId || null,
        begin_pubdate: beginPubdate,
        end_pubdate: endPubdate,
        page: this.curPage,
        status: this.form.status
      }).then(res => {
        console.log('获取的文章的文章', res)
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
      this.loading = true
    },
    hEdit (row) {
      const id = row.id.toString()
      console.log(id)
      this.$router.push('/editarticle/' + id)
    },
    hDelete (row) {
      console.log('要删除的数据', row)
      const id = row.id.toString()
      console.log('获取文章的id是', id)
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(id).then(res => {
          console.log(res)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.loadArticles()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
      }).catch(() => {})
    },
    hPageChange (curPage) {
      console.log(curPage)
      this.curPage = curPage
      this.loadArticles(curPage)
    }
  },
  components: {
    MyBreadcrumb,
    MyChannels
  }
}
// 重看分页原理
</script>

<style scoped lang='less'></style>
