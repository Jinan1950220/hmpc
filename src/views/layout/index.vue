<template>
  <el-container class="layout-container">

    <!-- 如果折叠，宽是64 -->
    <el-aside
      class="aside"
      :width="isCollapse ? '64px': '200px'">
      <!-- 上面是一个logo
        如果是折叠，要更换logo的背景图。添加一个类.minLogo
      -->
      <div class="logo" :class="{minLogo:isCollapse}"></div>
      <!-- 菜单区域
      collapse:控制折叠效果的
        如果为true: 只显示图标，不显示文字，可以节省一定的宽度
        如果是false: 显示图标和文字
      -->
      <!-- 这里缺注释 -->
      <el-menu
          router
          default-active="/"
          class="nav-menu"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/articles">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/addArticle">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-setting"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/settings">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>

      </el-menu>

    </el-aside>

    <el-container>
      <el-header class="header">
        <!-- 内容有两部分：公司名 + 右侧的下拉菜单 -->
        <div>
          <i
          @click="isCollapse=!isCollapse"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold' "></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>

        <el-dropdown>
          <!-- 默认插槽：直接显示出来 -->
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <!-- 具名插槽：设置下拉菜单的内容 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!--
              并不是所有的组件都支持@click 可以添加native
              <el-button> 可以用 是内部做了处理
              如果不能用，可以添加一个   .native  就可以了
              .native:原生的   修饰符的作用是把事件添加到原生的dom上
            -->
            <el-dropdown-item @click.native="hQuit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 二级路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { userGetProfile } from '../../api/user.js'
import { delUser } from '../../utils/storsge.js'
export default {
  name: 'Layout',
  props: { },
  data () {
    return {
      user: { }, // 补充数据项
      isCollapse: false // 默认侧边栏不折叠（展开）
    }
  },
  computed: { },
  // components: { MyCom1 },
  created () {
    // 请求用户信息，显示在顶部
    this.setUserProfile()
    // 监听事件 当在用户设置成功更新名字
    this.$eventBus.$on('update_user_name', newName => {
      console.log('在layout接收到uplate_user', newName)
      this.user.name = newName
    })
    this.$eventBus.$on('update_user_photo', newPhoto => {
      console.log('在layout接收到uplate_user_photo', newPhoto)
      this.user.photo = newPhoto
    })
  },
  mounted () { },
  methods: {
    hQuit () {
      /**
       * 实现用户退出,
       * 1. 询问是否退出
       * 2. 清除本地localstorage中的信息
       * 3. 回去登录页
       */
      this.$confirm('就走了?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        delUser()
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '欢迎回来'
        })
      })
    },
    setUserProfile () {
      userGetProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      }).catch(err => {
        console.dir(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  /* 外层的容器
    占满整个页面
  */
  .layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .aside {
    background-color: #002033;
    .el-menu {
      border-right: none;
    }
    .logo{
        width: 100%;
        height: 60px;
        background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px auto;
      }
      // 覆盖background 的图片和大小，类书写在logo的下方。
      .minLogo{
        background-image: url(../../assets/logo_admin_01.png);
        background-size: 36px auto;
      }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .avatar-wrap {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

  .main {
    background-color: #e9eef3;
  }
</style>
