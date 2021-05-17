<template>
  <div class="search-history">
    <van-cell center class="history-top">
      <div slot="title">
        <span>历史记录</span>
      </div>
      <!-- 全部删除 -->
      <div slot="default" v-if="isDelHistory">
        <span class="del-all" @click="delAllSearchHistory">全部删除</span>
        <span @click="isDelHistory=false">完成</span>
      </div>
      <!-- 删除按钮 -->
      <div slot="default" @click="isDelHistory=true" v-if="!isDelHistory">
        <van-icon name="delete" size='20px' />
      </div>
    </van-cell>
    <van-cell v-for="(item, index) in searchHistory" :key="index" class="search-item" @click="search(item)">
      <!-- 文字 -->
      <div slot="title">
        <span>{{item}}</span>
      </div>
      <!-- 删除按钮 -->
      <div slot="default" v-if="isDelHistory">
        <van-icon name="clear" size='15px' @click.stop="delSearchHistory(index)" />
      </div>
    </van-cell>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSerarchHistory } from '../../../api/api'
export default {
  name: "search-history",
  data() {
    return {
      //用户如果没登录默认到本地存储区查找搜索记录
      searchHistory: [],
      isDelHistory: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    //获取搜索列表
    async getSearch() {
      //1.从本地取出本地的搜索历史
      let arr = JSON.parse(window.localStorage.getItem('historyList')) || []
      this.searchHistory = arr
    },
    //点击搜索历史进行跳转
    search(item) {
      this.$emit('searchHistory', item)
    },
    //删除单个搜索历史记录
    delSearchHistory(index) {
      this.searchHistory.splice(index, 1)
      //把删除后的数据同步到本地存储中
      window.localStorage.setItem("historyList", JSON.stringify(this.searchHistory))
    },
    //全部删除
    delAllSearchHistory() {
      this.searchHistory = []
      //把删除后的数据同步到本地存储中
      window.localStorage.setItem("historyList", JSON.stringify(this.searchHistory))
    }
  },
  created() {
    this.getSearch()

  }
}
</script>

<style lang='scss'>
.search-history {
  padding: 0 10px;
  box-sizing: border-box;
  .history-top {
    border-bottom: 1px solid #ccc;
  }
  .del-all {
    margin-right: 10px;
  }
  .van-cell {
    border-bottom: 1px solid #ccc;
  }
  .van-cell__value {
    div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .search-item {
    .van-cell__value {
      flex: unset;
    }
  }
}
</style>