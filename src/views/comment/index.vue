<template>
  <div class=''>
      <div class='article-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-breadcrumb>评论管理</my-breadcrumb>
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
        :data="comments"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="文章标题">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <!-- 由于后端回传的是数字，而我们要显示的是对应的字符串
        所以，我们这不能直接使用status -->
        <el-table-column
          label="评论状态"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.comment_status">关闭</el-tag>
            <el-tag type="success" v-else>打开</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <!-- scope.$index 当前行的行索引（0开始）
               scope.row 当前行数据
          -->
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.comment_status"
              size="mini"
              type="primary"
              @click="hToggleComment(scope.row)">打开评论</el-button>
            <el-button
              v-else
              size="mini"
              type="danger"
              @click="hToggleComment(scope.row)">关闭评论</el-button>
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
        :page-size="per_page"
        @current-change="hPageChange">
      </el-pagination>
    </el-card>
  </div>
  </div>
</template>

<script>
import MyBreadcrumb from '../../components/MyBreadcrumb.vue'
import { getComments, modCommentStatus } from '../../api/comments.js'
export default {
  name: 'ComentIndex',
  data () {
    return {
      loading: false,
      total_count: 50,
      comments: [],
      page: 1,
      per_page: 10
    }
  },
  computed: { },
  created () {
    this.loadComment()
  },
  mounted () { },
  methods: {
    async hToggleComment (comment) {
      console.log(comment)
      console.log(modCommentStatus)
      try {
        await modCommentStatus(comment.id.toString(), !comment.comment_status)
        comment.comment_status = !comment.comment_status
        this.$message.success('操作成功')
      } catch (err) {
        console.log(err)
        this.$message.error('操作失败')
      }
    },
    hPageChange (page) {
      // 他会自动传入当前的页码
      // 更新页码
      this.page = page
      // 重发请求
      this.loadComment()
    },
    async loadComment () {
      const result = await getComments(this.page, this.per_page)
      console.log(result)
      this.comments = result.data.data.results
      this.total_count = result.data.data.total_count
    }
  },
  components: {
    MyBreadcrumb
  }
}
</script>

<style scoped lang='less'></style>
