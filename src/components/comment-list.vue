<template>
  <div class="article-comment">
    <h1>评论列表</h1>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <CommentItem :item='item' v-for="(item,index) in commentList" :key="index" @replyComment='replyComment'></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from '../components/comment-item'
import { getArticleComment } from '../api/api'
export default {
  name: 'commentList',
  components: {
    CommentItem
  },
  props: {
    postCommentItem: {
      type: Object,
    },
    type: {
      type: String,
      required: true
    },
    comId: {
      type: [Object, Number, String]
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      commentList: [],
      offset: null,
      limit: 10,
      totalCount: 0
    };
  },
  methods: {
    //id134633
    async onLoad() {
      if (this.type === 'acticle') {
        const { data } = await getArticleComment({
          type: 'a',
          source: this.$route.params.id,
          offset: this.offset,
          limit: this.limit
        }).catch(err => {
          console.log(err);
        })
        this.totalCount = data.data.total_count
        this.$emit('updateCommentCount', this.totalCount)
        this.commentList.push(...data.data.results)
        // console.log(this.commentList);
        // 加载状态结束
        this.loading = false;
        if (data.data.results.length > 0) {
          this.offset = data.data.last_id
        } else {
          this.finished = true;
        }
      } else {
        const { data } = await getArticleComment({
          type: 'c',
          source: this.comId.toString(),
          offset: this.offset,
          limit: this.limit
        }).catch(err => {
          console.log(err);
        })
        this.totalCount = data.data.total_count
        this.commentList.push(...data.data.results)
        // 加载状态结束
        this.loading = false;
        if (data.data.results.length > 0) {
          this.offset = data.data.last_id
        } else {
          this.finished = true;
        }
      }

    },
    replyComment(item) {
      this.$emit('replyComment', item)
    },
  },
  watch: {
    postCommentItem: function (newVal, oldVal) {
      this.commentList.unshift(newVal)
      this.$emit('updateCommentCount', this.totalCount++)
    }
  },
}
</script>

<style lang='scss'>
.article-comment {
  .van-cell {
    margin-top: unset;
  }
  h1 {
    margin-top: unset;
    padding: 15px;
    font-size: 20px;
    box-sizing: border-box;
  }
}
</style>