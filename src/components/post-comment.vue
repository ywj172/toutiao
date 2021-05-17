<template>
  <div class="post-comment">
    <van-field v-model="message" rows="2" type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
    <div class="post-send">
      <van-button :disabled='isDisable' type="default" @click="sendPostComment">发布</van-button>
    </div>
  </div>
</template>
<script>
import { sendPostComment } from '../api/api'
import { Toast } from 'vant'
export default {
  name: "postComment",
  data() {
    return {
      message: '',
      isDisable: false
    }
  },
  props: {
    type: {
      type: String
    },
    comid: {
      type: [Object, String, Number, Array]
    }
  },
  methods: {
    sendPostComment() {
      //判断是添加评论或添加评论回复
      if (this.type === 'comment') {
        this.isDisable = true
        //1.发送评论
        sendPostComment({
          target: this.$route.params.id,
          content: this.message,
        }).then(res => {
          this.isDisable = false
          this.message = ''
          Toast.success('发布成功');
          this.$emit('hiddenPostComment', res.data.data.new_obj)
        }).catch(() => {
          Toast.error('发布失败');
        })
      } else {
        this.isDisable = true
        //1.发送评论回复
        sendPostComment({
          art_id: this.$route.params.id,
          content: this.message,
          target: this.comid.toString()
        }).then(res => {
          this.isDisable = false
          this.message = ''
          this.$emit('close', res.data.data.new_obj)
          Toast.success('发布成功');
        }).catch(() => {
          Toast.error('发布失败');
        })

      }


    }
  },
}
</script>

<style lang='scss'>
.post-comment {
  display: flex;
  width: 100%;
  height: 100%;
  .post-send {
    display: flex;
    align-items: center;
  }
}
</style>