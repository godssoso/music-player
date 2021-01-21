<!-- 播放器顶部 -->
<template>
<div class='header'>
    <div class="header-left">
        <a href="javascript:;" title="垃圾播放器">垃圾播放器</a>
    </div>
    <div class="header-right">
        <input type="text" placeholder="请输入关键字" v-model="val" @keyup.enter="getKeywords">
        <span @click="getKeywords"></span>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    val:''
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getKeywords(){
        this.$http.get("/search",{
            params:{
                keywords:this.val
            }
        }).then( res => {
            // console.log(res);
           //console.log( res.data.result.songs);
           this.$emit('getSongs',res.data.result.songs);
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {  //默认初始请求"热门"
    // this.$http.get("/search",{
    //         params:{
    //             keywords:'热门'
    //         }
    // }).then( res => {
    //     // console.log(res);
    //     //console.log( res.data.result.songs);
    //     // console.log(res.data.result.songs[0].id);
    //     this.$emit('getSongs',res.data.result.songs);
    // })
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
.header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 60px;
   padding: 10px;
  .header-left {
      a{
        text-decoration: none;
        color: #fff;
        font-weight: 800;
        font-style: italic;
        font-size: 18px;
      }
  }

  .header-right {
    position: relative;
    input {
        border: 0;
        outline: 0;
        width: 300px;
        height: 30px;
        border-radius: 20px;
        text-indent: 15px;
        background: url(../assets/images/zoom.png) 270px center no-repeat white;
    }
    span{
        position: absolute;
        height: 30px;
        width: 40px;
        // background: red;
        border-radius: 0 20px 20px 0;
        right: 0;
        top: 0;
        border-left: 1px solid #ccc;
        cursor: pointer;
    }
  }
}
</style>