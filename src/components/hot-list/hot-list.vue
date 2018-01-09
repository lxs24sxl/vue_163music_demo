<template>
	<div class="hotList">
		<section class="m-hotlist">
			<h3 class="title">热门搜索</h3>
			<ul class="list">
				<li class="item" v-for="(item,index) in hots">
					{{item.first}}
				</li>
			</ul>
		</section>
		<section class="history-search-wrapper" >
			<div class="h-s-list-wrapper">
				<div class="h-s-list clearfix" v-for="(item,index) in historySearch">
						<icon class="list-time" name="time" :w="12" :h="12"></icon>
						<div class="list-left">
							<span>{{item}}</span>
						</div>		
						<div @click="del_historySearch(index)" class="list-right">
							<!-- <figure> -->
								<icon class="list-close" name="close" :w="12" :h="12"></icon>
							<!-- </figure> -->
						</div>	
				</div>
			</div>
		</section>
	</div>
</template>

<script>
var data = require("../../../static/data.js");
const hots = data.hot.result.hots;
export default{
	data(){
		return {
			hots: hots,
		}
	},
	created(){
		//当cookie存在时，将cookies中的数组赋值给state.historySearch
		if(this.$cookies.isKey("searchResult-cookies")){
			//提交cookies数据
			this.$store.commit("Add_historySearch",JSON.parse(this.$cookies.get("searchResult-cookies")));
		}
	},
	mounted(){}
	,
	computed:{
		historySearch() {
				//初始化历史查询
				return this.$store.state.historySearch;
			}
	},
	methods: {
		//触发del事件，删除state.historySearch里面的某个值
		del_historySearch(historySearchIndex){
			//触发删除state.historySearch某值的事件
			this.$store.commit('Del_historySearch',historySearchIndex);
			//删除完某个值后，将数组重新提交给cookies
			this.$cookies.set("searchResult-cookies",
					JSON.stringify(this.$store.state.historySearch),60 * 60 * 12);
		}
	}
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
.hotList
	width:100%
	height:100%
	.m-hotlist
		padding:1.2rem 1rem 0
		.title
			font-size:1.2rem
			line-height:1.2rem
			color: #666
		.list
			margin:0.8rem 0 0.7rem
			.item
				display:inline-block
				border:	1px solid rgba(0,0,0,.1)
				height:2.6rem
				margin-right:.5rem
				margin-bottom:.5rem
				padding:0 1.1rem
				font-size:1.4rem
				line-height:2.6rem
				border-radius:1.3rem
.h-s-list
	height:3.5rem
	align-items: center
	display:flex
	.list-left
		border-bottom:	1px solid rgba(0,0,0,.1)
		flex:1 1 auto
		height:3.5
		line-height:3.5
		width:0
		span
			-webkit-box-flex: 1;
			flex: 1;
			width: 1%;
	.list-right
		border-bottom:	1px solid rgba(0,0,0,.1)
.list-time
	padding:0 1rem
.list-close
	padding:1.2rem 1.2rem
</style>