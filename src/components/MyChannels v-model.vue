<template>
  <div class=''>
      <el-form-item label="频道" prop="channel_id">
        <el-select @change="hSelectChange" v-model="ChannelId" placeholder="请选择频道">
          <el-option
          v-for="channel in channels"
          :key="channel.id"
          :label="channel.name"
          :value="channel.id"></el-option>
        </el-select>
      </el-form-item>
  </div>
</template>

<script>
import { getArticlesChannels } from '../api/article.js'
export default {
  name: 'MyChannelsVmodel',
  props: ['value'], // 用来获取初始值
  data () {
    return {
      ChannelId: this.value,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const result = await getArticlesChannels()
        this.channels = result.data.data.channels
      } catch (err) {
        console.log(err)
      }
    },
    hSelectChange (val) {
      this.$emit('input', val)
    }
  },
  watch: {
    // 如果value值变化则直接赋值给ChannlId（v-model中的数据）
    value () {
      this.ChannelId = this.value
    }
  }
}

</script>

<style scoped lang='less'></style>
