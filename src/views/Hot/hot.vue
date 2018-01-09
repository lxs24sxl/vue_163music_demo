<template>
	<div class="hot">
		<div class="hot-list-wrapper" v-once> 
			<div class="hot-top">
				<div class="hot-top-pic">
					<div class="hot-icon"></div>
					<div class="hot-time">
						更新日期：2017-07-21
					</div>
				</div>				
			</div>
		</div>
		<song-list></song-list>
		<div class="hot-bottom" v-once>
			<span class="hot-bottom-text">查看完整榜单 ></span>
		</div>
	</div>
</template>

<script>
import SongList from "@/components/song-list/song-list"
export default{
	data (){
		return {
			isNewSong:false,
		}
	},
	created (){
		this.$store.commit("Change_currentId",1);
	  	this.$store.commit('Change_isNewSong',this.isNewSong);
	},
	components:{
		'song-list':SongList
	}
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
.hot
	margin-top:8.9rem
	
	.hot-list-wrapper
		.hot-top
			position:relative
			padding-top:38.9%
			overflow:hidden
			background: url(../../../static/img/hot_music_bg_2x.jpg) no-repeat
			background-size:contain
			.hot-top-pic
				display:flex
				flex-direction:column
				justify-content:center
				z-index:2
				padding-left:1.6rem
				box-sizing:border-box
				.hot-icon
					background: url(../../../static/img/index_icon_2x.png) no-repeat
					background-size:16.6rem 9.7rem
					width:14.2rem
					height:6.7rem
					background-position: -2.4rem -3rem
				.hot-time
					margin-top:1rem
					font-size:1.1rem
					color: hsla(0,0%,100%,.8)
.hot-top::after,.hot-top-pic
	position:absolute
	left:0
	top:0
	bottom:0
	right:0
.hot-bottom
	height:5.5rem
	line-height:5.5rem
	text-align:center
	.hot-bottom-text
		color:#999
		font-size:1.4rem
		padding-right:1.4rem
		display:inline-block
</style>