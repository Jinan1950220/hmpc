<template>
  <div class='publish-container'>
   <el-card>
     <div class="header"><my-breadcrumb>发布文章</my-breadcrumb></div>
     <br>
     <el-form :rules="rules" ref="form" :model="article" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor type="textarea" v-model="article.content" :options="editorOption"></quill-editor>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="article.cover.type">
          <!-- 根据后端接口 -->
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="频道" prop="channel_id">
        <el-select v-model="article.channel_id" placeholder="请选择频道">
          <el-option
          v-for="channel in channels"
          :key="channel.id"
          :label="channel.name"
          :value="channel.id"></el-option>
        </el-select>
      </el-form-item> -->
      <my-channels v-model="article.channel_id"></my-channels>
      <el-form-item>
        <el-button type="primary" @click="hAddArticle(false)">发表</el-button>
        <el-button type="primary" @click="hAddArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
   </el-card>
  </div>
</template>

<script>
// 导入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入组件
import { quillEditor } from 'vue-quill-editor'
import MyChannels from '../../components/MyChannels v-model.vue'
import MyBreadcrumb from '../../components/MyBreadcrumb.vue'
import { addArticle } from '../../api/article.js'
export default {
  name: 'AddArticle',
  data () {
    return {
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度5-30之间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          { min: 20, max: 200, message: '最少20个字', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: 'blur' }
        ]
      },
      // channels: [], // 频道列表
      article: {
        title: 'test标题', // 标题
        channel_id: '', // 频道id
        content: '敲代码了', // 文章内容
        cover: {
          type: 0, // 封面的图片个数
          images: [] // 封面的地址
        }
      },
      editorOption: {
        // 自定义编辑栏
        placeholder: '',
        modules: {
          // 配置工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    // this.loadChannels()
  },
  /**
   * 1.装请求接口
   * 2.再发布文章页面调用接口
   *  --1.给发布按钮添加submit事件
   *  --2.手机表单拿数据
   *  --3.
   */
  methods: {
    // async hAddArticle (isDraft) {
    //   try {
    //     const result = await addArticle(isDraft, this.article)
    //     console.log(result)
    //     this.$message.success('发布成功')
    //     this.article.title = ''
    //     this.article.content = ''
    //   } catch (err) {
    //     console.log(err)
    //     this.$message.error('发布失败')
    //   }
    // },
    hAddArticle (isDraft) {
      /**
       * this.$refs.form 获取页面中ref=from整个组件
       */
      this.$refs.form.validate(async (valid) => {
        console.log('校验结果', valid)
        if (valid) {
          try {
            const result = await addArticle(isDraft, this.article)
            console.log(result)
            this.$message.success('发布成功')
            this.article.title = ''
            this.article.content = ''
          } catch (err) {
            console.log(err)
            this.$message.error('发布失败')
          }
        }
      })
    }
    // async loadChannels () {
    //   try {
    //     const result = await getArticlesChannels()
    //     console.log(result)
    //     this.channels = result.data.data.channels
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  },
  components: {
    MyBreadcrumb,
    quillEditor,
    MyChannels
  }
}
</script>

<style scoped lang='less'>
// 覆盖富文本样式(publish-container目的提高选择器优先级)
.publish-container /deep/ .ql-editor{
  height: 300px;
}
.publish-container /deep/ .ql-toolbar.ql-snow{
  padding: 0 8px;
}
</style>
