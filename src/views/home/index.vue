<template>
  <div class=''>
      主页
      <div>
        <my-cover></my-cover>
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
      channels_id_vmodel: ''
    }
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
