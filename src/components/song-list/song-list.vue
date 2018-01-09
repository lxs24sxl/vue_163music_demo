<template>
	<div class="song-list-wrapper">
		<div class="song-list"  v-for="(item, index) in curlist"  @click="songListId(item)">
			
			<div class="song-list-information">
				<div ref="songIndex" class="song-ranking-wrapper">
					{{isNewSong? "": newIndex(index + 1)}}
				</div>

				<div class="sli-l">
					<div class="sli-l-name l-text-hide">
						<!-- 歌名 -->
						{{isNewSong? item.song.name: item.name}}
						<!-- 歌曲介绍 -->
						<span>{{isNewSong ? newAlias(item.song.alias[0]): newAlias(item.alia[0])}}</span>
					</div>
					<div class="sli-l-artists l-text-hide">
						<i class="sli-l-sg"></i>
						<!-- 歌手 -->
						{{isNewSong ? newArtists(item.song.artists): newArtists(item.ar)}}
						-
						<!-- 专辑介绍 -->
						{{isNewSong ? item.song.album.name: item.al.name}}
					</div>
				</div>
				<div class="sli-r"> 
					<span class="sli-r-play"></span>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
var data = require("../../../static/data.js");

const newsong = data.newsong.result;
const hotsong = data.hotsong.playlist.tracks;
export default{
	name: "song-list-wrapper",
	data () {
		return {
			newsong: newsong,
			hotsong: hotsong,
			songName:"",
			songArtists:""
		}
	},
	computed: {
		curlist: function () {
			return this.isNewSong? this.newsong: this.hotsong;
		},
		isNewSong: function (){
			return this.$store.state.isNewSong;
		}
	},
	methods:{
		newArtists(artists){  			//传入artists数组
			let newArtistsName;
			//初始化第一个值
			newArtistsName = artists[0].name;
			//当数组长度大于1时，拼装字符串
			if(artists.length > 1){
				for (let i = 1,len = artists.length; i < len; i++) {
					newArtistsName += ` / ${artists[i].name}`;
				}
			}
			return newArtistsName;
		},
		newAlias(alias){
			let newAliasText;
			return newAliasText = alias != null ? `(${alias})`: "";
		},
		newIndex(index){
			return index < 10 ? "0" + index: index;
		},
		songListId(item) {
			if ( item.song ) {
				// 传递当前播放的歌名
				this.$store.commit('Change_currentSongName',item.song.name);
				let currentSongArtists = this.newArtists(item.song.artists);
				// 传递当前播放的歌的作者
				this.$store.commit('Change_currentSongArtists', currentSongArtists);
				// 跳转路由
				this.$router.push({path:'/song?id='+item.id});
			}
			
		}
	},
	mounted(){
		if(this.isNewSong){

		}else{
			for (let i = 0, len = this.$refs.songIndex.length; i < len; i++) {
				this.$refs.songIndex[i].style.cssText = "width:2.6rem";
				if (i < 3) {
					this.$refs.songIndex[i].style.cssText += "color:#e20000;";
				}
			}
		}
	}
}
</script>

<style lang="stylus" ref="stylesheef/stylus">
.song-ranking-wrapper
	position:relative
	display:block
	align-items:center
	font-size:1.6rem
	color:#999
	display:flex
	-webkit-box-align:center
.song-list-information
	flex:1 1 auto
	position:relative
	display:flex
	padding-left:1rem
	.sli-l
		flex:1 1 auto
		padding:0.6rem 0
		width:0
		.sli-l-name
			font-size:1.7rem
			span
				color: #888;
				margin-left: 0.4rem;
		.sli-l-artists
			color:#888
			font-size:1.2rem
			.sli-l-sg
				display:inline-block
				background: url(../../../static/img/index_icon_2x.png) no-repeat
				background-size:16.6rem 9.7rem
				width:1rem
				height:0.8rem
				margin-left:0.1rem
	.sli-r
		display:flex
		align-items:center
		padding:0 1rem
		.sli-r-play
			display: inline-block
			background: url(../../../static/img/index_icon_2x.png) no-repeat
			background-size:16.6rem 9.7rem
			background-position:-2.4rem 0
			width:2.2rem
			height:2.2rem
.l-text-hide
	overflow:hidden
	text-overflow:ellipsis
	white-space: nowrap
	word-break: normal

</style>