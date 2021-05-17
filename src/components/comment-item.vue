<template>
  <div class="comment-item">
    <van-cell class="item-head">
      <div slot="title">
        <van-image width="45px" height="45px" round :src="item.aut_photo" />
      </div>
      <div class="item-center" slot="default">
        <div class="item-title">
          <p class="title-name">
            {{item.aut_name}}
          </p>
          <p class="like-count">
            <van-icon name="good-job" v-if="item.is_liking" @click="handleLike" />
            <van-icon name="good-job-o" v-else @click="handleLike" />
            <span>{{item.reply_count}}</span>
          </p>
        </div>
        <div class="item-content">
          <p> {{item.content}}</p>
          <div class="item-time">
            <span>{{item.pubdate | formatTime}}</span>
            <van-button type="default" size='mini' round @click="$emit('replyComment',item)">{{item.reply_count}}回复</van-button>
          </div>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { likeArticle, cancellikeArticle } from '../api/api'
export default {
  name: 'comment-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleLike() {
      if (this.item.is_liking) {
        //取消点赞
        // cancellikeArticle(this.item.aut_id).then(res => {
        //   console.log(res);
        // })
        this.item.is_liking = false
        this.item.reply_count--
      } else {
        //点赞
        // likeArticle({
        //   target: this.item.aut_id
        // }).then(res => {
        //   console.log(res);
        // })
        this.item.is_liking = true
        this.item.reply_count++
      }
    },
    replyComment() {
      this.$emit('replyComment')
    }
  },
}
</script>

<style lang='scss'>
.comment-item {
  .item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-name {
      font-size: 14px;
      color: #416699;
    }
  }
  .item-head {
    .van-cell__title {
      flex: unset;
      align-items: unset;
    }
  }
  .item-center {
    text-align: left;
    margin-left: 15px;
  }
  .like-count {
    display: flex;
    align-items: center;
  }
  .item-content {
    p {
      font-size: 16px;
      color: #000;
    }
    .item-time {
      margin-top: 10px;
      display: flex;
      align-items: center;
      color: #000;
      .van-button {
        font-size: 12px;
        width: 50px;
        height: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>