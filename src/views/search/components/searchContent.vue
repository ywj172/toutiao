<template>
  <div class="search-content">
    <van-cell icon='search' v-for="(item,index) in searchList" :key="index" @click="searchInfo(index)">
      <p v-html="item.titles"></p>
    </van-cell>
  </div>

</template>

<script>
export default {
  name: "searchContent",
  props: {
    searchList: {
      type: Array,
      require: true
    },
    searchValue: {
      type: String,
      require: true
    }
  },
  methods: {
    searchInfo(index) {
      this.$emit("searchInfo",index)
    }
  },
  watch: {
    searchList: function (newVal, oldVal) {
      newVal.forEach(ele => {
        ele.titles = ele.title.replace(new RegExp(this.searchValue, 'gi'), `<span style="color:red">${this.searchValue}</span>`)
      });
      this.searchList = newVal
    }
  },
}
</script>
<style lang='scss'>
</style>