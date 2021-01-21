<!-- 播放器底部 -->
<template>
<div class='footer'>
   <audio :src="url" controls loop autoplay></audio>
   <div class="video-box" v-show="videoSrc">
     <div class="close" @click="closeVideo">X</div>
     <video :src="videoSrc" controls autoplay loop></video>
     <div class="video-mask"></div>
   </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
props:{
    url:{
        type:String,
        default:''
    },
    videoSrc:{
      type:String,
      default:''
    }
},
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  closeVideo(){
    this.$emit('stopPlay')
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
div.footer {
    width: 100%;
    height: 60px;
  audio {
    width: 100%;
    height: 100%;
    background-color: white;
  }
  .video-box{
    .close{
      position: fixed;
      color: white;
      top: 10px;
      right: 10px;
      cursor: pointer;
      z-index: 1000;
    }
    video{
      transform: translate(-50%, -50%);
      left: 50%;
      height: 900px;
      width: 900px;
      position: fixed;
      z-index: 999;
      top: 50%;
    }
    .video-mask{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      opacity: 1;
      background-color: black;
      z-index: 888;
    }
  }
}
</style>