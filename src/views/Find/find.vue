<template>
	<div class="find">
		<div class="find-wrapper" >
			<form class="m-input" onsubmit="return false;">
				<div class="inputcover">
					<i></i>
					<input  v-model="inputValue" type="search" name="search" class="input" placeholder="" value="" autocomplete="off" @keyup.enter.prevent="SearchForMusic">
					<label class="holder">{{inputValue===""?"搜索歌曲、歌手、专辑":""}}</label>
				</div>
			</form>
			<section class="searching-wrapper" v-show="isExistValue">
				<h3 class="searching-text">搜索"{{inputValue}}"</h3>
				<ul>
					<li class="result-item" v-for="(item, index) in searchResult">
						<icon class="icon-find" name="find" :w="16" :h="16"></icon>
						<span class="result-text">{{item.keyword}}</span>
					</li>
				</ul>
			</section>
			<router-view v-show="!isExistValue"></router-view>
		</div>
	</div>
</template>

<script>
//导入模拟搜索数据
var data = require("../../../static/data.js");
const result1 = data.searchResult.result1.allMatch;
const result2 = data.searchResult.result2.allMatch;
// console.log(result2);
export default{
	data(){
		return {
			inputValue:"",					//输入值
			isExistValue:false,				//是否存在输入值
			cookieArray:{					//存放数组的类型
				type:Array
			}
		}
	},
	created (){
		this.$store.commit("Change_currentId",2);
		if (this.inputValue === "") {
			this.$router.push({path:"/find/hot-list"});	
		}
	},
	mounted(){
	},
	computed:{
		searchResult(){
			//假的数据查询
			if(this.inputValue.length === 1){
				if (this.inputValue === "林") {
					return result1;
				}
			}else if(this.inputValue.length === 2){
				if(this.inputValue === "林肯"){
					return result2;
				}
			}
		}
	},
	watch:{
		inputValue:{
			//监听输入框的输入变化，当值不为空的时候，显示搜索页面
			handler(curVal, oldVal){
				//显示搜索页面
				this.isExistValue = 
					curVal === ""?false:true;
			}
		}
	},
	methods:{
		//根据输入值查找值
		SearchForMusic(){
			//先提交后清空
			if(this.inputValue !== ""){
				let curCookieArray = JSON.parse(this.$cookies.get("searchResult-cookies"));
				//将cookies中的数组取出来，赋值给cookieArray
				this.cookieArray = curCookieArray !== null?curCookieArray:[];
				//插入到数组的第一个中
				this.ChangeCookieArray(this.cookieArray, this.inputValue);
				console.log(this.cookieArray);
				//修改cookies
				this.$cookies.set("searchResult-cookies",JSON.stringify(this.cookieArray),60 * 60 * 12);
				//将修改后的cookieArray赋值给state.historySearch
				this.$store.commit('Add_historySearch',this.cookieArray);
			}
			//使用回车键之后，将输入的值变为空
			this.inputValue="";
		},
		ChangeCookieArray(cookieArray, inputValue){
			//当数组为空时，直接放入第一个,如果存在值时，则插入到第一个
			cookieArray === null? cookieArray.push(inputValue):
							cookieArray.unshift(inputValue); 
		}
	}
}
</script>

<style lang="stylus" ref="stylesheef/stylus">
.find
	margin-top:8.9rem
	height:100vh
.find,.find-wrapper
	width:100%
.m-input
	padding:1.2rem 1rem
	border-bottom:1px solid #ececec
	.inputcover
		position:relative
		width:100%
		height:2.8rem
		padding:0 3rem
		box-sizing:border-box
		background:#ebecec
		border-radius:3rem
		.input
			width:100%
			height:2.8rem
			color:#333
			background:transparent
			font-size:1.4rem
			line-height:1.8rem
		.holder
			position:absolute
			left:3rem
			top:0.5rem
			font-size:1.5rem
			color:#c9c9c9
			background:transparent
			pointer-events:none

.searching-wrapper
	margin:0 auto
	.searching-text
		height:4.5rem
		line-height:4.5rem
		color:#507daf
		margin-left:1rem
		padding-right:1rem
		font-size:1.5rem
		overflow:hidden
		text-overflow:ellipsis
		white-space:nowrap
		word-break:normal
.result-item
	display: flex;
	align-items: center;
	height: 4rem;
	padding-left: 1rem;
	.result-text
		display:inline-block
		flex:1
		width:1%
		font-size:1.5rem
		line-height:4rem
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
		word-break: normal
		border-bottom:1px solid #ececec
	.icon-find
		margin-right:.7rem
</style>