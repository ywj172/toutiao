<template>
  <div class="article">
    <van-nav-bar title="文字详情" left-arrow @click-left="onClickLeft" />
    <div class="article-content">
      <h1>{{articleInfo.title}}</h1>
      <van-cell center title="单元格" :border='false'>
        <div slot="title" class="article-title">
          <van-image round width="35px" height="35px" around :src="articleInfo.aut_photo" />
          <div>
            <p class="author-name">{{articleInfo.aut_name}}</p>
            <p class="author-time">{{articleInfo.pubdate | format}}</p>
          </div>
        </div>
        <div slot="right-icon">
          <van-button icon="plus" round :type="articleInfo.is_followed?'default':'info'" @click="handleAttention">
            {{articleInfo.is_followed?'已关注':'未关注'}}
          </van-button>
        </div>
      </van-cell>
      <div class="markdown-body" v-html="articleInfo.content" ref="mardownBody">
      </div>
      <CommentList type='acticle' :postCommentItem='postCommentItem' @replyComment='replyComment' @updateCommentCount='updateCommentCount'></CommentList>
      <van-cell class="artile-footer" center>
        <div slot="title">
          <van-field placeholder="写评论" size='large' clearable @click="postComment" />
        </div>
        <div slot="default" class="icon">
          <van-icon name="chat-o" size="30px" :badge="postCommentCount" />
          <van-icon name="good-job" size='30px' v-if="articleInfo.attitude===-1" color='#FFCC33' @click="handleLikeArticle" />
          <van-icon name="good-job-o" size='30px' v-else @click="handleLikeArticle" />
          <van-icon name="star" size='30px' color='#FFCC33' v-if="articleInfo.is_collected" @click="handleFavoriteArticle" />
          <van-icon name="star-o" size='30px' v-else @click="handleFavoriteArticle" />
          <van-icon name="share-o" size='30px' />
        </div>
      </van-cell>
      <!-- 回复评论弹窗 -->
      <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '100%' }">
        <ReplyComment :replyItem='replyItem' @closeReplyComment='closeReplyComment'></ReplyComment>
      </van-popup>
      <!-- 添加评论弹窗 -->
      <van-popup v-model="isShowPost" position="bottom" :style="{ height: '20%' }">
        <!-- 弹窗内容 -->
        <PostComments @hiddenPostComment='hiddenPostComment' type='comment'></PostComments>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import PostComments from '../../components/post-comment'
import CommentList from '../../components/comment-list'
import ReplyComment from '../../components/reply-comment'
import { getArticleInfo, giveLike, cancelGiveLike, cancelAttention, addAttention, favoriteArticle, cancelFavoriteArticle } from '../../api/api'
export default {
  name: "articleInfo",
  components: {
    CommentList,
    PostComments,
    ReplyComment
  },
  data() {
    return {
      articleInfo: {},
      isShowPost: false,
      isReplyShow: false,
      //发送的评论内容
      postCommentItem: {},
      //评论的数量
      postCommentCount: 0,
      //点击回复的那条评论
      replyItem: {}
    }
  },
  methods: {
    async getarticle() {
      const { data } = await getArticleInfo(this.$route.params.id)
      this.articleInfo = data.data
    },
    //点击文章图片预览
    handleImgPreview() {
      this.$nextTick(() => {
        const imgs = this.$refs.mardownBody.querySelectorAll("figure img")
        let arr = []
        imgs.forEach((item, index) => {
          arr.push(item.src)
          item.onclick = function () {
            ImagePreview({
              arr,
              startPosition: 1,
              closeable: true,
            });
          }
        });
      })
    },
    //关注或取消关注
    handleAttention() {
      //关注状态(需要取消关注)
      if (this.articleInfo.is_followed) {
        cancelAttention({
          target: this.articleInfo.aut_id
        }).then(res => {
          console.log(res);
        })
      } else {
        //非关注状态(需要关注)
        addAttention({
          target: this.articleInfo.aut_id
        }).then(res => {
          console.log(res);
        })
      }
      this.articleInfo.is_followed = !this.articleInfo.is_followed
    },
    //收藏文章或取消收藏文章
    async handleFavoriteArticle() {
      //1.文章已经收藏
      if (this.articleInfo.is_collected) {
        //1.1取消收藏
        const data = await cancelFavoriteArticle(this.articleInfo.art_id)
        console.log(data);
      } else {
        //2.文章没有收藏
        const data = await favoriteArticle({
          target: this.articleInfo.art_id
        })
        console.log(data);
      }
      this.articleInfo.is_collected = !this.articleInfo.is_collected
    },
    //点赞文章或者取消取消点赞文章
    async handleLikeArticle() {
      //1.文章没有点赞
      if (this.articleInfo.attitude) {
        //1.1点击点赞
        const data = await giveLike({
          target: this.articleInfo.art_id
        })
        this.articleInfo.attitude = -1
        console.log(data);
      } else {
        //2.文章点赞了
        //2.点击取消点赞
        const data = await cancelGiveLike(this.articleInfo.art_id)
        this.articleInfo.attitude = null
        console.log(data);
      }

    },
    //点击发布评论输入框
    postComment() {
      this.isShowPost = true
    },
    //发送评论后隐藏弹出层
    hiddenPostComment(item) {
      this.isShowPost = false
      this.postCommentItem = item
    },
    //更新底部的评论数量
    updateCommentCount(count) {
      this.postCommentCount = count
    },
    //回复评论
    replyComment(item) {
      this.replyItem = item
      this.isReplyShow = true
    },
    //关闭回复评论
    closeReplyComment() {
      console.log(123);
      this.isReplyShow = false
    },
    onClickLeft() {
      window.history.back()
    }
  },
  updated() {
    this.handleImgPreview()
  },
  created() {
    this.getarticle()
  }
}
</script>

<style lang='scss'>
.article {
  position: relative;
  z-index: 50;
  box-sizing: border-box;
  h1 {
    margin-top: 25px;
    padding: 0 13px;
    font-weight: bold;
  }
  .van-nav-bar {
    z-index: unset;
  }
  .van-cell {
    margin-top: 20px;
  }
  .article-title {
    display: flex;
    align-items: center;
    p {
      margin-left: 10px;
      font-size: 12px;
      height: 15px;
      line-height: 15px;
      &:nth-of-type(2) {
        color: #b4b4b4;
      }
    }
  }
  .van-cell__title {
    display: flex;
    align-items: center;
  }
  .van-button {
    width: 85px;
    height: 29px;
    font-size: 14px;
    padding: 0 2px;
    color: #000;
    .van-button__icon {
      font-size: 10px;
    }
  }
  .artile-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: unset;
    border-top: 1px solid #ccc;
    padding: 0;
    .van-cell {
      margin-top: unset;
    }
    .icon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 10px;
    }
    .van-field__control {
      font-size: 16px;
    }
  }
  .article-content {
    position: fixed;
    left: 0;
    top: 46px;
    width: 100%;
    bottom: 48px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .markdown-body {
    padding: 0 15px;
  }
  .van-cell__value {
    overflow: unset;
  }
}
</style>