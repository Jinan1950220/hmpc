<template>
  <div class='setting-container'>
    <button @click="hTestEventBus">测试</button>
    <el-card>
      <div slot="header">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑路径导航 -->
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">100</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="hSave" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 action必须属性-->
            <!-- :http-request="uploadPhoto"
            在修改用户头像时 后端接口是patch方式 而el-upload默认支持post方式上传
            所以这里要启用el-upload的系定义上传属性:http-request="uploadPhoto"他会
            覆盖原来的方式-->
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="uploadPhoto"
            :show-file-list="false">
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="edit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { userGetProfile, modUserProfile, modUserImage } from '../../api/user'
export default {
  name: 'my-setting',
  data () {
    return {
      // 用户信息
      userInfo: {
        // 用一个对象抱起来，表示这是一个有关联的，是一个整体
        // 数据项的名字最好按照接口的名字来定
        // 如果接口中返回的名字段时name，这里就是name
        name: 'test',
        intro: 'info',
        email: 'info@qq.com'
      },
      // 支持上传组件的数据
      imageUrl: null
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const result = await userGetProfile()
      // console.log(result)
      this.userInfo = result.data.data
    },
    async hSave () {
      try {
        await modUserProfile({
          name: this.userInfo.name,
          intro: this.userInfo.intro,
          email: this.userInfo.email
        })
        this.$message.success('修改成功')
        // 通过evevtBus发布修改名字事件，同时传递新名字
        this.$eventBus.$emit('update_user_name', this.userInfo.name)
      } catch {
        this.$message.error('修改失败')
      }
    },
    // 这个事件会自动的传入一个对象，其中用来表示当前要上传的信息
    async uploadPhoto (obj) {
      try {
        console.dir(obj)
        // 1.取出要上传的文件
        const { file } = obj
        // 2.调用接口
        const formData = new FormData()
        // 复习这块东西
        formData.append('photo', file)
        const result = await modUserImage(formData)
        console.log(result)
        this.$message.success('头像上传成功')
        // 3.更新
        this.userInfo.photo = result.data.data.photo
        // 发布事件，通知layout更新头像
        this.$eventBus.$emit('update_user_photo', this.userInfo.photo)
      } catch {
        this.$message.error('头像上传失败')
      }
    },
    hTestEventBus () {
      console.log('事件总线', this.$eventBus)
      // 发布事件
      this.$eventBus.$emit('aaa', {
        a: 1,
        b: 2
      })
    }
  },
  ccomponents: {
    MyBreadcrumb
  }
}
</script>

<style scoped lang='less'>
.edit-photo{
  font-size: 12px;
  text-align: center;
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
