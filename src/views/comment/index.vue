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
        :data="comment"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="文章标题">
        </el-table-column>
        <el-table-column
          prop="title"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="title"
          label="粉丝评论数">
        </el-table-column>
        <!-- 由于后端回传的是数字，而我们要显示的是对应的字符串
        所以，我们这不能直接使用status -->
        <el-table-column
          label="评论状态"
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
          prop="address"
          label="操作">
          <!-- scope.$index 当前行的行索引（0开始）
               scope.row 当前行数据
          -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="hCLoseComment(scope.row)" circle>关闭评论</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="hOpenComment(scope.row)" circle>打开评论</el-button>
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
  </div>
</template>

<script>
import MyBreadcrumb from '../../components/MyBreadcrumb.vue'
export default {
  name: 'ComentIndex',
  data () {
    return {
      loading: false,
      total_count: 50,
      comment: []
    }
  },
  computed: { },
  created () { },
  mounted () { },
  methods: {
    hCLoseComment () {
    },
    hOpenComment () {
    },
    hPageChange () {
    }
  },
  components: {
    MyBreadcrumb
  }
}
</script>

<style scoped lang='less'></style>
