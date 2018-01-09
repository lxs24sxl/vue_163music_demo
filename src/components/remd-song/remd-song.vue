<template>
	<div class="recommend-list-wrapper">
		<ul>
			<li class="recommend-list" v-for="(item, index) in homerecommend">
				<!-- <lazy-component> -->
					<img v-lazy="item.picUrl">
				<!-- </lazy-component> -->
				<span class="rec-list-text">{{item.name}}</span>
			</li>
			<div class="clearfloat"></div>
		</ul>
	</div>
</template>

<script>
var data = require("../../../static/data.js");
const homeRecommendList = data.homerecommend.data._list; 
const newsong = data.newsong.result;
export default{
	data () {
		return {
			homeRecommendList: homeRecommendList
		}
	},
	computed:{
		homerecommend(){
			let resetHomeRemdList = [...homeRecommendList[0], ...homeRecommendList[1]];
			return resetHomeRemdList;
		}
	}
}
</script>

<style lang="stylus" ref="stylesheef/stylus">
.recommend-list-wrapper
	position:relative
	ul
		.recommend-list
			width:32.6%
			float:left
			img
				width:100%
			span
				display:box
				display:-webkit-box
				line-clamp:2
				-webkit-line-clamp:2
				-webkit-box-orient:vertical
				padding:0.4rem 0.2rem 0 0.4rem
				font-size:1.3rem
				font-family:"Helvetica, Arial, sans-serif;"
				overflow:hidden
				text-overflow:ellipsis
.recommend-list:nth-of-type(2)
	margin:0 1.1%
.recommend-list:nth-of-type(5)
	margin:0 1.1%							
.recommend-list:nth-of-type(3) ~ li
	padding-top:1.4rem
.clearfloat	
	clear:both
	height:0.2
	font-size:1px
	line-height:0
</style>