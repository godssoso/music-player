<template>
  <div id="app">
    <div class="my-music-app">
      <!-- 播放器头部 -->
      <div class="player-header">
        <player-header @getSongs="handleGetSongs"></player-header>
      </div>
      <!-- 播放器内容区域 -->
      <div class="player-content">
         <player-content :songs="songs"  @getSongUrl="handleGetSongUrl" @playVideo="handlePlayVideo" :flag="animate"></player-content>
      </div>
      <!-- 播放器底部 -->
      <div class="player-footer">
         <player-footer :url="songUrl" :videoSrc="videoUrl" @stopPlay="handleStop" @songStop="handleSongStop" @songStart="handleSongStart"></player-footer>
      </div>
    </div>
  </div>
</template>

<script>
import playerHeader from "./components/player-header"
import playerContent from "./components/player-content"
import playerFooter from "./components/player-footer"


export default {
  name: "App",
  methods:{
    handleGetSongs(songs){
      this.songs = songs;
      // this.firstID = firstID;
      // console.log(this.firstID);
    },
    handleGetSongUrl(url){
      this.songUrl = url;
    },
    handlePlayVideo(src){
      this.videoUrl = src;
      document.querySelector('audio').pause();//播放mv时暂停音乐
    } ,
    handleStop(){
      this.videoUrl = '';
    },
    handleSongStop(){
      this.animate = false;
    },
    handleSongStart(){
      this.animate = true;
    }
  },
  data(){
    return {
      songs:[],
      songUrl:'',
      videoUrl:'',
      animate:false
    }
  },
  components: {
    playerHeader,
    playerContent,
    playerFooter
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  background: url(./assets/images/bg.jpg) no-repeat;
  background-size: 1920px 937px;
  display: flex;
  align-items: center;
  justify-content: center;
  --themeColor: #1baad5;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.my-music-app{
  width: 800px;
  height: 600px;
  border-radius: 10px;
}
.player-header{
  height: 60px;
  width: 100%;
  background: var(--themeColor);
}
.player-content{
  width: 100%;
  height: 480px;
  display: flex;
  border-bottom: 1px dotted var(--themeColor);
  background-color: rgba(255, 255, 255, 0.5);
}
.player-footer{
  width: 100%;
  height: 60px;
  background: var(--themeColor);
}
</style>
