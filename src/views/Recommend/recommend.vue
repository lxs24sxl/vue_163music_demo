<template>
  <div class="Recommend" v-once>
  	<topic>
  		<span slot="topic-text">推荐歌单</span>
  	</topic>
  	<Remd-song></Remd-song>
  	<topic>
  		<span slot="topic-text">最新音乐</span>
  	</topic>
    <song-list></song-list>

    <footer class="m-homeft" v-once>
      <div class="ft-wrap">
        <div class="logo">
          <img class="logo-img" v-lazy="imgUrl">
        </div>
        <div class="openapp">打开APP，发现更多好音乐 ></div>
        <p class="copyright">网易公司版权所有©1997-2017   杭州乐读科技有限公司运营</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Topic from '@/components/topic/topic'
import RemdSong from '@/components/remd-song/remd-song'
import SongList from '@/components/song-list/song-list'

export default {
  name: 'Recommend',
  data () {
    return {
      msg: 'This is recommend.vue',
      imgUrl: '../../../static/img/163music_2.png'
    }
  },
  components:{
  	'topic':Topic,'Remd-song':RemdSong,'song-list':SongList
  },
  created() {
    this.$store.commit('Change_isNewSong',true);
    this.$store.commit("Change_currentId",0);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' rel="stylesheet/stylus">
.Recommend
  margin-top:8.9rem
.m-homeft
  position:relative
  display:block
  background: url("../../../static/img/recommend_bg_2x.png") no-repeat
  background-size: contain
  padding-top:53.3%
  margin-top:0.4rem
  .ft-wrap
    position:absolute
    left:0
    top:0
    bottom:0
    right:0
    z-index:1
    text-align:center
    .logo
      padding-top: 16.9%;
      .logo-img
        width:70%
    .openapp
      line-height:3.5rem
      color:#e20000
      font-size:1.5rem
      border:1px solid #e20000
      border-radius:1.75rem  
      margin: 1.5rem 3.7rem 0.5rem
    .copyright
      display:inline-block
      font-size:1.2rem
      color:#888
      line-height:1.6rem
</style>
