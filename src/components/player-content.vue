<!-- 播放器内容区 -->
<template>
  <div class="content">
    <div class="content-left">
      <div class="songList-box">
        <div class="list" v-for="item in songs" :key="item.id">
          <div class="songList-left" @click="playSong(item.id)"></div>
          <div class="songList-center">{{ item.name }}</div>
          <div
            :class="[
              'songList-right',
              { hidden: item.mvid === 0 ? true : false },
            ]"
            @click="getVideoSrc(item.mvid)"
          ></div>
        </div>
      </div>
    </div>
    <div class="content-center">
      <img
        src="../assets/images/player_bar.png"
        alt=""
        :class="['bar', { playing: picUrl.length }]"
      />
      <img :src="picUrl" alt="" class="detail" />
      <img
        src="../assets/images/disc.png"
        alt=""
        :class="['disc', { moving: picUrl.length }]"
      />
    </div>
    <div class="content-right">
      <h5 v-show="hotComments.length">热门留言</h5>
      <div class="comment-box">
        <div class="comment-list" v-for="item in hotComments" :key="item.commentID">
          <div class="photo">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="comment-content">
            <div class="name">{{ item.user.nickname }}</div>
            <div class="text">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    songs: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      picUrl: "",
      photoSrc:'',
      hotComments:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    playSong(id) {
      // console.log(item);
      this.$http
        .get("song/url", {  //获取歌曲链接
          params: {
            id: id,
          },
        })
        .then((res) => {
          //console.log(typeof res);
          // console.log(res.data.data[0].url);
          this.$emit("getSongUrl", res.data.data[0].url);
        });
      this.$http
        .get("song/detail", {  //获取歌曲图片
          params: {
            ids: id,
          },
        })
        .then((res) => {
          // console.log(res.data.songs[0].al.picUrl);
          // this.$emit('getPicUrl',res.data.songs[0].al.picUrl)
          this.picUrl = res.data.songs[0].al.picUrl;
        });
      this.$http.get('comment/hot?type=0',{ //获取评论
        params:{
          id: id,
        }
      }).then( res => {
        // console.log(res);
        this.hotComments = res.data.hotComments;
        console.log(this.hotComments);
      })
    },
    getVideoSrc(mvid) {
      // console.log(mvid);
      this.$http
        .get("mv/url", {
          params: {
            id: mvid,
          },
        })
        .then((res) => {
          // console.log(res.data.data.url);
          this.$emit("playVideo", res.data.data.url);
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.content {
  display: flex;
  width: 100%;
  height: 479px;
  .content-left {
    width: 200px;
    height: 479px;
    border-right: 1px dotted var(--themeColor);
    .songList-box {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      .list {
        border-radius: 5px;
        padding: 10px;
        height: 40px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .songList-left {
          width: 25px;
          height: 25px;
          background: url(../assets/images/table.png) -18px -18px;
          cursor: pointer;
        }

        .songList-center {
          height: 30px;
          width: 150px;
          font-size: 16px;
          color: #f8f1f1;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          line-height: 30px;
        }

        .songList-right {
          width: 30px;
          height: 20px;
          background: url(../assets/images/table.png) left -45px;
          cursor: pointer;
        }
      }
      .list:nth-child(odd) {
        background-color: rgba(224, 217, 217, 0.5);
      }
    }
  }

  .content-center {
    width: 400px;
    height: 479px;
    position: relative;
    border-right: 1px dotted var(--themeColor);
    .bar {
      left: 200px;
      position: absolute;
      z-index: 8;
      transform: rotate(-25deg);
      transform-origin: 12px 12px;
      transition: all 2s;
    }
    .detail {
      top: 156px;
      left: 156px;
      position: absolute;
      width: 150px;
      height: 150px;
    }
    .disc {
      position: absolute;
      left: 100px;
      top: 100px;
    }
  }

  .content-right {
    width: 200px;
    height: 479px;
    h5 {
      font-weight: 500;
      padding: 5px;
      height: 30px;
    }

    .comment-box {
      height: 450px;
      overflow-y: scroll;
      overflow-x: hidden;
      .comment-list {
        padding: 5px;
        display: flex;
        align-items: flex-start;
        .photo {
          padding: 5px;
          img {
            height: 30px;
            width: 30px;
            border-radius: 50%;
          }
        }

        .comment-content {
          .name {
            font-size: 16px;
          }

          .text {
            font-size: 12px;
            color: white;
            font-weight: 100;
          }
        }
      }
    }
  }
  .hidden {
    visibility: hidden;
  }
  .playing {
    transform: rotate(0) !important;
  }
  .moving {
    animation-name: move;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}
@keyframes move {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>