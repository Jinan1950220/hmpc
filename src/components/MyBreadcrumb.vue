<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!-- <el-breadcrumb-item>内容管理</el-breadcrumb-item> -->
    <el-breadcrumb-item><slot></slot></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
/**
 * 内容管理应该是能让用户自行传入的
 * 解决方案 slot
 *         定义默认插槽
 *         用户使用
 */
export default {
  name: 'MyBreadcrumb'
}
</script>

<style scoped lang='less'></style>
