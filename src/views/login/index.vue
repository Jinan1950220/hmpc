<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="myform" :model="user" :rules="rules">
        <el-form-item prop="mobile">
          <el-input
            v-model.trim="user.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model.trim="user.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loginLoading"
            class="login-btn"
            type="primary"
            @click="hLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from '../../api/user.js'
export default {
  name: 'Login',
  props: { },
  data () {
    // 双向绑定
    return {
      rules: {
        // 属性名，就是一类验证规则，可以自己起名字最好与user里面的文字下面的一样
        // 属性值，是一个数组，每一个对象表示一种规则
        mobile: [
          // required 是必填项 message 提示信息 trigger 什么时候提示 blur 失去焦点
          { required: true, message: '手机号不能为空!', trigger: 'blur' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
          /**
           * /^1[3579]\d{9}$/
           * ^: 以什么开头 ^1: 表示一1开头
           * $: 以什么结尾
           * [35789]: 表示第二位是 3,5,7,8,9 中的一个
           * \d{9}: 表示9个数字
           */
        ],
        code: [
          { required: true, message: '验证码不能为空!', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确!', trigger: 'blur' }
        ],
        agree: [
          // value 当前值
          // 验证通过 直接写callback()
          // 验证不通过，callback(new Error('错误信息'))
          {
            validate: (rule, value, callback) => {
              if (value) {
                // 如果勾选中，验证通过
                callback()
              } else {
                callback(new Error('请通过用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      },
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false
      },
      loginLoading: false
    }
  },
  methods: {
    Login () {
      /**
       * 1.手机用户的信息
       * 2.监测是否同意
       * 3.根据接口文档要求 发送ajax请求
       */
      /**
       * 在发请求之前 把this.loginLoding改为true
       */
      this.loginLoading = true
      /**
       * 发送ajax请求
       *  1.引入request.js
       *  2.发请求
       */
      // userLogin({mobile:1425,code:1234556}).then().catch()
      userLogin(this.user.mobile, this.user.code).then(res => {
        console.log(res.data)
        this.$message.success('登录成功了')
        // 关闭loading状态
        this.loginLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('登录出错了')
        this.loginLoading = true
      })
    },
    hLogin () {
      console.log(this.$refs.myform)
      this.$refs.myform.validate(valid => {
        console.log('校验结果', valid)
        if (valid) {
          this.Login()
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
