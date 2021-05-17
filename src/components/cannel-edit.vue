<template>
  <div class="cannelEdit">
    <van-cell center>
      <div slot="title">我的频道</div>
      <van-button plain type="danger" slot="default" size='mini' round @click="isEdit=true" v-if="isEdit===false">
        编辑
      </van-button>
      <van-button plain type="danger" slot="default" size='mini' round @click="isEdit=false" v-else>
        完成
      </van-button>
    </van-cell>
    <van-grid>
      <van-grid-item :class="{'select':index===channelAcitve}" :text="item.name" @click="toggleChannel(item,index)" v-for="(item,index) in myChannel" :key="item.id" :icon="isEdit&&index!==0?'cross':''">
      </van-grid-item>
    </van-grid>
    <van-cell center>
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid>
      <van-grid-item :text="item.name" v-for="(item, index) in recommendChannel" @click="addChannel(item)" :key="index"></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, removeUserChannel } from '../api/api'
import { mapGetters } from 'vuex'
export default {
  name: "cannelEdit",
  data() {
    return {
      //全部频道
      AllChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannel: {
      type: Array,
      require: true
    },
    channelAcitve: {
      type: Number,
      require: true
    }
  },
  methods: {
    //获取全部频道
    async getAllChannel() {
      const { data } = await getAllChannels().catch(err => {
        console.log(err);
      })
      this.AllChannels = data.data.channels
    },
    //1.删除频道或跳转频道(我的频道)
    toggleChannel(item, index) {
      //1.1跳转频道
      if (this.isEdit === false) {
        //更新索引并跳转
        this.selectChannel(index)
      } else {
        //1.2删除我的频道
        this.delChannel(item, index)
      }
    },
    //更新索引并跳转
    selectChannel(index) {
      //关闭窗口
      this.$emit('closeEditChannel', index)
    },
    //删除我的频道
    delChannel(item, index) {
      if (index < this.channelAcitve) {
        this.$emit('changeActiveIndex')
      }
      this.myChannel.splice(index, 1)
      //如果是已登录状态就发请求
      if (this.user) {
        removeUserChannel(item.id).then(() => {
        }).catch(err => {
          console.log(err);
        })
      }
    },
    //点击频道推荐下的频道列表新增频道
    addChannel(item) {
      this.myChannel.push(item)
      //1.判断是否登录状态
      console.log(this.user);
      if (this.user) {
        console.log(123);
        //1.1是登录状态发送请求
        addUserChannel({
          channels: [
            {
              id: item.id,
              seq: this.myChannel.length
            }
          ]
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    recommendChannel() {
      let arr = []
      this.AllChannels.forEach(ele => {
        let index = this.myChannel.findIndex(value => {
          return value.name === ele.name
        })
        if (index === -1) {
          arr.push(ele)
        }
      });
      return arr
    }
  },
  created() {
    this.getAllChannel()
  },
}
</script>

<style lang='scss'>
.cannelEdit {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  .van-cell__title {
    font-size: 16px;
    color: #333333;
  }
  .van-grid-item__content {
    background-color: #f4f5f6;

    // margin: 0 5px;
    span {
      font-size: 14px;
      color: #222222;
    }
  }
  .van-icon-cross {
    position: absolute;
    top: 5px;
    right: 0;
    padding: 3px;
    border-radius: 50%;
    background-color: #ccc;
    font-size: 12px;
  }
  .van-grid-item__text {
    margin-top: unset !important;
  }
  .select {
    .van-grid-item__text {
      color: #ee0a24;
    }
  }
}
// f4f5f6
</style>