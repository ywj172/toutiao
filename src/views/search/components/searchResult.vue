<template>
  <div class="search-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item) in searchResult" :key="item.art_id">
        <span>{{item.title}}</span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSerarchInfo } from '../../../api/api'
export default {
  name: "searchResult",
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      searchResult: [],
      pageInfo: {
        page: 1,
        per_page: 10
      }
    };
  },
  props: {
    searchValue: {
      type: String,
      require: true
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getSerarchInfo({
        page: this.pageInfo.page,
        per_page: this.pageInfo.per_page,
        q: this.searchValue
      })
      const result = data.data.results
      this.searchResult.push(...result)
      this.loading = false;
      if (result.length) {
        this.pageInfo.page = this.pageInfo.page + 1
      } else {
        this.finished = true
      }

    },
  },

}
</script>

<style lang='scss'>
.search-list {
  position: fixed;
  top: 54px;
  width: 100%;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
}
</style>