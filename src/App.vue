<template>
  <div id="app">

  <header class="hometop" v-once>
    <div class="topfix">
      <div class="topl">
        <img src="../static/img/163music.png" class="topl-img">
        <!-- <span class="topl-img"></span> -->
      </div>
      <div class="topr">
        <span class="topr-text">下载APP</span>
      </div>
    </div>
  </header>

  <div class="routerLink bd-btm" v-once>
    <ul>
      <li class="routerlist" v-for="(item, index) in routerList" @click="ExTab(index)" >
        <router-link class="routerlist-text" :to="`${item.path}`">
          <div class="tabtxt" ref="menuItem">
            <span>
              {{ item.text }}
            </span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
      <router-view v-touch:left="leftSlide" v-touch:right="rightSlide"  class="routerView"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return{
      // curMenusId:0,
      routerList: [
        {path:'/recommend',text:'推荐音乐'},
        {path:'/hot',text:'热歌榜'},
        {path:'/find/hot-list',text:'搜索'}
      ],

    }
  }
  ,
  created () {
    //默认推荐音乐为主界面
    this.$router.push({path:'/recommend'});
  },
  computed:{
    //当前菜单的下标
    curMenusId(){
      return this.$store.state.currentIndex;
    }
  }
  ,
  mounted (){
    //默认推荐音乐为主界面，初始化菜单样式
    this.$refs.menuItem[0].style.cssText = "border-bottom:2px solid red;color:#e20000";
  },
  methods: {
    ExTab(index) {
      //当点击菜单时，将index值传入curMenusId
      this.curMenusId = index;
      this.$store.commit("Change_currentId",index);
    },
    leftSlide() {
      if (this.$router.currentRoute.name !== "Song" ) {
        if (this.curMenusId === 0) {                //当处于第一个页面的时候，左划进入热歌榜页面
            this.$router.push({path:'/hot'});
        }else if (this.curMenusId === 1) {          //当处于第二个页面的时候，左划进入搜索页面
          this.$router.push({path:'/find/hot-list'});
        }
      }
    },
    rightSlide() {
      // console.log("dsadasd");
      if (this.$router.currentRoute.name !== "Song" ) {
        if (this.curMenusId === 1) {              //当处于第二个页面的时候，右滑划进入推荐音乐页面
            this.$router.push({path:'/recommend'});
        }else if (this.curMenusId === 2) {         //当处于第三个页面的时候，右滑进入热歌榜页面
          this.$router.push({path:'/hot'}); 
        }
      }
    },
  },
  watch:{
    curMenusId:{              
    //监听curMenusId的改变，只操作两个值
      handler(curVal,oldVal){
        this.$refs.menuItem[curVal].style.cssText="border-bottom:2px solid red;color:#e20000;";
        this.$refs.menuItem[oldVal].style.cssText="";
      }
    }
  }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">
#app
  background:#fcfcfd
  height:100%
  width:100%
  .hometop
    .topfix
      position:fixed
      top:0
      left:0
      background:#d43c33
      height:5.4rem
      width:100%
      display:flex
      justify-content:space-between
      box-sizing:border-box
      -wekit-box-sizing:border-box
      -moz-box-sizing:border-box
      padding:0 1rem
      align-items:center
      z-index:100
      .topl
        position:relative
        .topl-img
          z-index: 100
      .topr
        border:1px solid white
        border-radius:1.5rem
        .topr-text 
          position: relative
          color:white
          height:2rem
          line-height:2rem
          padding:0 1rem
          display:inline-block
          font-size:1.5rem
  .routerLink
    position:fixed
    top:5.4rem
    left:0
    height:3.5rem
    width:100%
    background:white
    z-index:100
    ul
      width:100%
      height:100%
      .routerlist
        position:relative
        display:inline-flex
        justify-content:space-between
        flex-direction: row
        flex:1
        width:33.3%
        height:100%
        .routerlist-text
          display:inline-block
          line-height:3.5rem
          text-align: center
          width:100%
          text-decoration:none
          font-size:1
          .tabtxt
            position: relative;
            display: inline-block;
            height: 100%;
            padding: 0 0.5px;
            box-sizing: border-box;
            color: #333;
            font-size: 1.5rem;
            line-height: 3.5rem;
            span
              display:block
              height:100%
.currentMenu
  position: relative;
  display: inline-block;
  height: 100%;
  padding: 0 0.5px;
  box-sizing: border-box;
  color: #333;
  font-size: 1.5rem;
  line-height: 4rem;
  border-bottom:2px solid red
.bd-btm
  border-bottom:1px solid rgba(0,0,0,.1)
.fade-enter-active, .fade-leave-active
    transition: opacity .5s
.fade-enter, .fade-leave-to 
    opacity: 0
</style>
