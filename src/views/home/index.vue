<template>
  <div class=''>
      主页
      <div>
        <my-cover v-model="imgSrc"></my-cover>
      </div>
      <!-- 子组件 -->
      <!-- <my-channels @hChange="hChannels"></my-channels> -->
      <!-- <el-form><my-channels-vmodel v-model="channels_id_vmodel"></my-channels-vmodel></el-form> -->
  </div>
</template>

<script>
// import MyChannels from '../../components/MyChannels.vue'
// import MyChannelsVmodel from '../../components/MyChannels v-model'
import MyCover from '../../components/Mycover.vue'
export default {
  name: 'Home',
  data () {
    return {
    //   channels_id: '',
      channels_id_vmodel: '',
      imgSrc: ''
    }
  },
  created () {
    // 在创建组件时，开始去通过eventBus监听
    // 格式
    console.log('aaa', this.$eventBus)
    this.$eventBus.$on('aaa', (res) => {
      console.log('在home组件中，收到了消息', res)
    })
  },
  components: {
    // MyChannels,
    // MyChannelsVmodel,
    MyCover
  }
//   methods: {
//     hChannels (value) {
//       this.channels_id = value
//       console.log(value)
//     }
//   }
}
</script>

<style scoped lang='less'></style>
