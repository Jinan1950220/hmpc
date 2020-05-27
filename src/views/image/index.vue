<template>
  <div class=''>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-breadcrumb>素材管理</my-breadcrumb>
      </div>
      <div style="padding-bottom:20px;">
        <el-radio-group v-model="collect" @change="hCollectChange">
          <!-- 对于数据项 collect：false
                    当选中全部是 他的值是false
                    当选中收藏时 它的值是true
                对于 el-radio组件 可以通过label来设置当前项被选中时的值
                :label="false"
                label="false"
           -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
        type="success"
        style="float:right"
        @click="dialogVisible = true">上传图片素材</el-button>
      </div>
      <!-- 上传图片对话框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :append-to-body=true>
        <!--
          el-upload
            --action 上传的地址
            --show-file-list 不需要显示已上传的文件列表
            --on-success 上传之后的回调函数
            --before-upload 上传之前的审核
            --headers 请求头
            --name 设置上传文件参数名，要与后端接口中的要求一直
         -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :headers="headers"
          name="image"
          :on-success="hUploadSuccess"
          :before-upload="beforeAvatarUpload">
          <!-- 如果当前有预览地址，就说明上传成功 -->
          <img v-if="imageSrc" :src="imageSrc" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>
      <!-- 图片区 -->
      <el-row :gutter="10" style="margin-top:10px">
        <el-col v-for="image in images"
        :key="image.id"
        class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
          :src="image.url"
          style="height:150px;"
          fit="cover"></el-image>
          <!-- option只在全部中出现，而在收藏选项卡 不可见-->
          <div class="option" v-show="!collect">
            <span class="el-icon-star-off" :style="{color:image.is_collected ? 'red' : '#fff'}"></span>
            <span class="el-icon-delete"></span>
          </div>
        </el-col>
      </el-row>
      <!-- 页码 -->
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
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getImages } from '../../api/image.js'
import { getUser } from '../../utils/storsge.js'
export default {
  name: 'ImageIndex',
  props: { },
  data () {
    return {
      images: [],
      total_count: 0,
      cur_page: 1, // 当前页
      per_page: 10,
      collect: false,
      dialogVisible: false, // 是否显示弹出框
      // 由于这里的上传不是走的axios，而处理上传的接口又需要token
      // 所以要手动添加token
      headers: {
        Authorization: 'Bearer ' + getUser().token
      },
      imageSrc: ''
    }
  },
  computed: { },
  created () {
    this.loadImages()
  },
  mounted () { },
  components: {
    MyBreadcrumb
  },
  methods: {
    // 后续操作 加载图片会多次使用
    // 封装成一个独立的方法
    async loadImages () {
      // getImages().then(res => {
      //   this.images = res.data.data.results
      // })
      try {
        const res = await getImages({
          collect: this.collect, // 是否是收藏
          per_page: this.per_page,
          page: this.cur_page
        })
        // console.log(res)
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    hPageChange (curPage) {
      console.log(curPage)
      this.cur_page = curPage
      this.loadImages(curPage)
    },
    hCollectChange () {
      console.log(this.collect)
      this.loadImages()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 如果上传成功 会把响应结果传给res
    hUploadSuccess (res) {
      console.log(res)
      // 保存上传之后的图片地址
      this.imageSrc = res.data.url
      this.$message.success('上传素材成功')
      this.loadImages()
    }
  }
}
</script>

<style scoped lang='less'>
.img_item {
    position: relative;
    box-sizing: border-box;
  }
  .option {
    position: absolute;
    left: 5px;
    right:5px;
    bottom: 5px;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    color: #fff;
    span {
      margin: 0 30px;
      cursor: pointer;
    }
  }
.avatar-uploader {
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
</style>
