<template>
<div class="my-cover">
<!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog()">
        <img :src="coverImageUrl" />
    </div>
    <!-- 对话框 -->
    <el-dialog :append-to-body=true :visible.sync="dialogVisible" width="720px">
        <!-- tab组件 -->
        <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="素材库" name="image">
            <div style="padding-bottom:20px;">
            <!-- 收藏 全部 按钮 -->
            <el-radio-group v-model="collect" @change="hCollectChange">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            </div>
            <!-- 图片展示区 -->
            <el-row :gutter="10" style="margin-top:10px">
              <el-col
                v-for="image in images"
                :key="image.id" class="img_item"
                :class="{selected: image.url==selectedImageUrl}"
                :xs="12" :sm="6" :md="6" :lg="4">
                <el-image
                class="myimage"
                @click.native="hImageClick(image)"
                :src="image.url"
                fit="cover">
                </el-image>
              </el-col>
            </el-row>
            <!-- 页码 -->
            <el-pagination
            style="margin-top:10px"
            :hide-on-single-page="true"
            background
            layout="prev, pager, next"
            :total="total_count"
            :page-size="10"
            @current-change="hPageChange">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="hUploadSuccess"
            :before-upload="beforeAvatarUpload">
            <!-- 如果当前有预览地址，就说明上传成功
                给用户展示这张图，用户成功看到这张图，关闭整个上传框
                图片的onload事件
                --当你设置图片的src浏览器，浏览器回去请求图片的资源当图片请求回来之后，会有一个事件触发出来 就是 onload
            -->
            <el-image v-if="imageSrc" :src="imageSrc" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="hConfirmImage">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import defaultImg from '../assets/default.png'
import { getUser } from '../utils/storsge.js'
import { getImages } from '../api/image.js'
export default {
  name: 'MyCover',
  props: { },
  data () {
    return {
      // 图片按钮上的图片
      coverImageUrl: defaultImg,
      // 当前tabs组件激活的选项卡的name属性的值
      activeName: 'image',
      images: [],
      total_count: 0,
      cur_page: 1, // 当前页
      per_page: 10,
      collect: false,
      dialogVisible: false, // 是否显示弹出框
      // 由于这里的上传不是走的axios，而处理上传的接口又需要token
      // 所以要手动添加token
      imageSrc: '',
      selectedImageUrl: null,
      headers: {
        Authorization: 'Bearer ' + getUser().token
      }
    }
  },
  computed: { },
  created () { },
  mounted () { },
  methods: {
    openDialog () {
      this.dialogVisible = true
      this.loadImages()
      // 重置
      this.activeName = 'image'
      this.imageSrc = null
      this.selectedImageUrl = null
    },
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
      // console.log(curPage)
      this.cur_page = curPage
      this.loadImages(curPage)
    },
    hCollectChange () {
      // console.log(this.collect)
      this.loadImages()
    },
    hImageClick (image) {
      console.log(image)
      this.selectedImageUrl = image.url
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
      // 他会显示出来给用户看
      this.imageSrc = res.data.url
      this.$message.success('上传素材成功')
    },
    hConfirmImage () {
      /**
       * 1.校验，根据当前所处的不同tab选项卡，做不同判断
       * 2.
       */
      console.log(this.activeName)
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          this.$message.warning('请先选中一张图片')
          return
        } else {
          // 把你选中的图显示在图片按钮上
          this.coverImageUrl = this.selectedImageUrl
        }
      } else if (this.activeName === 'upload') {
        if (!this.selectedImageUrl) {
          this.$message.warning('请先选中一张图片')
          return
        } else {
          // 把你选中的图显示在图片按钮上
          this.coverImageUrl = this.selectedImageUrl
        }
      }
      this.dialogVisible = false
    }
  }
}

</script>

<style scoped lang='less'>
// 图片按钮
.btn_img {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    img {
      width: 150px;
      height: 120px;
      display: block;
    }
  }
  .selected::after{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 120px;
    background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
  }
// 素材列表

  .img_item{
    position: relative;
    box-sizing: border-box;
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    .myimage {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
.avatar-uploader {
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    line-height: 178px;
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
