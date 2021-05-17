<template>
  <div class="search">
    <form action="/">
      <van-search @input='searchItem' @search="onSearch" @focus="searchResult=false" @cancel="onCancel" v-model="searchValue" show-action placeholder="请输入搜索关键词" />
    </form>
    <search-content v-if="searchValue" @searchInfo='searchInfo' :searchList="searchList" :searchValue='searchValue'></search-content>
    <search-history v-if="!searchValue" @searchHistory='searchHistory'></search-history>
    <search-result v-if="searchResult" :searchList='searchList' :searchValue='searchValue'></search-result>
  </div>
</template>

<script>
import { getSearchList } from '../../api/api'
import { debounce } from 'lodash'
import { mapGetters } from 'vuex'
import searchContent from './components/searchContent.vue';
import SearchHistory from './components/searchHistory.vue';
import searchResult from './components/searchResult.vue';
export default {
  components: {
    searchContent,
    SearchHistory,
    searchResult,
  },
  name: "search",
  data() {
    return {
      searchValue: '',
      searchResult: false,
      searchList: [],
      pageInfo: {
        page: 1,
        per_page: 10
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    //搜索框确认搜索触发的事件(回车)
    onSearch() {
      this.searchResult = true
      //2.1查看本地存储是否有
      let historyList = JSON.parse(window.localStorage.getItem('historyList'));
      if (historyList) {
        //2.2有的话进行判断是否有重复项
        let index = historyList.findIndex((item) => {
          return item === this.searchValue
        })
        //2.3没有就存
        if (index === -1) {
          historyList.unshift(this.searchValue)
        }
      } else {
        //2.3没有就创建空数组再存
        historyList = []
        historyList.unshift(this.searchValue)
      }
      //3.最后保存到本地存储中
      window.localStorage.setItem("historyList", JSON.stringify(historyList))
    },
    //搜索栏的取消按钮回到上一页
    onCancel() {
      window.history.back()
    },
    //点击搜索列表每一项的跳转
    searchInfo(index) {
      //1.点击搜索项把顶部输入栏的内容更新为搜索项
      this.searchValue = this.searchList[index].title
      //2.显示搜索结果,同时保存到本地存储中
      this.onSearch()
    },
    //点击历史记录搜索
    async searchHistory(value) {
      this.searchValue = value
      //把上次的结果清空
      this.searchList = []
      const { data } = await getSearchList({
        q: this.searchValue
      })
      this.searchList = data.data.results
    },
    //获取搜索结果
    searchItem: debounce(async function () {
      if (this.searchValue !== '') {
        //把上次的结果清空
        this.searchList = []
        const { data } = await getSearchList({
          q: this.searchValue
        })
        this.searchList = data.data.results
      }
    }, 300)
  },
}
</script>

<style lang='scss'>
.search {
  .van-search {
    background-color: #3296fa;
  }
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background-color: unset;
  }
}
</style>