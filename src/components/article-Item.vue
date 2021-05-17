<template>
  <div class="article-item">
    <van-cell :to="`/article/${this.article.art_id}`">
      <div slot="title">
        <p class="van-multi-ellipsis--l3">{{article.aut_name}}</p>
        <div v-if="article.cover.images.length===3" class="img-container">
          <van-image v-for="(item, index) in article.cover.images" :key="index" :src="item" />
        </div>
        <p class="title-com">
          <span>{{article.comm_count }}评论</span>
          <span>{{article.pubdate | format}}</span>
        </p>
      </div>
      <div slot="default" v-if="article.cover.images.length===1">
        <van-image width="110" height="70" :src="article.cover.images[0]" />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "articleItem",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang='scss'>
.article-item {
  .van-cell__value {
    flex: unset;
  }
}
.img-container {
  height: 73px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  .van-image {
    flex: 1;
    margin: 0 2px;
    height: 100% !important;
    img {
      vertical-align: bottom;
    }
  }
}
.van-multi-ellipsis--l3 {
  font-size: 18px;
  margin-bottom: 10px;
}
.van-tabs__line {
  background-color: #3296fa !important;
}
.title-com {
  font-size: 11px;
  color: #999999;
  span {
    &:nth-of-type(2) {
      margin-left: 10px;
    }
  }
}
</style>