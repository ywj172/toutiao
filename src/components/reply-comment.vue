<template>
  <div class="reply-comment">
    <van-nav-bar :title="`${replyItem.reply_count}条回复`" left-arrow @click-left="onClickLeft" />
    <CommentItem :item='replyItem'></CommentItem>
    <p>所有回复</p>
    <p>所有评论</p>
    <CommentList type='reply' :comId='replyItem.com_id' class="comment-list" :postCommentItem='newReply'></CommentList>
    <div class="send-comment">
      <van-button type="default" round @click="isShow=true">写评论</van-button>
    </div>
    <!-- 回复评论弹窗 -->
    <van-popup v-model="isShow" position="bottom" :style="{ height: '20%' }">
      <PostComment :comid='replyItem.com_id' @close='closeReplyComment'></PostComment>
    </van-popup>
  </div>
</template>

<script>
//1323972119897309184
import PostComment from './post-comment'
import CommentList from './comment-list'
import CommentItem from './comment-item'
export default {
  name: "ReplyComment",
  data() {
    return {
      isShow: false,
      newReply: {}
    }
  },
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  methods: {
    onClickLeft() {
      this.$emit('closeReplyComment')
    },
    closeReplyComment(item) {
      this.isShow = false
      this.newReply = item
      this.replyItem.reply_count++
    }
  },
  props: {
    replyItem: {
      type: Object,
      required: true
    }
  },

}
</script>

<style lang='scss'>
.reply-comment {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: #fff;
  .van-nav-bar__content {
    background-color: #fff;
    .van-icon,
    .van-nav-bar__title {
      color: #000;
    }
  }
  & > p {
    font-size: 14px;
    padding: 10px 15px;
  }
  .comment-list {
    position: fixed;
    width: 100%;
    bottom: 40px;
    top: 250px;
    left: 0;
    overflow-y: scroll;
  }
  .send-comment {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-button {
      width: 200px;
      border: 1px solid #ccc;
    }
  }
}
</style>