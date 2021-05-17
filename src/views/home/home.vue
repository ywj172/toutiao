<template>
  <div class="home">
    <!-- 顶部tab选项卡 -->
    <van-nav-bar>
      <template #title>
        <van-field left-icon="search" placeholder="搜索" class="home-search" @click="$router.push('/search')" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="activeIndex">
      <van-tab :title="item.name" v-for="(item) in channels" :key="item.id">
        <!-- tab选项卡内容 -->
        <ArticleList :channel='item'></ArticleList>
      </van-tab>
      <div slot="nav-right">
        456
      </div>
      <div class="edit-channel" slot="nav-right" @click="isPopShow=true">
        <van-icon name="wap-nav" size='30px' />
      </div>
    </van-tabs>
    <!-- 点击右侧弹出框 -->
    <van-popup v-model="isPopShow" closeable close-icon-position="top-left" position="bottom" :style="{ height: '100%' }">
      <!-- 编辑频道列表 -->
      <ChannelEdit :myChannel='channels' @closeEditChannel="closeEditChannel" @changeActiveIndex="changeActiveIndex" :channelAcitve='activeIndex'></ChannelEdit>
    </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '../../api/api'
import { mapGetters } from 'vuex'
import ArticleList from '../../components/article-list'
import ChannelEdit from '../../components/cannel-edit'
export default {
  name: "home",
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      activeIndex: 0,
      channels: [],
      isPopShow: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getChannels()
  },
  methods: {
    //获取当前的频道列表
    getChannels() {
      getUserChannels().then(res => {
        //1.判断当前是否登录状态
        if (this.user) {
          //1是登陆状态,直接获取
          this.channels = res.data.data.channels
        } else {
          //2不是登录状态
          //2.1不是登录状态的话,就查看本地是否有保存好的数据,如果没有就获取网络数据
          const unLoginChannels = JSON.parse(window.localStorage.getItem('unLoginChannelsList'))
          this.channels = unLoginChannels === null || unLoginChannels == undefined ? res.data.data.channels : unLoginChannels
        }
      }).catch(err => {
        // this.$router.push("/login")
        console.log(err);
      })
    },
    //关闭频道编辑
    closeEditChannel(index) {
      this.isPopShow = false
      this.activeIndex = index
    },
    //如果删除的index少于active 需要让active减一
    changeActiveIndex() {
      this.activeIndex--
    }
  },
  watch: {
    //这个监听器用于未登录状态,数据发生变化就同步到本地存储中
    channels: function (newVal, oldVal) {
      if (this.user === null || this.user === undefined) {
        window.localStorage.setItem("unLoginChannelsList", JSON.stringify(newVal))
      }
    }
  },
}
</script>

<style lang='scss'>
.home {
  .van-nav-bar__title {
    max-width: unset;
    width: 80%;
  }
  .home-search {
    background-color: #5babfb;
    padding: unset;
    padding: 5px 5px;
    border-radius: 17px;
    padding-left: 15px;
    .van-field__control {
      color: #fff;
    }
    .van-icon-search {
      color: #fff;
    }
  }
  .edit-channel {
    position: fixed;
    right: 0;
    top: 46px;
    width: 40px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
}
</style>