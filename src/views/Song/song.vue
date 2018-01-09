<template>
	<div class="m-song">
		<div class="m-song-bg" :style="`background-image:url('${currentMusic.picUrl}');opacity:1;`">
				
		</div>
		<div class="m-song-normal">
			<div class="m-song-wrap">
				<div class="m-song-disc">
					<div class="m-song-turn">
						<div class="m-song-img">
							<lazy-component>
								<img class="u-img" :src="currentMusic.picUrl">
							</lazy-component>
						</div>
					</div>
					<icon v-if="isPlay" class="m-song-plybtn" name="play" :w="55" :h="55"></icon>
				</div>
			</div>

			<div class="m-song-info">
				<h2 class="m-song-h2">
					<span class="m-song-sname">{{ currentSongName }}</span>
					<span class="m-song-gap"> - </span>
					<span class="m-song-autr">{{ currentSongArtists }}</span>
				</h2>
				<div class="m-song-lrc">
					<div class="m-song-scroll">
						<div class="m-song-iner" ref="iner" :style="{ marginTop: marginTopNum+'px'}">
							<p class="m-song-lritem" v-for="(item, index) in currentLyric">{{item}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="m-song-footer">
			<div class="footer-wrap">
				<span class="u-btn u-btn-hollow">打 开</span>
				<span class="u-btn u-btn-solid">下 载</span>
			</div>
		</div>

		<audio ref="music">
			<source :src="currentMusic.url" type="audio/mpeg">
		</audio>

	</div>

</template>

<script>
var data = require("../../../static/detail.js");
const mp3url = data.mp3url.data;
const lyric = data.lyric.data;
// 定时器
var t = [];
	export default{
		data () {
			return {
				currentMusic:{},
				isPlay: false,
				currentLyric:{},
				// isPlayLyric:[],
				marginTopNum: 0,
				preLriIndex:0,
			}
		},
		created () {
			this.clearTimeoutFun();
			let search = window.location.search;
			let id = search.substring(4, search.length);
			// es5语法
			// mp3url.forEach(function (value) {
			// 	console.log(value);
			// });
			// es6 语法
			for (var value of mp3url) {
				if (Number(id) === value.id) {
					this.currentMusic = value;
				}
			};
			let lrc = "";
			for (let value of lyric) {
				if (Number(id) === value.id) {
					lrc = value.lrc.lyric;
					this.currentLyric = this.parseLyric(lrc);
				}
			}
			
			
		},
		computed: {
			currentSongName () {
				return this.$store.state.currentSongName;
			},
			currentSongArtists () {
				return this.$store.state.currentSongArtists;
			},
			currentTime () {
				return this.$refs.music.currentTime;
			}
		},
		methods: {
			// 解析歌词
			parseLyric(lrc) {
			    var lyrics = lrc.split("\n");
			    var lrcObj = [];
			    for (var i = 0; i < lyrics.length; i++) {
			        var lyric = decodeURIComponent(lyrics[i]);
			        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
			        var timeRegExpArr = lyric.match(timeReg);
			        if(!timeRegExpArr)continue;
			        var clause = lyric.replace(timeReg, '');
			        for(var k = 0, h = timeRegExpArr.length; k < h; k++) {
			            var t = timeRegExpArr[k];
			            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
			                sec = Number(String(t.match(/\:\d*/i)).slice(1));
			            var time = min * 60 + sec;
			            lrcObj[time] = clause;
			        }
			    }
			    return lrcObj;
			},
			/**
			*	设置当前播放歌词的状态
			*	@prame oLritem p标签数组 {array}
			*	@prame lyric 解析过的歌词 {array}
			* 	@prame time 当前秒数 {number}
			*/
			lyricSetting (audio, oLritem , lyric, time) {
					if (time > 0 && lyric[time]) {
						oLritem[this.preLriIndex].style.cssText = "";
						console.log(this.preLriIndex);
						oLritem[time].style.cssText = "font-size:1.6rem;color:white";
						this.preLriIndex = time;
						if (time > 1) {
							this.marginTopNum -= 30;
							// this.$refs.iner.style.cssText = "{transition: margin-top .3s ease-in-out .3 linear}";
						}
					}else if(time === 0){
						oLritem[0].style.cssText = "font-size:1.6rem;color:white";
						//this.preLriIndex=time;
						if (!lyric[time + 1]) {
							this.marginTopNum += 30;
						}
					}
			},
			clearTimeoutFun () {
				var len = this.currentLyric.length;
				for (let i = 0; i < len; i++) {
					clearTimeout(t[i]);
				}
			}
		},
		mounted () {
			var oLritem = this.$refs.iner.querySelectorAll(".m-song-lritem");
			var audio = this.$refs.music;
			var len = this.currentLyric.length;
			audio.load();
			audio.play();

			// this.isPlayLyric = this.currentLyric.concat();
			var speed = 1000;
			// todo 可优化
			for (let i = 0; i < len; i++) {
			    t[i] = setTimeout(() => {
					this.lyricSetting(audio, oLritem,this.currentLyric, i);
					// console.log(audio.currentTime);
				}, speed * i);
			}

			console.log(audio.duration);

		},
		destroyed () {
			this.clearTimeoutFun();
		},
		updated () {
			// for (let i = 0; i < this.currentLyric.length; i++) {
				// clearTimeout(t[0]);
			// }
		},
		watch: {
			isPlaying: {
				handler (curVal, oldVal) {
					console.log(curVal, oldVal);
				}
			}
		}

	}
</script>

<style lang="stylus" ref="sheefstyle/stylus">
.m-song
	height:100%
	min-width:320px
	width:100%
	position:absolute
	left:0
	top:0
	background:#eee
	overflow:hidden
	z-index:101
.m-song-bg
	background-position:50%
	background-size:auto 100%
	background-repeat:no-repeat
	transform:scale(1.5)
	transform-origin:center top
	z-index:-1
	transition opacity .3s linear
	filter:blur(15px) brightness(50%)
	height:100%
	width:100%
	content:""
	position:absolute
	left:0
	top:0
	right:0
	bottom:0
.m-song-wrap
	padding-top:5.83rem
	.m-song-disc
		position:relative
		width:24.8rem
		height:24.8rem
		margin: 0 auto
		.m-song-turn
			width:100%
			height:100%
		.m-song-plybtn
			position:absolute
			left:50%
			top:50%
			transform: translate(-50%,-50%)
	.m-song-disc::after
		position:absolute
		top:-5.83rem
		left:11rem
		height:10rem
		width:7rem
		content:" "
		z-index:202
		background: url(/static/img/needle.png) no-repeat
		background-size:contain
.m-song-turn::before
	content:" "
	position: absolute
	left: 0
	top: 0
	right: 0
	bottom: 0
	background: url(/static/img/disc-ip6.png) no-repeat
	background-size:contain
	animation: circling 20s infinite linear 
.m-song-turn::after
	content: " "
	background-image: url(/static/img/disc_light-ip6.png)
	background-size:contain
	position:absolute
	left:0
	top:0
	bottom:0
	right:0
	animation: circling 20s infinite linear 
@keyframes circling
	0%
		transform:rotate(0deg)
	100%
		transform: rotate(360deg)
.m-song-img
	width:15.5rem
	height:15.5rem
	border-radius: 50%
	overflow:hidden
	position:absolute
	left:50%
	top:50%
	margin: -7.7rem 0 0 -7.7rem
	animation: circling 20s infinite linear 
	.u-img
		width:100%
		vertical-align:center
.m-song-info
	margin-top:2rem
	.m-song-h2
		font-size:1.7rem
		text-align:center
		color:#fefefe
		overflow:hidden
		white-space:nowrap
		text-overflow:ellipsis
		.m-song-autr
			color: hsla(0, 0%, 100%, .6)
			font-size:1.6rem
	.m-song-lrc
		margin-top:1rem
		.m-song-scroll
			height:7.4rem
			color: hsla(0, 0%, 100%, .6)
			text-align:center
			overflow:hidden
			.m-song-iner
				line-height:2.5rem
				font-size: 1.5rem
				margin-top:0px
				transition: margin-top .3s ease-in-out
.m-song-footer
	position:absolute
	left:0
	right:0
	bottom:2rem
	z-index:204
	.footer-wrap
		display:flex
		margin:0 auto
		padding:0 3.3rem
		.u-btn 
			flex:1 1 auto
			height:3.6rem
			line-height:3.6rem
			width:1%
			font-size:1.5rem
			padding:0 0.4rem
			border-radius:0.5rem
			margin-left:1.2rem
			text-align:center
			box-sizing: border-box
			border:1px solid red
.u-btn-hollow
	color:red
.u-btn-solid
	color:white
	background:red
@media (min-width: 0px) and (max-width: 375px) 
	.m-song-footer
		bottom: 1rem
	.m-song-info
		margin-top:1.4rem
		.m-song-lrc
			margin-top:0.5rem
</style>