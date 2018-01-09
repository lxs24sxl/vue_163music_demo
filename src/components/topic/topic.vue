<template>
	<div class="topic-wrapper" v-once>
		<span  class="topic-text">
			<slot name="topic-text">内容内容内容</slot>
		</span>
	</div>
</template>

<script>
export default{
	name:"topic-wrapper",
}
</script>

<style lang="stylus" ref="stylesheef/stylus">
.topic-wrapper
	height:4.5rem
	line-height:4.5rem
	width:100%
	.topic-text
		padding-left:1rem
		border-left:2px solid #e20000
		font-size:1.7rem
</style>