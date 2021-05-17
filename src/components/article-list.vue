<template>
  <div class="article-list">
    <!-- 文章列表 -->
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :success-text="refreshTexxt" success-duratio='1500'>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleItem v-for="(item,index) in list" :key="index" :article='item'></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './article-Item'
import { getArticles } from '../api/api'
export default {
  name: "articleLists",
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      isRefreshLoading: false,
      refreshTexxt: ''
    };
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp,
        with_top: 1
      }).catch(err => {
        console.log(err);
      })
      const { results } = data.data
      this.timestamp = data.data.pre_timestamp
      this.list.push(...results)
      //如果没有数据返回的话,就暂停请求
      if (data.data.results.length !== 0) {
        //加载状态结束
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    //上拉刷新的数据
    async onRefresh() {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp,
        with_top: 1
      }).catch(err => {
        console.log(err);
      })
      const { results } = data.data
      this.timestamp = data.data.pre_timestamp
      this.list.unshift(...results)
      this.isRefreshLoading = false;
      this.refreshTexxt = `刷新成功,共刷新${results.length}条`
    }
  },
}
</script>

<style lang='scss'>
.article-list {
  position: fixed;
  left: 0;
  top: 90px;
  width: 100%;
  bottom: 70px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>