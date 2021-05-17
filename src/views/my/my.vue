<template>
  <div class="my">
    <!-- 已登录样式 -->
    <van-cell-group v-if="user">
      <van-cell center title="单元格" value="编辑资料" :border='false' class="user-top">
        <template #title>
          <van-image round width="1.8rem" height="1.7rem" :src="currentUser.photo" />
          <p class="user-name">{{currentUser.name}}</p>
        </template>
      </van-cell>
      <!-- ----------- -->
      <van-grid :border='false' class="grid-banner">
        <van-grid-item icon="photo-o" :border='false'>
          <span>{{currentUser.art_count}}</span>
          <span>头条</span>
        </van-grid-item>
        <van-grid-item icon="photo-o">
          <span>{{currentUser.follow_count}}</span>
          <span>关注</span>
        </van-grid-item>
        <van-grid-item icon="photo-o">
          <span>{{currentUser.fans_count}}</span>
          <span>粉丝</span>
        </van-grid-item>
        <van-grid-item icon="photo-o">
          <span>{{currentUser.like_count}}</span>
          <span>获赞</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录样式 -->
    <van-cell-group class="not-login" v-else>
      <van-cell center :border='false' class="user-top">
        <div class="cell-login" @click="$router.push('/login')">
          <div class="login-img"></div>
          <span>登录 / 注册</span>
        </div>
      </van-cell>
    </van-cell-group>
    <!-- -------------------------- -->
    <van-grid :column-num="2" :border='false' class="grid-favorite">
      <van-grid-item icon="iconfont icon-shoucang" icon-prefix='iconfont' text="文字" />
      <van-grid-item icon="iconfont icon-lishi" icon-prefix='iconfont' text="文字" />
    </van-grid>
    <van-cell title="消息通知" is-link url="/vant/mobile.html" />
    <van-cell title="小智同学" is-link to="index" />
    <van-cell value="退出登录" class="close-login" v-if="user" @click="closeLogin" />
    <!-- 弹出确认退出框 -->

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getCurrentUser } from '../../api/api'
export default {
  name: "my",
  data() {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getUser()
  },
  methods: {
    ...mapActions(['serUser']),
    //点击退出登录
    closeLogin() {
      //先弹出框确认
      this.$dialog.alert({
        message: '弹窗内容',
        showCancelButton: true
      }).then(() => {
        this.serUser(null)
      }).catch(() => {

      })
    },
    //获取当前用户的信息
    getUser() {
      getCurrentUser().then(res => {
        this.currentUser = res.data.data
        console.log(this.currentUser);
      }).catch(err => {
        console.log(err);
      })
    },
  },

}
</script>

<style lang='scss'>
.van-cell__title {
  display: flex;
  align-items: center !important;
}
.van-cell__value--alone {
  text-align: center;
}
.van-cell-group {
  background: url("../../assets/banner.png");
  background-size: cover;
}
.van-grid-item__content {
  background-color: unset;
}
.user-top {
  background-color: unset;
  padding: 30px 15px 15px 15px;
}
.van-cell__value {
  span {
    background-color: #fff;
    color: #666666;
    padding: 2px 5px;
    border-radius: 10px;
  }
}
.user-name {
  margin-left: 15px;
  color: #fff;
  font-size: 16px;
}
.grid-banner {
  .van-grid-item__content {
    & > span {
      font-size: 16px;
      color: #fff;
      &:nth-of-type(1) {
        margin-bottom: 10px;
      }
    }
  }
}

.grid-favorite {
  background-color: #fff;
  .van-grid-item__text {
    color: #666666;
  }
  .van-grid-item {
    height: 70px;
  }
}
.icon-shoucang,
.icon-lishi {
  font-size: 22px;
  color: #eb5253;
}
.icon-lishi {
  color: #ff9d1d;
}
.close-login {
  span {
    color: #eb5253;
  }
}
.not-login {
  height: 200px;
  display: flex;
  align-items: center;
}
.cell-login {
  .login-img {
    background: url("../../assets/header.png");
    margin: 0 auto;
    width: 70px;
    height: 70px;
    background-size: cover;
    margin-bottom: 5px;
  }
  span {
    background-color: unset;
    color: #fff;
    font-size: 14px;
  }
}
</style>