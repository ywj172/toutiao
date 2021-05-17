<template>
  <div class="login">
    <van-nav-bar title="注册 / 登录" left-arrow />
    <van-cell-group>
      <van-form @submit="onlogin" :show-error='false' :show-error-message='false' @failed='onfailed' ref="loginForm">
        <van-field v-model="user.mobile" name='mobile' placeholder="请输入手机号" left-icon=' iconfont icon-shouji' :rules="fromRules.mobile" />
        <van-field v-model="user.code" left-icon=' iconfont icon-yanzhengma' placeholder="请输入验证码" :rules="fromRules.code">
          <template #button>
            <van-count-down :time="time" format="ss 秒" v-if="isCountDown" @finish="isCountDown=false" />
            <van-button size="mini" :loading="isLoading" class="send-btn" @click.prevent="sendVer" v-else>发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn">
          <van-button type="info" block native-type="submit">登录</van-button>
        </div>
      </van-form>
    </van-cell-group>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { login, getMessage } from '../../api/api'
import { Toast } from 'vant';
export default {
  name: "login",
  //^1(3|4|5|7|8)\d{9}$
  data() {
    return {
      user: {
        mobile: '17090086870',
        code: "246810"
      },
      fromRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确手机号' },
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\S{6,}$/, message: '请输入6位验证码' }
        ]
      },
      //倒计时60秒
      time: 60 * 1000,
      //控制倒计时显示与否
      isCountDown: false,
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['serUser']),
    // 登录验证
    onlogin() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
      login(this.user).then(res => {
        Toast.success('登录成功');
        //1.把token保存到vuex以及本地中
        this.serUser(res.data.data)
        //2跳转页面
        this.$router.push("/")

      }).catch(err => {
        Toast.fail('登录失败,请检查手机号或者验证码');
      })
    },
    //表单验证失败的处理
    onfailed(value) {
      Toast({
        message: value.errors[0].message,
        forbidClick: true,
        position: 'top',
      });
    },
    //点击发送验证码
    sendVer() {
      this.isLoading = true
      //先验证手机号是否有问题
      this.$refs.loginForm.validate('mobile').then(res => {
        //1.如果手机号码验证成功就发送短信验证码请求
        getMessage(this.user.mobile).then(res => {
          if (res.status === 200) {
            //1.1先弹窗
            Toast.success({
              message: "发送短信验证码成功",
              position: 'top',
            });
            //1.2显示倒计时
            this.isCountDown = true
            //1.3关闭正在加载
            this.isLoading = false
          }
        }).catch(() => {
          Toast.fail({
            message: "发送验证码失败",
            position: 'top',
          });
        })
        /*---------------------- */
      }).catch((err) => {
        //2.如果手机号码验证失败就弹出警告
        Toast({
          message: "请输入正确的手机号",
          forbidClick: true,
          position: 'top',
        });
      })
    }
  },
  created() {
  }
}
</script>

<style lang='scss'>
.login {
  .login-btn {
    padding: 15px 16px 0 16px;
  }
  .send-btn {
    background-color: #ccc;
    border-radius: 18px;
  }
  .van-nav-bar {
    margin-bottom: 15px;
  }
}
</style>